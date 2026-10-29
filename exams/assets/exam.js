/* KaTeX 数学公式渲染与选择题选项宽度自适应降列 */
(() => {
  // 1. 渲染 LaTeX 公式
  renderMathInElement(document.querySelector('main'), {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false }
    ],
    throwOnError: false,
    strict: 'ignore',
    trust: false
  });

  // 2. 选择题选项宽度智能防溢出：确保每项单行展示，绝不出现内部异常折行
  function fitOptions() {
    const groups = document.querySelectorAll('.options');
    for (const group of groups) {
      // 检查当前优先布局
      const preferred = group.dataset.layout || '4col';
      if (preferred === '1col') {
        group.className = 'options options-1col';
        continue;
      }

      // 首先尝试优先列数（4col 或 2col）
      group.className = `options options-${preferred}`;
      let overflow = [...group.querySelectorAll('.option')].some(o => o.scrollWidth > o.clientWidth + 2);
      
      if (overflow && preferred === '4col') {
        group.className = 'options options-2col';
        overflow = [...group.querySelectorAll('.option')].some(o => o.scrollWidth > o.clientWidth + 2);
      }

      if (overflow) {
        group.className = 'options options-1col';
      }
    }
  }

  document.fonts.ready.then(() => {
    fitOptions();
    document.body.dataset.ready = 'true';
  });

  let frame;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(fitOptions);
  });
  window.addEventListener('beforeprint', fitOptions);
  window.addEventListener('afterprint', fitOptions);
})();
