/* KaTeX 数学公式渲染与选择题选项宽度自适应降列 */
(() => {
  // 1. 渲染 LaTeX 公式
  // 标准规范：
  // - 极限 lim 的趋近变量 (如 x -> 0) 置于 lim 的正下方
  // - 多重积分/曲线曲面积分 (iint, iiint, oint) 的区域符号 (如 D, L) 置于符号正下方
  // - 求和号 sum 的上下标置于正下方和正上方
  // - 一元定积分 int 的上下限保持在积分号右侧的偏上和偏下位置
  renderMathInElement(document.querySelector('main') || document.body, {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false }
    ],
    preProcess: (math) => {
      // 正则匹配实际 LaTeX 的一个反斜杠；替换字符串保留一个。
      let s = math.replace(/\\int\s*\\limits(?![A-Za-z])/g, '\\int');
      s = s.replace(/\\lim(?![A-Za-z]|\s*\\(?:no)?limits(?![A-Za-z]))\s*(?=[_^])/g, '\\lim\\limits');
      s = s.replace(/\\(i{2,3}nt|oint)(?![A-Za-z]|\s*\\(?:no)?limits(?![A-Za-z]))\s*(?=[_^])/g, '\\$1\\limits');
      s = s.replace(/\\sum(?![A-Za-z]|\s*\\(?:no)?limits(?![A-Za-z]))\s*(?=[_^])/g, '\\sum\\limits');
      return s;
    },
    throwOnError: false,
    strict: 'ignore',
    trust: false
  });

  // 仅标记右侧带上下限的单积分；区域积分、求和及限值内部结构不受影响。
  for (const operator of document.querySelectorAll('.katex .mop')) {
    const symbol = operator.querySelector(':scope > .op-symbol');
    if (symbol?.textContent === '∫' && operator.querySelector(':scope > .msupsub')) {
      operator.classList.add('integral-side-limits');
    }
  }

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
