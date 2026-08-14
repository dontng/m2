#!/usr/bin/env python3
"""Convert exported WeChat math articles into focused Markdown notes."""

from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass, field
from html.parser import HTMLParser
from pathlib import Path
from typing import Iterator


@dataclass
class Node:
    tag: str
    attrs: dict[str, str] = field(default_factory=dict)
    parent: "Node | None" = None
    children: list["Node | str"] = field(default_factory=list)


class TreeParser(HTMLParser):
    VOID = {
        "area", "base", "br", "col", "embed", "hr", "img", "input",
        "link", "meta", "param", "source", "track", "wbr",
    }

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.root = Node("document")
        self.stack = [self.root]

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        node = Node(tag, {key: value or "" for key, value in attrs}, self.stack[-1])
        self.stack[-1].children.append(node)
        if tag not in self.VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)
        if tag not in self.VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag: str) -> None:
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                del self.stack[index:]
                return

    def handle_data(self, data: str) -> None:
        self.stack[-1].children.append(data)


def nodes(root: Node, tag: str | None = None) -> Iterator[Node]:
    stack = [child for child in reversed(root.children) if isinstance(child, Node)]
    while stack:
        node = stack.pop()
        if tag is None or node.tag == tag:
            yield node
        stack.extend(child for child in reversed(node.children) if isinstance(child, Node))


def find_by_id(root: Node, node_id: str) -> Node | None:
    return next((node for node in nodes(root) if node.attrs.get("id") == node_id), None)


def find_first(root: Node, tag: str) -> Node | None:
    return next(nodes(root, tag), None)


def plain_text(node: Node) -> str:
    parts: list[str] = []

    def visit(item: Node | str) -> None:
        if isinstance(item, str):
            parts.append(item)
        elif item.tag == "br":
            parts.append("\n")
        else:
            for child in item.children:
                visit(child)

    visit(node)
    text = "".join(parts).replace("\xa0", " ")
    text = re.sub(r"[\t\r\f\v ]+", " ", text)
    text = re.sub(r" *\n *", "\n", text)
    return re.sub(r"\n{2,}", "\n", text).strip()


BLOCK_TAGS = {"p", "section", "ul", "ol", "li", "blockquote", "h1", "h2", "h3", "h4"}


def content_items(root: Node) -> list[Node]:
    result: list[Node] = []

    def append_inline(children: list[Node | str], parent: Node) -> None:
        if not children:
            return
        block = Node("text-block", parent=parent, children=list(children))
        if plain_text(block):
            result.append(block)

    def visit(node: Node) -> None:
        if node.tag == "img":
            result.append(node)
            return
        if node.tag in {"p", "li", "blockquote", "h1", "h2", "h3", "h4"}:
            result.append(node)
            for descendant in nodes(node, "img"):
                result.append(descendant)
            return
        inline: list[Node | str] = []
        for child in node.children:
            if isinstance(child, Node) and (child.tag in BLOCK_TAGS or child.tag == "img"):
                append_inline(inline, node)
                inline.clear()
                visit(child)
            else:
                inline.append(child)
        append_inline(inline, node)

    visit(root)
    return result


