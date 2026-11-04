/* 提示公式预渲染：npm install --no-save mathjax-full@3.2.2 */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const { mathjax } = require('mathjax-full/js/mathjax.js');
const { TeX } = require('mathjax-full/js/input/tex.js');
const { SVG } = require('mathjax-full/js/output/svg.js');
const { liteAdaptor } = require('mathjax-full/js/adaptors/liteAdaptor.js');
const { RegisterHTMLHandler } = require('mathjax-full/js/handlers/html.js');
const { AllPackages } = require('mathjax-full/js/input/tex/AllPackages.js');
const root = path.resolve(__dirname, '..');
const hints = JSON.parse(fs.readFileSync(path.join(root, 'data/hints.json'), 'utf8'));
const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);
const doc = mathjax.document('', {
  InputJax: new TeX({ packages: AllPackages }),
  OutputJax: new SVG({ fontCache: 'none' })
});
const escape = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const formulas = {};
let occurrences = 0;
fs.mkdirSync(path.join(root, 'math'), { recursive: true });
for (const hint of Object.values(hints)) {
  for (const match of hint.matchAll(/\$([^$]+)\$/g)) {
    occurrences++;
    const tex = match[1];
    if (formulas[tex]) continue;
    const key = crypto.createHash('sha256').update(tex).digest('hex').slice(0, 16);
    let svg = adaptor.innerHTML(doc.convert(tex, { display: false, em: 16, ex: 8, containerWidth: 720 }));
    if (svg.includes('<text')) svg = execFileSync(process.env.PYTHON || 'python3', [path.join(__dirname, 'outline_math_text.py')], { input: svg, encoding: 'utf8' });
    if (/data-mjx-error|data-mml-node="merror"/.test(svg)) throw Error(`公式渲染失败：${tex}`);
    const widthEx = Number(svg.match(/\bwidth="([\d.]+)ex"/)[1]);
    const heightEx = Number(svg.match(/\bheight="([\d.]+)ex"/)[1]);
    const depthEx = Number(svg.match(/vertical-align:\s*(-?[\d.]+)ex/)?.[1] || 0);
    svg = svg.replace(/^(<svg\b[^>]*?)(?: style="[^"]*")?([^>]*>)/, (all) => all.replace(/ style="[^"]*"/, '').replace('<svg ', '<svg style="background:white;color:black" '));
    svg = svg.replace(/(<svg\b[^>]*>)/, `$1<title>${escape(tex)}</title>`) + '\n';
    const relative = `math/${key}.svg`;
    fs.writeFileSync(path.join(root, relative), svg);
    formulas[tex] = {
      path: relative, width: Math.ceil(widthEx * 8), height: Math.ceil(heightEx * 8),
      width_em: widthEx / 2, height_em: heightEx / 2, vertical_align_em: depthEx / 2,
      sha256: crypto.createHash('sha256').update(svg).digest('hex')
    };
  }
}
fs.writeFileSync(path.join(root, 'data/hint-math.json'), JSON.stringify({
  renderer: 'MathJax 3.2.2 SVG, fontCache=none', occurrences, formulas
}, null, 2) + '\n');
console.log(`${occurrences}处公式，${Object.keys(formulas).length}个唯一SVG；不依赖Markdown数学扩展。`);
