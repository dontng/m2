# 专题10：不定积分与定积分的计算（Gemini 实战版）

> **来源**：[17堂课专题10（板书）.pdf](../pdf/17堂课专题10（板书）.pdf)（27 版，讲义 P104–113，全 33 页）｜ **风格基座**：[武氏实战军规手册](../../WU_STYLE_PLAYBOOK.md)  
> **核心考法**：**先对称简化后计算 + 凑微分/分部/万能代换优先级 + 绝不跨原函数间断点套牛顿-莱布尼茨**。

---

## 一、本课定调 & 第一眼路由表

积分计算是数二全卷的基本功与失分重灾区（**全 33 页包含 8 个不定积分经典母题 + 11 个定积分高频真题与多法拆解**）。看见积分先别埋头硬算：**先扫区间对称性与奇偶周期，再看凑微分能不能一刀切掉**。

| 第一眼触发特征 | 首选秒杀（解1） | 兜底通解（解2） | 放行红线（踩中即 0 分） |
| :--- | :--- | :--- | :--- |
| **$\int f'(\varphi(x))\,\mathrm{d}x$ 还原原函数**（`p.7`） | 先两边求导还原 $f'(t)$，再积分回 $f(x)+C$ | 换元 $u=\varphi(x)$ 后再分部 | **禁把 $\int f'(\sqrt{x})\,\mathrm{d}x$ 当成 $f(\sqrt{x})+C$**（缺 $\mathrm{d}\sqrt{x}$，`p.7`） |
| **乘积型“反对幂三指”**（`p.4, 9–12`） | **含 $\ln, \arcsin, \arctan$** 必放 $u$，其余凑进 $\mathrm{d}v$ 走分部积分 | 先换元去根号（如 $t=\sqrt{e^x-1}$）或 $x=\tan t$ 再分部 | 不定积分最终结果**严禁漏 $+C$**，且反代换必须还原回 $x$ |
| **有理分式 $\int \frac{P(x)}{Q(x)}\,\mathrm{d}x$**（`p.5, 13–16`） | **加项减项拆分子**或**凑微分降幂**（常比待定系数快 3 倍） | 标准**部分分式待定系数法** | 分子次数 $\ge$ 分母次数时，**必须先多项式除法化真分式** |
| **三角有理式 $\int R(\sin x,\cos x)\,\mathrm{d}x$**（`p.5, 17`） | **先检三项奇偶对称性**：$R(-\sin,\cos)=-R \implies u=\cos x$；$R(\sin,-\cos)=-R \implies u=\sin x$；$R(-\sin,-\cos)=R \implies u=\tan x$ | 最后不得已才用**万能代换 $t=\tan\frac{x}{2}$** | 凑 $u=\tan x$ 换元做**定积分**时，区间内**绝对禁止跨 $x=\frac{\pi}{2}+k\pi$**（`p.23`） |
| **对称区间 / 周期 / 高次三角定积分**（`p.19–22`） | **奇零偶倍** + **周期平移** + **Wallis 点火公式**（`p.19`） | **区间再现** $x=a+b-t$ 或分部递推 | 只有**连续奇函数**在 $[-a,a]$ 上积分为 $0$；反常对称无穷限不可直接奇零 |
| **对称区间含 $\ln(1+x)$ / $e^x$ / $\sin x$ 等无初等原函数**（`p.28–29`） | **区间再现公式 $t=a+b-x$**：利用 $f(x)+f(a+b-x)$ 消掉无原函数项 | 分拆区间对称配对 | 注意对数内部分式化简时 $\ln\frac{2}{1+\tan u}=\ln 2-\ln(1+\tan u)$ |
| **含定积分常数 $A=\int_a^b f(x)g(x)\,\mathrm{d}x$ 或泛函方程**（`p.24–26, 31–32`） | **记定积分常数 $A$** 回代解出 $f(x)$；或构造函数 $F(x)=\int_x^{x+c}f(t)\,\mathrm{d}t$ 求导 + **反函数矩形面积** | 两边同乘因子凑全微分 $\mathrm{d}\left(\int_0^x f(u)\mathrm{d}u\right)^2$（`p.31`） | 求 $f(x)$ 在 $[a,b]$ 的**平均值**切忌忘记除以 $(b-a)$（`p.31`） |

---

## 二、核心铁律与 `→ / ↛` 概念红线

