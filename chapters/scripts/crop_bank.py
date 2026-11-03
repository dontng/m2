"""从年度试卷 HTML 原样截取真题高清图片库 (bank/{year}/qNN.png)。
使用系统内置 Chromium Headless + CDP 渲染，保证与真题原卷字体、公式、排版 100% 严谨一致。

依赖：python3 -m pip install websockets pillow
执行：PYTHONPATH=/home/djology/.local/lib/python3.10/site-packages python3 chapters/scripts/crop_bank.py
"""
import os, sys, asyncio, json, subprocess, time, base64, urllib.request, io
for k in ['http_proxy', 'https_proxy', 'HTTP_PROXY', 'HTTPS_PROXY', 'all_proxy', 'ALL_PROXY']:
    os.environ.pop(k, None)

import websockets
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
BANK_DIR = os.path.join(ROOT, 'chapters', 'bank')
os.makedirs(BANK_DIR, exist_ok=True)

async def main():
    # 启动 Chromium Headless
    proc = subprocess.Popen([
        'google-chrome',
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
            for year in range(2010, 2027):
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

                    # 等待 KaTeX 数学公式渲染和字体加载
                    for _ in range(50):
                        await asyncio.sleep(0.1)
                        r = await send_page('Runtime.evaluate', {'expression': 'document.body && document.body.dataset.ready === "true"'})
                        if r.get('result', {}).get('result', {}).get('value') is True:
                            break

                    # 隐藏屏幕操作栏与解答题答题空白区
                    await send_page('Runtime.evaluate', {
                        'expression': '''
                            const s = document.createElement("style");
                            s.innerHTML = ".screen-only, .toolbar { display: none !important; } .answer-space { display: none !important; } body { margin: 0; background: white; }";
                            document.head.appendChild(s);
                        '''
                    })

                    res = await send_page('Runtime.evaluate', {
                        'expression': '''(() => {
                            const qs = document.querySelectorAll(".question");
                            return Array.from(qs).map(q => {
                                const box = q.getBoundingClientRect();
                                return {
                                    id: q.id,
                                    num: parseInt(q.dataset.number),
                                    x: box.left + window.scrollX,
                                    y: box.top + window.scrollY,
                                    width: box.width,
                                    height: box.height
                                };
                            });
                        })()''',
                        'returnByValue': True
                    })
                    q_list = res['result']['result']['value']

                    for q in q_list:
                        shot = await send_page('Page.captureScreenshot', {
                            'clip': {
                                'x': q['x'],
                                'y': q['y'],
                                'width': q['width'],
                                'height': q['height'],
                                'scale': 2
                            },
                            'captureBeyondViewport': True
                        })
                        raw_bytes = base64.b64decode(shot['result']['data'])
                        im = Image.open(io.BytesIO(raw_bytes))
                        gray = im.convert('L')
                        mask = gray.point(lambda x: 255 if x < 236 else 0)
                        bbox = mask.getbbox()
                        if bbox:
                            pad = 12
                            w, h = im.size
                            box = (max(0, bbox[0] - pad), max(0, bbox[1] - pad), min(w, bbox[2] + pad), min(h, bbox[3] + pad))
                            im = im.crop(box)
                        out_path = os.path.join(year_bank, f"q{q['num']:02d}.png")
                        im.save(out_path)
                        total_saved += 1

                    print(f'{year}: 成功截取 {len(q_list)} 道原卷题目。')

                await send_cmd(b_ws, 'Target.closeTarget', {'targetId': target_id})

            print(f'全部完成！总共截取保存 {total_saved} 张原卷高清题面。')
    finally:
        proc.terminate()

if __name__ == '__main__':
    asyncio.run(main())
