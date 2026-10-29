const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const katex = require(path.join(root, 'assets/vendor/katex/katex.min.js'));
const esc = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
let formulas = 0;

// 格式化文本中的公式与排版，严禁孤立分块打断句意
function formatParagraphText(text) {
  // 将所有的 $$...$$ 块公式转换为带着 \\displaystyle 的行内公式，与上下文自然连贯，绝不产生“计算/且满足”孤立换行
  let s = text.replace(/\$\$\s*([\s\S]*?)\s*\$\$/g, (_, math) => {
    return `$${math.trim().startsWith('\\displaystyle') ? math.trim() : '\\displaystyle ' + math.trim()}$`;
  });

  const tokens = [];
  s = s.replace(/\$([^$\n]+)\$/g, (_, latex) => {
    katex.renderToString(latex, { displayMode: false, throwOnError: true, strict: 'ignore', output: 'htmlAndMathml' });
    formulas++;
    tokens.push(`<span class="math-source">${esc('$'+latex+'$')}</span>`);
    return `@@FORMULA${tokens.length-1}@@`;
  });

  s = esc(s)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/_{3,}/g, '<span class="answer-blank"></span>');

  return s.replace(/@@FORMULA(\d+)@@/g, (_, i) => tokens[+i]);
}

function getSectionHeading(s) {
  const startNum = s.questions[0].number;
  const endNum = s.questions[s.questions.length - 1].number;
  const qCount = s.questions.length;
  const totalScore = s.questions.reduce((sum, q) => sum + q.points, 0);
  const pointsPerQ = qCount > 0 ? s.questions[0].points : 0;
  
  if (s.type === '选择题' || s.heading.includes('选择题')) {
    return `一、选择题(${startNum} ～ ${endNum} 小题,每小题 ${pointsPerQ} 分,共 ${totalScore} 分. 下列每题给出的四个选项中,只有一个选项是符合题目要求的,请将所选项前的字母写在题后的括号内. )`;
  } else if (s.type === '填空题' || s.heading.includes('填空题')) {
    return `二、填空题(${startNum} ～ ${endNum} 小题,每小题 ${pointsPerQ} 分,共 ${totalScore} 分. 请将答案写在题中的横线上. )`;
  } else if (s.type === '解答题' || s.heading.includes('解答题')) {
    return `三、解答题(${startNum} ～ ${endNum} 小题,共 ${totalScore} 分. 解答应写出文字说明、证明过程或演算步骤. )`;
  }
  return s.heading;
}

// 智能估算选项初始布局（4列 / 2列 / 1列），确保单行内绝对不产生异常折行
function getInitialOptionLayout(options, preferred) {
  if (preferred === '1col') return '1col';
  
  let hasMatrix = false;
  let hasBigFormula = false;
  let maxLen = 0;
  
  for (const o of options) {
    const t = o.text;
    if (/pmatrix|bmatrix|cases/.test(t)) hasMatrix = true;
    if (/\\(int|iint|sum|lim)/.test(t)) hasBigFormula = true;
    const clean = t.replace(/\\[a-zA-Z]+/g, 'X').replace(/[{}$^_\s]/g, '');
    if (clean.length > maxLen) maxLen = clean.length;
  }
  
  if (maxLen > 28) return '1col';
  if (hasMatrix || hasBigFormula || maxLen > 9) return '2col';
  return '4col';
}

function question(q, year) {
  const layout = getInitialOptionLayout(q.options || [], q.layout);
  const options = q.options ? `<ul class="options options-${layout}" data-layout="${layout}" aria-label="第${q.number}题选项">${q.options.map(o => `<li class="option"><span class="option-label">(${o.label})</span><span class="option-text">${formatParagraphText(o.text)}</span></li>`).join('')}</ul>` : '';
  const figure = q.figure ? `<figure class="question-figure"><img src="${q.figure}" alt="第${q.number}题附图"></figure>` : '';
  
  // 段落切分
  const paragraphs = q.stem.trim().split(/\n\s*\n/).map(p => formatParagraphText(p.trim())).filter(Boolean);
  
  // 解答题（大题）
  if (q.type === '解答题') {
    return `<li class="question question-subjective" id="q${year}-${q.number}" data-number="${q.number}">
      <div class="question-score-title">(${q.number})( 本题满分 ${q.points} 分)</div>
      <div class="question-subjective-content">
        ${paragraphs.map(p => `<p>${p}</p>`).join('')}
        ${figure}
        ${options}
      </div>
    </li>`;
  }
  
  // 客观题（选择题、填空题）
  const firstPara = paragraphs.length > 0 ? paragraphs[0] : '';
  const otherParas = paragraphs.slice(1).map(p => `<p class="question-stem sub-stem">${p}</p>`).join('');
  
  return `<li class="question question-objective" id="q${year}-${q.number}" data-number="${q.number}">
    <p class="question-stem"><span class="question-num">(${q.number})</span> ${firstPara}</p>
    ${otherParas}
    ${figure}
    ${options}
  </li>`;
}

