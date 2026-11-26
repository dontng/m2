# 专题11：平面域的面积与旋转体体积（Gemini 实战版）

> **来源**：[17堂课专题11（板书）.pdf](../pdf/17堂课专题11（板书）.pdf)（27 版，讲义 P114–119，全 22 页）｜ **风格基座**：[武氏实战军规手册](../../WU_STYLE_PLAYBOOK.md)  
> **核心考法**：**先画草图定限 + 二重积分斜轴旋转万能公式 $V=2\pi\iint_D r(x,y)\,\mathrm{d}\sigma$ + 对称平移配几何意义秒杀**。

---

## 一、本课定调 & 第一眼路由表

数二几何应用的高频失分点不在积分算不出，而在**不画图硬套公式、漏加绝对值、或者绕偏心轴旋转时内外半径画反**。武氏板书把所有旋转体体积统一收束进**二重积分微元公式**，一口气打通水平轴、竖直轴和斜直线！

| 第一眼触发特征 | 首选秒杀（解1） | 兜底通解（解2） | 放行红线（踩中即 0 分） |
| :--- | :--- | :--- | :--- |
| **平面域面积（直角坐标）**（`p.2, 5–6`） | 先画图看**选 $X$-型还是 $Y$-型切分最少**（尽量一刀积完不拆块） | 二重积分 $S=\iint_D 1\,\mathrm{d}\sigma$ | 曲线交点/拐点处若上下边界互换，**必须分段或加绝对值**（`p.6`） |
| **极坐标图形面积 $r=r(\theta)$**（`p.3, 17`） | 查对称性倍减区间 + 套 $S=\frac{1}{2}\int_\alpha^\beta r^2(\theta)\,\mathrm{d}\theta$ | 二重积分 $\iint_D r\,\mathrm{d}r\,\mathrm{d}\theta$ | 注意极角 $\theta$ 的**真实起始范围**（如心形线/玫瑰线半叶角） |
| **绕坐标轴旋转体体积**（`p.4, 8`） | 绕 $x$ 轴优先圆盘 $\pi\int y^2\,\mathrm{d}x$；绕 $y$ 轴优先柱壳 $2\pi\int xy\,\mathrm{d}x$ | 统一二重积分 $V_x=2\pi\iint_D y\,\mathrm{d}\sigma$，$V_y=2\pi\iint_D x\,\mathrm{d}\sigma$（$D$ 在第一象限） | **柱壳法 $2\pi\int x f(x)\,\mathrm{d}x$ 仅适用于 $f(x)\ge 0$**，曲线跨 $x$ 轴变号必须写 $|f(x)|$（`p.20`） |
| **绕平移轴 / 斜直线 $ax+by+c=0$ 旋转**（`p.4, 9–16`） | **二重积分万能公式**：$V=2\pi\iint_D \frac{\|ax+by+c\|}{\sqrt{a^2+b^2}}\,\mathrm{d}\sigma$ + **奇偶平移/几何面积** | 切片圆环法 $\pi\int(R_{\text{外}}^2-R_{\text{内}}^2)\,\mathrm{d}x$ 分段列出内外半径 | 万能公式前提：**直线 $L$ 严禁穿过区域 $D$**（否则重复扫掠，`p.4`） |
| **参数曲线 / 含无穷反常广义面积体积**（`p.18–19`） | 先列物理几何关系解出隐含函数（ODE 求切线长），再代入参数方程求定/反常积分 | 直接化直角坐标显式方程（常较繁） | 注意参数增减方向是否与 $x$ 从 $0\to +\infty$ 同向，别把积分上下限写反 |

---

## 二、核心铁律与 `→ / ↛` 概念红线

### 1. 武氏板书万能体积公式（`p.4`）
设平面区域 $D$ 绕直线 $L: ax+by+c=0$（**且 $L$ 不穿过区域 $D$**）旋转一周，体积微元为 $\mathrm{d}V=2\pi r(x,y)\,\mathrm{d}\sigma$，故：
$$V = 2\pi\iint_D r(x,y)\,\mathrm{d}\sigma = 2\pi\iint_D \frac{|ax+by+c|}{\sqrt{a^2+b^2}}\,\mathrm{d}\sigma.$$
- 特别地，当 $D$ 位于第一象限：绕 $x$ 轴 $V_x = 2\pi\iint_D y\,\mathrm{d}\sigma$；绕 $y$ 轴 $V_y = 2\pi\iint_D x\,\mathrm{d}\sigma$。
- **奇偶平移妙用（`p.8–11`）**：当 $D$ 关于某条直线 $x=x_0$ 或 $y=y_0$ 对称时，把被积距离写成 $(x-x_0)+c$，**$(x-x_0)$ 的二重积分为 $0$**，剩下的常数项直接乘以区域 $D$ 的**几何面积**！

### 2. 高频 `→ / ↛` 概念红线 & 0 分错法

