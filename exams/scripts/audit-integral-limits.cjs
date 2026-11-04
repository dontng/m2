/* 依赖 Playwright；CHROMIUM_PATH 可指定浏览器。只检查，不生成 PDF 或题图。 */
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { createHash } = require('node:crypto');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const sha = p => createHash('sha256').update(fs.readFileSync(path.join(root, p))).digest('hex');
(async () => {
  const browser = await chromium.launch({
    ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
    args: ['--no-sandbox']
  });
  const results = [];
  try {
    const page = await browser.newPage({ viewport: { width: 900, height: 1200 } });
    for (let year = 2010; year <= 2026; year++) {
      for (const media of ['screen', 'print']) {
        await page.emulateMedia({ media });
        await page.goto(pathToFileURL(path.join(root, `years/${year}.html`)).href);
        await page.waitForFunction(() => document.body.dataset.ready === 'true');
        await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => i.decode())); });
        const checks = await page.evaluate(() => {
          const failures = [];
          const integrals = [...document.querySelectorAll('.katex .mop')].filter(op =>
            op.querySelector(':scope > .op-symbol')?.textContent === '∫' && op.querySelector(':scope > .msupsub'));
          // 原生下限会顺着积分号下端向左回收；不能再要求两限横坐标相等。
          // 核对 KaTeX 逐公式生成的间距未被项目 CSS 覆盖。
          function checkMargin(element, property, question) {
            const inline = element.style[property] || '0px';
            const style = getComputedStyle(element);
            const expected = parseFloat(inline) * (inline.endsWith('em') ? parseFloat(style.fontSize) : 1);
            const actual = parseFloat(style[property]);
            if (Math.abs(expected - actual) > 0.05) failures.push({ question, property, expected, actual });
          }
          for (const op of integrals) {
            const question = op.closest('.question').id;
            checkMargin(op.querySelector(':scope > .op-symbol'), 'marginRight', question);
            for (const row of op.querySelectorAll(':scope > .msupsub > .vlist-t > .vlist-r > .vlist > span')) {
              if (row.querySelector('.sizing')) checkMargin(row, 'marginLeft', question);
            }
          }
          return { questions: document.querySelectorAll('.question').length,
            formulas: document.querySelectorAll('.katex').length,
            integralLimits: integrals.length, failures,
            formulaErrors: document.querySelectorAll('.katex-error').length,
            unrendered: [...document.querySelectorAll('.math-source')].filter(e => !e.querySelector('.katex')).length,
            optionOverflow: [...document.querySelectorAll('.option')].filter(e => e.scrollWidth > e.clientWidth + 2).length };
        });
        if (checks.failures.length || checks.formulaErrors || checks.unrendered || checks.optionOverflow || checks.questions !== (year <= 2020 ? 23 : 22)) throw Error(JSON.stringify({ year, media, ...checks }));
        results.push({ year, media, ...checks });

      }
      console.log(`${year}: screen + print PASS`);
    }
    fs.writeFileSync(path.join(root, 'audit/integral-limits-results.json'), JSON.stringify({ browser: browser.version(), sourceCssSha256: sha('assets/exam.css'), sourceJsSha256: sha('assets/exam.js'), results }, null, 2) + '\n');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
