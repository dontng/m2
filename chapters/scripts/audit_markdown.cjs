/* npm install --no-save markdown-it@14；仅使用普通Markdown解析，不加载数学插件。 */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const MarkdownIt = require('markdown-it');
const root = path.resolve(__dirname, '..');
const md = new MarkdownIt({ html: true });
const taxonomy = JSON.parse(fs.readFileSync(path.join(root, 'data/taxonomy.json'), 'utf8'));
const formulas = JSON.parse(fs.readFileSync(path.join(root, 'data/hint-math.json'), 'utf8')).formulas;
function check(ok, reason) { if (!ok) throw Error(reason); }
let images = 0, math = 0, links = 0, files = 0;
function walk(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, item.name);
    if (item.isDirectory()) walk(file);
    else if (item.name.endsWith('.md')) audit(file);
  }
}
function audit(file) {
  files++;
  const source = fs.readFileSync(file, 'utf8');
  const tokens = md.parse(source, {});
  for (const token of tokens) for (const child of token.children || []) {
    check(child.type !== 'text' || !child.content.includes('$'), `${file}: 残留美元符号 ${child.content}`);
  }
  const html = md.render(source);
  for (const [, target] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(?:[a-z]+:|#|\/)/i.test(target)) continue;
    const plain = target.split('#')[0];
    check(fs.existsSync(path.resolve(path.dirname(file), plain)), `${file}: 失效链接 ${target}`);
    links++;
  }
  if (!['calculus', 'linear-algebra'].includes(path.basename(path.dirname(file)))) return;
  check(!/查看对应网页版|返回章节总目录|\]\([^)]*\.html\)/.test(source), `${file}: 残留HTML或目录链接`);
  images += (html.match(/src="[^\"]*\/bank\//g) || []).length;
  math += (html.match(/src="[^\"]*\/math\//g) || []).length;
  const index = taxonomy.findIndex(c => file === path.join(root, c.group, `${c.slug}.md`));
  check(index >= 0, `未知题单 ${file}`);
  const link = c => path.relative(path.dirname(file), path.join(root, c.group, `${c.slug}.md`)).split(path.sep).join('/');
  const nav = [];
  if (index) nav.push(`[« ${taxonomy[index - 1].title}](${link(taxonomy[index - 1])})`);
  if (index + 1 < taxonomy.length) nav.push(`[${taxonomy[index + 1].title} »](${link(taxonomy[index + 1])})`);
  const expected = nav.join('　　');
  check(source.split('\n')[0] === expected && source.trimEnd().split('\n').at(-1) === expected, `${file}: 首尾导航不一致`);
}
walk(root);
check(images === 385 && math === 220, `图片引用数量异常：${images}/${math}`);
for (const item of Object.values(formulas)) {
  const svg = fs.readFileSync(path.join(root, item.path));
  check(crypto.createHash('sha256').update(svg).digest('hex') === item.sha256, `公式哈希不匹配 ${item.path}`);
  check(!/<script|<foreignObject|data-mjx-error|data-mml-node="merror"|(?:href|src)="https?:/i.test(svg.toString()), `公式含错误或外部依赖 ${item.path}`);
}
console.log(`PASS: ${files}份Markdown、25章首尾导航、${links}个本地链接；385题图、220处公式（172个SVG）；普通Markdown解析无裸露美元符号。`);
