# 专题 15：计算二重积分的方法和技巧（Gemini 实战版）

> **来源**：[17堂课专题15（板书）.pdf](../pdf/17堂课专题15（板书）.pdf)（27版，讲义 P147–155，PDF 共 30 页，全页视觉复核）  
> **总军规**：[武忠祥高数考研实战风格与解题军规手册](../../WU_STYLE_PLAYBOOK.md) · **考纲**：严格限定数学二（`p.28` 为 2024 年数一同法计算参考，本专题不含三重/线面积分）

---

## 一、本课定调 & 第一眼路由表

**核心定调**：二重积分不是拿到手就猛写上下限，**开算前先停 3 秒按优先级降维**：“奇偶/轮换对称能消多少？ $\to$ 积不出来要换序吗？ $\to$ 换极坐标还是平移？ $\to$ 能用形心/整块补形省多少计算？”

| 第一眼触发特征 | 首选 / 秒杀（【解1】） | 兜底通解（【解2】） | 放行红线（踩中必丢分） |
| :--- | :--- | :--- | :--- |
| **对称积分域**（`p.3–4, 7, 10–11, 27`） | **先查奇偶性**归零/翻倍；关于 $y=x$ 对称直接做**变量对称替换 $x\leftrightarrow y$ 取平均**（或消 $x-y$） | 补形或切分为对称块 + 非对称残块（`p.13, 28`） | 对称性必须**域对称 + 函数奇偶同时满足**；关于 $y$ 轴对称看 $x$ 的奇偶，关于 $x$ 轴对称看 $y$ 的奇偶（`p.3`） |
| **内层积分无初等原函数**（`p.5–6`）<br>如 $\int e^{x^2}/x\,\mathrm{d}x$ 或 $\int\frac{\sin^2 y}{y^2}\,\mathrm{d}y$ | **画域重定限，交换积分次序**；多项和时**拆开只换积不出那一项**（`p.6`） | 分域切块后分别交换次序 | **绝不能直接照抄上下限互换**，必画草图重划垂直穿线 |
| **含 $x^2+y^2,\frac{y}{x}$ 或圆/偏心圆域**（`p.3, 15–17`） | **极坐标转换**：$\mathrm{d}\sigma=r\,\mathrm{d}r\,\mathrm{d}\theta$；偏心圆角度难定直接**极坐标平移** $x-x_0=r\cos\theta$（`p.17`） | 若极坐标角范围反常如 $0\le r\le\sec\theta$，**逆向转回直角坐标**（`p.14`） | **绝对禁漏雅可比因子 $r$**；偏心圆 $x^2+y^2\le 2ax$ 的 $\theta\in[-\frac{\pi}{2},\frac{\pi}{2}]$ 而非 $[0,2\pi]$ |
| **圆域 / 椭圆域被积含一次函数 $ax+by+c$**（`p.8`） | **形心公式秒杀**：$\iint_D x\,\mathrm{d}\sigma=\bar{x}S_D$（椭圆中心 $(-1,2)$ 直接代出） | 拆平移变量 $(x+1), (y-2)$ 利用对称性归零 | 形心直接代值仅适用于**一次线性项**（及常值密度），二次项如 $x^2$ 不可用 |
| **含 $|f|$ / $\max$ / 取整 $[1+x^2+y^2]$**（`p.18–22`） | 按分界曲线划分子域去掉绝对值/取整；圆弧残角用**整域 $D$ 减去圆内 $D_1$ 凑整块**（`p.18`） | 分块硬写直角/极坐标上下限 | 取整分段需严查区间端点值（如 $0\le r^2<1$ 与 $1\le r^2<2$，`p.21–22`） |

---

## 二、核心铁律与 `→ / ↛` 概念红线 / 极简反例

