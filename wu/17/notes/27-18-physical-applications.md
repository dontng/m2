# 专题18：微积分在物理中的应用（Gemini 实战版）

> **来源**：[17堂课专题18（板书）.pdf](../pdf/17堂课专题18（板书）.pdf)（27 版电子板书，全 23 页）｜ **对照讲义**：[专题16讲义笔记](./16-physical-handout.md) ｜ **风格基座**：[武氏实战军规手册](../../WU_STYLE_PLAYBOOK.md)  
> **考纲边界隔离**：原 PDF 第 `p.17–22` 为“**三、多元积分在物理中的应用**”（含曲线/曲面积分、三重积分质心/形心/通量，属数一专属内容），**数二考纲严格不考，本笔记已完全隔离剔除**，正文专注数二必考的 **定积分物理应用（`p.2–9`）** 与 **微分方程物理应用（`p.10–16`）**。

---

## 一、本课定调 & 第一眼路由表

物理应用大题在数二中是**拉分关键题**（如 2011 抽水、2014 质心、2015 冷却、2020 水压力）。其实物理背景全是高中水平，**核心壁垒只有两个：坐标系怎么建最省事、微元里哪一项是变量！**

| 第一眼触发特征 | 首选秒杀（解1） | 兜底通解（解2） | 放行红线（踩中即崩盘） |
| :--- | :--- | :--- | :--- |
| **变密度细棒质心**（`p.3`） | 直接套 $\bar{x}=\frac{\int_a^b x\rho(x)\,\mathrm{d}x}{\int_a^b \rho(x)\,\mathrm{d}x}$ | 分子静力矩 $M_y$ 与分母质量 $M$ 分开算再相除 | 变密度时**严禁拿区间中点代替质心**；分母质量 $\int\rho\,\mathrm{d}x$ 别算成区间长度 |
| **细杆对质点万有引力**（`p.4`） | 以杆右端为原点建轴（杆在 $[-l,0]$，质点在 $a$），微元距离 $r=a-x$ | 把杆放 $[0,l]$，质点放 $l+a$，再换元验证上下限 | 选填注意 $x$ 在负半轴时，距离是 $a-x$ 不是 $a+x$ |
| **平面板单侧水压力**（`p.5`） | **液面为 $x=0$，向下为正**；水平条宽 $l(x)$ 用相似三角形比例直出 | 以板底顶点为原点建向上轴（需写深度 $a-y$，更易错） | 深度 $h$ 与宽度 $l$ 的参考点必须统一；漏乘 $\rho g$ 直接扣分 |
| **分段容器抽水作功**（`p.9`） | **垂直 $y$ 轴取水平圆盘薄片** $\mathrm{d}V=\pi x^2(y)\,\mathrm{d}y$，提升高度 $(H_{\text{顶}}-y)$ | 对分段交界处 $y=y_0$ 分别算容积与功后相加 | 半径平方 $x^2(y)$ 在两圆弧连接处**必须分段**；**水密度 $\rho=10^3$ 别忘代或重复乘**（`p.9`） |
| **温度冷却 / 人口传播（变化率 ODE）**（`p.11–12`） | **先写变化率比例方程**（标清正负号，$k>0$）$\to$ 分离变量 $\to$ 代两次条件定 $C,k$ | 化一阶线性 ODE 套通解公式 | 题目问“**还需**多少分钟”，得出总时间 $t_0$ 后**务必减去已过时间**（`p.12`） |
| **牛顿第二定律减速滑行**（`p.13–15`） | **链式降阶微元法**：$\frac{\mathrm{d}v}{\mathrm{d}t}=v\frac{\mathrm{d}v}{\mathrm{d}x} \implies m v\frac{\mathrm{d}v}{\mathrm{d}x}=-kv \implies \mathrm{d}x=-\frac{m}{k}\mathrm{d}v$（3 行出答案！） | 先求 $v(t)=v_0 e^{-\frac{k}{m}t}$ 再对 $t\in[0,+\infty)$ 积分；或二阶常系数 ODE | 注意阻力的方向（加负号）；核对题目所给 $k$ 的量纲单位是否与 $m,v_0$ 匹配 |

---

## 二、核心铁律与 `→ / ↛` 概念红线

### 1. 物理微元建模四步军规
1. **定原点与正方向**：水压力永远以**水面为 $0$、向下为正**；抽水功以容器底/对称中心为轴，**提升距离 $= \text{出口高度} - \text{当前薄片高度}$**。
2. **写微元三要素**：$\mathrm{d}F=p\cdot\mathrm{d}A$；$\mathrm{d}W=F\cdot\mathrm{d}s$（常力微位移）或 $\rho g\cdot\text{高度}\cdot\mathrm{d}V$（抽水）。
3. **定变量范围**：截面方程只要跨曲线段（如 `p.9` 上下两段圆弧），**上下限一定拆段**。
4. **定常微分方程符号**：冷却降温和减速阻力的比例系数若写明 $k>0$，右边**必须加负号**（如 $\frac{\mathrm{d}T}{\mathrm{d}t}=-k(T-20)$）。

### 2. 常见 `→ / ↛` 与计算勘误红线

