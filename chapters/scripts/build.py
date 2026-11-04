"""从已定型年度 HTML 复用完整题目；不重新转写、OCR 或修改年度试卷。
同时构建 HTML 网页与配对的 Markdown (.md) 题单文档。
依赖：python3 -m pip install -r chapters/scripts/requirements.txt
执行：python3 chapters/scripts/build.py
"""
from pathlib import Path
from html import escape
import json, hashlib, re
from bs4 import BeautifulSoup
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
REPO = ROOT.parent
TAXONOMY = json.loads((ROOT/'data/taxonomy.json').read_text())
ROWS = json.loads((ROOT/'data/classification.json').read_text())
CHAPTERS = {x['id']:x for x in TAXONOMY}
SOURCE_REVIEW = {x['id']:x for x in json.loads((ROOT/'data/source-review.json').read_text())}
HINTS_FILE = ROOT/'data/hints.json'
HINTS = json.loads(HINTS_FILE.read_text()) if HINTS_FILE.exists() else {}
HINT_MATH = json.loads((ROOT/'data/hint-math.json').read_text())['formulas']
PRIORITIES = json.loads((ROOT/'data/learning-priorities.json').read_text())['chapters']
assert set(PRIORITIES) == set(CHAPTERS), '25章选题指引必须齐全'

def chapter_path(c, ext="html"):
    return f"{c['group']}/{c['slug']}.{ext}"

def md_chapter_rel(from_c, to_c):
    if from_c['group'] == to_c['group']:
        return f"{to_c['slug']}.md"
    else:
        return f"../{to_c['group']}/{to_c['slug']}.md"

def markdown_hint(text):
    """公式使用本地SVG，避免阅读器未启用数学扩展时暴露美元符号。"""
    def replace(match):
        tex = match.group(1)
        item = HINT_MATH[tex]
        image = ROOT/item['path']
        if hashlib.sha256(image.read_bytes()).hexdigest() != item['sha256']:
            raise ValueError(f"提示公式图片变化，需要重新渲染：{image}")
        return (f'<img src="../{item["path"]}" alt="公式：{escape(tex, quote=True)}" '
                f'width="{item["width"]}" height="{item["height"]}" align="middle" '
                f'style="width:{item["width_em"]}em;height:{item["height_em"]}em;'
                f'vertical-align:{item["vertical_align_em"]}em;">')
    result = re.sub(r'\$([^$]+)\$', replace, text)
    if '$' in result:
        raise ValueError(f"提示中有未配对美元符号：{text}")
    return result

PRIORITY_LABELS = dict(core='必会', practice='补练', stretch='冲一冲',
                       exposure='见识', later='首轮后放', defer='待核')


def question_decisions(c):
    plan = PRIORITIES[c['id']]
    owned = {r['id'] for r in ROWS if r['primary'] == c['id']}
    assert set(plan['reviewed_ids']) == owned and len(plan['reviewed_ids']) == len(owned), c['id']
    decisions = {}
    for key in PRIORITY_LABELS:
        for pick in plan[key]:
            assert pick['id'] in owned and pick['id'] not in decisions, (c['id'], pick)
            assert pick['focus'].strip() and '$' not in pick['focus'], pick
            decisions[pick['id']] = (key, pick['focus'])
    assert set(decisions) == owned, f"{c['id']} 有题目未安排，禁止默认归为补练"
    return decisions


def priority_header(c):
    plan = PRIORITIES[c['id']]
    decisions = question_decisions(c)
    total = len(decisions)
    lines = [f"> **全章 {total} 题｜本表头已点名 {total} 题｜未归类 0 题。**"]
    for key, label in [('core', '必会'), ('practice', '补练'),
                       ('stretch', plan['stretch_label']), ('exposure', '见识'),
                       ('later', '首轮后放'), ('defer', '待核')]:
        picks = plan[key]
        if not picks:
            continue
        def link(pick):
            year, num = pick['id'].split('-')
            return f"[{year}-{int(num):02d}](#q{pick['id']})"
        if key in ('practice', 'later'):
            action = '按薄弱点选做' if key == 'practice' else '本轮可跳过'
            listing = '、'.join(link(p) for p in picks)
            lines.append(f"> **{label} {len(picks)} 题·{action}**：{listing}")
        else:
            action = {'core': '按此顺序', 'stretch': '', 'exposure': '先会开题', 'defer': '暂不训练'}[key]
            suffix = f'·{action}' if action else ''
            listing = ' → '.join(f"{link(p)}（{p['focus']}）" for p in picks)
            lines.append(f"> **{label} {len(picks)} 题{suffix}**：{listing}")
    lines.append(f"> **首轮过关**：{plan['goal']}")
    return '\\\n'.join(lines) + '\n'

