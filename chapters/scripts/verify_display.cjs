/* 可选浏览器验收：需安装playwright与Chromium，CHROME可指定浏览器。 */
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');

(async () => {
  const tags = [];
  for (const group of ['calculus', 'linear-algebra']) {
    for (const file of fs.readdirSync(path.join(root, group)).filter(n => n.endsWith('.md'))) {
      const md = fs.readFileSync(path.join(root, group, file), 'utf8');
      for (const tag of md.match(/<img\b[^>]*>/g) || []) {
        const src = tag.match(/src="([^"]+)"/)[1];
        if (!src.includes('/bank/')) continue;
        tags.push(tag.replace(src, pathToFileURL(path.resolve(root, group, src)).href));
      }
    }
  }
  if (tags.length !== 385) throw Error(`题图数量错误：${tags.length}`);
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'm2-display-'));
  let browser;
  try {
    const html = path.join(temp, 'check.html');
    fs.writeFileSync(html, '<!doctype html><meta charset="utf-8"><style>body{margin:0;font-size:16px}img{max-width:100%}</style>' + tags.join(''));
    browser = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'], headless: true });
    const page = await browser.newPage();
    await page.goto(pathToFileURL(html).href);
    await page.evaluate(() => Promise.all([...document.images].map(i => i.decode())));
    const rows = [];
    for (const mode of ['styled', 'style-stripped']) {
      if (mode === 'style-stripped') await page.locator('img').evaluateAll(es => es.forEach(e => e.removeAttribute('style')));
      for (const width of [320, 768, 1000]) {
        await page.setViewportSize({ width, height: 900 });
        for (const fontSize of [16, 20]) {
          await page.evaluate(n => { document.body.style.fontSize = `${n}px`; }, fontSize);
          const result = await page.locator('img').evaluateAll(es => {
            const ratios = es.map(e => e.getBoundingClientRect().width / e.naturalWidth);
            return { count: es.length, min: Math.min(...ratios), max: Math.max(...ratios) };
          });
          if (result.count !== 385 || result.max - result.min > 1e-6) throw Error(JSON.stringify(result));
          rows.push({ mode, width, fontSize, ...result });
        }
      }
    }
    fs.writeFileSync(path.join(root, 'audit/browser-scaling-results.json'), JSON.stringify(rows, null, 2) + '\n');
    console.log('PASS: 12种浏览器场景，每种场景385张题图的缩放比例一致。');
  } finally {
    if (browser) await browser.close();
    fs.rmSync(temp, { recursive: true, force: true });
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
