# 专题 4（27 版）：无穷小量阶的比较、排序与定参数

> **原课出处**：[17堂课专题4（板书）.pdf](../pdf/17堂课专题4（板书）.pdf)（共 30 页）｜**战法总纲**：[武氏高数军规手册](../../WU_STYLE_PLAYBOOK.md)  
> **适用考纲**：考研数学二（零超纲；聚焦定阶三大工具 + 变限积分阶数 + 同阶抵消复查 + 等价定参）

---

## 一、本课定调 & 第一眼路由表

本课专打考研数学二高频选填与解答第一问——“**比阶数、排大小、定参数**”。核心武氏心法：**能估阶不硬算、见抵消看系数、求积分阶先看核再看限**。

| 第一眼触发特征 | 首选秒杀（解 1） | 兜底通解（解 2） | 放行红线（`p.X` 实证） |
| :--- | :--- | :--- | :--- |
| **单一变限积分定阶** $\int_0^{\varphi(x)}f(t)dt$（`p.4, 7`） | **积阶速算**：$f(t)\sim ct^m$ 且 $\varphi(x)\sim dx^n$，直接出 **$n(m+1)$ 阶**（含系数 $\frac{cd^{m+1}}{m+1}$） | 洛必达法则求导变限积分定阶（`p.4` 解 1） | 要求 $\varphi(x)\to 0$ 且被积核在 $0$ 附近符号稳定不震荡 |
| **双动端变限积分排序** $\int_{\alpha(x)}^{\beta(x)}f(t)dt$（`p.16`） | 拆成 $\int_0^{\beta(x)}-\int_0^{\alpha(x)}$；**若两端同阶需查系数是否相消** | 积分中值定理看区间长度 $\beta(x)-\alpha(x)$ | 两端同阶且同系数抵消时禁套单端公式（`p.16`） |
| **加减组合函数求阶**（`p.8–10`） | **奇偶初筛**排半数选项 + **泰勒主部提取** | 补减共同线性项拆差（如 $3(\sin x-x)-(\sin 3x-3x)$） | 每拆一次差必须**复查是否再次抵消**（`p.10` 四阶归零升六阶） |
| **无参数无穷小按阶排序**（`p.12–16`） | 逐项只求**最低非零幂阶数**（$x\to 0^+$ 时阶越小越大/越低阶） | 根式有理化 / 对幂指减 $1$ 化指数 / 提公共因子 | 分数幂涉及 $x\to 0$ 双侧时注意绝对值与实根定义域（`p.15`） |
| **等价无穷小反求参数 $a,b,k$**（`p.17–28`） | **泰勒展开对齐次幂**：低于目标阶总系数 $=0$，目标阶系数匹配 | 洛必达逐阶求导 / 拆差逐项等价 | 目标含 $(1+\frac{1}{n})^n-e$ 时**禁先把幂指替成 $e$**，必须提取指数偏离量（`p.27–28`） |
| **递推数列与阶乘比阶**（`p.11`） | 构造**商数列 $z_n=\frac{y_n}{x_n}$**，计算 $\lim\frac{z_{n+1}}{z_n}=a<1 \implies z_n\to 0$ | 斯特林量级直觉初判 + 数学归纳 | 必须先证 $x_n\to 0$，才可用 $1-e^{-x_n}\sim x_n$（`p.11`） |

---

## 二、核心铁律与 `→ / ↛` 概念反例

1. **高阶、同阶、等价的方向与判定铁律（`p.2`）**：
   - 方向永远是“**谁除以谁**”：$\lim\frac{\alpha}{\beta}=0 \iff \alpha=o(\beta)$（$\alpha$ 是 $\beta$ 的高阶无穷小）；$\lim\frac{\alpha}{\beta}=C\neq 0 \iff$ 同阶；$C=1 \iff$ 等价。
   - **低阶 + 高阶 $\sim$ 低阶**（`p.4` 板书金句），但**同阶相加减 `↛` 阶数不变**（如 `p.8` $1-\cos(\sin x)+\alpha\ln(1+x^2)$ 在 $\alpha=-\frac{1}{2}$ 时二阶抵消退化为四阶！）。
