# 专题 1-3（26 版）：6 类函数不定式与 3 类数列极限全通关

> **原课出处**：[26高数17堂课专题1-3（板书）.pdf](../pdf/26高数17堂课专题1-3（板书）.pdf)（共 49 页）｜**战法总纲**：[武氏高数军规手册](../../WU_STYLE_PLAYBOOK.md)  
> **适用考纲**：考研数学二（原课 `p.33` 例 5 解 2 与 `p.44` 证 2 涉及数一/三无穷级数，讲义已标“数学二不要求”，本笔记严格只留数二合规解法）

---

## 一、本课定调 & 第一眼路由表

本课完成求极限的**题型全闭环**：按题面长相直接归入 **6 类函数不定式**（$\infty/\infty,\ \infty-\infty,\ 0\cdot\infty,\ 1^\infty,\ 0^0/\infty^0$）或 **3 类数列极限**（$n$ 项和、$n$ 项连乘、递推关系），彻底消灭“看到新式子不知从何下笔”的卡壳。

| 第一眼触发特征 | 首选秒杀（解 1） | 兜底通解（解 2） | 放行红线 |
| :--- | :--- | :--- | :--- |
| **$\infty/\infty$ 型**（`p.2–4`） | **抓大头**：分子分母同除以最高阶无穷大 | **洛必达法则**（尤适含变限积分比） | **禁对局部幂指底数先求极限再留指数**（`p.4`） |
| **$\infty-\infty$ 根式差/分式差**（`p.5–11`） | 分式差**通分**化 $0/0$；根式差**有理化**或**提无穷因子** | 提公因式化为 $[1+\alpha]^\mu-1$ 用等价或拉格朗日 | $x\to -\infty$ 提偶次根号需加绝对值变负号 |
| **$0\cdot\infty$ 型**（`p.12–16`） | 把好求导/简单项放分母化 $0/0$ 或 $\infty/\infty$ | 若含 $\arctan x-\frac{\pi}{2}$，先恒等改为 $-\arctan\frac{1}{x}$ 再化（`p.15–16`） | $\ln x$ 与 $x^k$ 乘积永远把 $x^{-k}$ 放分母，**禁把 $\ln x$ 放分母** |
| **$1^\infty$ 型**（`p.17–24`） | **$1^\infty$ 三步法**（`p.17` 结论 3） | 改写 $e^{\beta\ln u}$ 走 $0\cdot\infty$ | 复杂底数（如 $\frac{(1+x)^{1/x}}{e}$）需拉格朗日或泰勒展开指数差（`p.19–21`） |
| **$0^0$ 或 $\infty^0$ 型**（`p.25–26`） | 恒等对数化 $e^{g(x)\ln f(x)}$，转化为 $0\cdot\infty$ | 对 $\ln f(x)$ 先拆分乘积因子 | 必须先保证底数 $f(x)>0$ |
| **$n$ 项和数列极限**（`p.27–33`） | 齐次/主部同阶看**夹逼**；均匀步长 $\frac{k}{n}$ 看**定积分定义** | 阶乘/分式和尝试**裂项相消**（`p.32`） | 夹逼仅当两端极限相等才有效，分项跨度大时先改一般项通分 |
| **$n$ 项连乘数列极限**（`p.34–37`） | **取对数 $\ln y_n$ 化为 $n$ 项和** + 夹逼/定积分 | **消公因子**（如 $(1-\frac{1}{k^2})$ 裂项约分，`p.37`） | 连乘前先看是否能直接夹逼（`p.34`） |
| **递推数列 $x_{n+1}=f(x_n)$**（`p.38–46`） | $f'(x)>0$ 判单调走**单调有界准则** | $f'(x)<0$ 不单调时：**先解方程定 $A$，再证压缩 $|x_n-A|\le k|x_{n-1}-A|$**（`p.45`） | 不可对 $f'(x)<0$ 的摆动数列强行套单调性 |

---

## 二、核心铁律与 `→ / ↛` 概念反例