### 1. 武氏板书三大必杀公式（`p.5, 19, 23`）
1. **三角代换与偶性消元（`p.5`）**：
   - $\sqrt{a^2-x^2}\to x=a\sin t$；$\sqrt{a^2+x^2}\to x=a\tan t$；$\sqrt{x^2-a^2}\to x=a\sec t$。
   - 见到 $\int R(\sin x,\cos x)\,\mathrm{d}x$ 先做“奇偶测试”，少走 80% 万能代换弯路。
2. **Wallis 点火公式（`p.19`）**：
   $$I_n=\int_0^{\frac{\pi}{2}}\sin^n x\,\mathrm{d}x = \int_0^{\frac{\pi}{2}}\cos^n x\,\mathrm{d}x = \begin{cases}\dfrac{n-1}{n}\cdot\dfrac{n-3}{n-2}\cdots\dfrac{1}{2}\cdot\dfrac{\pi}{2},&n\text{ 为正偶数},\\[6pt]\dfrac{n-1}{n}\cdot\dfrac{n-3}{n-2}\cdots\dfrac{2}{3}\cdot 1,&n\text{ 为大于 }1\text{ 的正奇数}.\end{cases}$$
   以及常用拓展（`p.19`）：$\int_0^\pi x f(\sin x)\,\mathrm{d}x = \frac{\pi}{2}\int_0^\pi f(\sin x)\,\mathrm{d}x = \pi\int_0^{\frac{\pi}{2}}f(\sin x)\,\mathrm{d}x$。
3. **跨奇点直接牛顿-莱布尼茨 $\implies$ 0 分（`p.23`）**：
   即使被积函数本身连续（如 $\frac{1}{1+\cos^2 x}$），只要你凑出的**原函数表达式**（如 $\frac{1}{\sqrt{2}}\arctan\frac{\tan x}{\sqrt{2}}$）在积分区间内有间断点，就**绝对禁止**直接代上下限！必须先用周期/对称把区间缩到无间断点的开区间内再取单侧极限。

### 2. 常见 `→ / ↛` 概念红线

| 命题方向 | 结论 | 反例 / 警示 |
| :--- | :--- | :--- |
| 已知 $\int f'(\varphi(x))\,\mathrm{d}x = G(x)+C \longrightarrow f(\varphi(x))=G(x)+C$ | **`↛` 打叉** | 必须先两边求导得 $f'(\varphi(x))=G'(x)$，换元得 $f'(t)$ 后**再次积分**（`p.7`）。 |
| $f(x)$ 以 $T$ 为周期 $\longrightarrow \int_a^{a+T}f(x)\,\mathrm{d}x = \int_0^T f(x)\,\mathrm{d}x$ | **`→` 成立** | 与起点 $a$ 无关，可任意平移区间简化计算（`p.19`）。 |
| $f$ 连续严格单调，反函数 $f^{-1}$ 满足 $\int_a^b f(x)\,\mathrm{d}x + \int_{f(a)}^{f(b)}f^{-1}(y)\,\mathrm{d}y = b f(b)-a f(a)$ | **`→` 成立** | 几何图形为大矩形减左下小矩形（`p.32` 第 11 题秒杀核心）。 |

---

## 三、高频母题 & 一题多解实战拆解

### 母题 1：经典 0 分错法——正切换元跨奇点（`p.23`）
> **【例1】（`p.23`）** 计算定积分 $\int_0^{2\pi}\frac{\mathrm{d}x}{1+\cos^2 x}$。

- **【经典 0 分错法】**：
  $$\int_0^{2\pi}\frac{\mathrm{d}x}{1+\cos^2 x} = \int_0^{2\pi}\frac{\mathrm{d}\tan x}{2+\tan^2 x} = \left.\frac{1}{\sqrt{2}}\arctan\frac{\tan x}{\sqrt{2}}\right|_0^{2\pi} = 0.$$
  **判 0 分原因**：$\tan x$ 在 $(0,2\pi)$ 内 $x=\frac{\pi}{2}, \frac{3\pi}{2}$ 处无定义，原函数在此处跳变，跨间断点直接套牛顿-莱布尼茨必错！