def compact(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def style_value(style: str, key: str) -> str | None:
    match = re.search(rf"(?:^|;)\s*{re.escape(key)}\s*:\s*([^;]+)", style, re.I)
    return match.group(1).strip() if match else None


def neutral_color(value: str) -> bool:
    raw_value = value.lower().strip()
    compact_value = value.lower().replace(" ", "")
    if compact_value in {"inherit", "currentcolor", "#000", "#000000", "#333", "#3e3e3e", "#fff", "#ffffff"}:
        return True
    hex_color = re.fullmatch(r"#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})", compact_value)
    if hex_color and len(set(hex_color.groups())) == 1:
        return True
    if re.fullmatch(r"oklch\(\s*\S+\s+0(?:\.0+)?\s+[^)]+\)", raw_value):
        return True
    rgba = re.fullmatch(r"rgba?\((\d+),(\d+),(\d+)(?:,[^)]+)?\)", compact_value)
    return bool(rgba and rgba.group(1) == rgba.group(2) == rgba.group(3))


def neutral_background(value: str) -> bool:
    raw_value = value.lower().strip()
    compact_value = value.lower().replace(" ", "")
    if compact_value in {
        "transparent", "none", "rgba(0,0,0,0)", "#fff", "#ffffff",
        "rgb(255,255,255)", "rgba(255,255,255,1)",
    }:
        return True
    return bool(re.fullmatch(r"oklch\(\s*1(?:\.0+)?\s+0(?:\.0+)?\s+[^)]+\)", raw_value))


@dataclass(frozen=True)
class Format:
    bold: bool = False
    italic: bool = False
    strike: bool = False
    underline: bool = False
    highlight: str | None = None
    color: str | None = None
    link: str | None = None


Segment = tuple[str, Format]


def rich_segments(node: Node) -> list[Segment]:
    result: list[Segment] = []

    def visit(item: Node | str, fmt: Format) -> None:
        if isinstance(item, str):
            value = re.sub(r"\s+", " ", item).strip()
            if value:
                result.append((value, fmt))
            return
        if item.tag == "br":
            result.append(("\n", Format()))
            return
        style = item.attrs.get("style", "")
        decoration = (style_value(style, "text-decoration") or "").lower()
        weight = (style_value(style, "font-weight") or "").lower()
        font_style = (style_value(style, "font-style") or "").lower()
        background = style_value(style, "background-color") or style_value(style, "background")
        color = style_value(style, "color")
        if background and neutral_background(background):
            background = None
        if color and neutral_color(color):
            color = None
        href = item.attrs.get("href") if item.tag == "a" else None
        next_fmt = Format(
            bold=fmt.bold or item.tag in {"b", "strong"} or weight in {"bold", "600", "700", "800", "900"},
            italic=fmt.italic or item.tag in {"i", "em"} or font_style == "italic",
            strike=fmt.strike or item.tag in {"s", "strike", "del"} or "line-through" in decoration,
            underline=fmt.underline or item.tag == "u" or "underline" in decoration,
            highlight=background or fmt.highlight,
            color=color or fmt.color,
            link=href or fmt.link,
        )
        for child in item.children:
            visit(child, next_fmt)

    visit(node, Format())
    return result


def escape_markdown(text: str) -> str:
    return text.replace("\\", "\\\\").replace("[", "\\[").replace("]", "\\]")


def wrap(text: str, fmt: Format) -> str:
    text = escape_markdown(text)
    if fmt.strike:
        text = f"<s>{text}</s>"
    if fmt.underline:
        text = f"<u>{text}</u>"
    if fmt.color:
        text = f'<span style="color: {fmt.color};">{text}</span>'
    if fmt.highlight:
        text = f'<mark style="background-color: {fmt.highlight};">{text}</mark>'
    if fmt.bold:
        text = f"<strong>{text}</strong>"
    if fmt.italic:
        text = f"<em>{text}</em>"
    if fmt.link:
        text = f"[{text}]({fmt.link})"
    return text


def render_text(node: Node) -> str:
    merged: list[list[object]] = []
    for value, fmt in rich_segments(node):
        value = value.replace("\xa0", " ")
        if value == "\n":
            if merged and merged[-1][0] != "\n":
                merged.append(["\n", Format()])
            continue
        value = re.sub(r" +", " ", value)
        if not value:
            continue
        if merged and merged[-1][1] == fmt and merged[-1][0] != "\n":
            previous = str(merged[-1][0])
            separator = " " if previous and value and previous[-1].isascii() and value[0].isascii() else ""
            merged[-1][0] = previous + separator + value
        else:
            merged.append([value, fmt])
    rendered: list[str] = []
    for value, fmt in merged:
        if value == "\n":
            rendered.append("  \n")
        else:
            rendered.append(wrap(str(value), fmt))
    return "".join(rendered).strip()


def image_url(node: Node) -> str:
    return (node.attrs.get("data-src") or node.attrs.get("src", "")).replace("&amp;", "&")


def render_image(node: Node, alt: str) -> str | None:
    url = image_url(node)
    if not url or url.startswith("data:") or "res.wx.qq.com/t/wx_fed/we-emoji/" in url:
        return None
    return f"![{alt}]({url})"


def filename_metadata(source: Path) -> tuple[str, str | None, int | None]:
    daily = re.match(r"^(\d{2})(\d{2})-N(\d{3})\s+(.+)$", source.stem)
    if daily:
        month, day, number, title = daily.groups()
        return title, f"2026-{month}-{day}", int(number)
    legacy = re.match(r"^\[(\d{4})-(\d{2})-(\d{2})-\d{4}\](.+)$", source.stem)
    if legacy:
        year, month, day, title = legacy.groups()
        return title.replace("n", " ").replace("quot", "").strip(), f"{year}-{month}-{day}", None
    return source.stem, None, None


def metadata(source: Path, root: Node) -> tuple[str, str | None, int | None]:
    filename_title, filename_date, number = filename_metadata(source)
    title_node = find_by_id(root, "activity-name")
    html_title = compact(plain_text(title_node)) if title_node is not None else ""
    if not html_title:
        html_title = next(
            (
                compact(node.attrs.get("content", ""))
                for node in nodes(root, "meta")
                if node.attrs.get("property") == "og:title" and node.attrs.get("content")
            ),
            "",
        )
    publish_node = find_by_id(root, "publish_time")
    published = compact(plain_text(publish_node)) if publish_node is not None else ""
    date_match = re.search(r"(\d{4})年(\d{2})月(\d{2})日(?:\s+(\d{2}:\d{2}))?", published)
    html_date = None
    if date_match:
        html_date = f"{date_match.group(1)}-{date_match.group(2)}-{date_match.group(3)}"
        if date_match.group(4):
            html_date += f" {date_match.group(4)}"
    return html_title or filename_title, html_date or filename_date, number


def item_text(item: Node) -> str:
    return "" if item.tag == "img" else compact(plain_text(item))


def is_part_label(text: str) -> bool:
    return bool(re.fullmatch(r"P\s*ART\s*\d*", text.replace(" ", ""), re.I))


def render_items(
    items: list[Node],
    image_alt: str,
    skip_labels: bool = False,
    include_images: bool = True,
) -> list[str]:
    output: list[str] = []
    image_number = 0
    previous = ""
    for item in items:
        if item.tag == "img":
            if not include_images:
                continue
            image_number += 1
            value = render_image(item, image_alt if image_number == 1 else f"{image_alt} {image_number}")
        else:
            text = item_text(item)
            if not text or (skip_labels and is_part_label(text)):
                continue
            value = render_text(item)
        if not value or value == previous:
            continue
        previous = value
        output.append(value)
    return output


def locate(texts: list[str], pattern: str, start: int = 0) -> int:
    regex = re.compile(pattern, re.I)
    index = next((i for i in range(start, len(texts)) if regex.search(texts[i])), None)
    if index is None:
        raise ValueError(f"Cannot locate article section: {pattern}")
    return index


def append_blocks(output: list[str], blocks: list[str]) -> None:
    for block in blocks:
        output.extend([block, ""])


def convert_daily(source: Path, content: Node, title: str, published: str | None, number: int) -> str:
    items = content_items(content)
    texts = [item_text(item) for item in items]
    day_index = locate(texts, rf"每日一题陪伴.*第\s*{number}\s*天")
    previous_index = locate(texts, rf"No\.\s*{number - 1}\s*-\s*昨日题目", day_index)
    solution_index = locate(texts, rf"No\.\s*{number - 1}\s*-\s*文字/视频解析", previous_index + 1)
    current_index = locate(texts, rf"No\.\s*{number}\s*-\s*今日习题", solution_index + 1)
    next_part = next(
        (i for i in range(current_index + 1, len(items)) if is_part_label(texts[i])),
        len(items),
    )

    title = re.sub(rf"^{number}题\s*[|｜]\s*", "", title).strip()
    output = [f"# N{number} {title}", ""]
    if published:
        output.extend([f"> 发布：{published}", ""])

    intro = [
        item for item in items[day_index + 1 : previous_index]
        if not re.match(r"^(?:内容\s*✍️|排版\s*🎨)", item_text(item))
    ]
    intro_text = " ".join(item_text(item) for item in intro)
    if re.search(r"直播预告|扫码即可|点击图片跳转课程|课程.{0,8}(?:更新|启动)|拟录取名单", intro_text):
        intro = []
    intro_blocks = render_items(
        intro,
        f"每日一题 {number} 正文",
        skip_labels=True,
        include_images=False,
    )
    append_blocks(output, intro_blocks)

    output.extend([f"## No.{number - 1} 昨日题目", ""])
    append_blocks(output, render_items(items[previous_index + 1 : solution_index], f"每日一题 {number - 1} 题目", True))
    output.extend([f"## No.{number - 1} 文字/视频解析", ""])
    append_blocks(output, render_items(items[solution_index + 1 : current_index], f"每日一题 {number - 1} 解析", True))
    output.extend([f"## No.{number} 今日习题", ""])
    append_blocks(output, render_items(items[current_index + 1 : next_part], f"每日一题 {number} 题目", True))
    return "\n".join(output).rstrip() + "\n"


SOCIAL_PATTERNS = (
    r"^点点赞$", r"^点分享$", r"^点喜欢$", r"^点个[❤️❤👍]", r"^点个小心心",
    r"^点[“\" ]*👍", r"^看完的同学点个", r"^先分享\s*这篇", r"^觉得有用的话$",
    r"^觉得有用的话\s*分享你周围",
)


def social_start(texts: list[str]) -> int:
    for index, text in enumerate(texts):
        if any(re.search(pattern, text) for pattern in SOCIAL_PATTERNS):
            # Drop an immediately preceding decorative image, but keep the article's closing sentence.
            return index - 1 if index and not texts[index - 1] else index
    return len(texts)


def first_matching(texts: list[str], pattern: str, start: int = 0) -> int | None:
    regex = re.compile(pattern, re.I)
    return next((index for index in range(start, len(texts)) if regex.search(texts[index])), None)


def remove_course_sales(source: Path, items: list[Node]) -> list[Node]:
    """Remove sales copy while retaining independently useful study content."""
    name = source.name
    texts = [item_text(item) for item in items]

    # These articles turn entirely into a paid-camp pitch at the named paragraph.
    campaign_starts = {
        "[2026-07-16-0757]": r"数学强化习题\s*带刷营",
        "[2026-07-18-0757]": r"数学强化习题\s*带刷营",
        "[2026-07-19-0758]": r"数学强化习题\s*带刷营",
    }
    for prefix, pattern in campaign_starts.items():
        if name.startswith(prefix):
            start = first_matching(texts, pattern)
            return items[:start] if start is not None else items

    # The clamp-theorem lesson is complete before the course introduction.
    if name.startswith("[2026-05-31-0749]"):
        start = first_matching(texts, r"类似这样的总结也会在高数强冲班中")
        if start is not None:
            while start and (items[start - 1].tag == "img" or not item_text(items[start - 1])):
                start -= 1
            return items[:start]

    # A long training-camp advertisement interrupts the article; useful advice resumes later.
    if name.startswith("[2026-08-07-0757]"):
        start = first_matching(texts, r"为了帮助同学们现阶段能稳步提升")
        end = first_matching(texts, r"最后一点忠告", (start or 0) + 1)
        if start is not None and end is not None:
            while start and (items[start - 1].tag == "img" or not item_text(items[start - 1])):
                start -= 1
            items = items[:start] + items[end:]
            texts = [item_text(item) for item in items]

    # Keep the article's conclusion, but remove the QR/resource-acquisition promotion before it.
    if name.startswith("[2026-07-12-0758]"):
        start = first_matching(texts, r"^每日一题合集$")
        end = first_matching(texts, r"^本期的解答就到这里$", (start or 0) + 1)
        if start is not None and end is not None:
            while start and (items[start - 1].tag == "img" or not item_text(items[start - 1])):
                start -= 1
            items = items[:start] + items[end:]
            texts = [item_text(item) for item in items]

    # The chapter-review articles contain a self-promotion/QR section between two useful parts.
    if "复盘" in name:
        callout = first_matching(texts, r"^公众号[：:]\s*武忠祥老师$")
        if callout is not None:
            start = callout
            for index in range(max(0, callout - 3), callout):
                if re.fullmatch(r"0?2", texts[index]) or re.search(r"知识点讲义$", texts[index]):
                    start = min(start, index)
            end = callout + 1
            while end < len(items) and items[end].tag != "img":
                end += 1
            if end < len(items):
                end += 1
            items = items[:start] + items[end:]
            texts = [item_text(item) for item in items]

    # In the course-usage article, keep the practical workflow but drop opening and closing sales copy.
    if name.startswith("[2026-05-21-0757]"):
        sales_patterns = (
            r"强冲班今天正式开课",
            r"现在进入课程就能看见",
            r"点击跳转课程",
            r"这个课程除了强化课还包含",
            r"今天正式开课.*现在进来",
        )
        items = [
            item for item in items
            if not any(re.search(pattern, item_text(item)) for pattern in sales_patterns)
        ]

    # Remove a short course recommendation without losing the conclusion after it.
    if name.startswith("[2026-06-28-0758]"):
        items = [
            item for item in items
            if not re.search(
                r"(?:另外，?线代强化还没开始|推荐大家跟着晓千老师|^[👇↓]+$)",
                item_text(item),
            )
        ]

    # Subject headings and study tactics remain; only the product recommendations/CTA go.
    if name.startswith("[2026-07-01-0757]"):
        items = [
            item for item in items
            if not re.search(
                r"^(?:推荐(?:武忠祥|姜晓千)老师的【.*(?:强冲班|全程班)】|点击图片，?查看详情)$",
                item_text(item),
            )
        ]

    return items


def convert_generic(source: Path, content: Node, title: str, published: str | None) -> str:
    items = content_items(content)
    texts = [item_text(item) for item in items]
    end = social_start(texts)
    items = items[:end]

    # Leading GIFs are article decorations; begin at the first real text or non-GIF image.
    start = 0
    while start < len(items):
        item = items[start]
        if item.tag != "img" or "wx_fmt=gif" not in image_url(item):
            break
        start += 1
    items = items[start:]
    items = remove_course_sales(source, items)

    output = [f"# {title}", ""]
    if published:
        output.extend([f"> 发布：{published}", ""])
    blocks = render_items(items, "文章图片")
    if source.name.startswith("[2026-07-02-0758]"):
        blocks = [
            re.sub(r"(?:^|  \n)27考研\s*·\s*数学\s*·\s*强化\s*·\s*冲刺班(?:  \n|$)", "  \n", block)
            for block in blocks
        ]
    append_blocks(output, blocks)
    return "\n".join(output).rstrip() + "\n"


def convert(source: Path) -> tuple[str, str]:
    parser = TreeParser()
    parser.feed(source.read_text(encoding="utf-8"))
    content = find_by_id(parser.root, "js_content")
    simplified = content is None
    if content is None:
        body = find_first(parser.root, "body")
        content = find_first(body, "p") if body is not None else None
    if content is None:
        raise ValueError("Missing WeChat article body")
    title, published, number = metadata(source, parser.root)
    if simplified:
        lead = plain_text(content).split("...", 1)[0]
        inferred_title = "".join(line.strip() for line in lead.splitlines() if line.strip())
        if inferred_title:
            title = inferred_title
    if number is not None:
        return "daily", convert_daily(source, content, title, published, number)
    return "generic", convert_generic(source, content, title, published)


def input_files(inputs: list[Path]) -> list[Path]:
    files: list[Path] = []
    for item in inputs:
        if item.is_dir():
            files.extend(sorted(item.glob("*.html")))
        elif item.suffix.lower() in {".html", ".htm"}:
            files.append(item)
        else:
            raise ValueError(f"Not an HTML file or directory: {item}")
    return files


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("inputs", nargs="+", type=Path)
    parser.add_argument("--output-dir", type=Path)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    failed = False
    try:
        files = input_files(args.inputs)
        if not files:
            raise ValueError("No HTML files found")
        for source in files:
            kind, markdown = convert(source)
            destination = (args.output_dir / source.with_suffix(".md").name) if args.output_dir else source.with_suffix(".md")
            if args.check:
                if not destination.exists() or destination.read_text(encoding="utf-8") != markdown:
                    print(f"OUTDATED {destination}", file=sys.stderr)
                    failed = True
                else:
                    print(f"OK {destination}")
            else:
                destination.parent.mkdir(parents=True, exist_ok=True)
                destination.write_text(markdown, encoding="utf-8")
                print(f"{kind.upper()} {destination}")
        return 1 if failed else 0
    except (OSError, ValueError) as error:
        print(f"error: {error}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