2. **求导定阶与函数等价的 `→ / ↛`（`p.3`）**：
   - 若 $x\to 0$ 时 $f(x)\to 0$，且 $f'(x)$ 是 $x^k\ (k\ge 0)$ 阶无穷小，则 $f(x)$ 是 $x^{k+1}$ 阶无穷小（**`→` 成立**，基于洛必达法则）。
   - 反之，$f(x)\sim g(x)$ **`↛`** $f'(x)\sim g'(x)$（反例：$f(x)=x+x^2\sin\frac{1}{x^2},\ g(x)=x$ 满足 $f\sim g$，但 $f'(x)=1+2x\sin\frac{1}{x^2}-\frac{2}{x}\cos\frac{1}{x^2}$ 极限不存在）。
3. **变限积分核含外层变量 $t$（`p.5–6`）**：
   - 若积分内层是 $\int_0^x dt\int_0^t t\ln(1+u^2)du$，对 $u$ 积分时 $t$ 是常数可直接提到内层积分外，不必硬算二重原函数；逐层定阶得 $t\cdot\frac{1}{3}t^3=\frac{1}{3}t^4 \to \frac{1}{15}x^5$。

---

## 三、高频母题 & 一题多解实战拆解

### 母题 1（`p.4`，1993 数一、三）：变限积分同阶判定双解法
> **题目**：设 $f(x)=\int_0^{\sin x}\sin(t^2)\,dt,\ g(x)=x^3+x^4$，当 $x\to 0$ 时，$f(x)$ 是 $g(x)$ 的（  ）。  
> (A) 等价无穷小　(B) 同阶但非等价无穷小　(C) 高阶无穷小　(D) 低阶无穷小

- **【解 1 · 定义 + 洛必达】**：
  $$\lim_{x\to 0}\frac{f(x)}{g(x)}=\lim_{x\to 0}\frac{\sin(\sin^2 x)\cos x}{3x^2+4x^3}=\lim_{x\to 0}\frac{x^2}{3x^2+4x^3}=\frac{1}{3}\neq 1,\ 0,$$
  故选 **(B)**。
- **【解 2 · 积分内等价估阶（5 秒口算）】**：$t\to 0$ 时 $\sin(t^2)\sim t^2$，故
  $$f(x)\sim\int_0^{\sin x}t^2\,dt=\frac{1}{3}\sin^3 x\sim\frac{1}{3}x^3,\qquad g(x)\sim x^3,$$
  比值为 $\frac{1}{3}$，选 **(B)**。

### 母题 2（`p.10`）：奇偶排除 + 复查四阶抵消
> **题目**：当 $x\to 0$ 时，$x\sin(\sin x)-\sin^2 x$ 与 $x^k$ 是同阶无穷小，则 $k=$（  ）。  
> (A) $3$　(B) $4$　(C) $5$　(D) $6$

- **【解 · 偶性排除 + 拆差复查】**：
  1. $x\sin(\sin x)-\sin^2 x$ 为**偶函数**，展开只含偶次幂，立刻排除 (A)(C)；
  2. 加减中间项 $x\sin x$ 检验四阶系数：
     $$\lim_{x\to 0}\frac{x[\sin(\sin x)-\sin x]+(x-\sin x)\sin x}{x^4}=\lim_{x\to 0}\frac{x\left(-\frac{1}{6}\sin^3 x\right)+\left(\frac{1}{6}x^3\right)\sin x}{x^4}=-\frac{1}{6}+\frac{1}{6}=0.$$
     四阶系数再次抵消！故排除 (B)，选 **(D)**（按泰勒实际主项为 $\frac{1}{18}x^6+o(x^6)$）。

### 母题 3（`p.21–24`，2013 数二、三）：$1-\cos x\cos 2x\cos 3x$ 一题四解
> **题目**：当 $x\to 0$ 时，$1-\cos x\cos 2x\cos 3x$ 与 $ax^n$ 为等价无穷小，求 $n$ 与 $a$。

