const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const katex = require(path.join(root, 'assets/vendor/katex/katex.min.js'));
const esc = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
let formulas = 0;

function render(text) {
  const tokens = [];
  let s = text.replace(/\$\$([\s\S]*?)\$\$|\$([^$\n]+)\$/g, (_, block, inline) => {
    const latex = block ?? inline;
    katex.renderToString(latex, { displayMode: block !== undefined, throwOnError: true, strict: 'ignore', output: 'htmlAndMathml' });
    formulas++;
    tokens.push(block !== undefined ? `<div class="math-source display-source">${esc('$$'+latex+'$$')}</div>` : `<span class="math-source">${esc('$'+latex+'$')}</span>`);
    return `@@FORMULA${tokens.length-1}@@`;
  });
  s = esc(s).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/_{3,}/g, '<span class="answer-blank"></span>');
  // 块公式不能放进 p：将段落拆为合法的段落与 display-math 容器。
  return s.trim().split(/\n\s*\n/).map(paragraph => {
    return paragraph.split(/(@@FORMULA\d+@@)/).reduce((a, part) => {
      const m = part.match(/^@@FORMULA(\d+)@@$/);
      if (m && tokens[+m[1]].includes('display-source')) {
        a.push({block: tokens[+m[1]]});
      } else if (part) {
        if (a.length && a[a.length-1].text !== undefined) a[a.length-1].text += part;
        else a.push({text: part});
      }
      return a;
    }, []).map(p => p.block ? `<div class="display-math">${p.block}</div>` : p.text.trim() ? `<p>${p.text.trim().replace(/\n/g,'<br>')}</p>` : '').join('');
  }).join('').replace(/@@FORMULA(\d+)@@/g, (_,i) => tokens[+i]);
}

function getSectionHeading(s) {
  const qCount = s.questions.length;
  const totalScore = s.questions.reduce((sum, q) => sum + q.points, 0);
  const pointsPerQ = qCount > 0 ? s.questions[0].points : 0;
  
  if (s.type === '选择题' || s.heading.includes('选择题')) {
    return `一、选择题( 本题共 ${qCount} 小题,每小题 ${pointsPerQ} 分,共 ${totalScore} 分. 在每小题给出的四个选项中,只有一项符合题目要求,把所选项前的字母填在题后的括号内. )`;
  } else if (s.type === '填空题' || s.heading.includes('填空题')) {
    return `二、填空题( 本题共 ${qCount} 小题,每小题 ${pointsPerQ} 分,共 ${totalScore} 分,把答案填在题中横线上. )`;
  } else if (s.type === '解答题' || s.heading.includes('解答题')) {
    return `三、解答题( 本题共 ${qCount} 小题,共 ${totalScore} 分,解答应写出文字说明、证明过程或演算步骤. )`;
  }
  return s.heading;
}

function question(q, year) {
  const options = q.options ? `<ul class="options options-${q.layout || '4col'}" aria-label="第${q.number}题选项">${q.options.map(o => `<li class="option"><span class="option-label">(${o.label})</span><div class="option-content">${render(o.text)}</div></li>`).join('')}</ul>` : '';
  const figure = q.figure ? `<figure class="question-figure"><img src="${q.figure}" alt="第${q.number}题附图"></figure>` : '';
  
  if (q.type === '解答题') {
    return `<li class="question question-subjective" id="q${year}-${q.number}" data-number="${q.number}">
      <div class="question-score-title">(${q.number})( 本题满分 ${q.points} 分)</div>
      <div class="question-subjective-content">${render(q.stem)}${figure}${options}</div>
    </li>`;
  }
  
  return `<li class="question question-objective" id="q${year}-${q.number}" data-number="${q.number}">
    <div class="question-body">
      <span class="question-num">(${q.number})</span>
      <div class="question-content">${render(q.stem)}${figure}${options}</div>
    </div>
  </li>`;
}

function paper(exam) {
  return `<article class="exam-paper" data-year="${exam.year}" aria-labelledby="title-${exam.year}">
  <header class="exam-header">
    <h1 class="exam-title" id="title-${exam.year}">${exam.year} 年全国硕士研究生招生考试数学(二)试题</h1>
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
    <span>— 数学（二）试题 —</span>
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
  <p class="index-desc">收录 2010—2026 年共 17 套真题（385 题）。复刻官方真题原卷排版（标准版心、简洁表头、标准括号题号与选项缩进、极简页码）。</p>
  <nav aria-label="按年份选择试卷">
    <ul class="year-grid">
      ${years.map(y=>`<li><a href="years/${y}.html">${y} 年真题</a></li>`).join('')}
    </ul>
  </nav>
  <div class="index-links">
    <p><a href="all.html">📖 打开 17 年真题合订本（浏览与批量打印）</a></p>
  </div>
  <p style="font-size:13px;color:#666;text-align:center;margin-top:30px;line-height:1.6;">
    打印提示：建议使用 A4 纸张、100% 缩放，并在浏览器打印面板关闭“页眉和页脚”，即可输出如 2022 真题原样清晰规范的试卷。
  </p>
</main>`;

fs.writeFileSync(path.join(root,'index.html'),document('数学（二）历年真题', indexContent));
console.log(`构建完成：17套 / 385题 / ${formulas}个公式；题号、选项、总分及公式编译通过。`);
