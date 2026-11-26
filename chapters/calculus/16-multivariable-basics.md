[« 高阶微分方程](15-higher-order-ode.md)　　[多元复合函数与隐函数求导 »](17-chain-implicit.md)

# 高等数学 · 多元函数极限、偏导与全微分

> **本章共 7 题**
> 
> - **核心必做（建议按顺序攻克关键方法）**：  
>   [第 06 题](#q06)（偏导计算基本功） → [第 03 题](#q03)（写全微分） → [第 05 题](#q05)（由全微分还原函数） → [第 01 题](#q01)（可微不要求偏导连续）
> 
> - **分流与刷题建议**：  
>   - **较难挑战**：[第 04 题](#q04)（偏导符号比较函数值）  
>   - **重在看思路**：[第 02 题](#q02)（分段点偏导与累次极限）  
> 
> - **过关目标**：分清偏导存在、偏导连续和可微；分段点先用定义。

---

<a id="q01"></a><a id="q2024-5"></a>

### 01 · 2024年

> *分段函数可微性判定。在 $(0,0)$ 处求偏导必须用定义算；判定可微性时验证极限 $\lim \frac{\Delta z - f_x \Delta x - f_y \Delta y}{\rho} = 0$，放缩后极坐标逼近。*

<img src="../bank/2024/q05.png" alt="01 (2024)" width="607" style="display: block; width: 37.97em; max-width: 100%; height: auto; margin: 14px 0;">

<details>
<summary>答案与解析</summary>

**触发条件与第一步**

函数在 $xy=0$（即整条 $x$ 轴与 $y$ 轴）上分段定义为 $0$，询问在 $(0,0)$ 处 $\frac{\partial f}{\partial x}$ 的连续性与 $f$ 的可微性。**第一笔必须先用偏导定义算 $f_x(0,0)$ 和 $f_y(0,0)$**，绝不能直接对 $(x^2+y^2)\sin\frac{1}{xy}$ 求导后代 $(0,0)$。

**完整推演**

1. **按定义求 $(0,0)$ 处的一阶偏导数**：
   因为当 $y=0$ 时 $xy=0$，恒有 $f(x,0)=0$；当 $x=0$ 时 $xy=0$，恒有 $f(0,y)=0$。故
   $$f_x(0,0) = \lim_{x\to 0}\frac{f(x,0)-f(0,0)}{x} = \lim_{x\to 0}\frac{0-0}{x} = 0,$$
   $$f_y(0,0) = \lim_{y\to 0}\frac{f(0,y)-f(0,0)}{y} = \lim_{y\to 0}\frac{0-0}{y} = 0.$$
2. **按定义检验 $f$ 在 $(0,0)$ 处的可微性**：
   线性主部为 $f_x(0,0)x + f_y(0,0)y = 0$，检验余项与 $\rho = \sqrt{x^2+y^2}$ 之比的极限：
   $$\frac{f(x,y) - f(0,0) - f_x(0,0)x - f_y(0,0)y}{\sqrt{x^2+y^2}} = \frac{f(x,y)}{\sqrt{x^2+y^2}}.$$
   分两类点估计绝对值（$(x,y)\neq (0,0)$）：
   - 当 $xy \neq 0$ 时：
     $$\left|\frac{f(x,y)}{\sqrt{x^2+y^2}}\right| = \sqrt{x^2+y^2}\left|\sin\frac{1}{xy}\right| \le \sqrt{x^2+y^2};$$
   - 当 $xy = 0$ 时：$\left|\frac{f(x,y)}{\sqrt{x^2+y^2}}\right| = 0 \le \sqrt{x^2+y^2}$。

   因此对一切 $(x,y) \neq (0,0)$ 都有 $0 \le \left|\frac{f(x,y)}{\sqrt{x^2+y^2}}\right| \le \sqrt{x^2+y^2} \to 0$（当 $(x,y)\to(0,0)$）。由夹逼准则，极限为 $0$，故 **$f$ 在 $(0,0)$ 处可微**。
3. **检验 $\frac{\partial f}{\partial x}$ 在 $(0,0)$ 处的连续性**：
   在 $xy \neq 0$ 的区域内直接求偏导：
   $$f_x(x,y) = 2x\sin\frac{1}{xy} + (x^2+y^2)\cos\frac{1}{xy}\cdot\left(-\frac{1}{x^2 y}\right) = 2x\sin\frac{1}{xy} - \frac{x^2+y^2}{x^2 y}\cos\frac{1}{xy}.$$
   取趋近路径 $y = x \to 0$（满足 $xy = x^2 \neq 0$）：
   $$f_x(x,x) = 2x\sin\frac{1}{x^2} - \frac{2}{x}\cos\frac{1}{x^2}.$$
   再取点列 $x_n = \frac{1}{\sqrt{2n\pi}} \to 0$，则 $\sin\frac{1}{x_n^2}=0$，$\cos\frac{1}{x_n^2}=1$，得
   $$f_x(x_n, x_n) = -2\sqrt{2n\pi} \to -\infty \neq 0 = f_x(0,0).$$
   因此 $\lim_{(x,y)\to(0,0)} f_x(x,y)$ 不存在，**$\frac{\partial f}{\partial x}$ 在 $(0,0)$ 处不连续**。

综上，选 **（C）**。

**选择题干扰项拆解**

- **（D）$\frac{\partial f}{\partial x}$ 不连续，$f$ 不可微（最大陷阱）**：先算出 $f_x$ 不连续后，误以为“偏导不连续 $\implies$ 不可微”，把充分条件当成了充要条件。
- **（A）$\frac{\partial f}{\partial x}$ 连续，$f$ 可微**：先证出 $f$ 可微后，反推误以为“可微 $\implies$ 偏导连续”。
- **（B）$\frac{\partial f}{\partial x}$ 连续，$f$ 不可微**：由本题关于 $x,y$ 的对称性，若 $f_x$ 在 $(0,0)$ 连续则 $f_y$ 也必在 $(0,0)$ 连续，从而 $f$ 必可微，选项本身与定理矛盾，可直接秒排。

</details>

---

<a id="q02"></a><a id="q2020-5"></a>

### 02 · 2020年

> *多命题反例辨析。二阶混合偏导相等要求连续，二元极限存在比累次极限强得多。拿经典马鞍面或分段函数逐条对准性质检验。*

<img src="../bank/2020/q05.png" alt="02 (2020)" width="730" style="display: block; width: 45.62em; max-width: 100%; height: auto; margin: 14px 0;">

<details>
<summary>答案与解析</summary>

**答案 B，①③④成立。** 沿横轴 $f(x,0)=x$，故 $f_x(0,0)=1$。固定 $x\ne0$ 时，$\lim_{y\to0}f(x,y)=0\ne f(x,0)$，所以沿横轴附近 $f_y(x,0)$ 不存在，无法再对 $x$ 求导。三种分支在趋于原点时都趋于 0；固定 $y\ne0$ 的内层极限也为 0，故累次极限为 0。

</details>

---

<a id="q03"></a><a id="q2020-11"></a>

### 03 · 2020年

<img src="../bank/2020/q11.png" alt="03 (2020)" width="497" style="display: block; width: 31.03em; max-width: 100%; height: auto; margin: 14px 0;">

<details>
<summary>答案与解析</summary>

- **先代点算中间值提速**：令 $u = xy + \sin(x+y)$，在 $(0,\pi)$ 处 $u(0,\pi) = 0 + \sin\pi = 0$，故外层导数 $\frac{1}{1+u^2} = 1$。
- **算偏导（可先代另一变量）**：
  - $u_x(0,\pi) = \left.[y + \cos(x+y)]\right|_{(0,\pi)} = \pi + \cos\pi = \pi - 1$；
  - $u_y(0,\pi) = \left.[x + \cos(x+y)]\right|_{(0,\pi)} = 0 + \cos\pi = -1$。
- **答案**：$\left.\mathrm{d}z\right|_{(0,\pi)} = (\pi - 1)\mathrm{d}x - \mathrm{d}y$（注意不能漏写 $\mathrm{d}x, \mathrm{d}y$）。

</details>

---

<a id="q04"></a><a id="q2017-5"></a>

### 04 · 2017年

<img src="../bank/2017/q05.png" alt="04 (2017)" width="601" style="display: block; width: 37.55em; max-width: 100%; height: auto; margin: 14px 0;">

<details>
<summary>答案与解析</summary>

**答案 D。** 固定 $y=1$，沿 $x$ 正向走有 $f(0,1)<f(1,1)$；固定 $x=1$，沿 $y$ 负向走有 $f(1,1)<f(1,0)$。$(0,0)$ 到 $(1,1)$ 时两个坐标的影响相反，大小不能由偏导符号决定。

</details>

---

<a id="q05"></a><a id="q2017-12"></a>

### 05 · 2017年

<img src="../bank/2017/q12.png" alt="05 (2017)" width="713" style="display: block; width: 44.59em; max-width: 100%; height: auto; margin: 14px 0;">

<details>
<summary>答案与解析</summary>

**答案 $f=xye^y$。** 给定微分正好等于 $d(xye^y)$。或者对 $f_x=ye^y$ 积分，得到 $xye^y+C(y)$，再核对 $f_y$ 得 $C'=0$，由 $f(0,0)=0$ 定常数。

</details>

---

<a id="q06"></a><a id="q2016-6"></a>

### 06 · 2016年

<img src="../bank/2016/q06.png" alt="06 (2016)" width="543" style="display: block; width: 33.93em; max-width: 100%; height: auto; margin: 14px 0;">

<details>
<summary>答案与解析</summary>

**触发条件与第一步**

看到分母是 $x-y$、分子只含 $e^x$，第一笔直接分别求 $f'_x$ 与 $f'_y$，重点盯住分母求导后的 $\frac{e^x}{(x-y)^2}$ 项符号，看两者相加还是相减能把二次分母消掉。

**完整推演**

1. **对 $x$ 求偏导**（把 $y$ 视为常数，用商的求导法则）：
   $$f'_x = \frac{e^x(x-y) - e^x \cdot 1}{(x-y)^2} = \frac{e^x}{x-y} - \frac{e^x}{(x-y)^2} = f - \frac{e^x}{(x-y)^2}.$$
2. **对 $y$ 求偏导**（把 $x$ 视为常数，注意链式法则里 $\frac{\partial (x-y)}{\partial y} = -1$）：
   $$f'_y = e^x \cdot \left(-\frac{1}{(x-y)^2}\right)\cdot (-1) = \frac{e^x}{(x-y)^2}.$$
3. **两式相加消去二次分母**：
   $$f'_x + f'_y = \left(f - \frac{e^x}{(x-y)^2}\right) + \frac{e^x}{(x-y)^2} = f.$$

故正确选项为 **（D）**。

**选择题干扰项拆解**

- **（C）$f'_x - f'_y = f$（最高频错选）**：算 $f'_y$ 时漏乘了内层导数 $-1$，把 $f'_y$ 算成了 $-\frac{e^x}{(x-y)^2}$，进而凑出 $f'_x - f'_y = f$。
- **（B）$f'_x + f'_y = 0$**：对 $x$ 求导时只求了分母 $(x-y)^{-1}$ 而漏了对分子 $e^x$ 求导。
- **（A）$f'_x - f'_y = 0$**：同时漏掉了分子求导与 $f'_y$ 的负号。

</details>

---

<a id="q07"></a><a id="q2012-5"></a>

### 07 · 2012年

<img src="../bank/2012/q05.png" alt="07 (2012)" width="777" style="display: block; width: 48.55em; max-width: 100%; height: auto; margin: 14px 0;">

<details>
<summary>答案与解析</summary>

**答案 D。** $f$ 随 $x$ 严格增加，随 $y$ 严格减少。若 $x_1<x_2,y_1>y_2$，先增 $x$ 再减 $y$，每一步都使函数值增加。两个坐标的作用相反时，不能只靠偏导符号比较。

</details>

---

[« 高阶微分方程](15-higher-order-ode.md)　　[多元复合函数与隐函数求导 »](17-chain-implicit.md)
