[« 线性方程组](04-linear-systems.md)　　[二次型 »](06-quadratic-forms.md)

# 线性代数 · 特征值、特征向量与相似

> **本章共 22 题**
> 
> - **核心必做（建议按顺序攻克关键方法）**：  
>   [第 13 题](#q13)（特征向量反求参数） → [第 07 题](#q07)（特征向量与对角元对应） → [第 04 题](#q04)（完整做一遍相似对角化） → [第 06 题](#q06)（重根与可对角化条件）
> 
> - **分流与刷题建议**：  
>   - **较难挑战**：[第 15 题](#q15)（对角化求高次幂及递推）  
>   - **重在看思路**：[第 17 题](#q17)（从三阶计算过渡到一般阶证明）  
>   - **首轮可跳过**：[第 03 题](#q03)、[第 09 题](#q09)、[第 10 题](#q10)（技巧较偏或综合度高，首轮不必死磕）  
>   - **题面存疑暂缓**：[第 05 题](#q05)（题面已有核对标记）、[第 11 题](#q11)（相似关系右端排成列向量，维度待核）（原卷转写存疑，首轮暂不安排）  
> 
> - **过关目标**：能求特征值、解特征向量并拼出可逆矩阵；重根要查向量个数。

---

<a id="q01"></a><a id="q2026-10"></a>

### 01 · 2026年

> *反交换矩阵特征值性质题。由 $AB+BA=O$ 得 $AB=-BA$。利用特征值迹或行列式反号性质，或乘特征向量分析对称分布，迅速排除错误项。*

<img src="../bank/2026/q10.png" alt="01 (2026)" width="723" style="display: block; width: 45.17em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q02"></a><a id="q2025-8"></a>

### 02 · 2025年

> *实对称矩阵相似与行列式。实对称矩阵必可正交对角化。利用特征多项式或迹与行列式性质，建立 $a, b$ 的方程直接定解。*

<img src="../bank/2025/q08.png" alt="02 (2025)" width="729" style="display: block; width: 45.55em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q03"></a><a id="q2024-10"></a>

### 03 · 2024年

<img src="../bank/2024/q10.png" alt="03 (2024)" width="759" style="display: block; width: 47.45em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q04"></a><a id="q2023-22"></a>

### 04 · 2023年

> *向量外积型矩阵幂。条件是 $Ax = (a^T x) b$，说明矩阵 $A = ba^T$（秩 1 矩阵）。计算 $\mathrm{tr}(A)$ 得到非零特征值，矩阵幂直接用数乘规律搞定。*

<img src="../bank/2023/q22.png" alt="04 (2023)" width="782" style="display: block; width: 48.9em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q05"></a><a id="q2022-8"></a>

### 05 · 2022年

> ⚠️ **题面待核对**：原年度转写稿存在疑点，本次保留题面，作答前请核对独立原题来源。

<img src="../bank/2022/q08.png" alt="05 (2022)" width="720" style="display: block; width: 45.0em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q06"></a><a id="q2021-22"></a>

### 06 · 2021年

> *相似对角化大题。矩阵有重特征值时，可对角化的充要条件是重特征值对应的特征矩阵满足 $n - r(\lambda E - A) = \text{重数}$，列出秩方程定参数。*

<img src="../bank/2021/q22.png" alt="06 (2021)" width="781" style="display: block; width: 48.83em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q07"></a><a id="q2020-8"></a>

### 07 · 2020年

<img src="../bank/2020/q08.png" alt="07 (2020)" width="782" style="display: block; width: 48.86em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q08"></a><a id="q2020-23"></a>

### 08 · 2020年

<img src="../bank/2020/q23.png" alt="08 (2020)" width="759" style="display: block; width: 47.41em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q09"></a><a id="q2019-23"></a>

### 09 · 2019年

<img src="../bank/2019/q23.png" alt="09 (2019)" width="508" style="display: block; width: 31.72em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q10"></a><a id="q2018-7"></a>

### 10 · 2018年

<img src="../bank/2018/q07.png" alt="10 (2018)" width="374" style="display: block; width: 23.38em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q11"></a><a id="q2017-7"></a>

### 11 · 2017年

<img src="../bank/2017/q07.png" alt="11 (2017)" width="755" style="display: block; width: 47.21em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q12"></a><a id="q2017-8"></a>

### 12 · 2017年

<img src="../bank/2017/q08.png" alt="12 (2017)" width="687" style="display: block; width: 42.93em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q13"></a><a id="q2017-14"></a>

### 13 · 2017年

<img src="../bank/2017/q14.png" alt="13 (2017)" width="594" style="display: block; width: 37.1em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q14"></a><a id="q2016-7"></a>

### 14 · 2016年

<img src="../bank/2016/q07.png" alt="14 (2016)" width="658" style="display: block; width: 41.1em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q15"></a><a id="q2016-23"></a>

### 15 · 2016年

<img src="../bank/2016/q23.png" alt="15 (2016)" width="782" style="display: block; width: 48.86em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q16"></a><a id="q2015-23"></a>

### 16 · 2015年

<img src="../bank/2015/q23.png" alt="16 (2015)" width="462" style="display: block; width: 28.86em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q17"></a><a id="q2014-23"></a>

### 17 · 2014年

<img src="../bank/2014/q23.png" alt="17 (2014)" width="481" style="display: block; width: 30.03em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q18"></a><a id="q2013-8"></a>

### 18 · 2013年

<img src="../bank/2013/q08.png" alt="18 (2013)" width="595" style="display: block; width: 37.17em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q19"></a><a id="q2012-8"></a>

### 19 · 2012年

<img src="../bank/2012/q08.png" alt="19 (2012)" width="777" style="display: block; width: 48.55em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q20"></a><a id="q2011-23"></a>

### 20 · 2011年

<img src="../bank/2011/q23.png" alt="20 (2011)" width="638" style="display: block; width: 39.86em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q21"></a><a id="q2010-8"></a>

### 21 · 2010年

<img src="../bank/2010/q08.png" alt="21 (2010)" width="598" style="display: block; width: 37.34em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q22"></a><a id="q2010-23"></a>

### 22 · 2010年

<img src="../bank/2010/q23.png" alt="22 (2010)" width="782" style="display: block; width: 48.86em; max-width: 100%; height: auto; margin: 14px 0;">

---

[« 线性方程组](04-linear-systems.md)　　[二次型 »](06-quadratic-forms.md)