| 命题 / 做法 | 结论 | 实战警示 / 反例 |
| :--- | :--- | :--- |
| 曲线 $y=f(x)$ 与 $x$ 轴围成区域绕 $y$ 轴旋转 $\longrightarrow V_y = 2\pi\int_a^b x f(x)\,\mathrm{d}x$ | **`↛` 缺条件** | **经典 0 分错法（`p.20`）**：当 $f(x)$ 在 $[a,b]$ 内变号（如 $y=\sin x,\ 0\le x\le n\pi$），必须加绝对值写成 $2\pi\int_a^b x|f(x)|\,\mathrm{d}x$（$a\ge 0$）。 |
| 绕直线 $y=m$ 旋转（区域位于 $y=m$ 同侧，边界 $g(x)\le f(x)\le m$）$\longrightarrow V=\pi\int[m-(f-g)]^2\mathrm{d}x$ | **`↛` 打叉** | 必须用外半径平方减内半径平方：$\pi\int_a^b[(m-g(x))^2-(m-f(x))^2]\,\mathrm{d}x$（`p.7`），绝非差值再平方！ |
| 极坐标心形线 $r=1+\cos\theta$ 绕极轴旋转 $\longrightarrow V_x = 2\pi\iint_D r^2\sin\theta\,\mathrm{d}r\,\mathrm{d}\theta$ | **`→` 需取半域** | **只对上半域 $D_{y\ge 0}\ (\theta\in[0,\pi])$ 积分**（`p.17`）！若取整域 $[0,2\pi]$ 则下半域重扫且 $\sin\theta$ 正负抵消归零！ |

---

## 三、高频母题 & 一题多解实战拆解

### 母题 1：圆域绕偏心轴旋转——“切片平移” vs “二重积分面积秒杀”（`p.8–11`）
> **【例4】（`p.8–11`）** 设平面图形 $A$ 由 $x^2+y^2\le 2x$ 所确定，分别求 $A$ 绕 **(I) $y$ 轴**、**(II) $x=3$**、**(III) $y=2$** 旋转一周所得旋转体的体积。

- **【解析】（先认出 $A$ 是圆心 $(1,0)$、半径 $1$ 的圆域，面积 $S_A=\pi$）**
- **第 (I) 问绕 $y$ 轴**：
  - **【解1】柱壳法 + 奇偶平移几何意义（`p.8`）**：
    $$V_y = 4\pi\int_0^2 x\sqrt{2x-x^2}\,\mathrm{d}x = 4\pi\int_0^2 [(x-1)+1]\sqrt{1-(x-1)^2}\,\mathrm{d}x = 4\pi\int_0^2 \sqrt{1-(x-1)^2}\,\mathrm{d}x = 4\pi\cdot\frac{\pi}{2} = 2\pi^2.$$
  - **【解2】二重积分万能公式 2 行秒杀（`p.9`）**：
    $V_y = 2\pi\iint_A x\,\mathrm{d}\sigma = 2\pi\iint_A [(x-1)+1]\,\mathrm{d}\sigma = 2\pi\cdot\pi = 2\pi^2$（圆关于 $x=1$ 对称，$(x-1)$ 积分为 0）。
- **第 (II) 问绕 $x=3$（`p.10`）**：
  $$V_{x=3} = 2\pi\iint_A (3-x)\,\mathrm{d}\sigma = 2\pi\iint_A [2-(x-1)]\,\mathrm{d}\sigma = 4\pi\cdot S_A = 4\pi^2.$$
- **第 (III) 问绕 $y=2$（`p.11`）**：
  $$V_{y=2} = 2\pi\iint_A (2-y)\,\mathrm{d}\sigma = 4\pi\cdot S_A = 4\pi^2.$$
  *(注：由对称性，圆绕不穿过它的任意直线旋转体积只取决于**圆心到轴的距离 $\times 2\pi \times \pi R^2$**！)*

---

### 母题 2：绝对值折线区域绕直线旋转——“分段圆环” vs “二重积分”（`p.13–14`）
> **【例6】（`p.13–14`）** 求曲线 $y=3-|x^2-1|$ 与 $x$ 轴围成的封闭图形绕直线 $y=3$ 旋转所得旋转体的体积。

- **【解1】对称切半 + 分段定内外半径（`p.13`）**：
  先定 $x\ge 0$ 交点：$3-|x^2-1|=0 \implies x=2$。
  - 当 $0\le x\le 1$ 时，$y=x^2+2$；当 $1\le x\le 2$ 时，$y=4-x^2$。两段都在 $y=3$ 下方，绕 $y=3$ 旋转时**外半径恒为 $3-0=3$**，内半径分别为 $3-(x^2+2)=1-x^2$ 与 $3-(4-x^2)=x^2-1$。
  - 平方后恰合为同一被积式：$3^2-(x^2-1)^2 = 8+2x^2-x^4$，由关于 $y$ 轴对称：
    $$V = 2\pi\int_0^2(8+2x^2-x^4)\,\mathrm{d}x = 2\pi\left[8x+\frac{2}{3}x^3-\frac{1}{5}x^5\right]_0^2 = \frac{448\pi}{15}.$$
