/* 两份以内的 PDF 评审样稿；不覆盖正式 PDF，不生成题图。
 * NODE_PATH/CHROMIUM_PATH 按本机环境设置。
 * SOURCE_COMMIT 为已核对的 GitHub 源码提交，用于追溯。
 */
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { createHash } = require('node:crypto');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const years = process.argv.slice(2).map(Number);
if (!years.length || years.length > 2 || new Set(years).size !== years.length || years.some(y => !Number.isInteger(y) || y < 2010 || y > 2026)) throw Error('请指定 1—2 个不同年份（2010—2026），例如 2016 2025');
const digest = file => createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
(async () => {
  const out = path.join(root, 'pdf/preview');
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}), args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage({ viewport: { width: 665, height: 1040 } });
    await page.emulateMedia({ media: 'print' });
    for (const year of years) {
      const failed = [];
      const onFailed = r => failed.push(r.url());
      page.on('requestfailed', onFailed);
      await page.goto(pathToFileURL(path.join(root, `years/${year}.html`)).href);
      await page.waitForFunction(() => document.body.dataset.ready === 'true');
      await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => i.decode())); });
      const checks = await page.evaluate(() => {
        const qs = [...document.querySelectorAll('.question')];
        const host = document.querySelector('main').getBoundingClientRect();
        const overflow = [...document.querySelectorAll('.question .katex-html > .base, .option')].filter(e => { const b = e.getBoundingClientRect(); return b.right > host.right + 2 || b.left < host.left - 2; }).map(e => e.closest('.question').id);
        return { questions: qs.length, numbers: qs.map(e => Number(e.dataset.number)), formulas: document.querySelectorAll('.katex').length,
          formulaErrors: document.querySelectorAll('.katex-error').length,
          unrendered: [...document.querySelectorAll('.math-source')].filter(e => !e.querySelector('.katex')).length,
          overflow: [...new Set(overflow)], imagesLoaded: [...document.images].every(e => e.complete && e.naturalWidth > 0) };
      });
      if (failed.length || checks.formulaErrors || checks.unrendered || checks.overflow.length || !checks.imagesLoaded || checks.questions !== (year <= 2020 ? 23 : 22) || checks.numbers.some((n, i) => n !== i + 1)) throw Error(JSON.stringify({year, failed, checks}));
      const file = `math2_${year}_preview.pdf`;
      await page.pdf({ path: path.join(out, file), preferCSSPageSize: true, printBackground: true, displayHeaderFooter: false, scale: 1 });
      fs.writeFileSync(path.join(out, file.replace('.pdf', '.json')), JSON.stringify({ year, status: 'preview-awaiting-user-review', sourceCommit: process.env.SOURCE_COMMIT || null, sourceHtmlSha256: digest(`years/${year}.html`), sourceCssSha256: digest('assets/exam.css'), sourceJsSha256: digest('assets/exam.js'), browser: browser.version(), ...checks }, null, 2) + '\n');
      console.log(`${year}: ${checks.questions}题，${checks.formulas}段公式；PDF样稿已生成。`);
      page.off('requestfailed', onFailed);
    }
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
