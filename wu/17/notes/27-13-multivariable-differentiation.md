# 专题 13：多元函数微分法（Gemini 实战版）

> **来源**：[17堂课专题13（板书）.pdf](../pdf/17堂课专题13（板书）.pdf)（27版，讲义 P130–138，PDF 共 30 页，全页视觉复核）  
> **总军规**：[武忠祥高数考研实战风格与解题军规手册](../../WU_STYLE_PLAYBOOK.md) · **考纲**：严格限定数学二（`p.4` 方程组确定隐函数明确仅数一要求，已隔离）

---

## 一、本课定调 & 第一眼路由表

**核心定调**：多元函数微分法在考场最容易算崩，不是因为不会求导，而是**没用“先代后求”白算半页纸，或者二阶链式求导时把中间变量撇掉**。记住武氏两条硬核工作流：**具体点求导先代后求，隐函数全微分用微分形式不变性**。

| 第一眼触发特征 | 首选 / 秒杀（【解1】） | 兜底通解（【解2】） | 放行红线（踩中必丢分） |
| :--- | :--- | :--- | :--- |
| **求具体点的一阶偏导 / 全微分**（`p.5–6,8`） | **先代后求**：求 $z_x(x_0,y_0)$ 先把 $y=y_0$ 代入化成一元函数 $\varphi(x)$ 再求导（或用一元导数定义） | 先求通式 $z_x(x,y)$ 再代点 $(x_0,y_0)$ | 含分式/变限积分在临界点求二阶偏导，先代变量后**建议回导数定义核查可导性**（`p.8`） |
| **求具体点的二阶混合偏导 $z_{xy}(x_0,y_0)$**（`p.16`） | 先对 $x$ 求出 $z_x(x,y)$，**再代 $x=x_0$（保留 $y$ 自由！）**，最后对 $y$ 求导并代 $y=y_0$ | 全展开二阶混合偏导公式后代 $(x_0,y_0)$ | **绝不能在求导前把 $x,y$ 两个变量同时代死**；写清 $f'_1, f'_2$ 各自位置 |
| **抽象复合函数二阶偏导**（`p.13–14`） | **树状图 + 记号 $f'_1, f'_2, f''_{11}, f''_{12}, f''_{22}$**，二阶时把 $f'_1(u,v)$ 当作新二元函数再走全链式 | 用 $\frac{\partial f}{\partial u}, \frac{\partial f}{\partial v}$ 逐步写出 | 题目未说“**二阶连续偏导**”时，$f''_{12}$ 与 $f''_{21}$ **不可直接合并**（`p.15`） |
| **变量变换化简 PDE / 反求 $f(u,v)$**（`p.17–20`） | **逆变换视角**：解出 $x=x(u,v),y=y(u,v)$，用 $z_{uv}$ 直接配凑已知方程组合（`p.18–19`） | 正向展开 $z_{xx},z_{xy},z_{yy}$ 按 $u,v$ 偏导比较系数（`p.17`） | 对二元函数做偏积分 $\int f''_{uv}\,\mathrm{d}v$ 产生的“常数”必须是**另一变量的函数 $\varphi(u)$**（`p.20`） |
| **单个方程 $F(x,y,z)=0$ 隐函数求导/全微分**（`p.22–29`） | 求 $dz$ 首选**全微分形式不变性**（方程两边取 $d$ 直接代点解 $dz$）；求二阶导对一阶等式**直接再求导**（`p.29`） | 套公式 $z_x=-\frac{F_x}{F_z}$ 或先代固定坐标化一元隐函数（`p.23`） | 必先检验**分母偏导非零**（如 $F_z\neq 0$ 或 $\varphi'\neq -1$）；若要求 $x=x(y,z)$ 则看 $F_x\neq 0$（`p.3`） |

---

## 二、核心铁律与 `→ / ↛` 概念红线 / 极简反例

### 1. 多元连续、偏导存在、可微、偏导连续的关系网（配合 `选填5 p.22–28`）
```text
一阶偏导连续  ──→  可微  ──→  连续
     ↛              │
                    └──→  偏导存在（反向均 ↛！）
```

