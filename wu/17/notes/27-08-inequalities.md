# 专题8：不等式问题（Gemini 实战版）

> **来源**：[17堂课专题8（板书）.pdf](../pdf/17堂课专题8（板书）.pdf)（27 版，讲义 P88–95，全 25 页）｜ **风格基座**：[武氏实战军规手册](../../WU_STYLE_PLAYBOOK.md)  
> **核心考法**：**先变形再去凑辅助函数 + 对称中点消一次项 + 变号区段先配对再比大小**。

---

## 一、本课定调 & 第一眼路由表

数二不等式分“**函数不等式**（7 例）”与“**积分不等式**（6 例）”。最忌讳一上来就盲目“令 $F(x)=\text{左}-\text{右}$ 硬求导”。先花 3 秒看清**外层幂指/分母障碍、等号点位置、被积核是否跨点变号**，再决定切哪条路。

| 第一眼触发特征 | 首选秒杀（解1） | 兜底通解（解2） | 放行红线（踩中即 0 分） |
| :--- | :--- | :--- | :--- |
| **含复杂分母 / 根式 / 外层幂函数**（`p.4–5`） | **先同向变形再作差**：取对数降幂、乘正分母去分母、调分子配对消根式 | 直接作差多次求导（计算易爆） | 乘除/取对数前必须验明**严格正性**；不可直接用“求导后正负”倒推 |
| **有双端点或差商结构 $\frac{f(b)-f(a)}{b-a}$**（`p.6`） | **拉格朗日中值**定粗界；若精度不够（如 $\frac{1}{\sqrt{ab}}$），**固定一端作辅助函数** | 把双变量改写为比值单变量 $t=b/a>1$ | 中值点 $\xi\in(a,b)$ 只能给端点界，强行再往紧缩会失效 |
| **等号在区间内部取到**（`p.7`） | 求驻点证明**全局先减后增 $\to$ 内部取最小值** | 泰勒展开看二次非负余项 | 仅算 $F''(x_0)>0$ 只能证局部极小，**不能宣布全局最小** |
| **已知 $f$ 与 $f''$ 的界，证 $\|f'\|$**（`p.8`） | 在**任意点 $x$ 处向两端点 $a,b$ 作 2 阶泰勒展开**，两式相减消 $f(x)$ | 对区间拆半段用中值定理 | 在固定点 $0$ 展开无法控制任意点的 $f'(x)$（`p.8`） |
| **加权和 / 凹凸性 / 积分中点比较**（`p.9–16`） | 选填：**几何切线/弦线图 + 特例直抛**；证明：**在中点 $m$ 作切线 / 泰勒消一次项** | 分两段用拉格朗日中值定理比较斜率 | $\xi_x$ 依赖于 $x$，积分内**不可把 $f''(\xi_x)$ 当常数提出**（`p.15`） |
| **积分核交叉变号 / 正负波瓣**（`p.17–18`） | **区间对折 $x=a+b-t$** 或 **周期平移 $x=t+k\pi$** 把异号段叠到同区间 | 分段估计后再逐段加减 | 核在区间内变号时**严禁直接套用逐点大小比较** |
| **含变号权或 $f'$ 能量的积分不等式**（`p.19–24`） | **同号乘积构造** $(x-m)[f(x)-f(m)]\ge 0$；边界零值用 $f(x)=\int_0^x f'dt$ + **柯西不等式** | 把常数上限 $b$ 改为变量 $s$，构造 $H(s)$ 求导（`p.21–22`） | 积分不等式出现 $\int_0^1 (f')^2$ 时，用中值定理只能出 $f'(\xi)$，换柯西才能出能量积分（`p.24`） |

---

## 二、核心铁律与 `→ / ↛` 概念红线

### 1. 五个必背基本不等式工具箱（`p.3`）
1. **三角阶**：$0<x<\frac{\pi}{2}$ 时，$\sin x < x < \tan x$（切分估算与放缩核心）。
2. **对数夹逼**：$x>-1$ 且 $x\neq 0$ 时，$\frac{x}{1+x} < \ln(1+x) < x$；特别 $x>0$ 时 $\ln(1+x)<x$。
3. **指数下界**：$\forall x\in\mathbb{R}$，$e^x \ge 1+x$（$x=0$ 取等）。
4. **切线与弦线几何方向（`p.11, 13`）**：
   - $f''>0$（凹/下凸）：图像在**切线上方**，在**弦线下方**；
   - $f''<0$（凸/上凸）：图像在**切线下方**，在**弦线上方**。
5. **积分柯西不等式（`p.22–23`）**：$\left(\int_a^b f(x)g(x)\,\mathrm{d}x\right)^2 \le \int_a^b f^2(x)\,\mathrm{d}x \int_a^b g^2(x)\,\mathrm{d}x$。

### 2. 高频逻辑红线 `→` vs `↛`

| 命题方向 | 结论 | 极简反例 / 实战警示 |
| :--- | :--- | :--- |
| $f(0)=0$ 且 $f'(x)>0\ (x>0) \longrightarrow f(x)>0\ (x>0)$ | **`→` 需连续** | 需补足 **$f$ 在 $x=0$ 右连续**（`p.4`）；若在 $0$ 处跳到 $-10$ 则结论崩塌。 |
| $f''(x)>0$ 且 $\int_0^1 f(x)\,\mathrm{d}x=0 \longrightarrow f(\frac{1}{2})<0$ | **`→` 成立** | 在中点 $x=\frac{1}{2}$ 作切线积分一次项刚好为 $0$（2018 数二，`p.13–16`）。 |
| $f'(x)>0$ 且 $\int_0^1 f(x)\,\mathrm{d}x=0 \longrightarrow f(\frac{1}{2})<0$ | **`↛` 打叉** | 反例：$f(x)=x-\frac{1}{2}$ 满足条件但 $f(\frac{1}{2})=0$（`p.14`）。 |
| $f$ 在 $[a,b]$ 单调增 $\longrightarrow \int_a^b xf(x)\,\mathrm{d}x \ge \frac{a+b}{2}\int_a^b f(x)\,\mathrm{d}x$ | **`→` 成立** | 无需 $f\ge 0$，也不需 $f'$ 存在！只需 $(x-\frac{a+b}{2})[f(x)-f(\frac{a+b}{2})]\ge 0$（`p.20`）。 |
| $f(0)=f(1)=0$ 证 $\int_0^1 f^2\le C\int_0^1 (f')^2$，从 $0$ 积分到 $1$ | **可成立但常数变差** | 全程只从 $x=0$ 积得常数 $\frac{1}{2}$；**分半区间 $[0,\frac{1}{2}]$ 与 $[\frac{1}{2},1]$** 才拿到最佳界 $\frac{1}{8}$（`p.24`）。 |

---

## 三、高频母题 & 一题多解实战拆解

### 母题 1：先变形消障碍，再设辅助函数（`p.4–6`）
> **【例1】（`p.4`）** 证明：当 $0<x<1$ 时，$\sqrt{\frac{1-x}{1+x}} < \frac{\ln(1+x)}{\arcsin x}$。

- **【经典低效错法】**：直接设 $G(x)=\frac{\ln(1+x)}{\arcsin x}-\sqrt{\frac{1-x}{1+x}}$ 硬求导，分母出现 $(\arcsin x)^2$ 与根式混杂，无法一眼定号。
- **【武氏变形破局】**：$0<x<1$ 时分母均正，先把 $\sqrt{\frac{1-x}{1+x}}$ 写成 $\frac{\sqrt{1-x^2}}{1+x}$，交叉相乘等价于证：
  $$(1+x)\ln(1+x) > \sqrt{1-x^2}\arcsin x.$$
  **关键爽点**：求导时 $(\arcsin x)'=\frac{1}{\sqrt{1-x^2}}$ 刚好把根式分母消光！
  令 $F(x)=(1+x)\ln(1+x)-\sqrt{1-x^2}\arcsin x$（$x\in[0,1)$），则 $F(0)=0$，且
  $$F'(x) = \ln(1+x) + 1 + \frac{x}{\sqrt{1-x^2}}\arcsin x - 1 = \ln(1+x) + \frac{x}{\sqrt{1-x^2}}\arcsin x > 0\quad (0<x<1).$$
  故 $F(x)>F(0)=0$，原不等式成立。

> **【例2】（2002 数二，`p.6`）** 设 $0<a<b$，证明：$\frac{2a}{a^2+b^2} < \frac{\ln b - \ln a}{b-a} < \frac{1}{\sqrt{ab}}$。

- **左半边（拉格朗日中值秒杀）**：由拉格朗日中值定理，$\frac{\ln b-\ln a}{b-a}=\frac{1}{\xi}$（$a<\xi<b$），故
  $$\frac{\ln b-\ln a}{b-a} = \frac{1}{\xi} > \frac{1}{b} > \frac{2a}{a^2+b^2}\quad\Big(\text{因 } a^2+b^2 > 2ab \implies \frac{1}{b}>\frac{2a}{a^2+b^2}\Big).$$
- **右半边（中值定理不够用 $\to$ 固定 $a$ 设辅助函数）**：固定 $a$，把 $b$ 改为变量 $x>a$，令 $\varphi(x)=\ln x-\ln a-\frac{x-a}{\sqrt{ax}}$，则 $\varphi(a)=0$，
  $$\varphi'(x)=\frac{1}{x}-\frac{1}{\sqrt{a}}\left(\frac{1}{2\sqrt{x}}+\frac{a}{2x\sqrt{x}}\right)=\frac{2\sqrt{ax}-x-a}{2x\sqrt{ax}}=-\frac{(\sqrt{x}-\sqrt{a})^2}{2x\sqrt{ax}}<0\quad(x>a).$$
  故 $\varphi(b)<\varphi(a)=0$，右半边得证。

---

### 母题 2：在任意点 $x$ 展开消去未知 $f(x)$（`p.8`）
> **【例3】（`p.8`）** 设 $f(x)$ 在 $[0,2]$ 上二阶可导，且 $|f(x)|\le 1,\ |f''(x)|\le 1$，证明：$\forall x\in[0,2]$，$|f'(x)|\le 2$。

- **【思路】**：保留 $f'(x)$、消掉未知 $f(x)$ $\implies$ **在任意内点 $x\in(0,2)$ 处对 $0$ 和 $2$ 作二阶泰勒展开**：
  $$f(0)=f(x)-xf'(x)+\frac{1}{2}f''(\xi_1)x^2,\qquad f(2)=f(x)+(2-x)f'(x)+\frac{1}{2}f''(\xi_2)(2-x)^2.$$
  下式减上式消掉 $f(x)$：
  $$2f'(x) = f(2)-f(0) + \frac{1}{2}f''(\xi_1)x^2 - \frac{1}{2}f''(\xi_2)(2-x)^2.$$
  取绝对值并利用 $x^2+(2-x)^2=2(x-1)^2+2\le 4$（$x\in[0,2]$）：
  $$|f'(x)| \le \frac{|f(2)|+|f(0)|}{2} + \frac{1}{4}\left[x^2+(2-x)^2\right] \le 1 + \frac{4}{4} = 2.$$
  （端点 $x=0,2$ 处直接对另一端展开或由 $f'$ 连续性即得，证毕。）

---

### 母题 3：积分不等式“几何秒杀 × 特例排除 × 泰勒证明”（2018 数二，`p.13–16`）
> **【例4】（2018 年数二，`p.13–16`）** 设 $f(x)$ 在 $[0,1]$ 上二阶可导，且 $\int_0^1 f(x)\,\mathrm{d}x=0$，则（ ）  
> (A) 当 $f'(x)<0$ 时，$f(\frac{1}{2})<0$　(B) 当 $f''(x)<0$ 时，$f(\frac{1}{2})<0$  
> (C) 当 $f'(x)>0$ 时，$f(\frac{1}{2})<0$　(D) 当 $f''(x)>0$ 时，$f(\frac{1}{2})<0$

- **【解1】特例排除法（选填 15 秒秒杀，`p.14`）**：
  - 取 $f(x)=-\left(x-\frac{1}{2}\right)$：满足 $\int_0^1 f=0$ 且 $f'<0$，但 $f(\frac{1}{2})=0$，排 **(A)**；
  - 取 $f(x)=x-\frac{1}{2}$：满足 $\int_0^1 f=0$ 且 $f'>0$，但 $f(\frac{1}{2})=0$，排 **(C)**；
  - 取 $f(x)=-x^2+\frac{1}{3}$：满足 $\int_0^1 f=0$ 且 $f''=-2<0$，但 $f(\frac{1}{2})=\frac{1}{12}>0$，排 **(B)**。直选 **(D)**！
- **【解2】中点切线 + 泰勒兜底证明（`p.13, 15`）**：
  当 $f''(x)>0$ 时，$f(x)$ 在 $x=\frac{1}{2}$ 处切线为 $g(x)=f(\frac{1}{2})+f'(\frac{1}{2})(x-\frac{1}{2})$。对任意 $x\neq\frac{1}{2}$，由泰勒公式：
  $$f(x) - g(x) = \frac{1}{2}f''(\xi_x)\left(x-\frac{1}{2}\right)^2 > 0.$$
  在 $[0,1]$ 上积分，注意到 $\int_0^1 (x-\frac{1}{2})\,\mathrm{d}x=0$：
  $$0 = \int_0^1 f(x)\,\mathrm{d}x > \int_0^1 g(x)\,\mathrm{d}x = f\left(\frac{1}{2}\right)\implies f\left(\frac{1}{2}\right)<0.$$

---

### 母题 4：对称换元与同号乘积处理变号核（`p.17–21`）
> **【例5】（`p.17`）** 比较 $I_1=\int_0^{\frac{\pi}{2}}\frac{\sin x}{1+x^2}\mathrm{d}x,\ I_2=\int_0^{\frac{\pi}{2}}\frac{\cos x}{1+x^2}\mathrm{d}x,\ I_3=\int_0^{\frac{\pi}{2}}\frac{x}{1+(x-\frac{\pi}{2})^2}\mathrm{d}x$ 的大小。

- **【思路】**：直接比较 $I_2-I_1$ 时 $\cos x-\sin x$ 在 $\frac{\pi}{4}$ 处变号 $\implies$ **拆半区间对折**！
  $$I_2-I_1=\int_0^{\frac{\pi}{2}}\frac{\cos x-\sin x}{1+x^2}\mathrm{d}x \xlongequal{\text{右半 } x=\frac{\pi}{2}-t} \int_0^{\frac{\pi}{4}}(\cos x-\sin x)\left[\frac{1}{1+x^2}-\frac{1}{1+(\frac{\pi}{2}-x)^2}\right]\mathrm{d}x > 0.$$
  再对 $I_2$ 整体作 $x=\frac{\pi}{2}-t$：$I_2=\int_0^{\frac{\pi}{2}}\frac{\sin t}{1+(t-\frac{\pi}{2})^2}\mathrm{d}t < \int_0^{\frac{\pi}{2}}\frac{t}{1+(t-\frac{\pi}{2})^2}\mathrm{d}t = I_3$（因 $t>0$ 时 $\sin t<t$）。故 $I_1<I_2<I_3$。

> **【例6】（`p.19–21`）** 设 $f(x)$ 在 $[a,b]$ 上连续且单调增，求证：$\int_a^b xf(x)\,\mathrm{d}x \ge \frac{a+b}{2}\int_a^b f(x)\,\mathrm{d}x$。

- **【解1】同号乘积一招秒杀（`p.20`）**：
  令中点 $m=\frac{a+b}{2}$。因为 $f$ 单调增，故 $\forall x\in[a,b]$，$(x-m)$ 与 $[f(x)-f(m)]$ 恒同号，即 $(x-m)[f(x)-f(m)]\ge 0$。两边积分且利用 $\int_a^b(x-m)\,\mathrm{d}x=0$：
  $$\int_a^b(x-m)f(x)\,\mathrm{d}x = \int_a^b(x-m)[f(x)-f(m)]\,\mathrm{d}x \ge 0.$$
- **【解2】中点拆半 + 积分中值（`p.19`）**：拆为 $[a,m]$ 和 $[m,b]$，各自对不变号的权重 $(x-m)$ 用推广的第一积分中值定理，得 $\frac{(b-a)^2}{8}[f(\xi_2)-f(\xi_1)]\ge 0$。
- **【解3】变上限构造（`p.21`）**：令 $H(s)=\int_a^s tf(t)\,\mathrm{d}t-\frac{s+a}{2}\int_a^s f(t)\,\mathrm{d}t$，则 $H'(s)=\frac{1}{2}\int_a^s[f(s)-f(t)]\,\mathrm{d}t\ge 0$，故 $H(b)\ge H(a)=0$。

---

### 母题 5：双零边界 + 柯西不等式拿最佳常数（`p.24`）
> **【例7】（`p.24`）** 设 $f(x)$ 在 $[0,1]$ 上有连续导数，且 $f(0)=f(1)=0$，求证：$\int_0^1 f^2(x)\,\mathrm{d}x \le \frac{1}{8}\int_0^1 [f'(x)]^2\,\mathrm{d}x$。

- **【拆解】**：左 $f$ 右 $f'$ 且两端为 $0$ $\implies$ 用 $f(x)=\int_0^x f'(t)\,\mathrm{d}t$（左半）与 $f(x)=-\int_x^1 f'(t)\,\mathrm{d}t$（右半），在 $[0,\frac{1}{2}]$ 与 $[\frac{1}{2},1]$ 分别套柯西不等式：
  - $x\in[0,\frac{1}{2}]$：$f^2(x)=\left(\int_0^x 1\cdot f'(t)\,\mathrm{d}t\right)^2 \le x\int_0^x [f'(t)]^2\,\mathrm{d}t \le x\int_0^{\frac{1}{2}}[f'(t)]^2\,\mathrm{d}t$；
  - $x\in[\frac{1}{2},1]$：$f^2(x)=\left(-\int_x^1 1\cdot f'(t)\,\mathrm{d}t\right)^2 \le (1-x)\int_x^1 [f'(t)]^2\,\mathrm{d}t \le (1-x)\int_{\frac{1}{2}}^1 [f'(t)]^2\,\mathrm{d}t$。
  两式分别在 $[0,\frac{1}{2}]$ 与 $[\frac{1}{2},1]$ 上积分相加，利用 $\int_0^{\frac{1}{2}}x\,\mathrm{d}x=\int_{\frac{1}{2}}^1(1-x)\,\mathrm{d}x=\frac{1}{8}$ 即得！

---

## 四、直通 `chapters/` 真题入口

- **中值定理与不等式证明**：[05-mean-value-proofs.md](../../../chapters/calculus/05-mean-value-proofs.md)（直达 `2012-20`：[q2012-20](../../../chapters/calculus/05-mean-value-proofs.md#q2012-20)、[q2024-21](../../../chapters/calculus/05-mean-value-proofs.md#q2024-21)、[q2023-21](../../../chapters/calculus/05-mean-value-proofs.md#q2023-21)）
- **凹凸性、切线与积分不等式**：[07-convexity.md](../../../chapters/calculus/07-convexity.md)（直达 `2018-4` 原题：[q2018-4](../../../chapters/calculus/07-convexity.md#q2018-4)、[q2025-21](../../../chapters/calculus/07-convexity.md#q2025-21)、[q2022-21](../../../chapters/calculus/07-convexity.md#q2022-21)）
- **定积分比较与变号核专题**：[11-definite-integrals.md](../../../chapters/calculus/11-definite-integrals.md)（直达 `2012-4` 原题：[q2012-4](../../../chapters/calculus/11-definite-integrals.md#q2012-4)、[q2016-21](../../../chapters/calculus/11-definite-integrals.md#q2016-21)）
