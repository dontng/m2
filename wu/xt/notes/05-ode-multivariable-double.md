# 选填题（5）：微分方程、多元微分与二重积分（Gemini 实战版）

> **来源**：[26选填题（5）板书.pdf](../pdf/26选填题（5）板书.pdf)（共 79 页，含 **57 处**真题标注——全套选填真题密度最高，GPT 旧稿仅看 4 页，本版补齐全册实证）  
> **适用考纲**：考研数学二 · 第四章（ODE）+ 第五章（多元微分）+ 第六章（二重积分）  
> **配套军规**：[武忠祥高数考研实战风格与解题军规手册](../../WU_STYLE_PLAYBOOK.md)

---

## 一、本课定调 & 选填第一眼秒杀路由表

本册一网打尽数二后半程三大模块的全部选填套路：微分方程特解/有界性、多元概念五角辨析与一点隐函数求导、二重积分换序与对称比较。

| 第一眼触发特征 | 【解1】首选 / 秒杀路由 | 【解2】直接法严谨兜底 | 放行红线（0 分雷区） |
| :--- | :--- | :--- | :--- |
| **$y'=f(x+y)$ 等组合代换 ODE** | 设 $u=x+y$ 化可分离；或看成 $x$ 关于 $y$ 的函数（`p.11`） | 分离变量积分后再代初值定 $C$ | 令 $u=x+y$ 后 **$u'=1+y'$**，切勿漏掉 $1$ |
| **二阶常系数齐次 ODE 在 $(-\infty,+\infty)$ 有界** | 锁定**共轭纯虚根**（实部为 $0$ 且无重零根，$\alpha=0,\beta\ne 0$，`p.21`） | 按 $\Delta>0,\ =0,\ <0$ 三分支写出通解看 $\pm\infty$ 趋势 | **不能只看 $x\to+\infty$**；重零根 $C_1+C_2x$ 无界（`p.21`） |
| **分段二元函数判连续 / 偏导 / 混偏 / 可微** | **画坐标轴分布图**先标非坐标轴与两轴表达式，先查定义（`p.28`） | 沿直线 $y=kx$、抛物线 $y=x^2$ 试探；按 $\rho\to 0$ 验可微 | 累次存在相等 $\not\to$ 二重极限；$f_{xy},f_{yx}$ 未必存在或相等 |
| **隐函数求一点一阶偏导 / 全微分判极值** | **先代点定出隐变量 $z_0$ 再求偏导**（`p.47`）；全微分凑原函数（`p.55`） | 全微分形式不变性或 $AC-B^2$ 判别法 | 不可先全代常数再求导；$AC-B^2=0$ 须回归**定义** |
| **变上限二次积分求导 / 累次交换次序** | **画区域草图 $\to$ 换序把参数 $t$ 放到外层上限**再求导（`p.67`） | 写出不等式组用垂直/水平穿线互换 | **严禁不换序直接对内外限分别求导**（`p.67`） |
| **对称域二重积分 / 同域比大小** | 域关于 $y=x$ 对称且含抽象 $f$：**排除法取 $f\equiv 1$**；比大小**代极值点**（`p.70,75`） | 轮换对称取平均；在区域上做被积函数放缩 | 区域轮换对称须域与 $y=x$ 对称；比大小需查**区域上每一点** |

---

## 二、核心 `→ / ↛` 概念红线 & 极简反例库

| 命题推导方向 | 逻辑结论 | 武氏极简反例 / 板书实证 |
| :--- | :---: | :--- |
| 二阶 ODE 通解在 $(-\infty,+\infty)$ 全有界 | **充要特征根** | **共轭纯虚根**（$r^2+ar+b=0 \implies a=0,\ b>0$）；若 $a=b=0$ 则通解 $C_1+C_2x$ 无界（`p.21`）。 |
| 二元函数累次极限存在且相等 $\longrightarrow$ 二重极限存在 | **`↛` 打叉** | 反例：$f(x,y)=\frac{xy}{x^2+y^2}\ ((x,y)\ne(0,0))$ 沿 $y=kx$ 极限随 $k$ 变（`p.22–23`）。 |
| 二元函数连续 $\longrightarrow$ 偏导存在；偏导存在 $\longrightarrow$ 连续 | **双向皆 `↛`** | $\sqrt{x^2+y^2}$ 连续但无偏导；$\frac{xy}{x^2+y^2}$（原点补 $0$）偏导皆 $0$ 但不连续（`p.22–23`）。 |
| 连续且两偏导存在 $\longrightarrow$ 可微 | **`↛` 打叉** | 反例：$f(x,y)=\sqrt{\|xy\|}$ 在 $(0,0)$ 连续且偏导为 $0$，但沿 $y=x$ 不可微；**偏导连续 $\to$ 可微**。 |
| 混合偏导 $f_{xy},f_{yx}$ 存在 $\longrightarrow f_{xy}=f_{yx}$ | **`↛` 打叉** | Peano 反例 $xy\frac{x^2-y^2}{x^2+y^2}$ 补 $0$ 使 $f_{xy}(0,0)=-1\neq 1=f_{yx}(0,0)$；另有分段函数直接致 $f_{xy}(0,0)$ 不存在（`p.28`）。 |

