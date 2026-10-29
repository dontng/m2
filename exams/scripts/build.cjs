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

function question(q, year) {
  const options = q.options ? `<ul class="options options-${q.layout || '4col'}" aria-label="第${q.number}题选项">${q.options.map(o => `<li class="option"><span class="option-label">（${o.label}）</span><div class="option-content">${render(o.text)}</div></li>`).join('')}</ul>` : '';
  const figure = q.figure ? `<figure class="question-figure"><img src="${q.figure}" alt="第${q.number}题附图"></figure>` : '';
  const scoreSpan = q.type === '解答题' ? `<span class="question-score">（本题满分 ${q.points} 分）</span>` : '';
  let stemHtml = render(q.stem);
  if (scoreSpan) {
    if (stemHtml.startsWith('<p>')) {
      stemHtml = '<p>' + scoreSpan + stemHtml.slice(3);
    } else {
      stemHtml = scoreSpan + stemHtml;
    }
  }
  return `<li class="question" value="${q.number}" id="q${year}-${q.number}" data-number="${q.number}"><div class="question-body"><span class="question-number" aria-hidden="true">${q.number}.</span><div class="question-content">${stemHtml}${figure}${options}</div></div></li>`;
}

function paper(exam) {
  return `<article class="exam-paper" data-year="${exam.year}" aria-labelledby="title-${exam.year}">
  <aside class="exam-seal" aria-hidden="true">
    <div class="seal-fields">
      <span>考生编号：<span class="seal-blank"></span></span>
      <span>姓名：<span class="seal-blank"></span></span>
      <span>报考单位：<span class="seal-blank"></span></span>
    </div>
    <div class="seal-notice">································································ 密 ···························· 封 ···························· 线 ···························· 内 ···························· 不 ···························· 要 ···························· 答 ···························· 题 ························································</div>
  </aside>
  <div class="exam-main-wrap">
    <header class="exam-header">
      <div class="exam-header-top">
        <span class="exam-secret">★ 绝密 · 启用前</span>
        <span class="exam-code">科目代码：302</span>
      </div>
      <h1 class="exam-main-title" id="title-${exam.year}">${exam.year} 年全国硕士研究生招生考试</h1>
      <h2 class="exam-sub-title">数&nbsp;&nbsp;学（二）</h2>
      <div class="exam-sub-code">（科目代码：302）</div>
      <div class="exam-notice">
        <div class="exam-notice-title">考&nbsp;生&nbsp;注&nbsp;意&nbsp;事&nbsp;项</div>
        <ol>
          <li>考生必须在答题纸上作答，在试题纸上作答无效。</li>
          <li>答题前，考生务必将自己的准考证号、姓名填写在答题纸指定位置。</li>
          <li>考试时间为 180 分钟，满分为 150 分。</li>
        </ol>
      </div>
      <div class="exam-divider-double"></div>
    </header>
    <div class="exam-columns">
      ${exam.sections.map((s,i) => `
        <section class="exam-section" aria-labelledby="section-${exam.year}-${i}">
          <div class="section-head">
            <table class="section-score-box" aria-hidden="true">
              <tr><th>得&nbsp;分</th><th>评卷人</th></tr>
              <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
            </table>
            <h3 class="section-title" id="section-${exam.year}-${i}">${s.heading}</h3>
          </div>
          <ol class="question-list" start="${s.questions[0].number}">
            ${s.questions.map(q=>question(q,exam.year)).join('')}
          </ol>
        </section>
      `).join('')}
      <div class="exam-end-mark">
        <span>———————— 【 数学（二）试题 · 考试结束 】 ————————</span>
      </div>
    </div>
  </div>
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
      <span class="toolbar-title">${year} 年考研数学（二）真题原卷</span>
    </div>
    <div class="toolbar-actions">
      <button class="toolbar-btn" id="btn-toggle-column" onclick="toggleColumns()">模式：双栏(原卷)</button>
      <button class="toolbar-btn" id="btn-toggle-seal" onclick="toggleSeal()">密封线：开</button>
      <button class="toolbar-btn primary" onclick="window.print()">🖨️ 打印试卷</button>
    </div>
  </nav>`;

  fs.writeFileSync(path.join(root,`years/${year}.html`),document(`${year}年数学（二）试题｜考场仿真原卷`,`${toolbar}<main>${html}</main>`,'../'));
}

const allToolbar = `<nav class="screen-only toolbar">
  <div class="toolbar-brand">
    <a href="index.html">← 年份目录</a>
    <span class="toolbar-divider">|</span>
    <span class="toolbar-title">2010—2026年真题合订本</span>
  </div>
  <div class="toolbar-actions">
    <button class="toolbar-btn" id="btn-toggle-column" onclick="toggleColumns()">模式：双栏(原卷)</button>
    <button class="toolbar-btn" id="btn-toggle-seal" onclick="toggleSeal()">密封线：开</button>
    <button class="toolbar-btn primary" onclick="window.print()">🖨️ 打印全部年份</button>
  </div>
</nav>`;

fs.writeFileSync(path.join(root,'all.html'),document('2010—2026年数学（二）真题合订本',`${allToolbar}<main>${papers.join('')}</main>`));

const indexContent = `<main class="index-container">
  <h1 class="index-title">全国硕士研究生招生考试 · 数学（二）历年真题</h1>
  <p class="index-desc">收录 2010—2026 年共 17 套真题（385 题），全真考场原卷排版（双栏、密封线、考场评卷框、KaTeX 数学公式离线渲染）。</p>
  <nav aria-label="按年份选择试卷">
    <ul class="year-grid">
      ${years.map(y=>`<li><a href="years/${y}.html">${y} 年试题</a></li>`).join('')}
    </ul>
  </nav>
  <div class="index-links">
    <p><a href="all.html">📖 打开 17 年合订本（全套浏览与批量打印）</a></p>
  </div>
  <p style="font-size:13px;color:#666;text-align:center;margin-top:30px;line-height:1.6;">
    提示：支持离线浏览，打印推荐 A4 纸张、100% 缩放并关闭浏览器页眉页脚。可在顶部工具栏自由切换“双栏原卷/单栏浏览”模式及密封线显示。
  </p>
</main>`;

fs.writeFileSync(path.join(root,'index.html'),document('数学（二）历年真题仿真系统', indexContent));
console.log(`构建完成：17套 / 385题 / ${formulas}个公式；题号、选项、总分及公式编译通过。`);