def chapter_nav(c):
    """与E2相同的首尾双向导航，按总目录顺序跨目录连接。"""
    index = next(i for i, item in enumerate(TAXONOMY) if item['id'] == c['id'])
    links = []
    if index > 0:
        previous = TAXONOMY[index - 1]
        links.append(f"[« {previous['title']}]({md_chapter_rel(c, previous)})")
    if index + 1 < len(TAXONOMY):
        following = TAXONOMY[index + 1]
        links.append(f"[{following['title']} »]({md_chapter_rel(c, following)})")
    return '　　'.join(links)

def ordered(rows):
    return sorted(rows, key=lambda r:(-r['year'],r['number']))

def fix_math_limits(text: str) -> str:
    """确保数学极限、求和等符号的下标严格居于正下方，避免 Markdown 行内排版偏移到右下角。"""
    text = re.sub(r'\\lim(?!\\limits)(?=[_\^])', r'\\lim\\limits', text)
    text = re.sub(r'\\sum(?!\\limits)(?=[_\^])', r'\\sum\\limits', text)
    text = re.sub(r'\\iint(?!\\limits)(?=[_\^])', r'\\iint\\limits', text)
    text = re.sub(r'\\iiint(?!\\limits)(?=[_\^])', r'\\iiint\\limits', text)
    text = re.sub(r'\\prod(?!\\limits)(?=[_\^])', r'\\prod\\limits', text)
    text = re.sub(r'\\max(?!\\limits)(?=[_\^])', r'\\max\\limits', text)
    text = re.sub(r'\\min(?!\\limits)(?=[_\^])', r'\\min\\limits', text)
    return text

def question_to_markdown(orig_node):
    """将题目 HTML 节点转换为标准清晰的 Markdown 文本，完整保留公式、选项排版与附图。"""
    clone = BeautifulSoup(str(orig_node), 'html.parser')
    
    # 提取并标准化数学公式
    for m in clone.select('.math-source'):
        latex = m.get_text()
        m.replace_with(fix_math_limits(latex))
        
    for b in clone.select('.answer-blank'):
        b.replace_with(' ______ ')
        
    for img in clone.select('img'):
        src = '../../exams/' + img['src'].removeprefix('../')
        alt = img.get('alt', '附图')
        img.replace_with(f"\n\n![{alt}]({src})\n\n")

    # 处理选择题选项排版
    options_ul = clone.select_one('.options')
    options_md = ""
    if options_ul:
        layout = options_ul.get('data-layout', '4col')
        items = []
        for li in options_ul.select('.option'):
            lbl = li.select_one('.option-label')
            lbl_txt = lbl.get_text(strip=True) if lbl else ''
            txt = li.select_one('.option-text')
            c_txt = txt.get_text(' ', strip=True) if txt else ''
            items.append(f"{lbl_txt} {c_txt}")
        options_ul.decompose()
        
        if layout == '4col' and len(items) == 4:
            options_md = "\n\n" + "　　".join(items)
        elif layout == '2col' and len(items) == 4:
            options_md = f"\n\n{items[0]}　　{items[1]}\n\n{items[2]}　　{items[3]}"
        else:
            options_md = "\n\n" + "\n\n".join(f"- {it}" for it in items)

    # 处理题干或解答题分小问
    subj_div = clone.select_one('.question-subjective-content')
    score_title = clone.select_one('.question-score-title')
    
    if subj_div:
        paras = []
        for p in subj_div.find_all(['p', 'div'], recursive=False):
            t = p.get_text(' ', strip=True)
            if t:
                t = re.sub(r' +', ' ', t)
                # 规范分小问折行
                t = re.sub(r'(?<=[^\n])\s+(2\.\s+)', r'\n\n\1', t)
                t = re.sub(r'(?<=[^\n])\s+(（2）\s*)', r'\n\n\1', t)
                paras.append(t)
        if not paras:
            paras = [subj_div.get_text(' ', strip=True)]
        stem_md = "\n\n".join(paras)
    else:
        stem = clone.select_one('.question-stem') or clone
        stem_md = stem.get_text(' ', strip=True)
        stem_md = re.sub(r' +', ' ', stem_md)

    return (stem_md + options_md).strip()

