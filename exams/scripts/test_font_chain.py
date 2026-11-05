"""Regression tests for full-page coverage and PDF missing-glyph detection."""
import tempfile
import unittest
from pathlib import Path
import fitz
import os
import subprocess
from fontTools import subset
from fontTools.ttLib import TTFont
import font_assets
from pdf_glyphs import audit

class FontChainTests(unittest.TestCase):
    def test_current_complete_pages(self):
        self.assertGreater(font_assets.check()['requiredCharacters'], 500)

    def test_missing_character_fails_before_export(self):
        with tempfile.TemporaryDirectory() as temp:
            dest = Path(temp); old = font_assets.ASSETS
            try:
                for file in ['exam-song.otf', 'exam-hei.otf', 'exam.css']:
                    (dest/file).write_bytes((old/file).read_bytes())
                font = TTFont(dest/'exam-hei.otf')
                worker = subset.Subsetter(); worker.populate(unicodes=set(font.getBestCmap()) - {ord('案')}); worker.subset(font); font.save(dest/'exam-hei.otf')
                font_assets.ASSETS = dest
                with self.assertRaisesRegex(ValueError, r'U\+6848'):
                    font_assets.check()
            finally: font_assets.ASSETS = old

    def test_new_header_and_css_footer_characters_are_collected(self):
        with tempfile.TemporaryDirectory() as temp:
            dest=Path(temp); (dest/'assets').mkdir()
            (dest/'assets/exam.css').write_text('--footer-text: "龘";')
            (dest/'test.html').write_text('<style>:root {--footer-text:"𠮷"}</style><h3>案</h3><script>藏</script>')
            root, assets = font_assets.ROOT, font_assets.ASSETS
            try:
                font_assets.ROOT, font_assets.ASSETS = dest, dest/'assets'
                codes = font_assets.required()
                self.assertTrue({ord('案'),ord('龘'),ord('𠮷')} <= codes)
                self.assertNotIn(ord('藏'), codes)
            finally: font_assets.ROOT, font_assets.ASSETS = root, assets

    def test_pdf_replacement_character_is_rejected(self):
        with tempfile.TemporaryDirectory() as temp:
            file=Path(temp)/'bad.pdf'; doc=fitz.open();page=doc.new_page()
            fontfile=os.environ.get('TEST_FONT') or subprocess.check_output(['fc-match','-f','%{file}','DejaVu Sans'],text=True)
            page.insert_font(fontname='DejaVu',fontfile=fontfile)
            page.insert_text((30,50),'\ufffd',fontname='DejaVu');doc.save(file)
            self.assertTrue(audit(file)['missingGlyphs'])

if __name__ == '__main__': unittest.main()
