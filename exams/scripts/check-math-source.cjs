/* 只读检查：年度 JSON、公式预处理与重复执行稳定性，不生成 HTML。 */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
let preprocess;
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/exam.js'), 'utf8'), {
  renderMathInElement: (_, options) => { preprocess = options.preProcess; },
  document: { querySelector: () => null, querySelectorAll: () => [], body: {}, fonts: { ready: { then: () => {} } } },
  window: { addEventListener: () => {} }
});
const cases = [
  ['\\int\\limits_0^1', '\\int_0^1'],
  ['\\int \\limits _0^1', '\\int _0^1'],
  ['\\lim_{x\\to0}', '\\lim\\limits_{x\\to0}'],
  ['\\lim _{x\\to0}', '\\lim\\limits_{x\\to0}'],
  ['\\sum_{n=1}^k', '\\sum\\limits_{n=1}^k'],
  ['\\iint_D', '\\iint\\limits_D'],
  ['\\iiint_V', '\\iiint\\limits_V'],
  ['\\oint_L', '\\oint\\limits_L'],
  ['\\lim\\limits_{x\\to0}', '\\lim\\limits_{x\\to0}'],
  ['\\lim\\nolimits_{x\\to0}', '\\lim\\nolimits_{x\\to0}'],
  ['\\limsup_{n}', '\\limsup_{n}'],
  ['\\sum \\limits_n', '\\sum \\limits_n']
];
for (const [input, expected] of cases) {
  assert.equal(preprocess(input), expected, input);
  assert.equal(preprocess(preprocess(input)), expected, `repeat: ${input}`);
}
const katex = require(path.join(root, 'assets/vendor/katex/katex.min.js'));
let formulas = 0;
function visit(value) {
  if (typeof value === 'string') {
    for (const match of value.matchAll(/\${1,2}([^$]+)\${1,2}/g)) {
      katex.renderToString(preprocess(match[1]), { throwOnError: true, strict: 'ignore' });
      formulas++;
    }
  } else if (Array.isArray(value)) value.forEach(visit);
  else if (value && typeof value === 'object') Object.values(value).forEach(visit);
}
for (let y = 2010; y <= 2026; y++) visit(JSON.parse(fs.readFileSync(path.join(root, `data/${y}.json`), 'utf8')));
console.log(`PASS: ${cases.length} preprocessing cases; 17 JSON files; ${formulas} source formulas compile; no files generated.`);
