"""Reject PDF missing-glyph output; text extraction alone is insufficient.

Type3 glyph 0 is not treated as .notdef: Chromium also uses it for valid CJK
outlines. Font-cmap preflight and browser font routing cover those outlines.
"""
import argparse
import json
from pathlib import Path
import fitz

def audit(path):
    doc = fitz.open(path); missing = []; total = 0
    for number, page in enumerate(doc, 1):
        for span in page.get_texttrace():
            # Type3 fonts may have no glyph-to-Unicode mapping; do not mislabel them.
            type3 = span['font'].startswith('Unnamed-T3')
            for char in span['chars']:
                total += 1
                if not type3 and (char[1] == 0 or char[0] in (0, 0xFFFD)):
                    missing.append(dict(page=number, font=span['font'], codepoint=char[0], glyph=char[1], bbox=list(char[3])))
    return dict(file=str(path), pages=len(doc), tracedCharacters=total, missingGlyphs=missing)

if __name__ == '__main__':
    ap = argparse.ArgumentParser(); ap.add_argument('pdf', type=Path); args = ap.parse_args()
    result = audit(args.pdf); print(json.dumps(result, ensure_ascii=False))
    raise SystemExit(1 if result['missingGlyphs'] else 0)