| 命题推导方向 | 逻辑结论 | 极简反例（考研选填秒杀专用） |
| :--- | :---: | :--- |
| 沿所有直线 $y=kx$ 极限均存在且相等 $\longrightarrow$ 二重极限存在 | **`↛` 打叉** | $f(x,y)=\frac{x^2y}{x^4+y^2}$：沿任何直线极限为 $0$，但沿抛物线 $y=x^2$ 极限为 $\frac{1}{2}$。 |
| 两个累次极限存在且相等 $\longrightarrow$ 二重极限存在 | **`↛` 打叉** | $f(x,y)=\frac{xy}{x^2+y^2}\ ((x,y)\neq(0,0))$ 在 $(0,0)$ 处两累次极限均为 $0$，二重极限不存在。 |
| 二元函数连续 $\longrightarrow$ 偏导数存在 | **`↛` 打叉** | $f(x,y)=\sqrt{x^2+y^2}$ 在 $(0,0)$ 连续但两偏导不存在。 |
| 连续 且 偏导数存在 $\longrightarrow$ 可微 | **`↛` 打叉** | $f(x,y)=\sqrt{|xy|}$ 在 $(0,0)$ 连续且 $f_x(0,0)=f_y(0,0)=0$，但 $\lim_{x\to 0}\frac{|x|}{\sqrt{2}|x|}=\frac{1}{\sqrt{2}}\neq 0$ 不可微。 |
| 函数可微 $\longrightarrow$ 一阶偏导数连续 | **`↛` 打叉** | $f(x,y)=(x^2+y^2)\sin\frac{1}{\sqrt{x^2+y^2}}\ (r\neq 0), f(0,0)=0$：可微但偏导在原点震荡不连续。 |
| **可微判别式分母**写成 $\Delta x+\Delta y$ 而非 $\rho=\sqrt{\Delta x^2+\Delta y^2}$ | **`↛` 打叉** | 如 `选填5 p.26`（2012 真题）：$\lim_{(x,y)\to(0,0)}\frac{f(x,y)}{x+y}$ 存在不保证可微——其一分母在 $y=-x$ 无定义，无法约束该直线上的取值（反例：$f(x,y)=0\ (x+y\neq 0),\ f(x,-x)=x$，在 $(0,0)$ 连续且该极限为 $0$，但沿 $y=-x$ 不可微）；其二即便极限存在（如 $f(x,y)=x+y$ 极限为 $1$），亦不等于 $f(x,y)=o(\rho)$。 |

### 2. 二阶混合偏导 $f_{xy}=f_{yx}$ 的红线与 Peano 反例
- **铁律**：$f_{xy}(x_0,y_0)$ 与 $f_{yx}(x_0,y_0)$ 都存在 **$\not\to$** 二者相等；必须满足**在 $(x_0,y_0)$ 的某邻域内存在且在 $(x_0,y_0)$ 处连续**，才有 $f_{xy}(x_0,y_0)=f_{yx}(x_0,y_0)$。
- **经典 Peano 反例**：
  $$f(x,y)=\begin{cases}xy\dfrac{x^2-y^2}{x^2+y^2},&(x,y)\neq(0,0),\\ 0,&(x,y)=(0,0).\end{cases}$$
  直接按定义算得 $f_x(0,y)=-y,\ f_y(x,0)=x$，从而 $f_{xy}(0,0)=-1 \neq 1 = f_{yx}(0,0)$。
- **分段定义点混合偏导实操**（见 `选填5 p.28` 2020 数二第 5 题）：分段点处求 $f_{xy}(0,0)$，必须**先用定义写出轴上偏导函数 $f_x(0,y)$，再对 $y$ 求导**，切忌直接对非零分支表达式求导代入！

---

## 三、高频母题 & 一题多解实战拆解

### 母题 1：具体点全微分与含变限积分偏导——“先代后求”双轨示范（`p.6, 8` 例2、例3）

#### 例 2（`p.6`）：幂指型全微分 $z=\left(1+\frac{x}{y}\right)^{\frac{x}{y}}$，求 $\mathrm{d}z|_{(1,1)}$
- **【解1】先代后求（最稳防错）**：
  - 固定 $y=1$：$z(x,1)=(1+x)^x = e^{x\ln(1+x)} \implies z_x(1,1) = 2\left(\ln 2 + \frac{1}{2}\right) = 1+2\ln 2$；
  - 固定 $x=1$：$z(1,y)=\left(1+\frac{1}{y}\right)^{\frac{1}{y}}$，令 $u=\frac{1}{y}$ 得 $z_y(1,1) = (1+2\ln 2)\cdot(-1)$。
  - 故 $\mathrm{d}z|_{(1,1)} = (1+2\ln 2)(\mathrm{d}x-\mathrm{d}y)$。
- **【解2】复合微分形式不变性（3 行秒杀）**：
  令 $u=\frac{x}{y}$，则 $z=(1+u)^u=e^{u\ln(1+u)}$，直接微分：
  $$\mathrm{d}z = z'_u\,\mathrm{d}u = e^{u\ln(1+u)}\!\left[\ln(1+u)+\frac{u}{1+u}\right]\frac{y\,\mathrm{d}x-x\,\mathrm{d}y}{y^2} \implies \mathrm{d}z|_{(1,1)}=(1+2\ln 2)(\mathrm{d}x-\mathrm{d}y).$$