def page(title, content, nested=True):
    p = '../../' if nested else '../'
    own = '../' if nested else ''
    return f'''<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{escape(title)}｜数学二章节题单</title>
<link rel="stylesheet" href="{p}exams/assets/vendor/katex/katex.min.css">
<link rel="stylesheet" href="{p}exams/assets/exam.css"><link rel="stylesheet" href="{own}assets/chapter.css">
<script defer src="{p}exams/assets/vendor/katex/katex.min.js"></script>
<script defer src="{p}exams/assets/vendor/katex/auto-render.min.js"></script>
<script defer src="{p}exams/assets/exam.js"></script></head>
<body><nav class="screen-only chapter-nav"><a href="{own}index.html">章节目录</a><a href="{p}exams/index.html">年度试卷</a><button type="button" onclick="window.print()">打印当前题单</button></nav>
<main class="exam-container chapter-paper">{content}</main></body></html>\n'''

sources = {}
for year in range(2010,2027):
    html = (REPO/f'exams/years/{year}.html').read_text()
    soup = BeautifulSoup(html, 'html.parser')
    nodes = soup.select('li.question')
    assert len(nodes)==(23 if year<=2020 else 22), year
    assert [int(n['data-number']) for n in nodes]==list(range(1,len(nodes)+1)), year
    for node in nodes:
        key = f"{year}-{node['data-number']}"
        sources[key] = node
assert len(ROWS)==len(sources)==385
assert len({r['id'] for r in ROWS})==385
assert {r['id'] for r in ROWS}==set(sources)
for r in ROWS:
    assert r['id']==f"{r['year']}-{r['number']}"
    assert r['primary'] in CHAPTERS
    assert len(set(r['related']))==len(r['related'])
    assert all(c in CHAPTERS and c!=r['primary'] for c in r['related'])