### 1. 对称性三法则精确配对（`p.3–4`）
1. **$D$ 关于 $y$ 轴对称**：看 $x$！若 $f(-x,y)=-f(x,y) \implies \iint_D f\,\mathrm{d}\sigma=0$；若 $f(-x,y)=f(x,y) \implies 2\iint_{D_{x\ge 0}} f\,\mathrm{d}\sigma$。
2. **$D$ 关于 $x$ 轴对称**：看 $y$！若 $f(x,-y)=-f(x,y) \implies \iint_D f\,\mathrm{d}\sigma=0$；若 $f(x,-y)=f(x,y) \implies 2\iint_{D_{y\ge 0}} f\,\mathrm{d}\sigma$。
3. **$D$ 关于直线 $y=x$ 对称**：
   $$\iint_D f(x,y)\,\mathrm{d}\sigma = \iint_D f(y,x)\,\mathrm{d}\sigma = \frac{1}{2}\iint_D\big[f(x,y)+f(y,x)\big]\,\mathrm{d}\sigma$$
   特别地，若 $f(x,y)=-f(y,x)$（如 `p.23` 中的 $\sin(x-y)$ 或 `p.27` 中的 $x-y$），则积分直接为 $0$！

### 2. 极坐标与积分估值 `→ / ↛` 红线
| 命题方向 | 逻辑结论 | 极简反例 / 实战警示 |
| :--- | :---: | :--- |
| $D$ 关于原点对称且 $f(-x,-y)=-f(x,y) \longrightarrow \iint_D f=0$ | **`→` 成立** | 但若只把其中一轴反号（如 $f(x,y)=x^2y$ 在 $x^2+y^2\le 1$ 上看对称）**需分别验证轴对称**。 |
| $D_1 \subset D_2 \longrightarrow \iint_{D_1} f\,\mathrm{d}\sigma \le \iint_{D_2} f\,\mathrm{d}\sigma$ | **`↛` 打叉** | 必须满足 **$f(x,y)\ge 0$**（见 `选填5 p.74`）；反例：取 $f(x,y)\equiv -1$，区域越大积分反而越小。 |
| 极坐标变换 $x=r\cos\theta, y=r\sin\theta$ 中 $\mathrm{d}x\mathrm{d}y = \mathrm{d}r\mathrm{d}\theta$ | **`↛` 打叉** | **经典的 0 分错法**：漏乘雅可比因子 $r$，正解为 $\mathrm{d}x\mathrm{d}y=r\,\mathrm{d}r\,\mathrm{d}\theta$（`p.2`）。 |
| 区域由 $r\le\sec\theta$ 与 $0\le\theta\le\frac{\pi}{4}$ 围成 $\longrightarrow$ 必用极坐标硬算 | **`↛` 打叉** | $r\cos\theta=1$ 就是直线 $x=1$！转回直角三角形 $0\le y\le x\le 1$ 瞬间简化（`p.14`）。 |

---

## 三、高频母题 & 一题多解实战拆解

### 母题 1：换序拆项与极坐标逆转直角坐标（`p.6, 14` 例2、例10）

#### 例 2（`p.6`）：算二次积分 $\int_0^1 \mathrm{d}y\int_y^1 \left(\frac{e^{x^2}}{x}-e^{y^2}\right)\mathrm{d}x$
- **第一眼触发**：$\frac{e^{x^2}}{x}$ 对 $x$ 积不出，而 $e^{y^2}$ 乘上 $(1-y)$ 对 $y$ 恰好能凑微分积出！
- **【秒杀策略】**：**拆开，只换前项积分次序，后项原地不动**：
  $$\int_0^1 \mathrm{d}y\int_y^1 \frac{e^{x^2}}{x}\,\mathrm{d}x - \int_0^1 \mathrm{d}y\int_y^1 e^{y^2}\,\mathrm{d}x = \int_0^1 \mathrm{d}x\int_0^x \frac{e^{x^2}}{x}\,\mathrm{d}y - \int_0^1 (1-y)e^{y^2}\,\mathrm{d}y = \int_0^1 y e^{y^2}\,\mathrm{d}y = \frac{1}{2}(e-1).$$