| 物理/数学判断 | 结论 | 实战警示 / 板上纠偏 |
| :--- | :--- | :--- |
| 已知 $\frac{\mathrm{d}T}{\mathrm{d}t}=-k(T-20)$，$t=0$ 为 $120^\circ\mathrm{C}$，$30\,\mathrm{min}$ 降至 $30^\circ\mathrm{C}$，求降至 $21^\circ\mathrm{C}$ **还需**时间 | **总时间 $\neq$ 还需时间** | 算出 $t_0=60\,\mathrm{min}$ 后必须减 $30\,\mathrm{min}$，答 **$30$ 分钟**（`p.12`）。 |
| `p.9`（2011 数二）抽水作功积分前已写 $10^3 g$，最终写为 $\frac{27}{8}\pi\rho g$ | **板书笔误警示** | 式中已把 $\rho=10^3$ 代入，正确结果是 $\frac{27}{8}\times 10^3\pi g = 3375\pi g\,\mathrm{J}$（`p.9` 与讲义 `p.4` 对照）。 |
| `p.7–8`（2003 打桩）已知 $\frac{1}{2}kx_n^2 = \frac{1}{2}ka^2(1+r+\dots+r^{n-1})$ | **开平方别漏根号** | 板上结果行漏印根号；严谨推导应为 $x_3=a\sqrt{1+r+r^2}$ 及上限 $\frac{a}{\sqrt{1-r}}$。 |
| `p.16`（2000 湖泊）排入含污 $\frac{V}{6}$、不含污 $\frac{V}{6}$、流出 $\frac{V}{3}$ | **总量守恒且盯紧“以内”** | 进出水量 $\frac{V}{6}+\frac{V}{6}=\frac{V}{3}$ 平衡，浓度 $\frac{m}{V}$ 均匀，故 $\frac{\mathrm{d}m}{\mathrm{d}t}=\frac{m_0}{6}-\frac{m}{3}$，解得 $t=6\ln 3$ 年。 |

---

## 三、高频母题 & 一题多解实战拆解

### 母题 1：2014 & 2020 数二高频小题——质心与水压力（`p.3, 5`）
> **【例1】（2014 年数二，`p.3`）** 一根长为 $1$ 的细棒位于 $x$ 轴区间 $[0,1]$ 上，线密度 $\rho(x)=-x^2+2x+1$，则质心横坐标 $\bar{x}=\underline{\qquad}$。

- **【秒杀算式】**：
  $$\bar{x}=\frac{\int_0^1 x(-x^2+2x+1)\,\mathrm{d}x}{\int_0^1(-x^2+2x+1)\,\mathrm{d}x} = \frac{\left[-\frac{x^4}{4}+\frac{2x^3}{3}+\frac{x^2}{2}\right]_0^1}{\left[-\frac{x^3}{3}+x^2+x\right]_0^1} = \frac{\frac{11}{12}}{\frac{5}{3}} = \frac{11}{20}.$$

> **【例3】（2020 年数二，`p.5`）** 斜边长为 $2a$ 的等腰直角三角形平板铅直沉没水中，斜边与水面齐，水密度 $\rho$，重力加速度 $g$，求一侧所受水压力 $F$。

- **【建轴微元秒杀】**：以斜边中点为原点，**垂直液面向下为 $x$ 正方向**。等腰直角三角形斜边高为 $a$，在深度 $x\in[0,a]$ 处水平条宽 $l(x)=2(a-x)$（由相似比 $\frac{l}{2a}=\frac{a-x}{a}$），故压力微元 $\mathrm{d}F=\rho g x\cdot 2(a-x)\,\mathrm{d}x$：
  $$F = 2\rho g\int_0^a x(a-x)\,\mathrm{d}x = 2\rho g\left[\frac{a x^2}{2}-\frac{x^3}{3}\right]_0^a = \frac{1}{3}\rho g a^3.$$

---

### 母题 2：2011 数二真题——分段容器抽水作功（`p.9`）
> **【例6】（2011 年数二，`p.9`）** 容器内侧由曲线 $x^2+y^2=2y\ (y\ge\frac{1}{2})$ 与 $x^2+y^2=1\ (y\le\frac{1}{2})$ 绕 $y$ 轴旋转而成。（I）求容积 $V$；（II）盛满水从顶部全部抽出至少需做多少功？（长度 $\mathrm{m}$，水密度 $10^3\,\mathrm{kg/m^3}$）

- **【解析】**：
  - **(I) 容积（利用两球关于 $y=\frac{1}{2}$ 对称！）**：
    下球冠 $y\in[-1,\frac{1}{2}]$ 与上球冠 $y\in[\frac{1}{2},2]$ 完全对称！故
    $$V = 2\pi\int_{-1}^{\frac{1}{2}}(1-y^2)\,\mathrm{d}y = 2\pi\left[y-\frac{y^3}{3}\right]_{-1}^{\frac{1}{2}} = \frac{9\pi}{4}\,\mathrm{m}^3.$$
  - **(II) 抽水功（注意提升高度均为 $2-y$，不能合并对称！）**：
    $$\begin{aligned}
    W &= 10^3 g\pi\int_{-1}^{\frac{1}{2}}(1-y^2)(2-y)\,\mathrm{d}y + 10^3 g\pi\int_{\frac{1}{2}}^2 (2y-y^2)(2-y)\,\mathrm{d}y \\
    &= \frac{27}{8}\times 10^3 \pi g = 3375\pi g\,\mathrm{J}.
    \end{aligned}$$

