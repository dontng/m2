/* LaTeX 在构建时校验，浏览器使用本地 KaTeX 渲染，无网络依赖。 */
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

  // 2. 选择题选项宽度智能降列
  const classes = ['options-4col', 'options-2col', 'options-1col'];
  const groups = [...document.querySelectorAll('.options')];
  groups.forEach(group => {
    group.dataset.preferredLayout = classes.find(c => group.classList.contains(c)) || 'options-4col';
  });

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

  // 3. 单双栏与密封线切换逻辑
  function toggleColumns() {
    const isSingle = document.body.classList.toggle('single-column');
    localStorage.setItem('exam-layout-pref', isSingle ? 'single' : 'double');
    updateButtons();
    fitOptions();
  }

  function toggleSeal() {
    const isHidden = document.body.classList.toggle('hide-seal');
    localStorage.setItem('exam-seal-pref', isHidden ? 'hide' : 'show');
    updateButtons();
  }

  function updateButtons() {
    const btnCol = document.getElementById('btn-toggle-column');
    if (btnCol) {
      const isSingle = document.body.classList.contains('single-column');
      btnCol.textContent = isSingle ? '模式：单栏' : '模式：双栏(原卷)';
    }
    const btnSeal = document.getElementById('btn-toggle-seal');
    if (btnSeal) {
      const isHidden = document.body.classList.contains('hide-seal');
      btnSeal.textContent = isHidden ? '密封线：关' : '密封线：开';
    }
  }

  // 读取偏好并初始化
  if (localStorage.getItem('exam-layout-pref') === 'single') {
    document.body.classList.add('single-column');
  }
  if (localStorage.getItem('exam-seal-pref') === 'hide') {
    document.body.classList.add('hide-seal');
  }
  updateButtons();

  window.toggleColumns = toggleColumns;
  window.toggleSeal = toggleSeal;
  window.fitOptions = fitOptions;

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
