# 专题 12：微分方程有关的综合题（Gemini 实战版）

> **来源**：[17堂课专题12（板书）.pdf](../pdf/17堂课专题12（板书）.pdf)（27版，讲义 P121–129，PDF 共 22 页，全页视觉复核）  
> **总军规**：[武忠祥高数考研实战风格与解题军规手册](../../WU_STYLE_PLAYBOOK.md) · **考纲**：严格限定数学二（`p.21` 例14幂级数求和为数一/三内容，已隔离）

---

## 一、本课定调 & 第一眼路由表

**核心定调**：考场综合题很少直接给你写好 $y''+py'+qy=f(x)$ 让你背公式，而是把微分方程藏在**极限差分、积分等式、偏微分关系、几何法线**里。核心动作是：**3 秒内抽取出标准 ODE + 顺手读出隐含初值**，再决定是“硬解通解”还是“不解方程直接用性质”。

| 第一眼触发特征 | 首选 / 秒杀（【解1】） | 兜底通解（【解2】） | 放行红线（踩中必丢分） |
| :--- | :--- | :--- | :--- |
| **抽象差分 / 函数方程**（`p.3–4`）<br>如 $f(x+\Delta x)-f(x)=2xf(x)\Delta x+o(\Delta x)$ | 直接除以 $\Delta x$ 取极限化出 $f'(x)=2xf(x)$，可分离变量秒杀 | 代特殊点（如 $x=y=1$）先拿隐含初值 $f(1)=0$，再按导数定义硬拆 | 不可跳过“证明可导”直接对函数方程求导；分离变量先查 $g(y)=0$ 的常值解 |
| **积分方程含卷积 $f(x-t)$ 或乘积耦合**（`p.6–8,11`） | 含 $f(x-t)$ 先令 $u=x-t$ 剥离 $x$；乘积型整体命名 $F(x)$ 凑 $[F^2]'$（`p.8`） | 先乘分母（如 $x+1$）去分母后再求导降阶为线性 ODE（`p.11`） | **隐含初值必写**（令积分上下限相等）；$F^2=(x+1)^2$ 开方必用光滑性排除 $|x+1|$ |
| **二阶 ODE 初值 + 局部极限**（`p.5`） | **不求通解**！直接从方程读 $y''(0)$ 且验证 $y''$ 连续，洛必达直达 $y''(0)$ | 已知常系数时可设法解出或泰勒展开到二阶 | 若题设只写“$y''$ 存在”未保证 $y''$ 连续，洛必达不可用到 $y''$，需回导数定义 |
| **二阶常系数 ODE + 反常积分 / 有界性**（`p.14`） | 先判特征根均负（保证衰减与收敛），再**直接积分原方程**秒出 $\int_0^{+\infty}y\,dx$ | 求出特解 $C_1e^{r_1x}+C_2e^{r_2x}$ 硬算积分 | 未证明收敛及 $\lim_{x\to+\infty}y=\lim_{x\to+\infty}y'=0$ 直接代 $+\infty$ **直接 0 分** |
| **径向 PDE / 全微分 / 圆域积分方程**（`p.15–17`） | 令 $t=x^2+y^2$ 降为一维 ODE；全微分凑 $d(yf(x))$；圆域用极坐标转一阶 ODE | 按直角坐标链式硬求二阶偏导代回 | 分段光滑曲线（`p.18`）在拼接点必须同时保证**连续**与**左右导数相等** |

---

## 二、核心铁律与 `→ / ↛` 概念红线

### 1. 板书排印勘误与分离变量铁律（`p.2`）
- 原板书 `p.2` 将 $y'=f(x)g(y)$ 后的分离式排印为 $g(y)dy=f(x)dx$（笔误），正确形式应为：
  $$\frac{\mathrm{d}y}{g(y)} = f(x)\,\mathrm{d}x \quad (g(y)\neq 0)$$
  且必须**单独检验 $g(y)=0$ 是否为原方程的常值解**。
- 一阶线性方程 $y'+P(x)y=Q(x)$ 套公式前必化标准型（首项系数为 $1$），公式 $y=e^{-\int P(x)dx}\!\left[\int Q(x)e^{\int P(x)dx}dx+C\right]$ 中 **$P(x)$ 前负号绝不可漏**。