1. **递推函数导数符号决定命运（`p.38–39`）**：
   - 若 $f(x)$ 单调增（$f'(x)\ge 0$）：由 $x_1\le x_2 \implies \{x_n\}$ 单调增；由 $x_1\ge x_2 \implies \{x_n\}$ 单调减。
   - 若 $f(x)$ 单调减（$f'(x)\le 0$）：**`↛`** $\{x_n\}$ 单调（数列必左右摆动！此时要么分奇偶子列证单调有界，要么直接用压缩不等式 $|x_n-A|\le k|x_{n-1}-A|$，`p.45`）。
2. **网传压缩映射结论的严谨边界（`p.46`）**：
   - 仅知 $|f'(x)|<1$ **`↛`** $\{x_n\}$ 收敛（反例：$f(x)=x+\frac{1}{1+e^x}$ 在 $\mathbb{R}$ 上 $0<f'(x)<1$，但 $x_n\to+\infty$ 不收敛）。
   - 必须满足**严格压缩系数 $0\le |f'(x)|\le k < 1$** 且 $f$ 将闭区间 $I$ 映入自身（或全 $\mathbb{R}$ 成立），方能保证存在唯一不动点 $a=f(a)$ 且 $\lim_{n\to\infty} x_n=a$。
3. **绝对值与分母零点禁区**：
   - 幂指局部取极限红线（`p.4`）：$\lim_{x\to+\infty}\frac{e^{x^2+1/x^2}}{(1+1/x^2)^{x^4}}$ 中，$(1+\frac{1}{x^2})^{x^2}$ 不可单独先换成 $e$ 再保留外层 $x^2$ 次方。

---

## 三、高频母题 & 一题多解实战拆解

### 母题 1（`p.4`）：$\infty/\infty$ 积分比值与幂指“0 分错法”
> **题目**：求 $\lim_{x\to+\infty}\frac{\int_1^x e^{t^2+\frac{1}{t^2}}dt}{\int_1^x \left(1+\frac{1}{t^2}\right)^{t^4}dt}$。

- **【解 1 · 洛必达 + 对数化幂指】**：分子分母均趋于 $+\infty$，洛必达一次后整理指数差：
  $$\text{原式}\overset{\text{洛}}{=}\lim_{x\to+\infty}\frac{e^{x^2+\frac{1}{x^2}}}{\left(1+\frac{1}{x^2}\right)^{x^4}}=\lim_{x\to+\infty}\frac{e^{x^2+\frac{1}{x^2}}}{e^{x^4\ln\left(1+\frac{1}{x^2}\right)}}=\lim_{x\to+\infty}e^{x^2-x^4\left(\frac{1}{x^2}-\frac{1}{2x^4}+o\left(\frac{1}{x^4}\right)\right)+\frac{1}{x^2}}=e^{\frac{1}{2}}.$$
- **【经典 0 分错法】**：把分母拆成 $\left[\left(1+\frac{1}{x^2}\right)^{x^2}\right]^{x^2}$ 后，局部先把 $\left(1+\frac{1}{x^2}\right)^{x^2}$ 取极限成 $e$，得到 $\lim\frac{e^{x^2+1/x^2}}{e^{x^2}}=1$ ❌！

### 母题 2（`p.8–10`）：高次根式 $\infty-\infty$ 一题四解
> **题目**：求 $\lim_{x\to+\infty}\left(\sqrt[6]{x^6+x^5}-\sqrt[6]{x^6-x^5}\right)$。

- **【解 1 · 提无穷因子 + 等价代换】**：
  $$\text{原式}=\lim_{x\to+\infty}\sqrt[6]{x^6-x^5}\left(\sqrt[6]{1+\frac{2x^5}{x^6-x^5}}-1\right)=\lim_{x\to+\infty}x\sqrt[6]{1-\frac{1}{x}}\cdot\frac{1}{6}\frac{2x^5}{x^6-x^5}=\frac{1}{3}.$$