#### 例 3（`p.7–8`）：含变限积分求 $\left.\frac{\partial^2 F}{\partial x^2}\right|_{x=0,y=2}$，其中 $F(x,y)=\int_0^{xy}\frac{\sin t}{1+t^2}\,\mathrm{d}t$
- **【解1】** 先求 $\frac{\partial F}{\partial x}=\frac{y\sin(xy)}{1+x^2y^2}$，再对 $x$ 求导代入 $x=0,y=2$ 得 $4$。
- **【解2】先代后求 + 导数定义（防临界不可导陷阱）**：由 $\frac{\partial F}{\partial x}=\frac{y\sin(xy)}{1+x^2y^2}$，先代 $y=2$ 得 $\varphi(x)=F_x(x,2)=\frac{2\sin 2x}{1+4x^2}$，再用定义：
  $$F_{xx}(0,2)=\lim_{x\to 0}\frac{\varphi(x)-\varphi(0)}{x-0}=\lim_{x\to 0}\frac{2\sin 2x}{x(1+4x^2)}=4.$$

---

### 母题 2：抽象复合函数二阶偏导与【经典 0 分错法】（`p.13, 15–16` 例7、例9）

#### 例 7（`p.13`）：设 $z=x^3 f\!\left(xy, \frac{y}{x}\right)$，$f$ 有二阶连续偏导，求 $\frac{\partial^2 z}{\partial y^2}$ 与 $\frac{\partial^2 z}{\partial x\partial y}$
- **【规范路径】**：先算一阶 $\frac{\partial z}{\partial y} = x^4 f'_1 + x^2 f'_2$。再对 $y$ 求导时，**$f'_1$ 和 $f'_2$ 依然复合着 $(xy, \frac{y}{x})$**：
  $$\frac{\partial^2 z}{\partial y^2} = x^4\!\left(x f''_{11} + \frac{1}{x}f''_{12}\right) + x^2\!\left(x f''_{21} + \frac{1}{x}f''_{22}\right) = x^5 f''_{11} + 2x^3 f''_{12} + x f''_{22}.$$
- **【经典 0 分错法】**（`p.13` 红叉重警）：直接写成 $\frac{\partial^2 z}{\partial y^2} = x^4 f''_{11}\cdot x + x^2 f''_{22}\cdot \frac{1}{x}$，**把交叉项 $f''_{12}, f''_{21}$ 全部漏光**！

#### 例 9（`p.15–16`）：混合偏导半代值技巧
> 设 $z=f(xy, yg(x))$，$f$ 二阶连续可偏导，$g$ 可导且在 $x=1$ 处取极值 $g(1)=1$，求 $\left.\frac{\partial^2 z}{\partial x\partial y}\right|_{x=1,y=1}$。

- **【解1】全展开再代点（`p.15`）**：写出完整 $\frac{\partial z}{\partial x} = yf'_1 + yg'(x)f'_2$，再对 $y$ 求偏导展开 5 项，最后代 $x=1, y=1, g(1)=1, g'(1)=0$。
- **【解2】半先代后求秒杀（`p.16`）**：在 $\frac{\partial z}{\partial x}=yf'_1 + yg'(x)f'_2$ 中，**因为接下来对 $y$ 求偏导（此时 $x$ 固定为常数 $1$），可直接先代 $x=1$（利用 $g(1)=1, g'(1)=0$）**，式子瞬间塌缩为：
  $$z_x(1,y) = y f'_1(y,y) \implies z_{xy}(1,y) = f'_1(y,y) + y\big[f''_{11}(y,y)+f''_{12}(y,y)\big]$$
  代入 $y=1$ 秒出 $f'_1(1,1)+f''_{11}(1,1)+f''_{12}(1,1)$！

---

### 母题 3：2024 数二真题——逆变换化简偏微分方程与二元偏积分（`p.19–20` 例11）

> 已知 $f(u,v)$ 具有二阶连续偏导数，且 $g(x,y)=f(2x+y, 3x-y)$ 满足 $\frac{\partial^2 g}{\partial x^2}+\frac{\partial^2 g}{\partial x\partial y}-6\frac{\partial^2 g}{\partial y^2}=1$。  
> （I）求 $\frac{\partial^2 f}{\partial u\partial v}$；（II）若 $\frac{\partial f(u,0)}{\partial u}=ue^{-u},\ f(0,v)=\frac{1}{50}v^2-1$，求 $f(u,v)$。

