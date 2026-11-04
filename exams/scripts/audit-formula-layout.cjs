/* 只读版式审查：桌面、打印和手机宽度；不输出 PDF 或题图。 */
const fs=require('node:fs'), path=require('node:path'),{chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
(async()=>{const b=await chromium.launch({...(process.env.CHROMIUM_PATH ? {executablePath:process.env.CHROMIUM_PATH} : {}),args:['--no-sandbox']});const p=await b.newPage();const out=[];
for(const spec of [{media:'screen',width:900},{media:'print',width:665},{media:'screen',width:375}]){
await p.setViewportSize({width:spec.width,height:1200});await p.emulateMedia({media:spec.media});
for(let year=2010;year<=2026;year++){
await p.goto('file://'+root+`/years/${year}.html`);await p.waitForFunction(()=>document.body.dataset.ready==='true');await p.evaluate(()=>document.fonts.ready);
const r=await p.evaluate(()=>{
const main=document.querySelector('main'),host=main.getBoundingClientRect(),style=getComputedStyle(main),left=host.left+parseFloat(style.paddingLeft),right=host.right-parseFloat(style.paddingRight);
const qs=[...document.querySelectorAll('.question')],overflow=[],overlap=[],clips=[];
const intersects=(a,b)=>Math.min(a.right,b.right)-Math.max(a.left,b.left)>0.75&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>0.75;
for(const q of qs){
 const bases=[...q.querySelectorAll('.katex-html > .base')].map(e=>({e,r:e.getBoundingClientRect()}));
 const walker=document.createTreeWalker(q,NodeFilter.SHOW_TEXT);const texts=[];
 while(walker.nextNode()){const n=walker.currentNode;if(n.textContent.trim()&&!n.parentElement.closest('.katex, .answer-space')){const rng=document.createRange();rng.selectNodeContents(n);for(const r of rng.getClientRects())texts.push({r,text:n.textContent.trim().slice(0,45)});}}
 for(const {e,r} of bases){if(r.left<left-2||r.right>right+2)overflow.push({q:q.id,formula:e.closest('.katex').querySelector('annotation')?.textContent.slice(0,140),left:r.left,right:r.right,host:[left,right]});
 for(const t of texts)if(intersects(r,t.r))overlap.push({q:q.id,formula:e.closest('.katex').querySelector('annotation')?.textContent.slice(0,100),text:t.text});
 for(let a=e.parentElement;a&&a!==q;a=a.parentElement){const cs=getComputedStyle(a),ar=a.getBoundingClientRect();if(cs.overflowY==='hidden'&&(r.top<ar.top-1||r.bottom>ar.bottom+1))clips.push({q:q.id,type:'vertical'});}}
 for(let i=0;i<bases.length;i++)for(let j=i+1;j<bases.length;j++)if(bases[i].e.closest('.katex')!==bases[j].e.closest('.katex')&&intersects(bases[i].r,bases[j].r))overlap.push({q:q.id,type:'formula-pair'});
}
return{overflow,overlap,clips,displayFormulas:document.querySelectorAll('.katex-display').length,matrices:document.querySelectorAll('.mtable').length,pageWidth:document.documentElement.scrollWidth};
});out.push({year,...spec,...r});console.log(year,spec.width,'overflow',r.overflow.length,'overlap',r.overlap.length,'clips',r.clips.length);
}}
fs.writeFileSync(path.join(root,'audit/formula-layout-results.json'),JSON.stringify(out,null,2)+'\n');await b.close();})();
