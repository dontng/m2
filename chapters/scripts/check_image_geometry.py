"""Check the shared raster/display scale and all generated question references."""
import hashlib
import json
import re

from PIL import Image

from image_geometry import (ROOT, MANIFEST, CANVAS_WIDTH_PX, CAPTURE_SCALE,
                            SOURCE_FONT_PX, DISPLAY_WIDTH_EM, DISPLAY_WIDTH_PX,
                            image_tag)

data = json.loads(MANIFEST.read_text())
assert data['sourceFontPx'] == SOURCE_FONT_PX
assert data['captureScale'] == CAPTURE_SCALE
assert data['canvasWidthPx'] == CANVAS_WIDTH_PX
assert data['displayWidthPx'] == DISPLAY_WIDTH_PX
assert data['displayWidthEm'] == DISPLAY_WIDTH_EM
files = sorted((ROOT / 'bank').glob('*/q*.png'))
assert len(files) == len(data['images']) == 385
for path in files:
    entry = data['images'][str(path.relative_to(ROOT))]
    with Image.open(path) as image:
        assert image.size == (CANVAS_WIDTH_PX, entry['height']), path
    assert hashlib.sha256(path.read_bytes()).hexdigest() == entry['sha256'], path

chapters = sorted((ROOT / 'calculus').glob('*.md')) + sorted((ROOT / 'linear-algebra').glob('*.md'))
assert len(chapters) == 25
seen = set()
for path in chapters:
    text = path.read_text()
    matches = list(re.finditer(r'<img src="(../bank/(\d{4})/q(\d{2})\.png)" alt="([^"]*)"[^>]*>', text))
    assert matches, path
    for match in matches:
        src, year, number, alt = match.groups()
        key = f'{year}-{number}'
        assert alt == key and key not in seen, (path, key)
        seen.add(key)
        assert (path.parent / src).resolve().is_file(), (path, src)
        assert image_tag(src, alt) in text, (path, key)
assert len(seen) == 385
print('PASS: 385 hashed images, one raster/display scale, 25 chapters, 385 unique image references')
