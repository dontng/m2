# 线性代数 · 线性方程组

> 2010—2026年 · 11 道完整真题 · 年份从新到旧（2026→2010）  
> 题型分布：选择题 5 题 · 填空题 1 题 · 解答题 5 题  
> 考查范围：解的存在性、基础解系、通解及矩阵方程的可解性

[查看对应网页版](04-linear-systems.html) · [返回章节总目录](../README.md)

---

## 2026年

### 2026年 · 第9题 · 选择题

> 矩阵方程解的存在性。$AB=C$ 相当于 $C$ 的每一列都能由 $A$ 的列向量线性表出，即 $r(A)=r(A, C)$，把增广矩阵做初等行变换定参数。

(9) 设矩阵 $\displaystyle \boldsymbol A= \begin{pmatrix} 1&0&1\\ 0&0&1\\ 1&1&3\\ 1&1&1 \end{pmatrix}, \qquad \boldsymbol C= \begin{pmatrix} 2&0\\ 1&1\\ 1&1\\ a&b \end{pmatrix}.$ 若存在矩阵 $\boldsymbol B$ 满足 $\boldsymbol A\boldsymbol B=\boldsymbol C$ ，则

(A) $a=-1,\ b=-1$　　(B) $a=2,\ b=2$

(C) $a=-1,\ b=2$　　(D) $a=2,\ b=-1$

*关联章节：[向量组、线性相关与秩](03-vectors-rank.md)*

---

## 2025年

### 2025年 · 第16题 · 填空题

(16) 设矩阵 $\boldsymbol{A} = \left( \boldsymbol{\alpha}_{1}, \boldsymbol{\alpha}_{2}, \boldsymbol{\alpha}_{3}, \boldsymbol{\alpha}_{4} \right)$ .若 $\boldsymbol{\alpha}_{1}$ ， $\boldsymbol{\alpha}_{2}$ ， $\boldsymbol{\alpha}_{3}$ 线性无关，且 $\boldsymbol{\alpha}_{1} + \boldsymbol{\alpha}_{2} = \boldsymbol{\alpha}_{3} + \boldsymbol{\alpha}_{4}$ ，则方程组 $\boldsymbol{A}\boldsymbol{x} = \boldsymbol{\alpha}_{1} + 4\boldsymbol{\alpha}_{4}$ 的通解为 ______ .

---

## 2022年

### 2022年 · 第9题 · 选择题

(9) 设矩阵 $\boldsymbol{A} = \left( \begin{array}{ccc} 1 & 1 & 1 \\ 1 & a & a^{2} \\ 1 & b & b^{2} \end{array} \right),\quad \boldsymbol{b} = \left( \begin{array}{c} 1 \\ 2 \\ 4 \end{array} \right)$ 则线性方程组 $\boldsymbol{A}\boldsymbol{x} = \boldsymbol{b}$ 的解的情况为 $\left( \ \right)$

(A) 无解　　(B) 有解　　(C) 有无穷多解或无解　　(D) 有唯一解或无解

---

## 2020年

### 2020年 · 第7题 · 选择题

> 伴随矩阵方程基础解系。$A$ 不可逆且有非零代数余子式，故 $r(A)=3, r(A^*)=1$。方程组 $A^* x=0$ 的基础解系有 3 个向量，直接由 $A$ 的列向量构成。

(7) 设 4 阶矩阵 $\boldsymbol{A}=(a_{ij})$ 不可逆， $a_{12}$ 的代数余子式 $A_{12}\ne 0$ 。记 $\boldsymbol{\alpha}_1,\boldsymbol{\alpha}_2,\boldsymbol{\alpha}_3,\boldsymbol{\alpha}_4$ 为矩阵 $\boldsymbol{A}$ 的列向量， $\boldsymbol{A}^*$ 为 $\boldsymbol{A}$ 的伴随矩阵，则方程组 $\displaystyle \boldsymbol{A}^*\boldsymbol{x}=0$ 的通解为

- (A) $\boldsymbol{x}=k_1\boldsymbol{\alpha}_1+k_2\boldsymbol{\alpha}_2+k_3\boldsymbol{\alpha}_3$

- (B) $\boldsymbol{x}=k_1\boldsymbol{\alpha}_1+k_2\boldsymbol{\alpha}_2+k_3\boldsymbol{\alpha}_4$

- (C) $\boldsymbol{x}=k_1\boldsymbol{\alpha}_1+k_2\boldsymbol{\alpha}_3+k_3\boldsymbol{\alpha}_4$

- (D) $\boldsymbol{x}=k_1\boldsymbol{\alpha}_2+k_2\boldsymbol{\alpha}_3+k_3\boldsymbol{\alpha}_4$ 其中 $k_1,k_2,k_3$ 为任意常数。

---

## 2017年

### 2017年 · 第22题 · 解答题

> 特征值与方程组求解大题。结合矩阵乘以向量的条件求出特征值和特征向量，确定矩阵 $A$；第二问求 $Ax=b$ 的通解按标准初等行变换走。

设 $3$ 阶矩阵 $\displaystyle \boldsymbol A=(\boldsymbol\alpha_1,\boldsymbol\alpha_2,\boldsymbol\alpha_3)$ 有 $3$ 个不同的特征值，且 $\displaystyle \boldsymbol\alpha_3=\boldsymbol\alpha_1+2\boldsymbol\alpha_2.$ （1）证明： $r(\boldsymbol A)=2$ ；

（2）若 $\displaystyle \boldsymbol\beta=\boldsymbol\alpha_1+\boldsymbol\alpha_2+\boldsymbol\alpha_3,$ 求方程组 $\boldsymbol A\boldsymbol x=\boldsymbol\beta$ 的通解。