stats = []
for c in TAXONOMY:
    rows = ordered([r for r in ROWS if r['primary']==c['id']])
    decisions = question_decisions(c)
    refs = ordered([r for r in ROWS if c['id'] in r['related']])
    assert rows, f"空章节: {c['id']}"

    # 统计题目题型分布
    count_subj = 0
    count_choice = 0
    count_fill = 0
    for r in rows:
        orig = sources[r['id']]
        if 'question-subjective' in orig.get('class', []):
            count_subj += 1
        elif orig.select_one('.options'):
            count_choice += 1
        else:
            count_fill += 1

    group_label = '线性代数' if c['group']=='linear-algebra' else '高等数学'
    years = sorted(list({r['year'] for r in rows}), reverse=True)
    year_links = ' · '.join(f'<a href="#y{y}">{y}</a>' for y in years)
    year_nav = f'<nav class="screen-only year-nav-bar"><span class="nav-label">年份快速跳转：</span>{year_links}</nav>'
    meta_pills = f'<div class="chapter-meta-pills"><span>共 {len(rows)} 题</span><span>选择题 {count_choice} 题</span><span>填空题 {count_fill} 题</span><span>解答题 {count_subj} 题</span></div>'

    # --- 1. HTML 内容组装 ---
    html_content = [f'''<header class="chapter-header"><p>{group_label}</p><h1>{escape(c['title'])}</h1>
{meta_pills}<p class="chapter-scope">{escape(c['scope'])}</p>{year_nav}</header>''']

    # --- 2. Markdown 内容组装 ---
    nav = chapter_nav(c)
    md_content = [nav + "\n", f"# {group_label} · {c['title']}\n"]
    md_content.append(priority_header(c))
    md_content.append("---\n")

    last = None
    for idx, r in enumerate(rows, 1):
        if r['year']!=last:
            last = r['year']
            html_content.append(f'<h2 class="year-heading" id="y{last}">{last}年</h2>')
            md_content.append(f"## {last}年\n")
        
        original = sources[r['id']]
        q = BeautifulSoup(str(original),'html.parser').select_one('li.question')
        for image in q.select('img'):
            image['src'] = '../../exams/' + image['src'].removeprefix('../')
            assert (ROOT/c['group']/image['src']).resolve().exists()
        assert q.get_text(' ',strip=True)==original.get_text(' ',strip=True), r['id']
        assert [m.get_text() for m in q.select('.math-source')]==[m.get_text() for m in original.select('.math-source')], r['id']
        
        kind = '解答题' if 'question-subjective' in q.get('class',[]) else '选择题' if q.select_one('.options') else '填空题'
        links_html = ' · '.join(f'<a href="../{chapter_path(CHAPTERS[k])}">{escape(CHAPTERS[k]["title"])}</a>' for k in r['related'])
        cross_html = f'<div class="question-related">关联章节：{links_html}</div>' if links_html else ''
        source_flag_html = '<p class="source-review">题面待核对：原年度转写稿存在疑点，本次保留题面，作答前请核对独立原题来源。</p>' if r['id'] in SOURCE_REVIEW else ''
        
        tip_text = HINTS.get(r['id'])
        tip_block_html = f'<blockquote class="question-tip">{escape(tip_text)}</blockquote>' if tip_text else ''

        # HTML entry
        html_content.append(f'''<article class="bank-entry" data-question="{r['id']}" data-year="{r['year']}" data-number="{r['number']}">
<header class="question-origin"><strong>{r['year']}年 · 第{r['number']}题 · {kind}</strong><span class="screen-only"><a href="../../exams/years/{r['year']}.html#q{r['id']}">返回整卷位置</a> · <a href="../../exams/pdf/math2_{r['year']}.pdf">年度PDF</a></span></header>{tip_block_html}
<ol class="question-list" start="{r['number']}">{q}</ol>{source_flag_html}{cross_html}</article>''')

        # Markdown题图：年度HTML渲染、统一画布和显示比例
        im_file = ROOT / f"bank/{r['year']}/q{r['number']:02d}.png"
        im = Image.open(im_file)
        w, _ = im.size
        if w != 1440:
            raise ValueError(f"题图未统一画布，请先运行 normalize_bank.py: {im_file}")
        w_em = w / 2 / 16
        img_rel = f"../bank/{r['year']}/q{r['number']:02d}.png"

        md_content.append(f'<a id="q{r["id"]}"></a>\n')
        decision_key = decisions[r['id']][0]
        decision_label = PRIORITIES[c['id']]['stretch_label'] if decision_key == 'stretch' else PRIORITY_LABELS[decision_key]
        md_content.append(f"### {idx:02d} · {r['year']}-{r['number']:02d} · {kind} ·【{decision_label}】\n")
        if tip_text:
            md_content.append(f"> {markdown_hint(tip_text)}\n")
        if r['id'] in SOURCE_REVIEW:
            md_content.append(f"> ⚠️ **题面待核对**：原年度转写稿存在疑点，本次保留题面，作答前请核对独立原题来源。\n")
        
        md_content.append(f'<img src="{img_rel}" alt="{r["year"]}-{r["number"]:02d}" width="720" style="display: block; width: {w_em}em; max-width: 100%; height: auto; margin: 12px 0;">\n')
        
        if r['related']:
            links_md = ' · '.join(f'[{CHAPTERS[k]["title"]}]({md_chapter_rel(c, CHAPTERS[k])})' for k in r['related'])
            md_content.append(f"*关联章节：{links_md}*\n")
        md_content.append("---\n")

    # 交叉考点索引
    if refs:
        entries_html = []
        entries_md = []
        for r in refs:
            primary = CHAPTERS[r['primary']]
            entries_html.append(f'<li><a href="../{chapter_path(primary)}#q{r["id"]}">{r["year"]}年 · 第{r["number"]}题</a>（主章节：{escape(primary["title"])}）</li>')
            entries_md.append(f"- [{r['year']}年 · 第{r['number']}题]({md_chapter_rel(c, primary)})（主章节：{primary['title']}）")
        
        html_content.append(f'<aside class="related-index"><h2>交叉考点索引</h2><p>以下题目主归其他章节，点击回到完整原题；不计入本章主收录题数。</p><ul>{"".join(entries_html)}</ul></aside>')
        md_content.append("## 交叉考点索引\n\n以下题目主归其他章节，点击跳转到对应章节题目；不计入本章主收录题数：\n\n" + "\n".join(entries_md) + "\n")

    html_content.append('<a href="#" class="screen-only back-to-top" title="返回顶部">↑</a>')

    # 写出 HTML 文件
    target_html = ROOT/chapter_path(c, "html")
    target_html.parent.mkdir(parents=True, exist_ok=True)
    target_html.write_text(page(c['title'], '\n'.join(html_content)))

    # 写出 Markdown 文件
    target_md = ROOT/chapter_path(c, "md")
    md_content.append(nav + "\n")
    target_md.write_text('\n'.join(md_content))

    stats.append(dict(id=c['id'], title=c['title'], path=chapter_path(c, "html"), mdPath=chapter_path(c, "md"), questions=len(rows), relatedReferences=len(refs), questionIds=[r['id'] for r in rows]))