### 2. 二阶常系数 ODE 解的结构与有界性 `→ / ↛`
| 命题方向 | 逻辑结论 | 极简反例 / 实战说明 |
| :--- | :---: | :--- |
| $y_1, y_2$ 为非齐次方程特解 $\longrightarrow y_1 - y_2$ 为对应齐次方程解 | **`→` 成立** | 线性算子相减消去右端 $f(x)$。 |
| $y_1, y_2$ 为非齐次方程特解 $\longrightarrow y_1 + y_2$ 为该非齐次方程解 | **`↛` 打叉** | $L(y_1+y_2)=2f(x)\neq f(x)$（除非 $f\equiv 0$）。 |
| $y''+ay'+by=0$ 在 $(-\infty,+\infty)$ 上**所有解有界** $\iff a=0, b>0$ | **充要条件** | 特征根为共轭纯虚根 $\pm\sqrt{b}i$；反例：$a=0,b=0$（重零根）得 $y=C_1+C_2x$ 无界；$a>0,b>0$ 时负实部在 $x\to-\infty$ 无界。 |
| $y''+ay'+by=0$ 在 $[0,+\infty)$ 上**所有解趋于 $0$** $\iff a>0, b>0$ | **充要条件** | 负实根或实部为负的共轭复根（见 `p.14` 特征根 $r_1,r_2<0$）。 |
| 平方等式 $F^2(x)=(x+1)^2 \longrightarrow F(x)=x+1$ | **`↛` 打叉** | 需结合**连续性、可导性与初值**！如 `p.8` 例5中 $F(x)=1+\int_0^x e^t f(t)dt \in C^1(\mathbb{R})$ 且 $F(0)=1$：$|x+1|$ 在 $x=-1$ 不可导，$-(x+1)$ 违背 $F(0)=1$，故唯一得 $F(x)=x+1$。 |

---

## 三、高频母题 & 一题多解实战拆解

### 母题 1：积分方程的“换元剥离”与“整体命名凑平方”（`p.6–8` 例4、例5）

#### 例 4（`p.6–7`）：卷积型积分方程
> 设连续函数 $f(x)$ 满足 $\int_0^x f(t)\,\mathrm{d}t + \int_0^x t f(x-t)\,\mathrm{d}t = ax^2$。（I）求 $f(x)$；（II）若 $f(x)$ 在 $[0,1]$ 上平均值为 $1$，求 $a$。

- **第一眼识别**：被积函数含 $f(x-t)$，外层求导前**必须先换元把 $x$ 移出 $f(\cdot)$**。
- **【规范拆解】**：
  1. 令 $u = x - t$，则 $t = x - u,\ \mathrm{d}t = -\mathrm{d}u$：
     $$\int_0^x t f(x-t)\,\mathrm{d}t = \int_0^x (x-u)f(u)\,\mathrm{d}u = x\int_0^x f(u)\,\mathrm{d}u - \int_0^x u f(u)\,\mathrm{d}u.$$
  2. 回代原方程，两边对 $x$ 求导（$xf(x)$ 恰巧抵消）：
     $$f(x) + \int_0^x f(u)\,\mathrm{d}u = 2ax.$$
     **隐含初值**：令 $x=0$ 得 $f(0)=0$。再对 $x$ 求导得一阶线性 ODE：
     $$f'(x) + f(x) = 2a,\quad f(0)=0 \implies f(x) = 2a(1 - e^{-x}).$$
  3. 第（II）问由 $\frac{1}{1-0}\int_0^1 2a(1-e^{-x})\,\mathrm{d}x = 1 \implies a = \frac{e}{2}$。
- **【经典 0 分错法】**：不换元直接对 $\int_0^x t f(x-t)\,\mathrm{d}t$ 按 $t=x$ 代上限求导得 $x f(0)$，漏掉被积函数自身对 $x$ 的偏导 $\int_0^x t f'(x-t)\,\mathrm{d}t$（且题设未给 $f$ 可导）。

