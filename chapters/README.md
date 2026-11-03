# 数学（二）章节题单

2010—2026年，385道完整真题，25章。线性代数在前，高等数学在后；各章按年份从新到旧（2026→2010），同年按原题号升序。

## 打开方法

下载仓库后打开 `chapters/index.html`。各章为 HTML，使用现有本地 KaTeX、字体和附图，可离线阅读、按章打印。GitHub 上可先查看下方各章题数与目录。

## 分类规则

一道题只确定一个主章节，依据主要设问和解题核心机制归类。综合题保留全部小问，不拆成多题；其余考点在“交叉考点索引”中链接到完整原题，不重复计数。分类不是按年份题号硬编码学科，也不是按出现“行列式”“积分”等词自动归类。

先参考项目44的“同类原题组合成题单”方式，本项目直接复用已成型年度 HTML 里的完整题目节点，不再裁图或重新转写。没有加入解题提示或答案。

## 章节目录

### 线性代数

- [行列式](linear-algebra/01-determinants.html)：10题。
- [矩阵运算、逆矩阵与初等变换](linear-algebra/02-matrices.html)：10题。
- [向量组、线性相关与秩](linear-algebra/03-vectors-rank.html)：16题。
- [线性方程组](linear-algebra/04-linear-systems.html)：11题。
- [特征值、特征向量与相似](linear-algebra/05-eigenvalues-similarity.html)：22题。
- [二次型](linear-algebra/06-quadratic-forms.html)：16题。

### 高等数学

- [函数极限与无穷小](calculus/01-limits.html)：27题。
- [数列极限与求和极限](calculus/02-sequences.html)：15题。
- [连续与间断点](calculus/03-continuity.html)：6题。
- [导数、微分与求导法则](calculus/04-derivatives.html)：23题。
- [中值定理、零点与不等式证明](calculus/05-mean-value-proofs.html)：11题。
- [单调性、极值与零点个数](calculus/06-monotonicity-extrema.html)：13题。
- [凹凸性与拐点](calculus/07-convexity.html)：8题。
- [泰勒公式与高阶导数](calculus/08-taylor.html)：7题。
- [切线、法线、渐近线与曲率](calculus/09-curve-geometry.html)：20题。
- [不定积分与原函数](calculus/10-antiderivatives.html)：4题。
- [定积分、变上限积分与积分性质](calculus/11-definite-integrals.html)：21题。
- [反常积分](calculus/12-improper-integrals.html)：15题。
- [定积分应用](calculus/13-integral-applications.html)：27题。
- [一阶微分方程](calculus/14-first-order-ode.html)：16题。
- [高阶微分方程](calculus/15-higher-order-ode.html)：17题。
- [多元函数极限、偏导与全微分](calculus/16-multivariable-basics.html)：7题。
- [多元复合函数与隐函数求导](calculus/17-chain-implicit.html)：21题。
- [多元函数极值与最值](calculus/18-multivariable-extrema.html)：13题。
- [二重积分](calculus/19-double-integrals.html)：29题。

## 原题面核对标记

分类时另标记了2013年第20题、2022年第8题的原年度转写稿疑点，未据猜测修改公式。详见 `data/source-review.json`，相应章节页有提示；这是题面核对事项，不是章节归属问题。

## 后续修改

`data/classification.json` 管每道题的主章节和关联章节，`data/taxonomy.json` 管章节名称与范围。反馈时注明“年份＋题号＋建议章节”；修改归属后运行：

```sh
python3 -m pip install -r chapters/scripts/requirements.txt
python3 chapters/scripts/build.py
```

构建会检查385题无漏收、无重复主归属、年份倒序，以及复制前后题目正文、公式和附图是否一致。题目内容仍以年度 HTML 为源，章节文件不是第二份手工维护的题库。

此次没有修改年度试卷、PDF、原题数据或已有排版样式。章节归属为可调整的首轮人工分类；结构检查不能代替分类判断，也不代表已对全部真题完成官方逐字校勘。