- **【解 2 · 分别提 $x$ 后等价代换】**：$x\left[\left(1+\frac{1}{x}\right)^{\frac{1}{6}}-1\right]-x\left[\left(1-\frac{1}{x}\right)^{\frac{1}{6}}-1\right] \sim x\cdot\frac{1}{6x}-x\cdot\left(-\frac{1}{6x}\right)=\frac{1}{3}$。
- **【解 3 · 泰勒展开】**：$\left(1+\frac{1}{x}\right)^{\frac{1}{6}}-\left(1-\frac{1}{x}\right)^{\frac{1}{6}}=\frac{1}{3x}+o\left(\frac{1}{x}\right)$，乘 $x$ 得 $\frac{1}{3}$。
- **【解 4 · 拉格朗日中值定理（`p.10`）】**：令 $t=\frac{1}{x}$，原式化为 $\lim_{t\to 0^+}\frac{(1+t)^{1/6}-(1-t)^{1/6}}{t}=\frac{1}{3}$。

### 母题 3（`p.19–21`）：复杂底数 $1^\infty$ 一题三解
> **题目**：求 $\lim_{x\to 0}\left(\frac{(1+x)^{\frac{1}{x}}}{e}\right)^{\frac{1}{x}}$。

- **【解 1 · 三步法 + 拉格朗日中值定理（`p.19`）】**：
  1. 写标准式：$\left(1+\frac{(1+x)^{1/x}-e}{e}\right)^{\frac{1}{x}}$；
  2. 算指数乘积极限（对 $e^u-e$ 用拉格朗日）：
     $$\lim_{x\to 0}\frac{e^{\frac{\ln(1+x)}{x}}-e^1}{xe}=\frac{1}{e}\lim_{x\to 0}e^\xi\frac{\frac{\ln(1+x)}{x}-1}{x}=\lim_{x\to 0}\frac{\ln(1+x)-x}{x^2}=-\frac{1}{2};$$
  3. 写结果：$e^{-\frac{1}{2}}$。
- **【解 2 · 对数法直接泰勒（`p.20` 最稳通解）】**：
  $$\text{原式}=\exp\left\{\lim_{x\to 0}\frac{\frac{1}{x}\ln(1+x)-1}{x}\right\}=\exp\left\{\lim_{x\to 0}\frac{\ln(1+x)-x}{x^2}\right\}=e^{-\frac{1}{2}}.$$

### 母题 4（`p.45`）：非单调递推数列的压缩证明
> **题目**：设 $x_1=1,\ x_{n+1}=1+\frac{1}{x_n+1}\ (n=1,2,\dots)$，求 $\lim_{n\to\infty} x_n$。

- **【解 · 不动点反解 + 压缩估计】**：
  令 $f(x)=1+\frac{1}{x+1}$，在 $x>0$ 上 $f'(x)<0$ 单调减，故 $\{x_n\}$ **不具有单调性**。
  先由 $x_1=1$ 易归纳得 $x_n\ge 1$，且方程 $A=1+\frac{1}{A+1}\ (A\ge 1)$ 解得唯一正根 $A=\sqrt{2}$。再做差放缩：
  $$|x_n-A|=\left|\left(1+\frac{1}{x_{n-1}+1}\right)-\left(1+\frac{1}{A+1}\right)\right|=\frac{|x_{n-1}-A|}{(A+1)(x_{n-1}+1)}\le\frac{|x_{n-1}-A|}{2}\le\dots\le\frac{|x_1-A|}{2^{n-1}}\to 0\ (n\to\infty).$$
  故 $\lim_{n\to\infty} x_n=\sqrt{2}$。

---

## 四、直通 `chapters/` 真题入口

- **不定式极限（含 $1^\infty, \infty-\infty$）**：[01-limits.md](../../../chapters/calculus/01-limits.md)（重点联动 [#q2026-12](../../../chapters/calculus/01-limits.md#q2026-12)、[#q2022-1](../../../chapters/calculus/01-limits.md#q2022-1)、[#q2018-1](../../../chapters/calculus/01-limits.md#q2018-1)）
- **数列极限（含递推与 $n$ 项和/积）**：[02-sequences.md](../../../chapters/calculus/02-sequences.md)（重点联动 [#q2025-13](../../../chapters/calculus/02-sequences.md#q2025-13)、[#q2023-3](../../../chapters/calculus/02-sequences.md#q2023-3)、[#q2018-21](../../../chapters/calculus/02-sequences.md#q2018-21)）
