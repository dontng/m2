"""标准化生成 25 章极简清爽、说人话、对齐 Markdown 正文字号的题单 Markdown 文件。
"""
from pathlib import Path
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
TAXONOMY = json.loads((ROOT / 'data/taxonomy.json').read_text())
ROWS = json.loads((ROOT / 'data/classification.json').read_text())
CHAPTERS = {x['id']: x for x in TAXONOMY}
PRIORITIES = json.loads((ROOT / 'data/learning-priorities.json').read_text())['chapters']
HINTS = json.loads((ROOT / 'data/hints.json').read_text())
SOURCE_REVIEW = {x['id']: x for x in json.loads((ROOT / 'data/source-review.json').read_text())}

D = 29.0  # 视网膜缩放除数：使题图内文字与 Markdown 16px 正文严格 1:1 视觉对齐

def md_chapter_rel(from_c, to_c):
    if from_c['group'] == to_c['group']:
        return f"{to_c['slug']}.md"
    else:
        return f"../{to_c['group']}/{to_c['slug']}.md"

def chapter_nav(c):
    index = next(i for i, item in enumerate(TAXONOMY) if item['id'] == c['id'])
    links = []
    if index > 0:
        prev = TAXONOMY[index - 1]
        links.append(f"[« {prev['title']}]({md_chapter_rel(c, prev)})")
    if index + 1 < len(TAXONOMY):
        following = TAXONOMY[index + 1]
        links.append(f"[{following['title']} »]({md_chapter_rel(c, following)})")
    return '　　'.join(links)

def generate_chapter(cid: str) -> str:
    c = CHAPTERS[cid]
    plan = PRIORITIES[cid]
    c_rows = sorted([r for r in ROWS if r['primary'] == cid], key=lambda r: (-r['year'], r['number']))
    id_to_num = {r['id']: f'{idx:02d}' for idx, r in enumerate(c_rows, 1)}

    group_label = '线性代数' if c['group'] == 'linear-algebra' else '高等数学'
    nav = chapter_nav(c)

    md = []
    if nav:
        md.append(nav)
        md.append('')
    md.append(f'# {group_label} · {c["title"]}')
    md.append('')

    # 表头分层指引卡片
    core_items = [f'[第 {id_to_num[p["id"]]} 题](#q{id_to_num[p["id"]]})（{p["focus"]}）' for p in plan.get('core', [])]
    core_line = ' → '.join(core_items)

    branch_lines = []
    if plan.get('stretch'):
        stretch_title = '进阶加练' if plan.get('stretch_label') == '加练' else '较难挑战'
        s_items = '、'.join(f'[第 {id_to_num[p["id"]]} 题](#q{id_to_num[p["id"]]})（{p["focus"]}）' for p in plan['stretch'])
        branch_lines.append(f"- **{stretch_title}**：{s_items}")
    if plan.get('exposure'):
        e_items = '、'.join(f'[第 {id_to_num[p["id"]]} 题](#q{id_to_num[p["id"]]})（{p["focus"]}）' for p in plan['exposure'])
        branch_lines.append(f"- **重在看思路**：{e_items}")
    if plan.get('later'):
        l_items = '、'.join(f'[第 {id_to_num[p["id"]]} 题](#q{id_to_num[p["id"]]})' for p in plan['later'])
        branch_lines.append(f"- **首轮可跳过**：{l_items}（技巧较偏或综合度高，首轮不必死磕）")
    if plan.get('defer'):
        d_items = '、'.join(f'[第 {id_to_num[p["id"]]} 题](#q{id_to_num[p["id"]]})（{p["focus"]}）' for p in plan['defer'])
        branch_lines.append(f"- **题面存疑暂缓**：{d_items}（原卷转写存疑，首轮暂不安排）")

    header_block = [
        f"> **本章共 {len(c_rows)} 题**",
        "> ",
        f"> - **核心必做（建议按顺序攻克关键方法）**：  ",
        f">   {core_line}",
    ]
    if branch_lines:
        header_block.append("> ")
        header_block.append("> - **分流与刷题建议**：  ")
        for bl in branch_lines:
            header_block.append(f">   {bl}  ")
    header_block.append("> ")
    header_block.append(f"> - **过关目标**：{plan['goal']}")

    md.append('\n'.join(header_block))
    md.append('')
    md.append('---')
    md.append('')

    for idx, r in enumerate(c_rows, 1):
        y, n = r['year'], r['number']
        im_path = ROOT / f'bank/{y}/q{n:02d}.png'
        im = Image.open(im_path)

        w_px = round(im.width * 16 / D)
        w_em = round(im.width / D, 2)
        img_rel = f'../bank/{y}/q{n:02d}.png'

        md.append(f'<a id=\"q{idx:02d}\"></a><a id=\"q{r["id"]}\"></a>\n')
        md.append(f'### {idx:02d} · {y}年\n')

        if r['id'] in HINTS:
            md.append(f'> *{HINTS[r["id"]]}*\n')
        if r['id'] in SOURCE_REVIEW:
            md.append('> ⚠️ **题面待核对**：原年度转写稿存在疑点，本次保留题面，作答前请核对独立原题来源。\n')

        md.append(f'<img src=\"{img_rel}\" alt=\"{idx:02d} ({y})\" width=\"{w_px}\" style=\"display: block; width: {w_em}em; max-width: 100%; height: auto; margin: 14px 0;\">\n')
        md.append('---\n')

    if nav:
        md.append(nav)
        md.append('')

    return '\n'.join(md)

def build_all(cids=None):
    if cids is None:
        cids = [x['id'] for x in TAXONOMY]
    for cid in cids:
        c = CHAPTERS[cid]
        content = generate_chapter(cid)
        target = ROOT / f"{c['group']}/{c['slug']}.md"
        target.write_text(content)
        print(f"Generated: {target.relative_to(ROOT.parent)}")

if __name__ == '__main__':
    build_all()