- **【正解】先周期对称缩区间，再取单侧极限**：
  被积函数以 $\pi$ 为周期且为偶函数，故
  $$\int_0^{2\pi}\frac{\mathrm{d}x}{1+\cos^2 x} = 4\int_0^{\frac{\pi}{2}}\frac{\mathrm{d}x}{1+\cos^2 x} = 4\int_0^{\frac{\pi}{2}}\frac{\mathrm{d}\tan x}{2+\tan^2 x} = \left.\frac{4}{\sqrt{2}}\arctan\frac{\tan x}{\sqrt{2}}\right|_0^{\frac{\pi}{2}^-} = \frac{4}{\sqrt{2}}\cdot\frac{\pi}{2} = \sqrt{2}\pi.$$

---

### 母题 2：三角代换 vs 凑微分分部（2003 年数二，`p.11–12`）
> **【例2】（2003 年数二，`p.11–12`）** 计算不定积分 $\int\frac{x e^{\arctan x}}{(1+x^2)^{3/2}}\,\mathrm{d}x$。

- **【解1】三角代换 $x=\tan t$ 脱根号（`p.11`）**：
  令 $x=\tan t\ (-\frac{\pi}{2}<t<\frac{\pi}{2})$，则 $\mathrm{d}x=\sec^2 t\,\mathrm{d}t$，$(1+x^2)^{3/2}=\sec^3 t$，
  $$\text{原式}=\int\frac{\tan t\cdot e^t}{\sec^3 t}\sec^2 t\,\mathrm{d}t = \int e^t\sin t\,\mathrm{d}t = \frac{1}{2}e^t(\sin t-\cos t)+C = \frac{(x-1)e^{\arctan x}}{2\sqrt{1+x^2}}+C.$$
- **【解2】直接凑 $\mathrm{d}e^{\arctan x}$ 分部积分（不用三角代换，`p.12`）**：
  注意到 $\mathrm{d}e^{\arctan x}=\frac{e^{\arctan x}}{1+x^2}\mathrm{d}x$，且 $\left(\frac{1}{\sqrt{1+x^2}}\right)'=-\frac{x}{(1+x^2)^{3/2}}$：
  $$\int\frac{x e^{\arctan x}}{(1+x^2)^{3/2}}\,\mathrm{d}x = \int\frac{x}{\sqrt{1+x^2}}\,\mathrm{d}e^{\arctan x} = \frac{x e^{\arctan x}}{\sqrt{1+x^2}} - \int\frac{e^{\arctan x}}{(1+x^2)^{3/2}}\,\mathrm{d}x,$$
  再对右端积分凑 $\mathrm{d}e^{\arctan x}$ 分部一次移项合并，同样解得 $\frac{(x-1)e^{\arctan x}}{2\sqrt{1+x^2}}+C$。

---

### 母题 3：泛函定积分方程——三路破局（`p.24–26`）
> **【例3】（`p.24–26`）** 已知 $f(x)=x-\int_0^\pi f(t)\cos t\,\mathrm{d}t$（原板书哑变量同写作 $x$），求 $\int_0^\pi f(x)\sin^4 x\,\mathrm{d}x$。

- **【解1】设定积分常数 $A$ 消元 + Wallis 秒杀（首选，`p.24`）**：
  令 $A=\int_0^\pi f(x)\cos x\,\mathrm{d}x$，则 $f(x)=x-A$。回代定义式：
  $$A=\int_0^\pi(x-A)\cos x\,\mathrm{d}x = \int_0^\pi x\,\mathrm{d}\sin x - A\cdot 0 = -2 \implies f(x)=x+2.$$
  再用 $\int_0^\pi x\sin^4 x\,\mathrm{d}x = \frac{\pi}{2}\int_0^\pi\sin^4 x\,\mathrm{d}x$ 与 Wallis 公式：
  $$\int_0^\pi(x+2)\sin^4 x\,\mathrm{d}x = \left(\frac{\pi}{2}+2\right)\cdot 2\int_0^{\frac{\pi}{2}}\sin^4 x\,\mathrm{d}x = \left(\frac{\pi}{2}+2\right)\cdot 2\cdot\frac{3}{4}\cdot\frac{1}{2}\cdot\frac{\pi}{2} = \left(\frac{\pi}{2}+2\right)\frac{3\pi}{8}.$$
- **【解2】分部积分直接降次（`p.25`）** / **【解3】$\sin^4 x$ 拆幂（`p.26`）**：均与上法互相印证。

---

### 母题 4：区间再现经典组合——变限/对称/反函数矩形（`p.29, 31, 32`）
> **【例4】（`p.29`）** 计算定积分 $\int_0^1\frac{\ln(1+x)}{1+x^2}\,\mathrm{d}x$。