- **【解2】二重积分万能公式（`p.14`）**：
  $$V = 2\pi\iint_D (3-y)\,\mathrm{d}\sigma = 2\pi\cdot 2\int_0^2\mathrm{d}x\int_0^{3-|x^2-1|}(3-y)\,\mathrm{d}y = 2\pi\int_0^2\left[9-(x^2-1)^2\right]\mathrm{d}x = \frac{448\pi}{15}.$$

---

### 母题 3：绕斜直线 $y=mx$ 旋转（`p.16`）与极坐标旋转（`p.17`）
> **【例8】（`p.16`）** 求曲线 $y=x^2$ 与直线 $y=mx\ (m>0)$ 在第一象限所围图形绕该直线旋转所得体积。

- **【万能公式直接秒杀】**：$L: mx-y=0$ 不穿过区域 $D=\{(x,y)\mid 0\le x\le m,\ x^2\le y\le mx\}$，点到直线距离 $r(x,y)=\frac{mx-y}{\sqrt{1+m^2}}$，故
  $$V = \frac{2\pi}{\sqrt{1+m^2}}\int_0^m\mathrm{d}x\int_{x^2}^{mx}(mx-y)\,\mathrm{d}y = \frac{\pi}{\sqrt{1+m^2}}\int_0^m (mx-x^2)^2\,\mathrm{d}x = \frac{\pi m^5}{30\sqrt{1+m^2}}.$$

> **【例9】（`p.17`）** 求心形线 $r=1+\cos\theta$ 所围区域 $D$ 的面积及绕极轴旋转一周的体积。

- **面积**：$S = 2\int_0^\pi\mathrm{d}\theta\int_0^{1+\cos\theta}r\,\mathrm{d}r = \int_0^\pi (1+\cos\theta)^2\,\mathrm{d}\theta = \frac{3\pi}{2}$。
- **绕极轴体积（注意只取上半域 $D_{y\ge 0}$！）**：
  $$V_x = 2\pi\iint_{D_{y\ge 0}} y\,\mathrm{d}\sigma = 2\pi\int_0^\pi\mathrm{d}\theta\int_0^{1+\cos\theta}r^2\sin\theta\,\mathrm{d}r = \frac{2\pi}{3}\int_0^\pi (1+\cos\theta)^3\sin\theta\,\mathrm{d}\theta = \frac{8\pi}{3}.$$

---

### 母题 4：带变号波瓣的柱壳体积 + 黎曼和极限压轴（`p.20–21`）
> **【例11】（`p.20–21`）** 设曲线 $y=\sin x\ (0\le x\le n\pi,\ n=1,2,\dots)$ 和 $x$ 轴所围成区域为 $A$，绕 $y$ 轴旋转所得体积为 $S_n$。求 (I) $S_n$；(II) $\lim_{n\to\infty}\left[\frac{S_1}{n^3+1^3}+\frac{S_2}{n^3+2^3}+\cdots+\frac{S_n}{n^3+n^3}\right]$。

- **【经典 0 分错法（`p.20` 右侧红叉）】**：漏掉 $|\sin x|$ 直接写 $S_n = 2\pi\int_0^{n\pi}x\sin x\,\mathrm{d}x$，直接判 0 分！
- **【正解】**：
  - **(I) 区间再现 $x=n\pi-t$ 秒出 $S_n$**：
    $$S_n = 2\pi\int_0^{n\pi}x|\sin x|\,\mathrm{d}x = 2\pi\int_0^{n\pi}(n\pi-t)|\sin t|\,\mathrm{d}t = 2n\pi^2\int_0^{n\pi}|\sin t|\,\mathrm{d}t - S_n$$
    $$\implies S_n = n\pi^2\cdot n\int_0^\pi\sin t\,\mathrm{d}t = 2n^2\pi^2.$$
  - **(II) 提 $\frac{1}{n}$ 走定积分定义**：
    $$\text{原式} = 2\pi^2\lim_{n\to\infty}\frac{1}{n}\sum_{k=1}^n\frac{(\frac{k}{n})^2}{1+(\frac{k}{n})^3} = 2\pi^2\int_0^1\frac{x^2}{1+x^3}\,\mathrm{d}x = \frac{2\pi^2}{3}\ln 2.$$

---

## 四、直通 `chapters/` 真题入口

- **定积分几何与物理应用大本营**：[13-integral-applications.md](../../../chapters/calculus/13-integral-applications.md)（直达 `2012-17` 原题：[q2012-17](../../../chapters/calculus/13-integral-applications.md#q2012-17)、[q2026-4](../../../chapters/calculus/13-integral-applications.md#q2026-4)、[q2026-20](../../../chapters/calculus/13-integral-applications.md#q2026-20)、[q2025-6](../../../chapters/calculus/13-integral-applications.md#q2025-6)）
- **二重积分联动（斜轴旋转与极坐标转换）**：[19-double-integrals.md](../../../chapters/calculus/19-double-integrals.md)（[q2026-7](../../../chapters/calculus/19-double-integrals.md#q2026-7)、[q2025-20](../../../chapters/calculus/19-double-integrals.md#q2025-20)）
- **定积分定义求数列极限联动**：[02-sequences.md#q2012-10](../../../chapters/calculus/02-sequences.md#q2012-10)
