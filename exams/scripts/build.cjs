const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const katex = require(path.join(root, 'assets/vendor/katex/katex.min.js'));
const esc = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
let formulas = 0;

// 填空题与公式连贯清洗，严禁中途断句与异常折行
function cleanStem(stem, isFillIn) {
  let s = stem.trim();

  // 1. 将 $$...$$ 转换为行内 \\displaystyle 公式，彻底消除“计算/且满足”等破碎换行
  s = s.replace(/\n*\$\$\s*([\s\S]*?)\s*\$\$\n*/g, (_, math) => {
    const trimmed = math.trim().replace(/\s*\n\s*/g, ' ');
    const withDisplay = trimmed.startsWith('\\displaystyle') ? trimmed : `\\displaystyle ${trimmed}`;
    return ` $${withDisplay}$ `;
  });


  
  // 2. 填空题下划线保证机制（使用占位标记 @@ANSWER_BLANK@@ 防止被 esc 转义）
  if (isFillIn) {
    // 提取 LaTeX 公式内部的 \underline{...} 到公式外（支持嵌套括号如 \underline{\hspace{6em}}，以及结尾标点）
    s = s.replace(/(\${1,2}[^$]*?)(?:\\\s*)?\\underline\s*\{(?:[^{}]*|\{[^{}]*\})*\}\s*([.,，。]?\s*\${1,2})/g, (_, before) => {
      return before.trim() === '$' ? '@@ANSWER_BLANK@@.' : before.trim() + '$ @@ANSWER_BLANK@@.';
    });
    s = s.replace(/\\underline\s*\{(?:[^{}]*|\{[^{}]*\})*\}/g, ' @@ANSWER_BLANK@@ ');

    if (!/_{2,}|answer-blank|@@ANSWER_BLANK@@/.test(s)) {
      s = s.replace(/\n*\$\$\s*$/, '').trim();
      if (s.endsWith('=$')) {
        s = s.slice(0, -1) + '$ @@ANSWER_BLANK@@.';
      } else if (s.endsWith('=')) {
        s = s + ' @@ANSWER_BLANK@@.';
      } else if (s.endsWith('为。') || s.endsWith('是。') || s.endsWith('。') || s.endsWith('.')) {
        s = s.slice(0, -1) + ' @@ANSWER_BLANK@@.';
      } else if (s.endsWith('为') || s.endsWith('是')) {
        s = s + ' @@ANSWER_BLANK@@.';
      } else {
        s += ' @@ANSWER_BLANK@@.';
      }
    }
  }

  // 3. 段落切分与句子断裂修复
  const rawParas = s.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  const merged = [];

  for (const p of rawParas) {
    // 识别子问序号：(I), （I）, 1., ①, （1）
    const isSubQuestion = /^(\([I|V|X|0-9a-z]+\)|（[I|V|X|0-9a-z]+）|\d+\.|[①-⑩]|\*\*（[I|V|X|0-9a-z]+）\*\*)/.test(p);
    
    if (merged.length === 0 || isSubQuestion) {
      merged.push(p);
    } else {
      const prev = merged[merged.length - 1];
      const prevClean = prev.replace(/\$+\s*$/, '').trim();
      const prevEndsSentence = /[。？！:：]$/.test(prevClean);
      
      // 如果上一段没有结束标点，或者以逗号/连接词结尾，说明是同一句话被 Markdown 硬回车截断了
      if (!prevEndsSentence || /[，、=且为是]$/.test(prevClean)) {
        merged[merged.length - 1] = `${merged[merged.length - 1]} ${p}`;
      } else if (/^(确定|求|其中|则|不能|线性表示|即|若)/.test(p) || p.length < 16) {
        merged[merged.length - 1] = `${merged[merged.length - 1]} ${p}`;
      } else {
        merged.push(p);
      }
    }
  }

  return merged;
}

function formatParagraphText(text) {
  // 选项同样允许使用行间公式；统一为带 displaystyle 的行内源码。
  text = text.replace(/\$\$\s*([\s\S]*?)\s*\$\$/g, (_, latex) => {
    const math = latex.trim().replace(/\s*\n\s*/g, ' ');
    return '$' + (math.startsWith('\\displaystyle') ? '' : '\\displaystyle ') + math + '$';
  });
  const tokens = [];
  let s = text.replace(/\$([^$]+)\$/g, (_, latex) => {
    katex.renderToString(latex, { displayMode: false, throwOnError: true, strict: 'ignore', output: 'htmlAndMathml' });
    formulas++;
    tokens.push(`<span class="math-source">${esc('$'+latex+'$')}</span>`);
    return `@@FORMULA${tokens.length-1}@@`;
  });

  s = esc(s)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/_{2,}|@@ANSWER_BLANK@@/g, '<span class="answer-blank"></span>');

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