#### 例 10（`p.14`）：$I = \iint_D r^2\sin\theta\sqrt{1-r^2\cos 2\theta}\,\mathrm{d}r\,\mathrm{d}\theta$，其中 $D=\{(r,\theta)\mid 0\le r\le\sec\theta,\ 0\le\theta\le\frac{\pi}{4}\}$
- **【秒杀路径】**：认出 $\mathrm{d}x\mathrm{d}y=r\,\mathrm{d}r\,\mathrm{d}\theta$、$y=r\sin\theta$、$r^2\cos 2\theta = x^2-y^2$，且 $r=\sec\theta \iff x=1$，于是 $D$ 是顶点为 $(0,0),(1,0),(1,1)$ 的直角三角形！立刻逆转回直角坐标：
  $$I = \int_0^1 \mathrm{d}x\int_0^x y\sqrt{1-x^2+y^2}\,\mathrm{d}y = \frac{1}{3}\int_0^1\left[1-(1-x^2)^{\frac{3}{2}}\right]\mathrm{d}x \stackrel{x=\sin t}{=} \frac{1}{3} - \frac{1}{3}\int_0^{\frac{\pi}{2}}\cos^4 t\,\mathrm{d}t = \frac{1}{3} - \frac{\pi}{16}.$$

---

### 母题 2：对称性 + 形心 + 方程双轨法（`p.8, 12` 例4、例8）

#### 例 4（`p.8`）：$D=\{(x,y)\mid \frac{(x+1)^2}{9}+\frac{(y-2)^2}{4}\le 1\}$，求 $\iint_D (5x+3y)\,\mathrm{d}x\mathrm{d}y$
- **【解1】平移利用奇偶性**：凑成 $5(x+1)+3(y-2)+1$，前两项关于椭圆中心 $(-1,2)$ 奇对称积分为 $0$，只剩面积 $\pi\cdot 3\cdot 2=6\pi$。
- **【解2】形心公式 1 行秒杀**：椭圆形心 $(\bar{x},\bar{y})=(-1,2)$，直接得 $(5\bar{x}+3\bar{y})S_D = (-5+6)\cdot 6\pi = 6\pi$！

#### 例 8（`p.12`）：设 $f(x,y)$ 连续且 $f(x,y)=xy+\iint_D f(u,v)\,\mathrm{d}u\mathrm{d}v$，$D$ 由 $y=0,y=x^2,x=1$ 围成，选 $f(x,y)$
- **【解1】直接法**：记常数 $A=\iint_D f\,\mathrm{d}\sigma$，两边在 $D$ 上积分得 $A=\iint_D xy\,\mathrm{d}\sigma + A\cdot S_D = \frac{1}{12}+\frac{1}{3}A \implies A=\frac{1}{8}$，故 $f(x,y)=xy+\frac{1}{8}$。
- **【解2】排除法**：若取（D）$xy+1$，则右端 $A=\iint_D(xy+1)\,\mathrm{d}\sigma < \iint_D 2\,\mathrm{d}\sigma = \frac{2}{3} < 1$，瞬间矛盾排除（D）、（A）、（B）！

---

### 母题 3：偏心交圆的“极坐标平移” vs 绝对值域“整块补算”（`p.16–19` 例12、例13）

#### 例 12（`p.16–17`）：算 $\iint_D (x-y)\,\mathrm{d}x\mathrm{d}y$，其中 $D=\{(x,y)\mid (x-1)^2+(y-1)^2\le 2,\ y\ge x\}$
- **【解1】原点极坐标（`p.16`）**：圆过原点，$0\le r\le 2(\sin\theta+\cos\theta),\ \frac{\pi}{4}\le\theta\le\frac{3\pi}{4}$，凑 $\mathrm{d}(\sin\theta+\cos\theta)$ 得 $-\frac{8}{3}$。
- **【解2】极坐标平移（`p.17` 推荐）**：令 $x-1=r\cos\theta,\ y-1=r\sin\theta$，区域瞬间化为半圆盘 $0\le r\le\sqrt{2},\ \frac{\pi}{4}\le\theta\le\frac{5\pi}{4}$，积分仅剩：
  $$\int_{\frac{\pi}{4}}^{\frac{5\pi}{4}}\mathrm{d}\theta\int_0^{\sqrt{2}}r^2(\cos\theta-\sin\theta)\,\mathrm{d}r = \frac{2\sqrt{2}}{3}(\sin\theta+\cos\theta)\Big|_{\frac{\pi}{4}}^{\frac{5\pi}{4}} = -\frac{8}{3}.$$

