[« 函数极限与无穷小](01-limits.md)　　[连续与间断点 »](03-continuity.md)

# 高等数学 · 数列极限与求和极限

> **本章共 15 题**
> 
> - **核心必做（建议按顺序攻克关键方法）**：  
>   [第 11 题](#q11)（单调有界与反例） → [第 08 题](#q08)（认出黎曼和） → [第 07 题](#q07)（求和化积分并算完） → [第 14 题](#q14)（不等式接单调有界）
> 
> - **分流与刷题建议**：  
>   - **较难挑战**：[第 13 题](#q13)（方程实根组成数列）、[第 05 题](#q05)（隐式递推求极限）  
>   - **重在看思路**：[第 15 题](#q15)（双重求和转积分）  
>   - **首轮可跳过**：[第 03 题](#q03)、[第 09 题](#q09)（技巧较偏或综合度高，首轮不必死磕）  
>   - **题面存疑暂缓**：[第 10 题](#q10)（第二问条件与第一问最小值矛盾，待核）（原卷转写存疑，首轮暂不安排）  
> 
> - **过关目标**：先证明收敛再求极限；能把求和式整理出步长。

---

<a id="q01"></a><a id="q2025-13"></a>

### 01 · 2025年

> *和式极限填空题。提一个公因子 $\frac{1}{n}$ 出来，里面凑成 $\frac{k}{n}\ln\frac{k}{n}$，直接化成 $\int_0^1 x\ln x\,dx$ 计算。*

<img src="../bank/2025/q13.png" alt="01 (2025)" width="498" style="display: block; width: 31.14em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q02"></a><a id="q2024-4"></a>

### 02 · 2024年

> *数列发散性命题。拿最简单的振荡发散数列 $a_n = (-1)^n$ 或极限趋向 0 的数列当特例代入选项，快速排除错误项。*

<img src="../bank/2024/q04.png" alt="02 (2024)" width="571" style="display: block; width: 35.69em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q03"></a><a id="q2023-3"></a>

### 03 · 2023年

> *无穷小阶数比较。递推式 $x_{n+1}=\sin x_n$ 是经典的 $O(1/\sqrt{n})$ 级收敛，而平方迭代 $y_{n+1}=y_n^2$ 是双重指数级暴跌，谁快谁慢一眼看穿。*

<img src="../bank/2023/q03.png" alt="03 (2023)" width="781" style="display: block; width: 48.79em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q04"></a><a id="q2022-6"></a>

### 04 · 2022年

<img src="../bank/2022/q06.png" alt="04 (2022)" width="559" style="display: block; width: 34.93em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q05"></a><a id="q2018-21"></a>

### 05 · 2018年

> *递推数列攻坚大题。证单调有界：利用 $e^x-1>x$ 容易得出递减且有下界 0；求极限时两端取极限解不动点，别漏掉 $x\ge 0$ 的区间讨论。*

<img src="../bank/2018/q21.png" alt="05 (2018)" width="736" style="display: block; width: 46.0em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q06"></a><a id="q2017-3"></a>

### 06 · 2017年

<img src="../bank/2017/q03.png" alt="06 (2017)" width="364" style="display: block; width: 22.72em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q07"></a><a id="q2017-17"></a>

### 07 · 2017年

> *经典求和极限大题。提 $\frac{1}{n}$ 之后里面全写成 $\frac{k}{n}$ 的函数，转化为定积分 $\int_0^1 x\ln(1+x)\,dx$，分部积分直接拿满分。*

<img src="../bank/2017/q17.png" alt="07 (2017)" width="239" style="display: block; width: 14.97em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q08"></a><a id="q2016-10"></a>

### 08 · 2016年

<img src="../bank/2016/q10.png" alt="08 (2016)" width="523" style="display: block; width: 32.69em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q09"></a><a id="q2014-20"></a>

### 09 · 2014年

> *迭代函数列与面积极限。先由递推式求出通项 $f_n(x) = \frac{x}{1+nx}$，算定积分求出面积 $S_n$，最后算 $nS_n$ 的极限，本质是考通项化简。*

<img src="../bank/2014/q20.png" alt="09 (2014)" width="750" style="display: block; width: 46.86em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q10"></a><a id="q2013-20"></a>

### 10 · 2013年

> *第一问求导直接求最小值；第二问数列条件 $\ln x_n + 1/x_n < 1$ 表面怪异，其实就是利用第一问函数最小值卡住数列范围，用夹逼定理定极限。*

> ⚠️ **题面待核对**：原年度转写稿存在疑点，本次保留题面，作答前请核对独立原题来源。

<img src="../bank/2013/q20.png" alt="10 (2013)" width="559" style="display: block; width: 34.93em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q11"></a><a id="q2012-3"></a>

### 11 · 2012年

<img src="../bank/2012/q03.png" alt="11 (2012)" width="698" style="display: block; width: 43.66em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q12"></a><a id="q2012-10"></a>

### 12 · 2012年

<img src="../bank/2012/q10.png" alt="12 (2012)" width="471" style="display: block; width: 29.45em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q13"></a><a id="q2012-21"></a>

### 13 · 2012年

> *多项式方程唯一实根与极限。第一问连续函数零点定理结合单调性证唯一；第二问利用方程化简 $x_n = 1 - x_n^n$，分析单调有界证收敛。*

<img src="../bank/2012/q21.png" alt="13 (2012)" width="687" style="display: block; width: 42.93em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q14"></a><a id="q2011-19"></a>

### 14 · 2011年

> *调和级数与欧拉常数证明。第一问对 $\ln(1+1/n)$ 用拉格朗日；第二问利用第一问不等式直接证明数列递减且有下界，是单调有界的标准样板。*

<img src="../bank/2011/q19.png" alt="14 (2011)" width="599" style="display: block; width: 37.45em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q15"></a><a id="q2010-6"></a>

### 15 · 2010年

<img src="../bank/2010/q06.png" alt="15 (2010)" width="236" style="display: block; width: 14.76em; max-width: 100%; height: auto; margin: 14px 0;">

---

[« 函数极限与无穷小](01-limits.md)　　[连续与间断点 »](03-continuity.md)
