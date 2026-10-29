/* LaTeX 在构建时校验，浏览器使用本地 KaTeX 渲染，无网络依赖。 */
(() => {
  renderMathInElement(document.querySelector('main'), {delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],throwOnError:false,strict:'ignore',trust:false});
  const classes = ['options-4col', 'options-2col', 'options-1col'];
  const groups = [...document.querySelectorAll('.options')];
  groups.forEach(group => group.dataset.preferredLayout = classes.find(c => group.classList.contains(c)));
  function fitOptions() {
    for (const group of groups) {
      for (let i = classes.indexOf(group.dataset.preferredLayout); i < classes.length; i++) {
        group.classList.remove(...classes);
        group.classList.add(classes[i]);
        const overflow = [...group.querySelectorAll('.option-content')].some(c => c.scrollWidth > c.clientWidth + 1);
        if (!overflow) break;
      }
    }
  }
  document.fonts.ready.then(() => { fitOptions(); document.body.dataset.ready = 'true'; });
  let frame;
  window.addEventListener('resize', () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(fitOptions); });
  window.addEventListener('beforeprint', fitOptions);
  window.addEventListener('afterprint', fitOptions);
  window.fitOptions = fitOptions;
})();