function paper(exam) {
  return `<article class="exam-paper" data-year="${exam.year}" aria-labelledby="title-${exam.year}">
  <header class="exam-header">
    <div class="exam-header-title" id="title-${exam.year}">${exam.year} 年全国硕士研究生招生考试</div>
    <div class="exam-header-subject">数&emsp;学&emsp;（二）</div>
    <div class="exam-header-code">（科目代码：302）</div>
  </header>
  ${exam.sections.map((s,i) => `
    <section class="exam-section" aria-labelledby="section-${exam.year}-${i}">
      <h3 class="section-title" id="section-${exam.year}-${i}">${getSectionHeading(s)}</h3>
      <ol class="question-list" start="${s.questions[0].number}">
        ${s.questions.map(q=>question(q,exam.year)).join('')}
      </ol>
    </section>
  `).join('')}
  <footer class="exam-paper-footer" aria-hidden="true">
    <span>${exam.year} 年数学(二)试题  第 1 页 (共 4 页)</span>
  </footer>
</article>`;
}

const years = Array.from({length:17},(_,i)=>2010+i);

function document(title, body, prefix='') {
  return `<!doctype html>\n<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><link rel="stylesheet" href="${prefix}assets/vendor/katex/katex.min.css"><link rel="stylesheet" href="${prefix}assets/exam.css"><script defer src="${prefix}assets/vendor/katex/katex.min.js"></script><script defer src="${prefix}assets/vendor/katex/auto-render.min.js"></script><script defer src="${prefix}assets/exam.js"></script></head><body>${body}</body></html>\n`;
}

fs.mkdirSync(path.join(root,'years'),{recursive:true});
const papers = [];

for (const year of years) {
  const exam=JSON.parse(fs.readFileSync(path.join(root,`data/${year}.json`),'utf8'));
  const questions=exam.sections.flatMap(s=>s.questions);
  if (questions.length !== (year<=2020?23:22)) throw Error(`${year}: 题数错误`);
  if (questions.some((q,i)=>q.number!==i+1)) throw Error(`${year}: 题号错误`);
  if (questions.reduce((n,q)=>n+q.points,0)!==150) throw Error(`${year}: 分值合计错误`);
  if (questions.some(q=>q.options && (q.options.length!==4 || q.options.map(o=>o.label).join('')!=='ABCD'))) throw Error(`${year}: 选项错误`);
  
  const html=paper(exam);
  papers.push(html.replaceAll('src="../assets/', 'src="assets/'));
  
  const toolbar = `<nav class="screen-only toolbar">
    <div class="toolbar-brand">
      <a href="../index.html">← 返回年份目录</a>
      <span class="toolbar-divider">|</span>
      <span class="toolbar-title">${year} 年全国硕士研究生招生考试数学(二)试题</span>
    </div>
    <div class="toolbar-actions">
      <button class="toolbar-btn primary" onclick="window.print()">🖨️ 打印试卷</button>
    </div>
  </nav>`;

  fs.writeFileSync(path.join(root,`years/${year}.html`),document(`${year}年数学（二）真题｜考场原卷规范版`,`${toolbar}<main>${html}</main>`,'../'));
}

const allToolbar = `<nav class="screen-only toolbar">
  <div class="toolbar-brand">
    <a href="index.html">← 年份目录</a>
    <span class="toolbar-divider">|</span>
    <span class="toolbar-title">2010—2026 年考研数学（二）真题合订本</span>
  </div>
  <div class="toolbar-actions">
    <button class="toolbar-btn primary" onclick="window.print()">🖨️ 打印全部年份</button>
  </div>
</nav>`;

fs.writeFileSync(path.join(root,'all.html'),document('2010—2026年数学（二）真题合订本',`${allToolbar}<main>${papers.join('')}</main>`));

const indexContent = `<main class="index-container">
  <h1 class="index-title">全国硕士研究生招生考试 · 数学（二）历年真题</h1>
  <p class="index-desc">收录 2010—2026 年共 17 套真题（385 题）。1:1 严格复刻教育部考试中心官方考场原卷排版（标准表头、规范大题标点、选项严密对齐防折行、大题连贯不碎行、原卷极简页脚）。</p>
  <nav aria-label="按年份选择试卷">
    <ul class="year-grid">
      ${years.map(y=>`<li><a href="years/${y}.html">${y} 年真题</a></li>`).join('')}
    </ul>
  </nav>
  <div class="index-links">
    <p><a href="all.html">📖 打开 17 年真题合订本（浏览与批量打印）</a></p>
  </div>
  <p style="font-size:13px;color:#666;text-align:center;margin-top:30px;line-height:1.6;">
    打印提示：建议使用 A4 纸张、100% 缩放，并在浏览器打印面板关闭“页眉和页脚”，即可输出如 2020、2021 原卷高度一致的试题纸。
  </p>
</main>`;

fs.writeFileSync(path.join(root,'index.html'),document('数学（二）历年真题', indexContent));
console.log(`构建完成：17套 / 385题 / ${formulas}个公式；题号、选项、总分及公式编译通过。`);
