"""核查385张题图、白边和Markdown显示尺寸。
"""
import hashlib
import json
import re
from urllib.parse import urlsplit, parse_qs
from pathlib import Path
from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parents[1]


def main():
    manifest = json.loads((ROOT / 'data/image-display.json').read_text())
    images = manifest['images']
    assert len(images) == 385
    refs = {}
    files = sorted([*ROOT.glob('calculus/*.md'), *ROOT.glob('linear-algebra/*.md')])
    for md in files:
        for tag in re.findall(r'<img\b[^>]*>', md.read_text()):
            if 'src="../bank/' not in tag:
                continue
            key = re.search(r'alt="(\d{4}-\d{2})"', tag)[1]
            src = re.search(r'src="([^"]+)"', tag)[1]
            parts = urlsplit(src)
            assert parse_qs(parts.query).get('v') == [images[key]['sha256'][:12]], (md, key, 'stale image version')
            assert (md.parent / parts.path).resolve() == (ROOT / images[key]['path']).resolve()
            assert 'width="720"' in tag and 'width: 45.0em;' in tag, (md, key)
            refs[key] = refs.get(key, 0) + 1
    assert len(files) == 25 and set(refs) == set(images)
    assert all(n == 1 for n in refs.values())
    for key, item in images.items():
        path = ROOT / item['path']
        assert hashlib.sha256(path.read_bytes()).hexdigest() == item['sha256'], key
        with Image.open(path) as opened:
            im = opened.convert('RGB')
        w, h = item['original_size']
        assert im.size == (1440, h), key
        if w < 1440:
            padding = im.crop((w, 0, 1440, h))
            assert ImageChops.difference(padding, Image.new('RGB', padding.size, 'white')).getbbox() is None, key
        gray = im.convert('L')
        box = gray.point(lambda v: 255 if v < 236 else 0).getbbox()
        assert box and min(box[0], box[1], im.width-box[2], im.height-box[3]) >= 10, key
    for year in range(2010, 2027):
        source = manifest['sources'][str(year)]
        files = dict(html=f'exams/years/{year}.html', css='exams/assets/exam.css', js='exams/assets/exam.js', serif='exams/assets/exam-song.otf', sans='exams/assets/exam-hei.otf')
        for kind, rel in files.items():
            assert hashlib.sha256((ROOT.parent / rel).read_bytes()).hexdigest() == source[kind], (year, kind, 'stale source')
    print('PASS: 25章、385个唯一引用；尺寸、哈希、纯白补边一致。')


if __name__ == '__main__':
    main()