---

## 三、高频选填母题双轨拆解

### 母题 1：二阶常系数齐次 ODE 全实轴有界（2023 年 1,2,3 · `p.21` 例 8）
> 若微分方程 $y''+ay'+by=0$ 的解在 $(-\infty,+\infty)$ 上有界，则（　）  
> （A）$a<0,b>0$　（B）$a>0,b>0$　（C）$a=0,b>0$　（D）$a=0,b<0$

- **【解1 · 考场 5 秒定位特征根（`p.21`）】**：
  - 实特征根 $r\neq 0$ 时，$e^{rx}$ 在 $+\infty$ 或 $-\infty$ 必有一端趋 $+\infty$ 无界；
  - 重实根（含重零根 $r_1=r_2=0$）带出 $x$ 因子 $e^{rx}(C_1+C_2x)$，全实轴无界；
  - 唯共轭复根 $r_{1,2}=\alpha\pm i\beta$ 且 $\alpha=-\frac{a}{2}=0,\ \Delta=a^2-4b<0$，即 **$a=0,\ b>0$** 时通解为 $C_1\cos\beta x+C_2\sin\beta x$ 全实轴有界 → 选 **（C）**！

### 母题 2：分段二元函数与混合偏导定义（2020 年 2 · `p.28` 例 5）
> 关于函数 $f(x,y)=\begin{cases}xy,& xy\ne 0,\\ x,& y=0,\\ y,& x=0,\end{cases}$ 给出结论：① $\frac{\partial f}{\partial x}\big|_{(0,0)}=1$；② $\frac{\partial^2 f}{\partial x\partial y}\big|_{(0,0)}=1$；③ $\lim_{(x,y)\to(0,0)}f(x,y)=0$；④ $\lim_{y\to 0}\lim_{x\to 0}f(x,y)=0$，正确个数为（　）  
> （A）$4$　（B）$3$　（C）$2$　（D）$1$

- **【解1 · 画轴直接定义判定（`p.28`）】**：
  - ① $\frac{\partial f}{\partial x}\big|_{(0,0)}=\lim_{x\to 0}\frac{f(x,0)-f(0,0)}{x}=\lim_{x\to 0}\frac{x}{x}=1$（✓）；
  - ② 当 $y\ne 0$ 时，$f_x(0,y)=\lim_{x\to 0}\frac{f(x,y)-f(0,y)}{x}=\lim_{x\to 0}\frac{xy-y}{x}$ **不存在**，故 $\frac{\partial^2 f}{\partial x\partial y}\big|_{(0,0)}=\lim_{y\to 0}\frac{f_x(0,y)-f_x(0,0)}{y}$ **不存在**（✗）；
  - ③ $|f(x,y)|\le |x|+|y|+|xy|\to 0$（✓）；④ $\lim_{y\to 0}\lim_{x\to 0}f(x,y)=\lim_{y\to 0}y=0$（✓）。
  - 正确 3 个 → 选 **（B）**。

### 母题 3：全微分反求极值双轨（2009 年 2 · `p.55` 例 3）
> 设函数 $z=f(x,y)$ 的全微分为 $\mathrm{d}z=x\,\mathrm{d}x+y\,\mathrm{d}y$，则点 $(0,0)$（　）  
> （A）不是连续点　（B）不是极值点　（C）是极大值点　（D）是极小值点

- **【解1 · 排除/凑全微分秒杀（`p.55` 解 2）】**：$\mathrm{d}z=\mathrm{d}\left(\frac{1}{2}x^2+\frac{1}{2}y^2\right)\implies z=\frac{1}{2}(x^2+y^2)+C$，一眼看出在 $(0,0)$ 取严格极小值 → 选 **（D）**！
- **【解2 · 直接法兜底（`p.55` 解 1）】**：$z_x=x,\ z_y=y \implies z_x(0,0)=z_y(0,0)=0$，且 $A=z_{xx}=1,\ B=z_{xy}=0,\ C=z_{yy}=1$，$AC-B^2=1>0$ 且 $A>0 \implies$ 极小值点。

### 母题 4：变限二次积分先换序再求导（2021 年 2 · `p.67` 例 7）
> 已知函数 $f(t)=\int_1^{t^2}\mathrm{d}x\int_{\sqrt{x}}^t \sin\dfrac{x}{y}\,\mathrm{d}y$，则 $f'\left(\dfrac{\pi}{2}\right)=$ ______。