#### 例 5（`p.8`）：乘积积分耦合整体命名
> 设 $f(x)$ 在 $(-\infty,+\infty)$ 上连续，且 $f(x)\!\left(\int_0^x e^t f(t)\,\mathrm{d}t + 1\right) = (x+1)e^{-x}$，求 $f(x)$。

- **第一眼识别**：$e^x f(x)$ 恰好是括号内变限积分的导数！
- **【秒杀路径】**：
  1. 两边同乘 $e^x$，令 $F(x) = \int_0^x e^t f(t)\,\mathrm{d}t + 1$，则 $F'(x) = e^x f(x)$ 且 $F(0)=1$：
     $$F'(x)F(x) = x + 1 \implies \frac{1}{2}[F^2(x)]' = x + 1 \implies F^2(x) = (x+1)^2 + C.$$
  2. 由 $F(0)=1$ 得 $C=0$，即 $F^2(x)=(x+1)^2$。
  3. **放行校验**：因为 $f$ 在 $\mathbb{R}$ 上连续，故 $F\in C^1(\mathbb{R})$；若取 $|x+1|$ 则在 $x=-1$ 不可导，若取 $-(x+1)$ 则 $F(0)=-1\neq 1$，因此必有 $F(x) = x+1$。两边求导得 $e^x f(x)=1 \implies f(x)=e^{-x}$。

---

### 母题 2：微分-积分混合方程与不等式双轨证法（`p.11–13` 例7）

> 函数 $f(x)$ 在 $[0,+\infty)$ 上可导，$f(0)=1$，且满足 $f'(x)+f(x)-\frac{1}{x+1}\int_0^x f(t)\,\mathrm{d}t = 0$。（1）求 $f'(x)$；（2）证明当 $x\ge 0$ 时，$e^{-x}\le f(x)\le 1$。

- **【第（1）问技巧】**（`p.11`）：**先去分母再求导**（若先用商法则对 $\frac{1}{x+1}\int_0^x f(t)dt$ 求导会极其繁琐）：
  $$(x+1)f'(x) + (x+1)f(x) - \int_0^x f(t)\,\mathrm{d}t = 0$$
  两边对 $x$ 求导（$f(x)$ 项恰好消去）：
  $$(x+1)f''(x) + (x+2)f'(x) = 0.$$
  设 $u=f'(x)$，分离变量得 $f'(x) = \frac{Ce^{-x}}{x+1}$。令 $x=0$ 代回原方程得 $f'(0)+f(0)=0 \implies f'(0)=-1 \implies C=-1$，即 $f'(x) = -\frac{e^{-x}}{x+1}$。
- **【第（2）问双轨证明】**：
  - **【证1】单调性与辅助函数（`p.12`）**：$x\ge 0$ 时 $f'(x)<0$，故 $f(x)\le f(0)=1$；再令 $\varphi(x)=f(x)-e^{-x}$，有 $\varphi(0)=0$ 且 $\varphi'(x)=-\frac{e^{-x}}{x+1}+e^{-x}=\frac{x}{x+1}e^{-x}\ge 0$，故 $\varphi(x)\ge \varphi(0)=0$。
  - **【证2】积分还原直接放缩（`p.13`）**：由微积分基本定理 $f(x)=1+\int_0^x f'(t)\,\mathrm{d}t = 1-\int_0^x\frac{e^{-t}}{t+1}\,\mathrm{d}t$。对 $t\ge 0$ 有 $0\le\frac{e^{-t}}{t+1}\le e^{-t}$，积分得
    $$0\le \int_0^x \frac{e^{-t}}{t+1}\,\mathrm{d}t \le \int_0^x e^{-t}\,\mathrm{d}t = 1-e^{-x} \implies e^{-x}\le f(x)\le 1.$$

---

### 母题 3：二阶 ODE 反常积分的“先证后积”铁律（`p.14` 例8）

> 设 $y(x)$ 满足 $y''+2y'+ky=0$，其中 $0<k<1$。（I）证明 $\int_0^{+\infty}y(x)\,\mathrm{d}x$ 收敛；（II）若 $y(0)=1, y'(0)=1$，求 $\int_0^{+\infty}y(x)\,\mathrm{d}x$。