# 首页 index.html 与 README.md
index=['<header class="chapter-header"><h1>数学（二）章节题单</h1><p>2010—2026年 · 385题 · 25章</p><p>每章按2026→2010倒序；同年按原题号升序。完整保留题干、四个选项、分值、附图及全部小问。</p></header>']
for group,label in [('linear-algebra','线性代数'),('calculus','高等数学')]:
    children=[x for x in TAXONOMY if x['group']==group]
    count=sum(s['questions'] for s in stats if s['id'] in {c['id'] for c in children})
    index.append(f'<section class="chapter-index"><h2>{label}（{len(children)}章 · {count}题）</h2><ol>')
    for c in children:
        s=next(x for x in stats if x['id']==c['id'])
        index.append(f'<li><a href="{s["path"]}">{escape(c["title"])}</a><span>{s["questions"]}题</span><p>{escape(c["scope"])}</p></li>')
    index.append('</ol></section>')
index.append('<p class="scope-note">按既有年度转写稿整理。章节归属为首轮人工分类，不代表题干已与官方出版物重新逐字校勘。</p>')
(ROOT/'index.html').write_text(page('目录','\n'.join(index),False))
(ROOT/'data/summary.json').write_text(json.dumps(dict(totalQuestions=385,chapterCount=25,order='year descending, question number ascending',chapters=stats),ensure_ascii=False,indent=2)+'\n')

readme=['# 数学（二）章节题单\n','2010—2026年，385道完整真题，25章。线性代数在前，高等数学在后；各章按年份从新到旧（2026→2010），同年按原题号升序。\n','提供 **Markdown (.md)** 与 **网页版 (.html)** 双格式。题单 Markdown 对齐项目44规范，直接嵌入考场原卷高清裁切图，100% 还原真实试卷排版风格，告别公式居中变形；同时保留网页版随时查阅与交互。\n','## 章节目录\n']
for group,label in [('linear-algebra','线性代数'),('calculus','高等数学')]:
    readme.append(f'### {label}\n')
    for c in TAXONOMY:
        if c['group']==group:
            s=next(x for x in stats if x['id']==c['id'])
            readme.append(f'- [{c["title"]}]({s["mdPath"]})（{s["questions"]}题 · [网页版]({s["path"]})）：{c["scope"]}')
    readme.append('')
readme+=['## 提速提效与考点导引\n','- **双格式支持**：所有 25 章均提供配套的 `.md` 与 `.html`，Markdown 题单与 HTML 同级存放，直接以原卷高清图呈现，彻底消除公式居中与排版偏移。\n','- **题头考点导引**：精选 106 处开篇重难题与易踩坑题，在题头提供 2 行以内的白话点拨（心理预期与关键招式）；常规直接计算题保持纯净留白。\n','- **网页版交互增强**：支持顶部年份快速跳转（平滑滚动）、题型统计胶囊、悬浮回顶及打印自适应格式。\n','## 原题面核对标记\n','分类时标记了2013年第20题、2022年第8题的原年度转写稿疑点，未据猜测修改公式。详见 `data/source-review.json`，相应章节有提示。\n','## 构建方式\n','```sh\npython3 -m pip install -r chapters/scripts/requirements.txt\npython3 chapters/scripts/build.py\n```\n','构建会同时生成 25 章 HTML 与 Markdown，检查 385 题无漏收、无重复主归属、年份倒序，以及题目正文、公式和附图一致性。\n']
# README含人工维护的截图说明，不在重建题单时覆盖。
if not (ROOT/'README.md').exists():
    (ROOT/'README.md').write_text('\n'.join(readme))
(ROOT/'data/source-snapshot.json').write_text(json.dumps({str(p.relative_to(REPO)): hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted((REPO/'exams/years').glob('*.html'))}, indent=2)+'\n')

print(f'Successfully built 25 HTML files and 25 Markdown (.md) files!')
print(f'Loaded {len(HINTS)} curated hints; verified 385 unique questions.')