function question(q, year, isFillIn) {
  const layout = getInitialOptionLayout(q.options || [], q.layout);
  const options = q.options ? `<ul class="options options-${layout}" data-layout="${layout}" aria-label="第${q.number}题选项">${q.options.map(o => `<li class="option"><span class="option-label">(${o.label})</span><span class="option-text">${formatParagraphText(o.text)}</span></li>`).join('')}</ul>` : '';
  const figure = q.figure ? `<figure class="question-figure"><img src="${q.figure}" alt="第${q.number}题附图"></figure>` : '';
  
  const cleanedParas = cleanStem(q.stem, isFillIn);
  const formattedParas = cleanedParas.map(p => formatParagraphText(p));
  
  // 解答题（大题）
  if (q.type === '解答题') {
    return `<li class="question question-subjective" id="q${year}-${q.number}" data-number="${q.number}">
      <div class="question-score-title">(${q.number})( 本题满分 ${q.points} 分)</div>
      <div class="question-subjective-content">
        ${formattedParas.map(p => `<p>${p}</p>`).join('')}
        ${figure}
        ${options}
      </div>
    </li>`;
  }
  
  // 客观题（选择题、填空题）
  const firstPara = formattedParas.length > 0 ? formattedParas[0] : '';
  const otherParas = formattedParas.slice(1).map(p => `<p class="question-stem sub-stem">${p}</p>`).join('');
  
  return `<li class="question question-objective" id="q${year}-${q.number}" data-number="${q.number}">
    <p class="question-stem"><span class="question-num">(${q.number})</span> ${firstPara}</p>
    ${otherParas}
    ${figure}
    ${options}
  </li>`;
}

function pageFooter(year, pageNum) {
  return `<footer class="exam-page-footer" aria-label="第${pageNum}页，共4页">
    <span>${year} 年数学(二)试题  第 ${pageNum} 页 (共 4 页)</span>
  </footer>`;
}

