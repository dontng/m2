"""统一题图画布；只补右侧白边，不缩放、不重排、不裁去原图内容。

固定1440px源画布以720 CSS px显示，所有题共用1/2缩放比例。
相同画布保证阅读器max-width缩放时不会只缩小宽题。
执行：python3 chapters/scripts/normalize_bank.py [--check]
"""
import argparse
import hashlib
import json
from pathlib import Path
from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / 'data/image-display.json'
CANVAS = 1440


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    previous = json.loads(MANIFEST.read_text())['images'] if MANIFEST.exists() else {}
    images = {}
    for path in sorted((ROOT / 'bank').glob('*/*.png')):
        key = f'{path.parent.name}-{path.stem[1:]}'
        with Image.open(path) as opened:
            image = opened.convert('RGB')
        old = previous.get(key)
        if old:
            if image.width != CANVAS or sha(path) != old['sha256']:
                raise ValueError(f'题图变化，需要重新审核并校准：{path}')
            images[key] = old
            continue
        if args.check:
            raise ValueError(f'题图未校准：{path}')
        if image.width > CANVAS:
            raise ValueError(f'题图超过统一画布，禁止单题缩小：{path}')
        original_size, original_sha = list(image.size), sha(path)
        canvas = Image.new('RGB', (CANVAS, image.height), 'white')
        canvas.paste(image, (0, 0))
        assert ImageChops.difference(canvas.crop((0, 0, *image.size)), image).getbbox() is None
        canvas.save(path)
        images[key] = dict(path=path.relative_to(ROOT).as_posix(),
                           original_size=original_size, original_sha256=original_sha,
                           sha256=sha(path), canvas_width=CANVAS, display_width=720)
    if len(images) != 385:
        raise ValueError(f'期望385张题图，实际{len(images)}')
    if not args.check:
        MANIFEST.write_text(json.dumps(dict(canvas_width=CANVAS, display_width=720,
                                           source_scale=2, images=images),
                                       ensure_ascii=False, indent=2) + '\n')
    print(f'{len(images)}题：统一1440px画布、720px显示；原始内容像素保留。')


if __name__ == '__main__':
    main()
