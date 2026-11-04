"""One image-to-text scale for every question, independent of stem length."""
import hashlib
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE_FONT_PX = 14.5  # exams/assets/exam.css, screen media
CAPTURE_SCALE = 2
CANVAS_WIDTH_PX = 1400  # Covers the 1392/1393px source question boxes.
DISPLAY_WIDTH_EM = CANVAS_WIDTH_PX / (SOURCE_FONT_PX * CAPTURE_SCALE)
DISPLAY_WIDTH_PX = round(DISPLAY_WIDTH_EM * 16)
MANIFEST = ROOT / 'data/image-geometry.json'


def fixed_canvas(image):
    """Pad only; never resample glyphs or independently fit a question to width."""
    image = image.convert('RGB')
    if image.width > CANVAS_WIDTH_PX:
        raise ValueError(f'Question exceeds shared canvas: {image.width}px; review capture layout')
    canvas = Image.new('RGB', (CANVAS_WIDTH_PX, image.height), 'white')
    canvas.paste(image, (0, 0))
    # Exact pixel equality is stronger than a visual guess about preservation.
    assert canvas.crop((0, 0, image.width, image.height)).tobytes() == image.tobytes()
    return canvas


def image_tag(src, alt):
    # Numeric width survives GitHub sanitization. CSS-aware readers can scroll.
    # All images also have the same intrinsic width, so a narrower GitHub reader
    # applies the same scale to every question even when inline CSS is stripped.
    return (f'<div style="max-width:100%; overflow-x:auto;">\n'
            f'<img src="{src}" alt="{alt}" width="{DISPLAY_WIDTH_PX}" '
            f'style="display:block; width:{DISPLAY_WIDTH_EM:.6f}em; '
            'max-width:none; height:auto; margin:12px 0;">\n</div>')


def write_manifest():
    images = {}
    for path in sorted((ROOT / 'bank').glob('*/q*.png')):
        with Image.open(path) as image:
            if image.width != CANVAS_WIDTH_PX:
                raise ValueError(f'Nonstandard canvas: {path}')
            images[str(path.relative_to(ROOT))] = {
                'height': image.height,
                'sha256': hashlib.sha256(path.read_bytes()).hexdigest(),
            }
    MANIFEST.write_text(json.dumps({
        'sourceFontPx': SOURCE_FONT_PX,
        'captureScale': CAPTURE_SCALE,
        'canvasWidthPx': CANVAS_WIDTH_PX,
        'displayWidthPx': DISPLAY_WIDTH_PX,
        'displayWidthEm': DISPLAY_WIDTH_EM,
        'images': images,
    }, ensure_ascii=False, indent=2) + '\n')


if __name__ == '__main__':
    count = 0
    for path in sorted((ROOT / 'bank').glob('*/q*.png')):
        with Image.open(path) as image:
            if image.width == CANVAS_WIDTH_PX:
                continue
            padded = fixed_canvas(image)
        padded.save(path)
        count += 1
    write_manifest()
    print(f'{count} question images padded without resampling; shared width {CANVAS_WIDTH_PX}px')