---

### 母题 3：2015 数二真题——牛顿冷却定律 ODE（`p.12`）
> **【例2】（2015 年数二，`p.12`）** 物体温度变化率与物体、介质温差成正比。初温 $120^\circ\mathrm{C}$ 置于 $20^\circ\mathrm{C}$ 恒温介质，$30\,\mathrm{min}$ 降至 $30^\circ\mathrm{C}$，继续降至 $21^\circ\mathrm{C}$ **还需**多少分钟？

- **【完整解法】**：设 $t\,\mathrm{min}$ 时温度 $T(t)$，列 ODE：
  $$\frac{\mathrm{d}T}{\mathrm{d}t} = -k(T-20)\ (k>0) \implies T(t)=20+Ce^{-kt}.$$
  代入 $T(0)=120 \implies C=100$；代入 $T(30)=30 \implies 100e^{-30k}=10 \implies e^{-30k}=\frac{1}{10}$。
  令 $T(t_0)=21 \implies 100e^{-kt_0}=1 \implies (e^{-30k})^{t_0/30}=10^{-2} \implies 10^{-t_0/30}=10^{-2} \implies t_0=60\,\mathrm{min}$。
  **关键减法**：还需时间 $= 60 - 30 = 30\,\mathrm{min}$。

---

### 母题 4：一题三解典范——飞机降落减速滑行（2004 年数一/二，`p.13–15`）
> **【例3】（2004 年 1,2，`p.13–15`）** 飞机质量 $m=9000\,\mathrm{kg}$，着陆速度 $v_0=700\,\mathrm{km/h}$，所受总阻力与速度成正比（$k=6.0\times 10^6$，题设单位匹配）。求飞机滑行最长距离。

- **【解1】链式降阶微元法（考场最神速，`p.13`）**：
  由牛顿第二定律 $m\frac{\mathrm{d}v}{\mathrm{d}t}=-kv$，改写 $\frac{\mathrm{d}v}{\mathrm{d}t}=\frac{\mathrm{d}v}{\mathrm{d}x}\cdot\frac{\mathrm{d}x}{\mathrm{d}t}=v\frac{\mathrm{d}v}{\mathrm{d}x}$，消去 $v$（停下前 $v>0$）：
  $$mv\frac{\mathrm{d}v}{\mathrm{d}x} = -kv \implies \mathrm{d}x = -\frac{m}{k}\mathrm{d}v.$$
  两端积分并代入 $x(0)=0,\ v(0)=v_0$，得 $x(t)=\frac{m}{k}[v_0-v(t)]$。当 $v(t)\to 0$ 时，
  $$x_{\max} = \frac{mv_0}{k} = \frac{9000\times 700}{6.0\times 10^6} = 1.05\,\mathrm{km}.$$
- **【解2】先求 $v(t)$ 再作反常积分（`p.14`）**：
  $m\frac{\mathrm{d}v}{\mathrm{d}t}=-kv \implies v(t)=v_0 e^{-\frac{k}{m}t}$，最长距离 $x=\int_0^{+\infty}v_0 e^{-\frac{k}{m}t}\,\mathrm{d}t = \frac{mv_0}{k}=1.05\,\mathrm{km}$。
- **【解3】二阶常系数齐次 ODE 兜底（`p.15`）**：
  $m\ddot{x}+k\dot{x}=0$，特征根 $r_1=0,\ r_2=-\frac{k}{m}$，通解 $x(t)=C_1+C_2 e^{-\frac{k}{m}t}$。代入 $x(0)=0,\ \dot{x}(0)=v_0$ 解得 $x(t)=\frac{mv_0}{k}(1-e^{-\frac{k}{m}t}) \xrightarrow{t\to+\infty} 1.05\,\mathrm{km}$。

---

## 四、直通 `chapters/` 真题入口

- **定积分物理应用真题（2020 水压力、2014 质心、2011 抽水）**：[13-integral-applications.md](../../../chapters/calculus/13-integral-applications.md)（[q2020-12](../../../chapters/calculus/13-integral-applications.md#q2020-12)、[q2014-13](../../../chapters/calculus/13-integral-applications.md#q2014-13)、[q2011-20](../../../chapters/calculus/13-integral-applications.md#q2011-20)）
- **一阶微分方程物理建模（2015 冷却模型）**：[14-first-order-ode.md](../../../chapters/calculus/14-first-order-ode.md)（[q2015-20](../../../chapters/calculus/14-first-order-ode.md#q2015-20)、[q2025-15](../../../chapters/calculus/14-first-order-ode.md#q2025-15)）
- **二阶常系数 ODE 联动**：[15-higher-order-ode.md](../../../chapters/calculus/15-higher-order-ode.md#q2026-2)
