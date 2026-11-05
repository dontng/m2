"""从年度试卷 HTML 原样截取真题高清图片库 (bank/{year}/qNN.png)。
使用 Chromium Headless + CDP 渲染年度转写 HTML；不是扫描原卷裁图。

依赖：python3 -m pip install websockets pillow
执行：python3 chapters/scripts/crop_bank.py；可用 CHROME 指定浏览器路径。
"""
import argparse
import os, sys, asyncio, json, subprocess, time, base64, urllib.request, io, shutil, hashlib, tempfile
for k in ['http_proxy', 'https_proxy', 'HTTP_PROXY', 'HTTPS_PROXY', 'all_proxy', 'ALL_PROXY']:
    os.environ.pop(k, None)

import websockets
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
BANK_DIR = os.path.join(ROOT, 'chapters', 'bank')
os.makedirs(BANK_DIR, exist_ok=True)

def file_digest(path):
    with open(path, 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest()

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--start', type=int, default=2010)
parser.add_argument('--end', type=int, default=2026)
args = parser.parse_args()
if not 2010 <= args.start <= args.end <= 2026:
    parser.error('年份应为2010—2026的递增区间')

async def main():
    # 字体覆盖先检查；截图不能依赖系统中文字体补字。
    subprocess.check_call([sys.executable, os.path.join(ROOT, 'exams/scripts/font_assets.py')])
    # 启动 Chromium Headless
    chrome = os.environ.get('CHROME') or shutil.which('google-chrome') or shutil.which('chromium')
    if not chrome:
        raise RuntimeError('需要 Chromium；请安装或设置 CHROME')
    profile = tempfile.TemporaryDirectory(prefix='m2-capture-')
    manifest_path = os.path.join(ROOT, 'chapters/data/image-display.json')
    previous = json.load(open(manifest_path)) if os.path.exists(manifest_path) else {}
    manifest = previous.get('images', {})
    sources = previous.get('sources', {})
    def checkpoint():
        data = dict(canvas_width=1440, display_width=720, source_scale=2, viewport=[900,1200], sources=sources, images=manifest)
        with open(manifest_path + '.tmp', 'w') as f:
            json.dump(data, f, ensure_ascii=False, indent=2); f.write('\n')
        os.replace(manifest_path + '.tmp', manifest_path)
    proc = subprocess.Popen([
        chrome,
        '--user-data-dir=' + profile.name,
        '--headless',
        '--disable-gpu',
        '--no-sandbox',
        '--remote-debugging-port=9222',
        '--window-size=900,1200'
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(2)

    try:
        with urllib.request.urlopen('http://127.0.0.1:9222/json/version') as r:
            ver = json.loads(r.read().decode())
            browser_ws = ver['webSocketDebuggerUrl']

        async with websockets.connect(browser_ws, max_size=50*1024*1024) as b_ws:
            msg_id = 0
            async def send_cmd(ws, method, params=None):
                nonlocal msg_id
                msg_id += 1
                await ws.send(json.dumps({'id': msg_id, 'method': method, 'params': params or {}}))
                while True:
                    resp = json.loads(await ws.recv())
                    if resp.get('id') == msg_id:
                        return resp

            total_saved = 0
            for year in range(args.start, args.end + 1):
                year_bank = os.path.join(BANK_DIR, str(year))
                os.makedirs(year_bank, exist_ok=True)
                html_url = f'file://{ROOT}/exams/years/{year}.html'

                target = await send_cmd(b_ws, 'Target.createTarget', {'url': html_url})
                target_id = target['result']['targetId']

                with urllib.request.urlopen('http://127.0.0.1:9222/json/list') as r:
                    tabs = json.loads(r.read().decode())
                    p_tab = [t for t in tabs if t.get('id') == target_id][0]
                    page_ws = p_tab['webSocketDebuggerUrl']

                async with websockets.connect(page_ws, max_size=50*1024*1024) as p_ws:
                    p_msg_id = 0
                    async def send_page(method, params=None):
                        nonlocal p_msg_id
                        p_msg_id += 1
                        await p_ws.send(json.dumps({'id': p_msg_id, 'method': method, 'params': params or {}}))
                        while True:
                            resp = json.loads(await p_ws.recv())
                            if resp.get('id') == p_msg_id:
                                return resp

                    await send_page('Emulation.setDeviceMetricsOverride', {'width': 900, 'height': 1200, 'deviceScaleFactor': 2, 'mobile': False})
                    await send_page('Page.reload', {'ignoreCache': True})

                    # 等待 KaTeX 数学公式渲染和字体加载
                    for _ in range(300):
                        await asyncio.sleep(0.1)
                        r = await send_page('Runtime.evaluate', {'expression': 'document.body && document.body.dataset.ready === "true"'})
                        if r.get('result', {}).get('result', {}).get('value') is True:
                            break
                    else:
                        raise RuntimeError(f'{year}: 字体或公式未就绪，停止截图')
                    ready = await send_page('Runtime.evaluate', {'expression': "(async () => { await document.fonts.ready; const a=await document.fonts.load('16px ExamSong','答案字母括号'); const b=await document.fonts.load('bold 16px ExamHei','答案字母括号'); if(!a.length || !b.length || [...document.fonts].some(f=>f.status==='error')) return false; await Promise.all([...document.images].map(i => i.decode())); return !document.querySelector('.katex-error') })()", 'awaitPromise': True, 'returnByValue': True})
                    if ready.get('result', {}).get('result', {}).get('value') is not True:
                        raise RuntimeError(f'{year}: 附图或公式加载失败')

                    # 隐藏屏幕操作栏与解答题答题空白区
                    await send_page('Runtime.evaluate', {
                        'expression': '''
                            const s = document.createElement("style");
                            s.innerHTML = ".screen-only, .toolbar, .answer-space, .exam-header, .section-title, .exam-footer { display: none !important; } .question { display:none; } .question.capture-target { display:block; } body { margin: 0; background: white; }";
                            document.head.appendChild(s);
                        '''
                    })

                    res = await send_page('Runtime.evaluate', {
                        'expression': '''(() => {
                            const qs = document.querySelectorAll(".question");
                            return Array.from(qs).map(q => {
                                return { id:q.id, num:parseInt(q.dataset.number) };
                            });
                        })()''',
                        'returnByValue': True
                    })
                    q_list = res['result']['result']['value']

                    for q in q_list:
                        bounds = await send_page('Runtime.evaluate', {
                            'expression': """(async () => {
                                document.querySelectorAll('.capture-target').forEach(q => q.classList.remove('capture-target'));
                                const q = document.getElementById(%s);
                                q.classList.add('capture-target');
                                window.scrollTo(0,0);
                                for (const group of q.querySelectorAll('.options')) {
                                    const pref=group.dataset.layout||'4col';
                                    let cols=pref==='1col'?1:pref==='2col'?2:4;
                                    group.style.removeProperty('grid-template-columns');
                                    group.className='options options-'+cols+'col';
                                    const overflow=()=>[...group.querySelectorAll('.option')].some(o=>o.scrollWidth>o.clientWidth+2);
                                    if(cols===4 && overflow()){cols=2;group.className='options options-2col';}
                                    if(cols===2 && overflow()){cols=1;group.className='options options-1col';}
                                    group.style.setProperty('grid-template-columns',`repeat(${cols}, minmax(0,1fr))`,'important');
                                }
                                await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
                                const box=q.getBoundingClientRect();
                                // KaTeX的可见墨迹会越过行盒；只截行盒会丢上下标。
                                // SVG含故意超宽、由父容器裁切的路径，不能直接并集全部后代边界。
                                const left=Math.floor(box.left-24);
                                const top=Math.floor(box.top-32);
                                const right=Math.ceil(box.right+24);
                                const bottom=Math.ceil(box.bottom+32);
                                return {x:left,y:top,width:right-left,height:bottom-top};
                            })()""" % json.dumps(q['id']),
                            'returnByValue': True, 'awaitPromise': True
                        })
                        q.update(bounds['result']['result']['value'])

                        shot = await send_page('Page.captureScreenshot', {
                            'clip': {
                                'x': q['x'],
                                'y': q['y'],
                                'width': q['width'],
                                'height': q['height'],
                                'scale': 1
                            },
                            'captureBeyondViewport': True
                        })
                        raw_bytes = base64.b64decode(shot['result']['data'])

                        im = Image.open(io.BytesIO(raw_bytes))
                        gray = im.convert('L')
                        mask = gray.point(lambda x: 255 if x < 236 else 0)
                        bbox = mask.getbbox()
                        if not bbox or min(bbox[0], bbox[1], im.width-bbox[2], im.height-bbox[3]) < 10:
                            raise RuntimeError(f'{year}-{q["num"]}: 截图墨迹接近边界，需要扩大捕获范围')
                        if bbox:
                            pad = 12
                            w, h = im.size
                            box = (max(0, bbox[0] - pad), max(0, bbox[1] - pad), min(w, bbox[2] + pad), min(h, bbox[3] + pad))
                            im = im.crop(box)
                        out_path = os.path.join(year_bank, f"q{q['num']:02d}.png")
                        if im.width > 1440:
                            raise RuntimeError(f'{year}-{q["num"]}: 超过统一画布 {im.size} / {q}，禁止缩小单题')
                        original_size = list(im.size)
                        original = io.BytesIO()
                        im.save(original, format='PNG')
                        canvas = Image.new('RGB', (1440, im.height), 'white')
                        canvas.paste(im, (0, 0))
                        # 完整编码并验证后再原子替换，避免中断留下零字节题图。
                        encoded = io.BytesIO()
                        canvas.save(encoded, format='PNG')
                        payload = encoded.getvalue()
                        with Image.open(io.BytesIO(payload)) as verified:
                            verified.verify()
                        temporary = out_path + '.tmp'
                        with open(temporary, 'wb') as saved:
                            saved.write(payload)
                            saved.flush()
                            os.fsync(saved.fileno())
                        os.replace(temporary, out_path)
                        with open(out_path, 'rb') as saved:
                            digest = hashlib.sha256(saved.read()).hexdigest()
                        manifest[f"{year}-{q['num']:02d}"] = dict(path=f"bank/{year}/q{q['num']:02d}.png", original_size=original_size, original_sha256=hashlib.sha256(original.getvalue()).hexdigest(), sha256=digest, canvas_width=1440, display_width=720)
                        total_saved += 1

                    sources[str(year)] = dict(html=file_digest(os.path.join(ROOT, f'exams/years/{year}.html')), css=file_digest(os.path.join(ROOT, 'exams/assets/exam.css')), js=file_digest(os.path.join(ROOT, 'exams/assets/exam.js')), serif=file_digest(os.path.join(ROOT, 'exams/assets/exam-song.otf')), sans=file_digest(os.path.join(ROOT, 'exams/assets/exam-hei.otf')))
                    checkpoint()
                    print(f'{year}: 成功截取 {len(q_list)} 道HTML题目，清单已保存。', flush=True)

                await send_cmd(b_ws, 'Target.closeTarget', {'targetId': target_id})

            expected = sum(23 if year <= 2020 else 22 for year in range(args.start, args.end + 1))
            if total_saved != expected:
                raise RuntimeError(f'题量错误: {total_saved}，应为{expected}')
            checkpoint()
            print(f'本批完成：{args.start}—{args.end}，共{total_saved}张题图。', flush=True)
    finally:
        proc.terminate()
        proc.wait(timeout=10)
        profile.cleanup()

if __name__ == '__main__':
    asyncio.run(main())
