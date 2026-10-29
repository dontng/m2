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
  return `<li class="question" value="${q.number}" id="q${year}-${q.number}" data-number="${q.number}"><div class="question-body"><span class="question-number" aria-hidden="true">${q.number}.</span><div class="question-content">${q.type==='解答题'?`<p class="question-score">（本题满分 ${q.points} 分）</p>`:''}${render(q.stem)}${figure}${options}</div></div></li>`;
}
function paper(exam) {
  return `<article class="exam-paper" data-year="${exam.year}" aria-labelledby="title-${exam.year}"><header class="exam-header"><h1 id="title-${exam.year}">${exam.year} 年全国硕士研究生招生考试</h1><h2>数学（二）试题</h2><p class="exam-meta"><span>考试时间：180 分钟</span><span>满分：150 分</span></p></header>${exam.sections.map((s,i) => `<section class="exam-section" aria-labelledby="section-${exam.year}-${i}"><h3 class="section-title" id="section-${exam.year}-${i}">${s.heading}</h3><ol class="question-list" start="${s.questions[0].number}">${s.questions.map(q=>question(q,exam.year)).join('')}</ol></section>`).join('')}</article>`;
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
  const html=paper(exam);papers.push(html.replaceAll('src="../assets/', 'src="assets/'));
  fs.writeFileSync(path.join(root,`years/${year}.html`),document(`${year}年数学（二）试题｜转写稿`,`<nav class="screen-only toolbar"><a href="../index.html">返回年份目录</a><button onclick="window.print()">打印试卷</button></nav><main>${html}</main>`,'../'));
}
fs.writeFileSync(path.join(root,'all.html'),document('2010—2026年数学（二）真题合订本',`<nav class="screen-only toolbar"><a href="index.html">年份目录</a><button onclick="window.print()">打印全部年份</button></nav><main>${papers.join('')}</main>`));
fs.writeFileSync(path.join(root,'index.html'),document('数学（二）历年真题',`<main class="exam-paper"><h1>数学（二）历年真题</h1><p>2010—2026年，17套，共385题。规范化转写稿，非官方原卷。</p><nav aria-label="按年份选择试卷"><ul class="year-list">${years.map(y=>`<li><a href="years/${y}.html">${y}年试卷</a></li>`).join('')}</ul></nav><p><a href="all.html">打开合订本</a></p><p>离线使用请下载整个 exams 文件夹。打印使用 A4、100% 缩放，关闭浏览器页眉页脚。尚未完成全部题目与官方出版物的逐字校勘。</p></main>`));
console.log(`构建完成：17套 / 385题 / ${formulas}个公式；题号、选项、总分及公式编译通过。`);