- **第一眼路由**：要求的是 $f$ 对 $u,v$ 的偏导，条件却给了 $g$ 对 $x,y$ 的组合 $\implies$ **立刻反解 $x,y$ 关于 $u,v$ 的表达式，把 $f(u,v)$ 视作 $g(x,y)$ 的复合函数**！
- **【规范解答】**：
  1. 令 $u=2x+y,\ v=3x-y$，反解得 $x=\frac{1}{5}u+\frac{1}{5}v,\ y=\frac{3}{5}u-\frac{2}{5}v$，于是 $f(u,v)=g(x,y)$。
  2. 链式求导：
     $$\frac{\partial f}{\partial u} = \frac{1}{5}\frac{\partial g}{\partial x}+\frac{3}{5}\frac{\partial g}{\partial y}$$
     再对 $v$ 求偏导（$\frac{\partial x}{\partial v}=\frac{1}{5},\ \frac{\partial y}{\partial v}=-\frac{2}{5}$）：
     $$\frac{\partial^2 f}{\partial u\partial v} = \frac{1}{25}\left(\frac{\partial^2 g}{\partial x^2} + \frac{\partial^2 g}{\partial x\partial y} - 6\frac{\partial^2 g}{\partial y^2}\right) = \frac{1}{25}.$$
  3. **二元偏积分还原（`p.20` 红线）**：
     $$\frac{\partial f}{\partial u} = \int \frac{1}{25}\,\mathrm{d}v = \frac{1}{25}v + \varphi(u)$$
     代 $\frac{\partial f(u,0)}{\partial u}=ue^{-u}$ 得 $\varphi(u)=ue^{-u}$；再对 $u$ 积分：
     $$f(u,v) = \int\left(\frac{1}{25}v + ue^{-u}\right)\mathrm{d}u = \frac{1}{25}uv - (u+1)e^{-u} + \psi(v)$$
     代 $f(0,v)=-1+\psi(v)=\frac{1}{50}v^2-1 \implies \psi(v)=\frac{1}{50}v^2$，故
     $$f(u,v) = \frac{1}{25}uv + \frac{1}{50}v^2 - (u+1)e^{-u}.$$

---

### 母题 4：隐函数全微分不变性与二阶隐函数求导（`p.22–23, 29` 例1、例5）

- **例 1（`p.22–23`）**：$e^{x+2y+3z}+xyz=1$ 求 $\mathrm{d}z|_{(0,0)}$（先定 $z(0,0)=0$）。
  - **【解1】全微分不变性**：两端微分 $e^{x+2y+3z}(\mathrm{d}x+2\mathrm{d}y+3\mathrm{d}z)+yz\,\mathrm{d}x+xz\,\mathrm{d}y+xy\,\mathrm{d}z=0$，代入 $(0,0,0)$ 瞬间得 $\mathrm{d}x+2\mathrm{d}y+3\mathrm{d}z=0 \implies \mathrm{d}z|_{(0,0)}=-\frac{1}{3}(\mathrm{d}x+2\mathrm{d}y)$。
  - **【解2】先代后求**：令 $y=0$ 得 $e^{x+3z}=1$，对 $x$ 求导得 $z_x(0,0)=-\frac{1}{3}$；同理令 $x=0$ 得 $z_y(0,0)=-\frac{2}{3}$。
- **例 5（`p.29`）二阶隐函数防算崩铁律**：由 $f(y-x, yz)=0$ 求 $\frac{\partial^2 z}{\partial x^2}$。
  - 先对 $x$ 求导得一阶关系式 `①`：$-f'_1 + y f'_2 \frac{\partial z}{\partial x} = 0 \implies \frac{\partial z}{\partial x}=\frac{f'_1}{yf'_2}$。
  - **重要诀窍**：**对关系式 `①` 直接再对 $x$ 求导**（乘法法则展开），比直接对分式 $\frac{f'_1}{yf'_2}$ 用商法则求导出错率低一半！

---

## 四、直通 `chapters/` 真题入口

- 多元连续、偏导与可微概念辨析：[16-multivariable-basics.md](../../../chapters/calculus/16-multivariable-basics.md)（重点练 [第 01 题 · 2024年](../../../chapters/calculus/16-multivariable-basics.md#q01)、[第 02 题 · 2020年](../../../chapters/calculus/16-multivariable-basics.md#q02)、[第 03 题 · 2020年](../../../chapters/calculus/16-multivariable-basics.md#q03)）
- 复合求导、隐函数求导与偏微分变形：[17-chain-implicit.md](../../../chapters/calculus/17-chain-implicit.md)（重点练 [第 04 题 · 2024年（即本课例11）](../../../chapters/calculus/17-chain-implicit.md#q04)、[第 01 题 · 2026年](../../../chapters/calculus/17-chain-implicit.md#q01)、[第 03 题 · 2025年](../../../chapters/calculus/17-chain-implicit.md#q03)）