- **【解1 · 换序剥离外层 $t$（`p.67`）】**：
  - 积分域为 $1\le x\le t^2,\ \sqrt{x}\le y\le t$（$t>1$ 时等价于 $1\le y\le t,\ 1\le x\le y^2$）。
  - 换序得 $f(t)=\int_1^t \mathrm{d}y\int_1^{y^2}\sin\frac{x}{y}\,\mathrm{d}x$，直接按变上限求导：
    $$f'(t)=\int_1^{t^2}\sin\frac{x}{t}\,\mathrm{d}x \implies f'\left(\frac{\pi}{2}\right)=\int_1^{\frac{\pi^2}{4}}\sin\frac{2x}{\pi}\,\mathrm{d}x = \left[-\frac{\pi}{2}\cos\frac{2x}{\pi}\right]_1^{\frac{\pi^2}{4}}=\frac{\pi}{2}\cos\frac{2}{\pi}。$$
- **【经典 0 分坑】**：不换序直接把外限 $t^2$ 与内限 $t$ 乱套偏导求导，导致漏掉变域耦合项直接 0 分。

### 母题 5：对称域抽象被积函数 & 二重积分比大小（`p.70` 例 1 & `p.75` 例 1）
- **对称域抽象题（`p.70`）**：$D=\{(x,y)\mid x^2+y^2\le 4,\ x\ge 0,\ y\ge 0\}$，求 $\iint_D\frac{a\sqrt{f(x)}+b\sqrt{f(y)}}{\sqrt{f(x)}+\sqrt{f(y)}}\,\mathrm{d}\sigma$。
  - **【解1 · 排除法秒杀】**：取 $f(x)\equiv 1$ 立刻算出 $\frac{a+b}{2}\pi$ 选 **（D）**；**【解2 · 轮换对称兜底】**：$D$ 关于 $y=x$ 对称，交换 $x\leftrightarrow y$ 相加除 $2$ 得 $\frac{1}{2}\iint_D(a+b)\,\mathrm{d}\sigma=\frac{a+b}{2}\pi$。
- **菱形域比大小（2019 年 2 · `p.75`）**：$D=\{(x,y)\mid |x|+|y|\le\frac{\pi}{2}\}$，比较 $I_1=\iint_D\sqrt{x^2+y^2}\,\mathrm{d}\sigma$、$I_2=\iint_D\sin\sqrt{x^2+y^2}\,\mathrm{d}\sigma$、$I_3=\iint_D(1-\cos\sqrt{x^2+y^2})\,\mathrm{d}\sigma$。
  - **【解1 · 同域比较】**：在 $D$ 上 $r=\sqrt{x^2+y^2}\in[0,\frac{\pi}{2}]$，有 $1-\cos r\le 1-\cos^2 r=\sin^2 r\le\sin r\le r$，故 $I_3<I_2<I_1$（选 **（A）**）；**【解2 · 代点秒排】**：取 $r=\frac{\pi}{2}$ 得 $\frac{\pi}{2}>1$ 立刻排掉不满足 $I_1$ 最大的选项。

---

## 四、直通 `chapters/` 真题入口

- [第十四章 · 一阶微分方程](../../../chapters/calculus/14-first-order-ode.md)（重点对照：[2024-13](../../../chapters/calculus/14-first-order-ode.md#q2024-13)）
- [第十五章 · 高阶微分方程](../../../chapters/calculus/15-higher-order-ode.md)（重点对照：[2023-4](../../../chapters/calculus/15-higher-order-ode.md#q2023-4)）
- [第十六章 · 多元函数连续、偏导与可微](../../../chapters/calculus/16-multivariable-basics.md)（重点对照：[2020-5](../../../chapters/calculus/16-multivariable-basics.md#q2020-5)、[2020-11](../../../chapters/calculus/16-multivariable-basics.md#q2020-11)）
- [第十七章 · 复合求导与隐函数偏导](../../../chapters/calculus/17-chain-implicit.md)（重点对照：[2024-20](../../../chapters/calculus/17-chain-implicit.md#q2024-20)、[2018-13](../../../chapters/calculus/17-chain-implicit.md#q2018-13)）
- [第十八章 · 多元函数极值与最值](../../../chapters/calculus/18-multivariable-extrema.md)（重点对照：[2024-12](../../../chapters/calculus/18-multivariable-extrema.md#q2024-12)）
- [第十九章 · 二重积分](../../../chapters/calculus/19-double-integrals.md)（重点对照：[2024-6](../../../chapters/calculus/19-double-integrals.md#q2024-6)、[2022-2](../../../chapters/calculus/19-double-integrals.md#q2022-2)）
