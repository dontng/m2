/* npm install --no-save markdown-it@14；仅使用普通Markdown解析，不加载数学插件。 */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const MarkdownIt = require('markdown-it');
const root = path.resolve(__dirname, '..');
const md = new MarkdownIt({ html: true });
const taxonomy = JSON.parse(fs.readFileSync(path.join(root, 'data/taxonomy.json'), 'utf8'));
const formulas = JSON.parse(fs.readFileSync(path.join(root, 'data/hint-math.json'), 'utf8')).formulas;
const priorities = JSON.parse(fs.readFileSync(path.join(root, 'data/learning-priorities.json'), 'utf8')).chapters;
const classification = JSON.parse(fs.readFileSync(path.join(root, 'data/classification.json'), 'utf8'));
const priorityLabels = {core:'必会',practice:'补练',stretch:'冲一冲',exposure:'见识',later:'首轮后放',defer:'待核'};
function check(ok, reason) { if (!ok) throw Error(reason); }
let images = 0, math = 0, links = 0, files = 0, named = 0;
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
  const anchors = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
  for (const [, anchor] of html.matchAll(/href="#(q[^"]+)"/g)) check(anchors.has(anchor), `${file}: 缺失题目锚点 ${anchor}`);
  for (const [, target] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(?:[a-z]+:|#|\/)/i.test(target)) continue;
    const plain = target.split(/[?#]/)[0];
    check(fs.existsSync(path.resolve(path.dirname(file), plain)), `${file}: 失效链接 ${target}`);
    links++;
  }
  if (!['calculus', 'linear-algebra'].includes(path.basename(path.dirname(file)))) return;
  check(!/查看对应网页版|返回章节总目录|\]\([^)]*\.html\)/.test(source), `${file}: 残留HTML或目录链接`);
  images += (html.match(/src="[^\"]*\/bank\//g) || []).length;
  math += (html.match(/src="[^\"]*\/math\//g) || []).length;
  const index = taxonomy.findIndex(c => file === path.join(root, c.group, `${c.slug}.md`));
  check(index >= 0, `未知题单 ${file}`);
  const chapter = taxonomy[index];
  const plan = priorities[chapter.id];
  const owned = new Set(classification.filter(r => r.primary === chapter.id).map(r => r.id));
  const decision = new Map();
  for (const key of Object.keys(priorityLabels)) for (const pick of plan[key]) {
    check(owned.has(pick.id) && !decision.has(pick.id), `${file}: 分类重复或跨章 ${pick.id}`);
    check(pick.focus.trim().length > 0, `${file}: 未写处理依据 ${pick.id}`);
    decision.set(pick.id, key === 'stretch' ? plan.stretch_label : priorityLabels[key]);
  }
  check(decision.size === owned.size, `${file}: 有未安排题目`);
  const header = source.split('\n---\n')[0];
  const namedIds = [...header.matchAll(/\]\(#q(\d{4}-\d+)\)/g)].map(m => m[1]);
  check(namedIds.length === owned.size && new Set(namedIds).size === owned.size && namedIds.every(id => owned.has(id)), `${file}: 表头点名未覆盖全章或有重复`);
  check(header.includes(`全章 ${owned.size} 题｜本表头已点名 ${owned.size} 题｜未归类 0 题`), `${file}: 总数与点名数不符`);
  for (const key of Object.keys(priorityLabels)) {
    const label = key === 'stretch' ? plan.stretch_label : priorityLabels[key];
    const line = header.split('\n').find(line => line.startsWith(`> **${label} `));
    if (!plan[key].length) { check(!line, `${file}: 空类别却有题号`); continue; }
    check(line && line.startsWith(`> **${label} ${plan[key].length} 题`), `${file}: 分类数量错误 ${key}`);
    const ids = [...line.matchAll(/\]\(#q(\d{4}-\d+)\)/g)].map(m => m[1]);
    check(ids.length === plan[key].length && ids.every(id => decision.get(id) === label), `${file}: 分类题号错配 ${key}`);
  }
  const headings = [...source.matchAll(/^### \d+ · (\d{4})-(\d{2}) · [^\n]*?·【([^】]+)】$/gm)];
  check(headings.length === owned.size, `${file}: 正文题头缺分级标签`);
  for (const match of headings) check(decision.get(`${match[1]}-${Number(match[2])}`) === match[3], `${file}: 表头与正文分级不一致`);
  named += namedIds.length;

  const link = c => path.relative(path.dirname(file), path.join(root, c.group, `${c.slug}.md`)).split(path.sep).join('/');
  const nav = [];
  if (index) nav.push(`[« ${taxonomy[index - 1].title}](${link(taxonomy[index - 1])})`);
  if (index + 1 < taxonomy.length) nav.push(`[${taxonomy[index + 1].title} »](${link(taxonomy[index + 1])})`);
  const expected = nav.join('　　');
  check(source.split('\n')[0] === expected && source.trimEnd().split('\n').at(-1) === expected, `${file}: 首尾导航不一致`);
}
walk(root);
check(named === 385, `全局表头点名数量错误 ${named}`);
check(images === 385 && math === 220, `图片引用数量异常：${images}/${math}`);
for (const item of Object.values(formulas)) {
  const svg = fs.readFileSync(path.join(root, item.path));
  check(crypto.createHash('sha256').update(svg).digest('hex') === item.sha256, `公式哈希不匹配 ${item.path}`);
  check(!/<script|<foreignObject|data-mjx-error|data-mml-node="merror"|(?:href|src)="https?:/i.test(svg.toString()), `公式含错误或外部依赖 ${item.path}`);
}
console.log(`PASS: ${files}份Markdown、25章首尾导航、${links}个本地链接；385题图、220处公式（172个SVG）；385题已在各章表头逐一覆盖且正文标签一致；无裸露美元符号。`);