- **【双换元连招】**：先令 $x=\tan t$ 消灭分母 $1+x^2$，得 $I=\int_0^{\frac{\pi}{4}}\ln(1+\tan t)\,\mathrm{d}t$；再用**区间再现** $t=\frac{\pi}{4}-u$：
  $$I = \int_0^{\frac{\pi}{4}}\ln\left(1+\frac{1-\tan u}{1+\tan u}\right)\mathrm{d}u = \int_0^{\frac{\pi}{4}}\ln\frac{2}{1+\tan u}\,\mathrm{d}u = \frac{\pi}{4}\ln 2 - I \implies I = \frac{\pi}{8}\ln 2.$$

> **【例5】（`p.31`）** 设 $f(x)$ 为非负连续函数，且 $f(x)\int_0^x f(x-t)\,\mathrm{d}t = \cos^4 x$，求 $f(x)$ 在 $[0,\frac{\pi}{2}]$ 上的平均值。

- **【拆解】**：令 $u=x-t$ 得 $f(x)\int_0^x f(u)\,\mathrm{d}u = \cos^4 x$。注意到左边恰为 $\frac{1}{2}\left[\left(\int_0^x f(u)\,\mathrm{d}u\right)^2\right]'$！在 $[0,\frac{\pi}{2}]$ 上积分：
  $$\frac{1}{2}\left(\int_0^{\frac{\pi}{2}} f(u)\,\mathrm{d}u\right)^2 = \int_0^{\frac{\pi}{2}}\cos^4 x\,\mathrm{d}x = \frac{3\pi}{16}.$$
  由 $f\ge 0$ 开方得 $\int_0^{\frac{\pi}{2}} f(x)\,\mathrm{d}x = \frac{1}{2}\sqrt{\frac{3\pi}{2}}$，**切记除以区间长度 $\frac{\pi}{2}$**，平均值为 $\sqrt{\frac{3}{2\pi}}$。

> **【例6】（`p.32`）** 设 $f(x)$ 在 $[0,+\infty)$ 连续且单调，$f(x+2)-f(x)=4(x+2),\ f(0)=1,\ \int_1^9 f^{-1}(x)\,\mathrm{d}x=\frac{28}{3}$，求 $\int_1^3 f(x)\,\mathrm{d}x$。

- **【拆解】**：看到 $f(x+2)-f(x)$ 立刻构造 $F(x)=\int_x^{x+2}f(t)\,\mathrm{d}t$，则 $F'(x)=4(x+2)\implies F(x)=2(x+2)^2+C$。由题设 $f(2)=f(0)+8=9$，利用**反函数与原函数矩形公式**：
  $$\int_0^2 f(x)\,\mathrm{d}x + \int_1^9 f^{-1}(x)\,\mathrm{d}x = 2\times 9 = 18 \implies F(0)=\int_0^2 f(x)\,\mathrm{d}x = 18-\frac{28}{3}=\frac{26}{3}.$$
  代入 $F(0)=8+C=\frac{26}{3}$ 得 $C=\frac{2}{3}$，故所求 $\int_1^3 f(x)\,\mathrm{d}x = F(1) = 18+\frac{2}{3}=\frac{56}{3}$。

---

## 四、直通 `chapters/` 真题入口

- **不定积分与换元/分部专题**：[10-antiderivatives.md](../../../chapters/calculus/10-antiderivatives.md)（直达 `2018-15`：[q2018-15](../../../chapters/calculus/10-antiderivatives.md#q2018-15)、[q2023-2](../../../chapters/calculus/10-antiderivatives.md#q2023-2)、[q2019-16](../../../chapters/calculus/10-antiderivatives.md#q2019-16)、[q2016-2](../../../chapters/calculus/10-antiderivatives.md#q2016-2)）
- **定积分计算、区间再现与变限积分**：[11-definite-integrals.md](../../../chapters/calculus/11-definite-integrals.md)（[q2026-18](../../../chapters/calculus/11-definite-integrals.md#q2026-18)、[q2016-21](../../../chapters/calculus/11-definite-integrals.md#q2016-21)、[q2013-3](../../../chapters/calculus/11-definite-integrals.md#q2013-3)）
- **反常积分与奇点敛散性**：[12-improper-integrals.md](../../../chapters/calculus/12-improper-integrals.md#q2026-11)