*关联章节：[向量组、线性相关与秩](03-vectors-rank.md) · [特征值、特征向量与相似](05-eigenvalues-similarity.md)*

---

## 2016年

### 2016年 · 第22题 · 解答题

设矩阵 $\displaystyle \boldsymbol{A}= \begin{pmatrix} 1&1&1-a\\ 1&0&a\\ a+1&1&a+1 \end{pmatrix}, \qquad \boldsymbol{\beta}= \begin{pmatrix} 0\\ 1\\ 2a-2 \end{pmatrix},$ 且方程组 $\boldsymbol{A}\boldsymbol{x}=\boldsymbol{\beta}$ 无解。

（1）求 $a$ 的值；

（2）求方程组 $\boldsymbol{A}^{T}\boldsymbol{A}\boldsymbol{x}=\boldsymbol{A}^{T}\boldsymbol{\beta}$ 的通解。

*关联章节：[向量组、线性相关与秩](03-vectors-rank.md)*

---

## 2015年

### 2015年 · 第7题 · 选择题

(7) 设矩阵 $\boldsymbol{A}=\left(\begin{matrix}1&1&1\\1&2&a\\1&4&a^{2}\end{matrix}\right)$ ， $\boldsymbol{b}=\left(\begin{matrix}1\\2\\d\end{matrix}\right)$ 。若集合 $\Omega=\left\{1,2\right\}$ ，则线性方程组 $\boldsymbol{A}\boldsymbol{x}=\boldsymbol{b}$ 有无穷多解的充分必要条件为（ ）

(A) $a\notin\Omega,d\notin\Omega$　　(B) $a\notin\Omega,d\in\Omega$　　(C) $a\in\Omega,d\notin\Omega$　　(D) $a\in\Omega,d\in\Omega$

---

## 2014年

### 2014年 · 第22题 · 解答题

设 $\boldsymbol{A}=\left(\begin{matrix}1&-2&3&-4\\\ 0&1&-1&1\\\ 1&2&0&3\end{matrix}\right)$ ， $\boldsymbol{E}$ 为三阶单位矩阵。

（1）求方程组 $\boldsymbol{A}\boldsymbol{X}=\boldsymbol{0}$ 的一个基础解系；

（2）求满足 $\boldsymbol{A}\boldsymbol{B}=\boldsymbol{E}$ 的所有矩阵。

*关联章节：[矩阵运算、逆矩阵与初等变换](02-matrices.md)*

---

## 2012年

### 2012年 · 第22题 · 解答题

设 $\boldsymbol{A}=\left(\begin{matrix}1&a&0&0 \\ 0&1&a&0 \\ 0&0&1&a \\ a&0&0&1\end{matrix}\right)$ ， $\boldsymbol{b}=\left(\begin{matrix}1 \\ -1 \\ 0 \\ 0 \end{matrix}\right)$ 。

（Ⅰ）求 $\left|\boldsymbol{A}\right|$ ； （Ⅱ）已知线性方程组 $\boldsymbol{A}\boldsymbol{x}=\boldsymbol{b}$ 有无穷多解，求 $a$ ，并求 $\boldsymbol{A}\boldsymbol{x}=\boldsymbol{b}$ 的通解。

*关联章节：[行列式](01-determinants.md)*

---

## 2011年

### 2011年 · 第8题 · 选择题

(8) 设 $\boldsymbol{A}=\left(\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2},\boldsymbol{\alpha}_{3},\boldsymbol{\alpha}_{4}\right)$ 是 $4$ 阶矩阵， $\boldsymbol{A}^{*}$ 为 $\boldsymbol{A}$ 的伴随矩阵，若 $\left(1,0,1,0\right)^{T}$ 是方程组 $\boldsymbol{A}\boldsymbol{x}=\boldsymbol{0}$ 的一个基础解系，则 $\boldsymbol{A}^{*}\boldsymbol{x}=\boldsymbol{0}$ 的基础解系可为（ ）

(A) $\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{3}$　　(B) $\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2}$

(C) $\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2},\boldsymbol{\alpha}_{3}$　　(D) $\boldsymbol{\alpha}_{2},\boldsymbol{\alpha}_{3},\boldsymbol{\alpha}_{4}$

*关联章节：[向量组、线性相关与秩](03-vectors-rank.md) · [矩阵运算、逆矩阵与初等变换](02-matrices.md)*

---

## 2010年

### 2010年 · 第22题 · 解答题

设 $\boldsymbol{A} = \begin{pmatrix}\lambda & 1 & 1 \\ 0 & \lambda - 1 & 0 \\ 1 & 1 & \lambda\end{pmatrix}, \boldsymbol{b} = \begin{pmatrix}a \\ 1 \\ 1\end{pmatrix}$ ，已知线性方程组 $\boldsymbol{A}\boldsymbol{x} = \boldsymbol{b}$ 存在两个不同的解。

（I）求 $\lambda, a$ ；

（II）求方程组 $\boldsymbol{A}\boldsymbol{x} = \boldsymbol{b}$ 的通解.

---

## 交叉考点索引

以下题目主归其他章节，点击跳转到对应章节题目；不计入本章主收录题数：

- [2025年 · 第10题](03-vectors-rank.md)（主章节：向量组、线性相关与秩）
- [2024年 · 第22题](06-quadratic-forms.md)（主章节：二次型）
- [2023年 · 第16题](01-determinants.md)（主章节：行列式）
- [2021年 · 第9题](03-vectors-rank.md)（主章节：向量组、线性相关与秩）
- [2018年 · 第22题](06-quadratic-forms.md)（主章节：二次型）
- [2018年 · 第23题](02-matrices.md)（主章节：矩阵运算、逆矩阵与初等变换）
- [2013年 · 第22题](02-matrices.md)（主章节：矩阵运算、逆矩阵与初等变换）
