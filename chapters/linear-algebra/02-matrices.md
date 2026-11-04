[« 行列式](01-determinants.md)　　[向量组、线性相关与秩 »](03-vectors-rank.md)

# 线性代数 · 矩阵运算、逆矩阵与初等变换

> **必会·按此顺序**：[2011-07](#q2011-7)（分清左乘与右乘） → [2024-08](#q2024-8)（矩阵乘法顺序） → [2026-08](#q2026-8)（逆矩阵与伴随矩阵） → [2018-23](#q2018-23)（列变换求变换矩阵）  
> **冲一冲**：[2015-22](#q2015-22)（幂零矩阵与方程因式分解）  
> **见识·先会开题**：[2023-08](#q2023-8)（分块矩阵先求逆再求伴随）  
> **首轮过关**：能把行、列操作还原为矩阵乘法，并独立求出变换矩阵。

---

## 2026年

<a id="q2026-8"></a>

### 01 · 2026-08 · 选择题

> 置换矩阵性质题。置换矩阵每行每列恰有一个 1，由初等变换性质可知必为正交矩阵，即 <img src="../math/8b6919cf10f49734.svg" alt="公式：A^{-1} = A^T" width="80" height="17" align="middle" style="width:4.9785em;height:1.045em;vertical-align:-0.093em;">；其行列式为 <img src="../math/809fc216bcad623d.svg" alt="公式：\pm 1" width="24" height="13" align="middle" style="width:1.4455em;height:0.7535em;vertical-align:0em;">，伴随矩阵立可判定。

<img src="../bank/2026/q08.png" alt="2026-08" width="720" style="display: block; width: 45.0em; max-width: 100%; height: auto; margin: 12px 0;">

*关联章节：[行列式](01-determinants.md)*

---

## 2025年

<a id="q2025-9"></a>

### 02 · 2025-09 · 选择题

<img src="../bank/2025/q09.png" alt="2025-09" width="720" style="display: block; width: 45.0em; max-width: 100%; height: auto; margin: 12px 0;">

---

## 2024年

<a id="q2024-8"></a>

### 03 · 2024-08 · 选择题

<img src="../bank/2024/q08.png" alt="2024-08" width="720" style="display: block; width: 45.0em; max-width: 100%; height: auto; margin: 12px 0;">

*关联章节：[特征值、特征向量与相似](05-eigenvalues-similarity.md)*

---

## 2023年

<a id="q2023-8"></a>

### 04 · 2023-08 · 选择题

<img src="../bank/2023/q08.png" alt="2023-08" width="720" style="display: block; width: 45.0em; max-width: 100%; height: auto; margin: 12px 0;">

---

## 2022年

<a id="q2022-16"></a>

### 05 · 2022-16 · 填空题

<img src="../bank/2022/q16.png" alt="2022-16" width="720" style="display: block; width: 45.0em; max-width: 100%; height: auto; margin: 12px 0;">

---

## 2021年

<a id="q2021-10"></a>

### 06 · 2021-10 · 选择题

<img src="../bank/2021/q10.png" alt="2021-10" width="720" style="display: block; width: 45.0em; max-width: 100%; height: auto; margin: 12px 0;">

---

## 2018年

<a id="q2018-23"></a>

### 07 · 2018-23 · 解答题

> 初等列变换与矩阵方程大题。列变换相当于右乘初等矩阵 <img src="../math/5c62e091b8c0565f.svg" alt="公式：P" width="14" height="13" align="middle" style="width:0.8495em;height:0.7725em;vertical-align:0em;">。把 <img src="../math/d54fc08bede6cb5f.svg" alt="公式：(A^T | B^T)" width="68" height="20" align="middle" style="width:4.2155em;height:1.235em;vertical-align:-0.283em;"> 做行初等变换求出 <img src="../math/0dcae00eb75d782f.svg" alt="公式：P^T" width="26" height="16" align="middle" style="width:1.5695em;height:0.952em;vertical-align:0em;">，转置即可得 <img src="../math/5c62e091b8c0565f.svg" alt="公式：P" width="14" height="13" align="middle" style="width:0.8495em;height:0.7725em;vertical-align:0em;">。

<img src="../bank/2018/q23.png" alt="2018-23" width="720" style="display: block; width: 45.0em; max-width: 100%; height: auto; margin: 12px 0;">

*关联章节：[线性方程组](04-linear-systems.md)*

---

## 2015年

<a id="q2015-22"></a>

### 08 · 2015-22 · 解答题

> 幂零矩阵与可逆矩阵方程。由 <img src="../math/7783af930d5f48b4.svg" alt="公式：A^3=O" width="60" height="17" align="middle" style="width:3.714em;height:1.0355em;vertical-align:-0.093em;"> 联想因式分解 <img src="../math/50bcfb6a730b8a6b.svg" alt="公式：(E-A)(E+A+A^2)=E" width="209" height="20" align="middle" style="width:13.049em;height:1.226em;vertical-align:-0.283em;">；把方程因式分解配凑成 <img src="../math/8b15bf667a51b475.svg" alt="公式：(E-A)X(E-A)=E" width="181" height="19" align="middle" style="width:11.288em;height:1.131em;vertical-align:-0.283em;">，两边求逆秒解 <img src="../math/4b68ab3847feda7d.svg" alt="公式：X" width="16" height="13" align="middle" style="width:0.964em;height:0.7725em;vertical-align:0em;">。

<img src="../bank/2015/q22.png" alt="2015-22" width="720" style="display: block; width: 45.0em; max-width: 100%; height: auto; margin: 12px 0;">

*关联章节：[特征值、特征向量与相似](05-eigenvalues-similarity.md)*

---

## 2013年

<a id="q2013-22"></a>

### 09 · 2013-22 · 解答题

<img src="../bank/2013/q22.png" alt="2013-22" width="720" style="display: block; width: 45.0em; max-width: 100%; height: auto; margin: 12px 0;">

*关联章节：[线性方程组](04-linear-systems.md)*

---

## 2011年

<a id="q2011-7"></a>

### 10 · 2011-07 · 选择题

<img src="../bank/2011/q07.png" alt="2011-07" width="720" style="display: block; width: 45.0em; max-width: 100%; height: auto; margin: 12px 0;">

---

## 交叉考点索引

以下题目主归其他章节，点击跳转到对应章节题目；不计入本章主收录题数：

- [2026年 · 第10题](05-eigenvalues-similarity.md)（主章节：特征值、特征向量与相似）
- [2026年 · 第22题](03-vectors-rank.md)（主章节：向量组、线性相关与秩）
- [2023年 · 第22题](05-eigenvalues-similarity.md)（主章节：特征值、特征向量与相似）
- [2022年 · 第8题](05-eigenvalues-similarity.md)（主章节：特征值、特征向量与相似）
- [2020年 · 第23题](05-eigenvalues-similarity.md)（主章节：特征值、特征向量与相似）
- [2016年 · 第23题](05-eigenvalues-similarity.md)（主章节：特征值、特征向量与相似）
- [2014年 · 第22题](04-linear-systems.md)（主章节：线性方程组）
- [2013年 · 第7题](03-vectors-rank.md)（主章节：向量组、线性相关与秩）
- [2011年 · 第8题](04-linear-systems.md)（主章节：线性方程组）

[« 行列式](01-determinants.md)　　[向量组、线性相关与秩 »](03-vectors-rank.md)
