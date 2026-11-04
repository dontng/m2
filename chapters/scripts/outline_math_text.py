"""将公式SVG中的汉字转为宋体轮廓，避免依赖阅读器本地字体。"""
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen

font = TTFont(Path(__file__).resolve().parents[2] / 'exams/assets/exam-song.otf')
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
units = font['head'].unitsPerEm


def replace(match):
    node = ET.fromstring(match[0])
    text = ''.join(node.itertext())
    if len(text) != 1 or ord(text) not in cmap:
        raise ValueError(f'未找到公式文字的字体轮廓：{text}')
    pen = SVGPathPen(glyphs)
    glyphs[cmap[ord(text)]].draw(pen)
    scale = float(node.attrib['font-size'].removesuffix('px')) / units
    transform = node.attrib.get('transform', '').replace('scale(1,-1)', '')
    return f'<g transform="{transform} scale({scale})"><path d="{pen.getCommands()}"></path></g>'


sys.stdout.write(re.sub(r'<text\b[^>]*>.*?</text>', replace, sys.stdin.read()))
