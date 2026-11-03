"""从已定型年度 HTML 复用完整题目；不重新转写、OCR 或修改年度试卷。
依赖：python3 -m pip install -r chapters/scripts/requirements.txt
执行：python3 chapters/scripts/build.py
"""
from pathlib import Path
from html import escape
import json, hashlib, re
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
REPO = ROOT.parent
TAXONOMY = json.loads((ROOT/'data/taxonomy.json').read_text())
ROWS = json.loads((ROOT/'data/classification.json').read_text())
CHAPTERS = {x['id']:x for x in TAXONOMY}
SOURCE_REVIEW = {x['id']:x for x in json.loads((ROOT/'data/source-review.json').read_text())}

def chapter_path(c):
    return f"{c['group']}/{c['slug']}.html"

def ordered(rows):
    return sorted(rows, key=lambda r:(-r['year'],r['number']))

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
    refs = ordered([r for r in ROWS if c['id'] in r['related']])
    assert rows, f"空章节: {c['id']}"
    content = [f'''<header class="chapter-header"><p>{'线性代数' if c['group']=='linear-algebra' else '高等数学'}</p><h1>{escape(c['title'])}</h1>
<p>{len(rows)}道完整真题 · 年份从新到旧 · 同年按原题号排列</p><p class="chapter-scope">{escape(c['scope'])}</p></header>''']
    last = None
    for r in rows:
        if r['year']!=last:
            last = r['year']
            content.append(f'<h2 class="year-heading">{last}年</h2>')
        original = sources[r['id']]
        q = BeautifulSoup(str(original),'html.parser').select_one('li.question')
        for image in q.select('img'):
            image['src'] = '../../exams/' + image['src'].removeprefix('../')
            assert (ROOT/c['group']/image['src']).resolve().exists()
        assert q.get_text(' ',strip=True)==original.get_text(' ',strip=True), r['id']
        assert [m.get_text() for m in q.select('.math-source')]==[m.get_text() for m in original.select('.math-source')], r['id']
        kind = '解答题' if 'question-subjective' in q.get('class',[]) else '选择题' if q.select_one('.options') else '填空题'
        links = ' · '.join(f'<a href="../{chapter_path(CHAPTERS[k])}">{escape(CHAPTERS[k]["title"])}</a>' for k in r['related'])
        cross = f'<div class="question-related">关联章节：{links}</div>' if links else ''
        source_flag = '<p class="source-review">题面待核对：原年度转写稿存在疑点，本次保留题面，作答前请核对独立原题来源。</p>' if r['id'] in SOURCE_REVIEW else ''
        content.append(f'''<article class="bank-entry" data-question="{r['id']}" data-year="{r['year']}" data-number="{r['number']}">
<header class="question-origin"><strong>{r['year']}年 · 第{r['number']}题 · {kind}</strong><span class="screen-only"><a href="../../exams/years/{r['year']}.html#q{r['id']}">返回整卷位置</a> · <a href="../../exams/pdf/math2_{r['year']}.pdf">年度PDF</a></span></header>
<ol class="question-list" start="{r['number']}">{q}</ol>{source_flag}{cross}</article>''')
    if refs:
        entries=[]
        for r in refs:
            primary=CHAPTERS[r['primary']]
            entries.append(f'<li><a href="../{chapter_path(primary)}#q{r["id"]}">{r["year"]}年 · 第{r["number"]}题</a>（主章节：{escape(primary["title"]) }）</li>')
        content.append(f'<aside class="related-index"><h2>交叉考点索引</h2><p>以下题目主归其他章节，点击回到完整原题；不计入本章主收录题数。</p><ul>{"".join(entries)}</ul></aside>')
    target = ROOT/chapter_path(c)
    target.parent.mkdir(parents=True,exist_ok=True)
    target.write_text(page(c['title'], '\n'.join(content)))
    stats.append(dict(id=c['id'],title=c['title'],path=chapter_path(c),questions=len(rows),relatedReferences=len(refs),questionIds=[r['id'] for r in rows]))

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
readme=['# 数学（二）章节题单\n','2010—2026年，385道完整真题，25章。线性代数在前，高等数学在后；各章按年份从新到旧（2026→2010），同年按原题号升序。\n','## 打开方法\n','下载仓库后打开 `chapters/index.html`。各章为 HTML，使用现有本地 KaTeX、字体和附图，可离线阅读、按章打印。GitHub 上可先查看下方各章题数与目录。\n','## 分类规则\n','一道题只确定一个主章节，依据主要设问和解题核心机制归类。综合题保留全部小问，不拆成多题；其余考点在“交叉考点索引”中链接到完整原题，不重复计数。分类不是按年份题号硬编码学科，也不是按出现“行列式”“积分”等词自动归类。\n','先参考项目44的“同类原题组合成题单”方式，本项目直接复用已成型年度 HTML 里的完整题目节点，不再裁图或重新转写。没有加入解题提示或答案。\n','## 章节目录\n']
for group,label in [('linear-algebra','线性代数'),('calculus','高等数学')]:
    readme.append(f'### {label}\n')
    for c in TAXONOMY:
        if c['group']==group:
            s=next(x for x in stats if x['id']==c['id'])
            readme.append(f'- [{c["title"]}]({s["path"]})：{s["questions"]}题。')
    readme.append('')
readme+=['## 原题面核对标记\n','分类时另标记了2013年第20题、2022年第8题的原年度转写稿疑点，未据猜测修改公式。详见 `data/source-review.json`，相应章节页有提示；这是题面核对事项，不是章节归属问题。\n','## 后续修改\n','`data/classification.json` 管每道题的主章节和关联章节，`data/taxonomy.json` 管章节名称与范围。反馈时注明“年份＋题号＋建议章节”；修改归属后运行：\n','```sh\npython3 -m pip install -r chapters/scripts/requirements.txt\npython3 chapters/scripts/build.py\n```\n','构建会检查385题无漏收、无重复主归属、年份倒序，以及复制前后题目正文、公式和附图是否一致。题目内容仍以年度 HTML 为源，章节文件不是第二份手工维护的题库。\n','此次没有修改年度试卷、PDF、原题数据或已有排版样式。章节归属为可调整的首轮人工分类；结构检查不能代替分类判断，也不代表已对全部真题完成官方逐字校勘。\n']
(ROOT/'README.md').write_text('\n'.join(readme))
(ROOT/'data/source-snapshot.json').write_text(json.dumps({str(p.relative_to(REPO)): hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted((REPO/'exams/years').glob('*.html'))}, indent=2)+'\n')
print('Built 25 chapter HTML files; 385 unique primary questions; source text/formulas/images preserved.')
print('\n'.join(f"{s['id']} {s['title']}: {s['questions']}题" for s in stats))