#### 例 13（`p.18–19`）：正方形域 $D=[0,1]^2$ 上算 $\iint_D |x^2+y^2-1|\,\mathrm{d}\sigma$
- **【补形妙招】**：记圆内四分之一盘为 $D_1$，圆外角块为 $D_2=D\setminus D_1$。**绝不直接硬写 $D_2$ 的上下限**，而是改写为：
  $$\iint_{D_1}(1-x^2-y^2)\,\mathrm{d}\sigma + \iint_{D_2}(x^2+y^2-1)\,\mathrm{d}\sigma = 2\iint_{D_1}(1-x^2-y^2)\,\mathrm{d}\sigma + \iint_D(x^2+y^2-1)\,\mathrm{d}\sigma$$
  第一项极坐标 $\frac{\pi}{4}$，第二项正方形直接心算 $-\frac{1}{3}$，总结果 $\frac{\pi}{4}-\frac{1}{3}$！

---

### 母题 4：2024 数二真题——变量对称性秒杀曲边菱形域（`p.27`）

> 设第一象限有界区域 $D$ 由 $xy=\frac{1}{3},\ xy=3,\ y=\frac{1}{3}x,\ y=3x$ 围成，求 $\iint_D (1+x-y)\,\mathrm{d}x\mathrm{d}y$。

- **第一眼秒杀**：画出四条边界可见 $D$ 关于 $y=x$ 对称，由变量对称性 $\iint_D x\,\mathrm{d}x\mathrm{d}y = \iint_D y\,\mathrm{d}x\mathrm{d}y$，故 $x-y$ 项直接消零，原积分化为纯粹求面积 $\iint_D \mathrm{d}x\mathrm{d}y$！
- **双轨算面积**：
  - **【解1】极坐标半域翻倍**：取 $y\le x$ 一半（$\tan\alpha=\frac{1}{3}$ 到 $\frac{\pi}{4}$），由 $\frac{1}{\sqrt{3\sin\theta\cos\theta}}\le r\le\frac{\sqrt{3}}{\sqrt{\sin\theta\cos\theta}}$ 得
    $$2\int_\alpha^{\frac{\pi}{4}}\frac{1}{2}\left(\frac{3}{\sin\theta\cos\theta}-\frac{1}{3\sin\theta\cos\theta}\right)\mathrm{d}\theta = \frac{8}{3}\ln(\tan\theta)\Big|_\alpha^{\frac{\pi}{4}} = \frac{8}{3}\ln 3.$$
  - **【解2】直角坐标在 $x=1$ 处分段**：
    $$\int_{\frac{1}{3}}^1 \mathrm{d}x\int_{\frac{1}{3x}}^{3x}\mathrm{d}y + \int_1^3 \mathrm{d}x\int_{\frac{x}{3}}^{\frac{3}{x}}\mathrm{d}y = \frac{8}{3}\ln 3.$$
- **【经典 0 分错法】**：看到 $1+x-y$ 硬拆三项分别对复杂曲边域强算，或在直角坐标下忘记两条底边在 $x=1$ 处交界（$xy=\frac{1}{3}$ 与 $y=\frac{1}{3}x$ 交于 $(1,\frac{1}{3})$）导致上下限写错全盘崩掉！

---

## 四、直通 `chapters/` 真题入口

- 二重积分全部真题训练：[19-double-integrals.md](../../../chapters/calculus/19-double-integrals.md)（重点练 [第 05 题 · 2024年（变量对称，即本课p.27）](../../../chapters/calculus/19-double-integrals.md#q05)、[第 06 题 · 2024年](../../../chapters/calculus/19-double-integrals.md#q06)、[第 01 题 · 2026年](../../../chapters/calculus/19-double-integrals.md#q01)、[第 02 题 · 2026年](../../../chapters/calculus/19-double-integrals.md#q02)、[第 03 题 · 2025年](../../../chapters/calculus/19-double-integrals.md#q03)）
