/* 依赖：npm install playwright；浏览器路径可通过 CHROMIUM_PATH 指定。 */
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const start = Number(process.argv[2] || 2010);
const end = Number(process.argv[3] || 2026);
if (start < 2010 || end > 2026 || start > end) throw new Error('年份范围应在 2010—2026 年之间');
(async () => {
  const sourceCommit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
  const browser = await chromium.launch({
    ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
    args: ['--no-sandbox']
  });
  const output = path.join(root, 'pdf');
  fs.mkdirSync(output, { recursive: true });
  for (let year = start; year <= end; year++) {
    const page = await browser.newPage({ viewport: { width: 665, height: 1040 } });
    const failedRequests = [];
    page.on('requestfailed', request => failedRequests.push(request.url()));
    await page.emulateMedia({ media: 'print' });
    await page.goto(pathToFileURL(path.join(root, `years/${year}.html`)).href);
    await page.waitForFunction(() => document.body.dataset.ready === 'true');
    await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => i.decode())); });
    const checks = await page.evaluate(() => {
      const pages = [...document.querySelectorAll('.exam-page')];
      const overflows = [];
      for (const element of document.querySelectorAll('.question .katex-html, .option')) {
        const r = element.getBoundingClientRect();
        const host = element.closest('.exam-page-content').getBoundingClientRect();
        if (r.right > host.right + 2 || r.left < host.left - 2) overflows.push(element.closest('.question').id);
      }
      const pageOverflow = pages.flatMap((p, index) => {
        const content = p.querySelector('.exam-page-content').getBoundingClientRect();
        const footer = p.querySelector('.exam-page-footer').getBoundingClientRect();
        return content.bottom > footer.top + 1 || p.scrollHeight > p.clientHeight + 2 ? [index + 1] : [];
      });
      return {
        questions: document.querySelectorAll('.question').length,
        questionNumbers: [...document.querySelectorAll('.question')].map(q => Number(q.dataset.number)),
        formulas: document.querySelectorAll('.katex').length,
        formulaErrors: document.querySelectorAll('.katex-error').length,
        imagesLoaded: [...document.images].every(i => i.complete && i.naturalWidth > 0),
        htmlPages: pages.length, horizontalOverflow: [...new Set(overflows)], pageOverflow
      };
    });
    if (checks.formulaErrors || !checks.imagesLoaded || failedRequests.length) throw Error(`${year}: 公式或资源加载失败`);
    if (checks.horizontalOverflow.length || checks.pageOverflow.length) throw Error(`${year}: 版面溢出 ${JSON.stringify(checks)}`);
    if (checks.questions !== (year <= 2020 ? 23 : 22) || checks.questionNumbers.some((n, i) => n !== i + 1)) throw Error(`${year}: 题目不完整`);
    const file = path.join(output, `math2_${year}.pdf`);
    await page.pdf({ path: file, preferCSSPageSize: true, printBackground: true, displayHeaderFooter: false, scale: 1 });
    fs.writeFileSync(path.join(output, `math2_${year}.json`), JSON.stringify({ year, sourceCommit, ...checks, failedRequests }, null, 2) + '\n');
    console.log(`${year}: PDF 已生成；${checks.questions}题，${checks.formulas}段公式，${checks.htmlPages}个HTML分页`);
    await page.close();
  }
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
