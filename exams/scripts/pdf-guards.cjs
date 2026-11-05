/* Shared guards for every annual-PDF export path. */
const { execFileSync } = require('node:child_process');
const path = require('node:path');
const python = process.env.PYTHON || process.env.CODEX_PRIMARY_RUNTIME_PYTHON || 'python3';
function fontPreflight() {
  return JSON.parse(execFileSync(python, [path.join(__dirname, 'font_assets.py')], { encoding: 'utf8' }));
}
async function browserFonts(page) {
  const result = await page.evaluate(async () => {
    await document.fonts.ready;
    const sample = '请将答案字母括号数学试题科目第页共';
    const song = await document.fonts.load('16px ExamSong', sample);
    const hei = await document.fonts.load('bold 16px ExamHei', sample);
    const failures = [...document.fonts].filter(f => f.status === 'error').map(f => 'font-face-error:' + f.family);
    for (const e of document.querySelectorAll('.section-title, .exam-header-subject')) {
      if (!getComputedStyle(e).fontFamily.startsWith('ExamHei')) failures.push('heading-font');
    }
    const bodyFamily = getComputedStyle(document.body).fontFamily;
    if (!bodyFamily.startsWith('ExamSong')) failures.push('body-font');
    return { songLoaded: song.length > 0 && song.every(f => f.status === 'loaded'), heiLoaded: hei.length > 0 && hei.every(f => f.status === 'loaded'), failures };
  });
  if (!result.songLoaded || !result.heiLoaded || result.failures.length) throw Error(`Font routing/loading failure: ${JSON.stringify(result)}`);
  return result;
}
function pdfPostflight(file) {
  return JSON.parse(execFileSync(python, [path.join(__dirname, 'pdf_glyphs.py'), file], { encoding: 'utf8' }));
}
module.exports = { fontPreflight, browserFonts, pdfPostflight };
