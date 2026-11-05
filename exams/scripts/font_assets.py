"""Build/check local CJK font coverage for complete exam pages.

Check: python exams/scripts/font_assets.py
Rebuild: python exams/scripts/font_assets.py --build --serif-source FONT.otf --sans-source FONT.otf
Requires fonttools; no system font installation is needed.
"""
import argparse
import hashlib
import json
import re
import unicodedata
from html.parser import HTMLParser
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools import subset

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'assets'
FONTS = {'serif': 'exam-song.otf', 'sans': 'exam-hei.otf'}
URLS = {
    'serif': 'https://raw.githubusercontent.com/notofonts/noto-cjk/main/Serif/OTF/SimplifiedChinese/NotoSerifCJKsc-Regular.otf',
    'sans': 'https://raw.githubusercontent.com/notofonts/noto-cjk/main/Sans/OTF/SimplifiedChinese/NotoSansCJKsc-Regular.otf',
}

class PageText(HTMLParser):
    def __init__(self):
        super().__init__(); self.skip = 0; self.parts = []; self.styles = []; self.tag = None
    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'): self.skip += 1; self.tag = tag
    def handle_endtag(self, tag):
        if tag in ('script', 'style'): self.skip -= 1; self.tag = None
    def handle_data(self, text):
        if not self.skip: self.parts.append(text)
        elif self.tag == 'style': self.styles.append(text)

def required():
    # Include annual headers/section headings, navigation and generated CSS footers.
    text = '数学二试题第页共科目代码'
    css_text = (ASSETS / 'exam.css').read_text()
    for path in sorted(ROOT.rglob('*.html')):
        if 'vendor' in path.parts: continue
        p = PageText(); p.feed(path.read_text()); text += ''.join(p.parts)
        css_text += ''.join(p.styles)
    text += ''.join(re.findall(r'(?:content|--footer-text)\s*:\s*([^;}]+)', css_text))
    codes = set(range(32, 127))
    codes.update(ord(c) for c in text if 0x3000 <= ord(c) <= 0x9FFF or 0xFF00 <= ord(c) <= 0xFFEF or unicodedata.name(c, '').startswith(('CJK UNIFIED IDEOGRAPH', 'CJK COMPATIBILITY IDEOGRAPH')))
    return codes

def digest(path): return hashlib.sha256(path.read_bytes()).hexdigest()

def check():
    codes = required(); result = {}
    for kind, name in FONTS.items():
        path = ASSETS / name
        font = TTFont(path); cmap = font.getBestCmap()
        missing = sorted(c for c in codes if c not in cmap or font.getGlyphID(cmap[c]) == 0)
        if missing:
            raise ValueError(f'{name}: missing ' + ', '.join(f'U+{c:04X} {chr(c)}' for c in missing))
        result[kind] = dict(file=name, sha256=digest(path), mappedCharacters=len(cmap), missing=[])
    css = (ASSETS / 'exam.css').read_text()
    for token in ['--font-serif: "ExamSong"', '--font-hei: "ExamHei"', 'font-family: var(--font-serif);']:
        if token not in css: raise ValueError('Local font routing missing: ' + token)
    footer = re.search(r'@bottom-center\s*\{([^}]+)', css)
    if not footer or not re.search(r'font-family\s*:\s*var\(--font-serif\)', footer[1]):
        raise ValueError('Page footer must use the local serif font route')
    return dict(requiredCharacters=len(codes), fonts=result)

def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--build', action='store_true')
    ap.add_argument('--serif-source', type=Path); ap.add_argument('--sans-source', type=Path)
    args = ap.parse_args()
    if args.build:
        sources = {'serif': args.serif_source, 'sans': args.sans_source}
        if not all(sources.values()): ap.error('both source font paths are required')
        codes = required() | set(TTFont(ASSETS / FONTS['serif']).getBestCmap())
        provenance = {}
        # Validate all sources before writing any output.
        for kind, path in sources.items():
            missing = codes - set(TTFont(path).getBestCmap())
            if missing: raise ValueError(f'{kind} source missing {sorted(missing)}')
        for kind, path in sources.items():
            font = TTFont(path, recalcTimestamp=False)
            options = subset.Options(); options.recalc_timestamp = False
            worker = subset.Subsetter(options=options); worker.populate(unicodes=codes); worker.subset(font)
            font.save(ASSETS / FONTS[kind])
            provenance[kind] = dict(sourceUrl=URLS[kind], sourceSha256=digest(path), version=font['name'].getDebugName(5))
        (ASSETS / 'font-sources.json').write_text(json.dumps(provenance, ensure_ascii=False, indent=2) + '\n')
    result = check()
    if args.build:
        (ASSETS / 'font-coverage.json').write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(result, ensure_ascii=False))

if __name__ == '__main__': main()
