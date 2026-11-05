[« 行列式](01-determinants.md)　　[向量组、线性相关与秩 »](03-vectors-rank.md)

# 线性代数 · 矩阵运算、逆矩阵与初等变换

> **本章共 10 题**
> 
> - **核心必做（建议按顺序攻克关键方法）**：  
>   [第 10 题](#q10)（分清左乘与右乘） → [第 03 题](#q03)（矩阵乘法顺序） → [第 01 题](#q01)（逆矩阵与伴随矩阵） → [第 07 题](#q07)（列变换求变换矩阵）
> 
> - **分流与刷题建议**：  
>   - **较难挑战**：[第 08 题](#q08)（幂零矩阵与方程因式分解）  
>   - **重在看思路**：[第 04 题](#q04)（分块矩阵先求逆再求伴随）  
>   - **首轮可跳过**：[第 09 题](#q09)（技巧较偏或综合度高，首轮不必死磕）  
> 
> - **过关目标**：能把行、列操作还原为矩阵乘法，并独立求出变换矩阵。

---

<a id="q01"></a><a id="q2026-8"></a>

### 01 · 2026年

> *置换矩阵性质题。置换矩阵每行每列恰有一个 1，由初等变换性质可知必为正交矩阵，即 $A^{-1} = A^T$；其行列式为 $\pm 1$，伴随矩阵立可判定。*

<img src="../bank/2026/q08.png" alt="01 (2026)" width="781" style="display: block; width: 48.83em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q02"></a><a id="q2025-9"></a>

### 02 · 2025年

<img src="../bank/2025/q09.png" alt="02 (2025)" width="527" style="display: block; width: 32.97em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q03"></a><a id="q2024-8"></a>

### 03 · 2024年

<img src="../bank/2024/q08.png" alt="03 (2024)" width="681" style="display: block; width: 42.55em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q04"></a><a id="q2023-8"></a>

### 04 · 2023年

<img src="../bank/2023/q08.png" alt="04 (2023)" width="759" style="display: block; width: 47.41em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q05"></a><a id="q2022-16"></a>

### 05 · 2022年

<img src="../bank/2022/q16.png" alt="05 (2022)" width="781" style="display: block; width: 48.83em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q06"></a><a id="q2021-10"></a>

### 06 · 2021年

<img src="../bank/2021/q10.png" alt="06 (2021)" width="781" style="display: block; width: 48.79em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q07"></a><a id="q2018-23"></a>

### 07 · 2018年

> *初等列变换与矩阵方程大题。列变换相当于右乘初等矩阵 $P$。把 $(A^T | B^T)$ 做行初等变换求出 $P^T$，转置即可得 $P$。*

<img src="../bank/2018/q23.png" alt="07 (2018)" width="782" style="display: block; width: 48.86em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q08"></a><a id="q2015-22"></a>

### 08 · 2015年

> *幂零矩阵与可逆矩阵方程。由 $A^3=O$ 联想因式分解 $(E-A)(E+A+A^2)=E$；把方程因式分解配凑成 $(E-A)X(E-A)=E$，两边求逆秒解 $X$。*

<img src="../bank/2015/q22.png" alt="08 (2015)" width="617" style="display: block; width: 38.59em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q09"></a><a id="q2013-22"></a>

### 09 · 2013年

<img src="../bank/2013/q22.png" alt="09 (2013)" width="782" style="display: block; width: 48.9em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q10"></a><a id="q2011-7"></a>

### 10 · 2011年

<img src="../bank/2011/q07.png" alt="10 (2011)" width="782" style="display: block; width: 48.86em; max-width: 100%; height: auto; margin: 14px 0;">

---

[« 行列式](01-determinants.md)　　[向量组、线性相关与秩 »](03-vectors-rank.md)