- **【解题流程】**：
  1. 特征方程 $r^2+2r+k=0$，因为 $0<k<1$，两特征根 $r_1 = -1+\sqrt{1-k}<0,\ r_2 = -1-\sqrt{1-k}<0$。
  2. 通解 $y(x)=C_1e^{r_1 x}+C_2e^{r_2 x}$，因为 $r_1<0, r_2<0$，故 $\int_0^{+\infty}e^{r_i x}\,\mathrm{d}x = -\frac{1}{r_i}$ 收敛，从而 $\int_0^{+\infty}y(x)\,\mathrm{d}x$ 收敛。
  3. 由第（I）问特征根均为负，立即有 $\lim_{x\to+\infty}y(x)=0,\ \lim_{x\to+\infty}y'(x)=0$。直接把方程改写为 $y=-\frac{1}{k}(y''+2y')$ 积分：
     $$\int_0^{+\infty}y(x)\,\mathrm{d}x = -\frac{1}{k}\big[y'(x)+2y(x)\big]\Big|_0^{+\infty} = \frac{1}{k}\big[y'(0)+2y(0)\big] = \frac{3}{k}.$$
- **【经典 0 分错法】**：不先求特征根验证衰减，直接对 $y''+2y'+ky=0$ 两边积分并默认 $y(+\infty)=y'(+\infty)=0$——若换成 $k<0$（一正一负根）或 $a\le 0$，边界项发散，方程积分法完全失效！

---

### 母题 4：抽象微分与分段光滑几何衔接（`p.3, 16, 18` 例1、例10、例12）

- **例 10（`p.16`）全微分凑 ODE**：已知 $du = [e^x+f''(x)]y\,\mathrm{d}x + f(x)\,\mathrm{d}y$，$f(0)=4, f'(0)=3$。由全微分条件 $\frac{\partial P}{\partial y}=\frac{\partial Q}{\partial x}$ 得 $e^x+f''(x)=f'(x)$，解非齐次线性 ODE（特征根 $0, 1$，特解设 $Axe^x$）得 $f(x)=(4-x)e^x$，进而 $\mathrm{d}u=y\,\mathrm{d}f(x)+f(x)\,\mathrm{d}y=\mathrm{d}(yf(x)) \implies u(x,y)=y(4-x)e^x+C$。
- **例 12（`p.18`）分段光滑曲线衔接**：当 $-\pi<x<0$ 时法线过原点 $\implies \frac{y}{x} = -\frac{1}{y'} \implies \frac{\mathrm{d}y}{\mathrm{d}x}=-\frac{x}{y}$，过 $(-\frac{\pi}{\sqrt{2}},\frac{\pi}{\sqrt{2}})$ 得上半圆 $y=\sqrt{\pi^2-x^2}$；当 $0\le x<\pi$ 满足 $y''+y+x=0$，由“光滑曲线”在 $x=0$ 处必同时满足 $y(0)=y(0^-)=\pi$ 与 $y'(0)=y'_-(0)=0$，从而定出 $y= \pi\cos x + \sin x - x$。

---

## 四、直通 `chapters/` 真题入口

- 一阶微分方程与积分方程转 ODE：[14-first-order-ode.md](../../../chapters/calculus/14-first-order-ode.md)（重点练 [第 01 题 · 2025年全微分](../../../chapters/calculus/14-first-order-ode.md#q01)、[第 02 题 · 2024年换元分离](../../../chapters/calculus/14-first-order-ode.md#q02)、[第 08 题 · 积分方程转 ODE](../../../chapters/calculus/14-first-order-ode.md#q08)）
- 二阶常系数 ODE 与综合题：[15-higher-order-ode.md](../../../chapters/calculus/15-higher-order-ode.md)（重点练 [第 01 题 · 2026年](../../../chapters/calculus/15-higher-order-ode.md#q01)、[第 03 题 · 2025年](../../../chapters/calculus/15-higher-order-ode.md#q03)、[第 04 题 · 2024年](../../../chapters/calculus/15-higher-order-ode.md#q04)）
- 反常积分敛散与综合：[12-improper-integrals.md](../../../chapters/calculus/12-improper-integrals.md)