function paper(exam) {
  const isPre2021 = exam.year <= 2020;
  const s1 = exam.sections[0];
  const s2 = exam.sections[1];
  const s3 = exam.sections[2];

  const qMap = {};
  for (const s of exam.sections) {
    const isFillIn = s.type === '填空题' || s.heading.includes('填空题');
    for (const q of s.questions) {
      qMap[q.number] = question(q, exam.year, isFillIn);
    }
  }

  let p1Content, p2Content, p3Content, p4Content;

  if (isPre2021) {
    // 2010~2020 年结构 (8 选 + 6 填 + 9 解 = 23 题)
    // 第 1 页：卷头 + 选择题 1~5
    p1Content = `
      <header class="exam-header">
        <div class="exam-header-title" id="title-${exam.year}">${exam.year} 年全国硕士研究生招生考试</div>
        <div class="exam-header-subject">数&emsp;学&emsp;（二）</div>
        <div class="exam-header-code">（科目代码：302）</div>
      </header>
      <section class="exam-section" aria-label="选择题">
        <h3 class="section-title">${getSectionHeading(s1)}</h3>
        <ol class="question-list" start="1">
          ${[1,2,3,4,5].map(n => qMap[n]).join('')}
        </ol>
      </section>
    `;

    // 第 2 页：选择题 6~8 + 填空题 9~14 + 解答题 15
    p2Content = `
      <section class="exam-section" aria-label="选择题续">
        <ol class="question-list" start="6">
          ${[6,7,8].map(n => qMap[n]).join('')}
        </ol>
      </section>
      <section class="exam-section" aria-label="填空题">
        <h3 class="section-title">${getSectionHeading(s2)}</h3>
        <ol class="question-list" start="9">
          ${[9,10,11,12,13,14].map(n => qMap[n]).join('')}
        </ol>
      </section>
      <section class="exam-section" aria-label="解答题">
        <h3 class="section-title">${getSectionHeading(s3)}</h3>
        <ol class="question-list" start="15">
          ${[15].map(n => qMap[n]).join('')}
        </ol>
      </section>
    `;

    // 第 3 页：解答题 16~19
    p3Content = `
      <section class="exam-section" aria-label="解答题续一">
        <ol class="question-list" start="16">
          ${[16,17,18,19].map(n => qMap[n]).join('')}
        </ol>
      </section>
    `;

    // 第 4 页：解答题 20~23
    p4Content = `
      <section class="exam-section" aria-label="解答题续二">
        <ol class="question-list" start="20">
          ${[20,21,22,23].map(n => qMap[n]).join('')}
        </ol>
      </section>
    `;
  } else {
    // 2021~2026 年新大纲结构 (10 选 + 6 填 + 6 解 = 22 题)
    // 第 1 页：卷头 + 选择题 1~6
    p1Content = `
      <header class="exam-header">
        <div class="exam-header-title" id="title-${exam.year}">${exam.year} 年全国硕士研究生招生考试</div>
        <div class="exam-header-subject">数&emsp;学&emsp;（二）</div>
        <div class="exam-header-code">（科目代码：302）</div>
      </header>
      <section class="exam-section" aria-label="选择题">
        <h3 class="section-title">${getSectionHeading(s1)}</h3>
        <ol class="question-list" start="1">
          ${[1,2,3,4,5,6].map(n => qMap[n]).join('')}
        </ol>
      </section>
    `;

    // 第 2 页：选择题 7~10 + 填空题 11~16
    p2Content = `
      <section class="exam-section" aria-label="选择题续">
        <ol class="question-list" start="7">
          ${[7,8,9,10].map(n => qMap[n]).join('')}
        </ol>
      </section>
      <section class="exam-section" aria-label="填空题">
        <h3 class="section-title">${getSectionHeading(s2)}</h3>
        <ol class="question-list" start="11">
          ${[11,12,13,14,15,16].map(n => qMap[n]).join('')}
        </ol>
      </section>
    `;

    // 第 3 页：解答题 17~19
    p3Content = `
      <section class="exam-section" aria-label="解答题">
        <h3 class="section-title">${getSectionHeading(s3)}</h3>
        <ol class="question-list" start="17">
          ${[17,18,19].map(n => qMap[n]).join('')}
        </ol>
      </section>
    `;

    // 第 4 页：解答题 20~22
    p4Content = `
      <section class="exam-section" aria-label="解答题续">
        <ol class="question-list" start="20">
          ${[20,21,22].map(n => qMap[n]).join('')}
        </ol>
      </section>
    `;
  }

  return `<article class="exam-paper" data-year="${exam.year}" aria-labelledby="title-${exam.year}">
  <section class="exam-page page-1">
    <div class="exam-page-content">
      ${p1Content}
    </div>
    ${pageFooter(exam.year, 1)}
  </section>

  <section class="exam-page page-2">
    <div class="exam-page-content">
      ${p2Content}
    </div>
    ${pageFooter(exam.year, 2)}
  </section>

  <section class="exam-page page-3">
    <div class="exam-page-content">
      ${p3Content}
    </div>
    ${pageFooter(exam.year, 3)}
  </section>

  <section class="exam-page page-4">
    <div class="exam-page-content">
      ${p4Content}
    </div>
    ${pageFooter(exam.year, 4)}
  </section>
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
  <p class="index-desc">收录 2010—2026 年共 17 套真题（385 题）。1:1 严格复刻教育部考试中心官方考场原卷排版（标准表头、规范大题标点、选项严密对齐防折行、大题连贯不碎行、填空题全量下划线、原卷极简页脚）。</p>
  <nav aria-label="按年份选择试卷">
    <ul class="year-grid">
      ${years.map(y=>`<li><a href="years/${y}.html">${y} 年真题</a></li>`).join('')}
    </ul>
  </nav>
  <div class="index-links">
    <p><a href="all.html">📖 打开 17 年真题合订本（浏览与批量打印）</a></p>
  </div>
  <p style="font-size:13px;color:#666;text-align:center;margin-top:30px;line-height:1.6;">
    打印提示：建议使用 A4 纸张、100% 缩放，并在浏览器打印面板关闭“页眉和页脚”，即可输出如 2011、2020、2021 原卷高度一致的试题纸。
  </p>
</main>`;

fs.writeFileSync(path.join(root,'index.html'),document('数学（二）历年真题', indexContent));
console.log(`构建完成：17套 / 385题 / ${formulas}个公式；题号、选项、总分及公式编译通过。`);