- **【解 1 · 洛必达（`p.21`）】**：求导一次得 $\lim_{x\to 0}\frac{\sin x\cos 2x\cos 3x+2\sin 2x\cos x\cos 3x+3\sin 3x\cos x\cos 2x}{nax^{n-1}}=1$，分子 $\sim (1+4+9)x=14x$，故 $n-1=1\implies n=2,\ 2a=14\implies a=7$。
- **【解 2 · 泰勒展开（`p.22`）】**：$1-\left(1-\frac{x^2}{2}\right)(1-2x^2)\left(1-\frac{9x^2}{2}\right)+o(x^2)=\left(\frac{1}{2}+2+\frac{9}{2}\right)x^2+o(x^2)=7x^2+o(x^2)$。
- **【解 3 · 拆差公式 $1-ABC$（`p.23`）】**：$(1-\cos x)\cos 2x\cos 3x+(1-\cos 2x)\cos 3x+(1-\cos 3x)\sim \frac{1}{2}x^2+\frac{4}{2}x^2+\frac{9}{2}x^2=7x^2$。
- **【解 4 · 取对数化乘法为加法（`p.24` 最巧秒杀）】**：因 $u=\cos x\cos 2x\cos 3x\to 1^-$，用 $1-u\sim -\ln u$：
  $$1-\cos x\cos 2x\cos 3x\sim -\ln(\cos x\cos 2x\cos 3x)=-\ln\cos x-\ln\cos 2x-\ln\cos 3x\sim(1-\cos x)+(1-\cos 2x)+(1-\cos 3x)\sim 7x^2.$$

### 母题 4（`p.25–26`，2015 数一、二、三）：泰勒定参 & 原卷差异说明
> **板书题面**：设 $f(x)=x+a\ln(1+x)+bx\sin x$ 与 $g(x)=kx^3$ 在 $x\to 0$ 时是等价无穷小，求 $a,b,k$。

- **【解 1 · 泰勒展开系数对齐】**：
  $$f(x)=x+a\left(x-\frac{x^2}{2}+\frac{x^3}{3}+o(x^3)\right)+bx(x+o(x^2))=(1+a)x+\left(b-\frac{a}{2}\right)x^2+\frac{a}{3}x^3+o(x^3).$$
  由低阶系数归零且三阶系数匹配 $k$，得 $1+a=0,\ b-\frac{a}{2}=0,\ k=\frac{a}{3}\implies a=-1,\ b=-\frac{1}{2},\ k=-\frac{1}{3}$。
- **【注记】**：仓库真题库 [01-limits.md#q2015-15](../../../chapters/calculus/01-limits.md#q2015-15) 按原卷题面为 $\ln(1+x)+ax+bx\sin x$（系数 $a$ 在 $x$ 前而非 $\ln(1+x)$ 前），解得 $a=-1,\ b=\frac{1}{2},\ k=\frac{1}{3}$，做题时看清系数位置即可。

### 母题 5（`p.27–28`，2020 数三）：幂指极限偏离量提取
> **题目**：已知 $\left(1+\frac{1}{n}\right)^n - e$ 与 $\frac{b}{n^a}$ 在 $n\to\infty$ 时是等价无穷小，求 $a,b$。

- **【解 · 改底提取指数偏离量】**：
  $$\frac{\left(1+\frac{1}{n}\right)^n-e}{\frac{b}{n^a}}=\frac{e}{b}\cdot\frac{e^{n\ln\left(1+\frac{1}{n}\right)-1}-1}{\frac{1}{n^a}}\sim\frac{e}{b}\cdot\frac{n\left[\ln\left(1+\frac{1}{n}\right)-\frac{1}{n}\right]}{\frac{1}{n^a}}\sim\frac{e}{b}\cdot\frac{n\left(-\frac{1}{2n^2}\right)}{\frac{1}{n^a}}=-\frac{e}{2b}\cdot\frac{\frac{1}{n}}{\frac{1}{n^a}}\to 1,$$
  故 $a=1,\ b=-\frac{e}{2}$。
- **【经典 0 分错法】**：把 $\left(1+\frac{1}{n}\right)^n$ 先替成 $e$ 写成 $e-e=0$ ❌（题目求的是趋近 $e$ 的**偏离速度**，非极限常数本身）。

---

## 四、直通 `chapters/` 真题入口

- **无穷小阶比较、排序与定参真题**：[01-limits.md](../../../chapters/calculus/01-limits.md)（重点联动 [#q2020-1](../../../chapters/calculus/01-limits.md#q2020-1)、[#q2019-1](../../../chapters/calculus/01-limits.md#q2019-1)、[#q2016-1](../../../chapters/calculus/01-limits.md#q2016-1)、[#q2015-15](../../../chapters/calculus/01-limits.md#q2015-15)）
- **泰勒展开高阶抵消训练**：[08-taylor.md](../../../chapters/calculus/08-taylor.md)（重点联动 [#q2021-5](../../../chapters/calculus/08-taylor.md#q2021-5)、[#q2016-12](../../../chapters/calculus/08-taylor.md#q2016-12)）
