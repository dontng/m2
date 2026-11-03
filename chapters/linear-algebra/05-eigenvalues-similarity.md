# 线性代数 · 特征值、特征向量与相似

> 2010—2026年 · 22 道完整真题 · 年份从新到旧（2026→2010）  
> 题型分布：选择题 12 题 · 填空题 1 题 · 解答题 9 题  
> 考查范围：特征值和特征向量、相似关系、对角化及其矩阵幂应用

[查看对应网页版](05-eigenvalues-similarity.html) · [返回章节总目录](../README.md)

---

## 2026年

### 2026年 · 第10题 · 选择题

> 反交换矩阵特征值性质题。由 $AB+BA=O$ 得 $AB=-BA$。利用特征值迹或行列式反号性质，或乘特征向量分析对称分布，迅速排除错误项。

(10) 设三阶矩阵 $\boldsymbol A,\boldsymbol B$ 满足 $\displaystyle \boldsymbol A\boldsymbol B+\boldsymbol B\boldsymbol A=\boldsymbol A^2+\boldsymbol B^2,$ 且 $\boldsymbol A\ne \boldsymbol B$ ，则下列结论错误的是

(A) $(\boldsymbol A-\boldsymbol B)^3=\boldsymbol O$　　(B) $\boldsymbol A-\boldsymbol B$ 只有零特征值

(C) $\boldsymbol A,\boldsymbol B$ 不能都是对角矩阵　　(D) $\boldsymbol A-\boldsymbol B$ 只有一个线性无关的特征向量

*关联章节：[矩阵运算、逆矩阵与初等变换](02-matrices.md) · [向量组、线性相关与秩](03-vectors-rank.md)*

---

## 2025年

### 2025年 · 第8题 · 选择题

> 实对称矩阵相似与行列式。实对称矩阵必可正交对角化。利用特征多项式或迹与行列式性质，建立 $a, b$ 的方程直接定解。

(8) 设矩阵 $\boldsymbol{A} = \begin{pmatrix} 1 & 2 & 0 \\ 2 & a & 0 \\ 0 & 0 & b \end{pmatrix}$ 有一个正特征值和两个负特征值，则

(A) $a > 4$ ， $b > 0$　　(B) $a < 4$ ， $b > 0$　　(C) $a > 4$ ， $b < 0$　　(D) $a < 4$ ， $b < 0$

*关联章节：[二次型](06-quadratic-forms.md) · [行列式](01-determinants.md)*

---

## 2024年

### 2024年 · 第10题 · 选择题

(10) 设 $\boldsymbol A,\boldsymbol B$ 均为 $2$ 阶矩阵，且 $\boldsymbol A\boldsymbol B=\boldsymbol B\boldsymbol A$ ，则“ $\boldsymbol A$ 有两个不相等的特征值”是“ $\boldsymbol B$ 可对角化”的（ ）

(A) 充要条件　　(B) 充分不必要条件

(C) 必要不充分条件　　(D) 既不充分也不必要条件

---

## 2023年

### 2023年 · 第22题 · 解答题

> 向量外积型矩阵幂。条件是 $Ax = (a^T x) b$，说明矩阵 $A = ba^T$（秩 1 矩阵）。计算 $\mathrm{tr}(A)$ 得到非零特征值，矩阵幂直接用数乘规律搞定。

设矩阵 $\boldsymbol A$ 满足：对任意 $x_1,x_2,x_3$ ，均有 $\displaystyle \boldsymbol A \begin{pmatrix} x_1\\ x_2\\ x_3 \end{pmatrix} = \begin{pmatrix} x_1+x_2+x_3\\ 2x_1-x_2+x_3\\ x_2-x_3 \end{pmatrix}.$ 1. 求 $\boldsymbol A$ ；

2. 求可逆矩阵 $\boldsymbol P$ 与对角矩阵 $\boldsymbol\Lambda$ ，使得 $\displaystyle \boldsymbol P^{-1}\boldsymbol A\boldsymbol P=\boldsymbol\Lambda.$

*关联章节：[矩阵运算、逆矩阵与初等变换](02-matrices.md)*

---

## 2022年

### 2022年 · 第8题 · 选择题

> ⚠️ **题面待核对**：原年度转写稿存在疑点，本次保留题面，作答前请核对独立原题来源。

(8) 设矩阵 $\boldsymbol{A} = \left( \begin{array}{ccc} 1 & 0 & 0 \\ 0 & -1 & 0 \\ 0 & 0 & 0 \end{array} \right)$ 则 $\boldsymbol{A}$ 的特征值为 $1,-1,0$ 的充分必要条件是 $\left( \ \right)$

(A) 存在可逆矩阵 $\boldsymbol{P}, \boldsymbol{Q}$ ，使得 $\boldsymbol{A} = \boldsymbol{P}\boldsymbol{\Lambda}\boldsymbol{Q}$　　(B) 存在可逆矩阵 $\boldsymbol{P}$ ，使得 $\boldsymbol{A} = \boldsymbol{P}\boldsymbol{\Lambda}\boldsymbol{P}^{-1}$

(C) 存在正交矩阵 $\boldsymbol{Q}$ ，使得 $\boldsymbol{A} = \boldsymbol{Q}\boldsymbol{\Lambda}\boldsymbol{Q}^{-1}$　　(D) 存在可逆矩阵 $\boldsymbol{P}$ ，使得 $\boldsymbol{A} = \boldsymbol{P}\boldsymbol{\Lambda}\boldsymbol{P}^{T}$

*关联章节：[矩阵运算、逆矩阵与初等变换](02-matrices.md)*

---

## 2021年

### 2021年 · 第22题 · 解答题

> 相似对角化大题。矩阵有重特征值时，可对角化的充要条件是重特征值对应的特征矩阵满足 $n - r(\lambda E - A) = \text{重数}$，列出秩方程定参数。

设矩阵 $\displaystyle \boldsymbol{A}=\begin{pmatrix} 2 & 1 & 0 \\ 1 & 2 & 0 \\ 1 & a & b \end{pmatrix}$ 仅有两个不同的特征值。若 $\boldsymbol{A}$ 相似于对角矩阵，求 $a,\ b$ 的值，并求可逆矩阵 $\boldsymbol{P}$ ，使 $\boldsymbol{P}^{-1}\boldsymbol{A}\boldsymbol{P}$ 为对角矩阵。

---

## 2020年

### 2020年 · 第8题 · 选择题

(8) 设 $\boldsymbol{A}$ 为 3 阶矩阵， $\boldsymbol{\alpha}_1,\boldsymbol{\alpha}_2$ 为 $\boldsymbol{A}$ 的属于特征值 $1$ 的线性无关特征向量， $\boldsymbol{\alpha}_3$ 为 $\boldsymbol{A}$ 的属于特征值 $-1$ 的特征向量。则满足 $\displaystyle \boldsymbol{P}^{-1}\boldsymbol{A}\boldsymbol{P}= \begin{pmatrix} 1&0&0\\ 0&-1&0\\ 0&0&1 \end{pmatrix}$ 的可逆矩阵 $\boldsymbol{P}$ 可为

(A) $\left(\boldsymbol{\alpha}_1+\boldsymbol{\alpha}_3,\ \boldsymbol{\alpha}_2,\ -\boldsymbol{\alpha}_3\right)$　　(B) $\left(\boldsymbol{\alpha}_1+\boldsymbol{\alpha}_2,\ \boldsymbol{\alpha}_2,\ -\boldsymbol{\alpha}_3\right)$

(C) $\left(\boldsymbol{\alpha}_1+\boldsymbol{\alpha}_3,\ -\boldsymbol{\alpha}_3,\ \boldsymbol{\alpha}_2\right)$　　(D) $\left(\boldsymbol{\alpha}_1+\boldsymbol{\alpha}_2,\ -\boldsymbol{\alpha}_3,\ \boldsymbol{\alpha}_2\right)$

---

### 2020年 · 第23题 · 解答题

设 $\boldsymbol{A}$ 为 2 阶矩阵， $\boldsymbol{P}=(\boldsymbol{\alpha},\boldsymbol{A}\boldsymbol{\alpha})$ ，其中 $\boldsymbol{\alpha}$ 是非零向量且不是 $\boldsymbol{A}$ 的特征向量。

1. 证明 $\boldsymbol{P}$ 为可逆矩阵；

2. 若 $\boldsymbol{A}^2\boldsymbol{\alpha}+\boldsymbol{A}\boldsymbol{\alpha}-6\boldsymbol{\alpha}=0$ ，求 $\boldsymbol{P}^{-1}\boldsymbol{A}\boldsymbol{P}$ ，并判断 $\boldsymbol{A}$ 是否相似于对角矩阵。

*关联章节：[矩阵运算、逆矩阵与初等变换](02-matrices.md)*

---

## 2019年

### 2019年 · 第23题 · 解答题

已知矩阵 $\displaystyle \boldsymbol{A}= \begin{pmatrix} -2&-2&1\\ 2&x&-2\\ 0&0&-2 \end{pmatrix}, \qquad \boldsymbol{B}= \begin{pmatrix} 2&1&0\\ 0&-1&0\\ 0&0&y \end{pmatrix}$ 相似。

（1）求 $x,y$ ；

（2）求可逆矩阵 $\boldsymbol{P}$ ，使得 $\displaystyle \boldsymbol{P}^{-1}\boldsymbol{A}\boldsymbol{P}=\boldsymbol{B}.$

---

## 2018年

### 2018年 · 第7题 · 选择题

(7) 下列矩阵中，与矩阵 $\displaystyle \begin{pmatrix} 1&1&0\\ 0&1&1\\ 0&0&1 \end{pmatrix}$ 相似的是 $\left(\ \right)$

- (A) $\begin{pmatrix}1&1&-1\\0&1&1\\0&0&1\end{pmatrix}$

- (B) $\begin{pmatrix}1&0&-1\\0&1&1\\0&0&1\end{pmatrix}$

- (C) $\begin{pmatrix}1&1&-1\\0&1&0\\0&0&1\end{pmatrix}$

- (D) $\begin{pmatrix}1&0&-1\\0&1&0\\0&0&1\end{pmatrix}$

---

## 2017年

### 2017年 · 第7题 · 选择题

(7) 设 $\boldsymbol A$ 为三阶矩阵， $\boldsymbol P=(\boldsymbol\alpha_1,\boldsymbol\alpha_2,\boldsymbol\alpha_3)$ 为可逆矩阵，且 $\displaystyle \boldsymbol P^{-1}\boldsymbol A\boldsymbol P= \begin{pmatrix} 0\\ 1\\ 2 \end{pmatrix},$ 则 $\boldsymbol A(\boldsymbol\alpha_1+\boldsymbol\alpha_2+\boldsymbol\alpha_3)=$ （ ）

(A) $\boldsymbol\alpha_1+\boldsymbol\alpha_2$　　(B) $\boldsymbol\alpha_2+2\boldsymbol\alpha_3$　　(C) $\boldsymbol\alpha_2+\boldsymbol\alpha_3$　　(D) $\boldsymbol\alpha_1+2\boldsymbol\alpha_2$

---

### 2017年 · 第8题 · 选择题

(8) 设矩阵 $\displaystyle \boldsymbol A= \begin{pmatrix} 2&0&0\\ 0&2&1\\ 0&0&1 \end{pmatrix},\quad \boldsymbol B= \begin{pmatrix} 2&1&0\\ 0&2&0\\ 0&0&1 \end{pmatrix},\quad \boldsymbol C= \begin{pmatrix} 1&0&0\\ 0&2&0\\ 0&0&2 \end{pmatrix},$ 则（ ）

(A) $\boldsymbol A$ 与 $\boldsymbol C$ 相似， $\boldsymbol B$ 与 $\boldsymbol C$ 相似　　(B) $\boldsymbol A$ 与 $\boldsymbol C$ 相似， $\boldsymbol B$ 与 $\boldsymbol C$ 不相似

(C) $\boldsymbol A$ 与 $\boldsymbol C$ 不相似， $\boldsymbol B$ 与 $\boldsymbol C$ 相似　　(D) $\boldsymbol A$ 与 $\boldsymbol C$ 不相似， $\boldsymbol B$ 与 $\boldsymbol C$ 不相似

---

### 2017年 · 第14题 · 填空题

(14) 设矩阵 $\displaystyle \boldsymbol A= \begin{pmatrix} 4&1&-2\\ 1&2&a\\ 3&1&-1 \end{pmatrix}$ 的一个特征向量为 $\displaystyle \begin{pmatrix} 1\\ 1\\ 2 \end{pmatrix},$ 则 $a=$ ______

---

## 2016年

### 2016年 · 第7题 · 选择题

(7) 设 $\boldsymbol{A}$ ， $\boldsymbol{B}$ 是可逆矩阵，且 $\boldsymbol{A}$ 与 $\boldsymbol{B}$ 相似，则下列结论错误的是：

(A) $\boldsymbol{A}^{T}$ 与 $\boldsymbol{B}^{T}$ 相似。　　(B) $\boldsymbol{A}^{-1}$ 与 $\boldsymbol{B}^{-1}$ 相似。

(C) $\boldsymbol{A}^{T}+\boldsymbol{A}$ 与 $\boldsymbol{B}^{T}+\boldsymbol{B}$ 相似。　　(D) $\boldsymbol{A}^{-1}+\boldsymbol{A}$ 与 $\boldsymbol{B}^{-1}+\boldsymbol{B}$ 相似。

---

### 2016年 · 第23题 · 解答题

已知矩阵 $\displaystyle \boldsymbol{A}= \begin{pmatrix} 0&-1&1\\ 2&-3&0\\ 0&0&0 \end{pmatrix}.$ （1）求 $\boldsymbol{A}^{99}$ ；

（2）设 $3$ 阶矩阵 $\boldsymbol{B}=(\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2},\boldsymbol{\alpha}_{3})$ 满足 $\boldsymbol{B}^{2}=\boldsymbol{B}\boldsymbol{A}$ 。记 $\boldsymbol{B}^{100}=(\boldsymbol{\beta}_{1},\boldsymbol{\beta}_{2},\boldsymbol{\beta}_{3})$ ，将 $\boldsymbol{\beta}_{1},\boldsymbol{\beta}_{2},\boldsymbol{\beta}_{3}$ 分别表示为 $\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2},\boldsymbol{\alpha}_{3}$ 的线性组合。

*关联章节：[矩阵运算、逆矩阵与初等变换](02-matrices.md) · [向量组、线性相关与秩](03-vectors-rank.md)*

---

## 2015年

### 2015年 · 第23题 · 解答题

设矩阵 $\boldsymbol{A}=\left(\begin{matrix}0&-2&3\\1&-3&3\\1&-2&a\end{matrix}\right)$ 相似于矩阵 $\boldsymbol{B}=\left(\begin{matrix}1&2&0\\0&b&0\\0&3&1\end{matrix}\right)$ 。

（1）求 $a,b$ 的值；

（2）求可逆矩阵 $\boldsymbol{P}$ ，使 $\boldsymbol{P}^{-1}\boldsymbol{A}\boldsymbol{P}$ 为对角阵。

*关联章节：[行列式](01-determinants.md)*

---

## 2014年

### 2014年 · 第23题 · 解答题

证明 $n$ 阶矩阵 $\left(\begin{matrix}1&1&\cdots&1\\\ 1&1&\cdots&1\\\ \vdots&\vdots&&\vdots\\\ 1&1&\cdots&1\end{matrix}\right)$ 与 $\left(\begin{matrix}0&\cdots&0&1\\\ 0&\cdots&0&2\\\ \vdots&\vdots&&\vdots\\\ 0&\cdots&0&n\end{matrix}\right)$ 相似。

---

## 2013年

### 2013年 · 第8题 · 选择题

(8) 矩阵 $\left(\begin{matrix}1&a&1\\a&b&a\\1&a&1\end{matrix}\right)$ 与 $\left(\begin{matrix}2&0&0\\0&b&0\\0&0&0\end{matrix}\right)$ 相似的充分必要条件为（ ）

(A) $a=0,b=2$　　(B) $a=0,b$ 为任意常数

(C) $a=2,b=0$　　(D) $a=2,b$ 为任意常数

---

## 2012年

### 2012年 · 第8题 · 选择题

(8) 设 $\boldsymbol{A}$ 为 $3$ 阶矩阵， $\boldsymbol{P}$ 为 $3$ 阶可逆矩阵，且 $\boldsymbol{P}^{-1}\boldsymbol{A}\boldsymbol{P}=\left(\begin{matrix}1&0&0 \\ 0&1&0 \\ 0&0&2\end{matrix}\right)$ ， $\boldsymbol{P}=\left(\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2},\boldsymbol{\alpha}_{3}\right)$ ， $\boldsymbol{Q}=\left(\boldsymbol{\alpha}_{1}+\boldsymbol{\alpha}_{2},\boldsymbol{\alpha}_{2},\boldsymbol{\alpha}_{3}\right)$ ，则 $\boldsymbol{Q}^{-1}\boldsymbol{A}\boldsymbol{Q}=$ （ ）

- (A) $\left(\begin{matrix}1&0&0 \\ 0&2&0 \\ 0&0&1\end{matrix}\right)$

- (B) $\left(\begin{matrix}1&0&0 \\ 0&1&0 \\ 0&0&2\end{matrix}\right)$

- (C) $\left(\begin{matrix}2&0&0 \\ 0&1&0 \\ 0&0&2\end{matrix}\right)$

- (D) $\left(\begin{matrix}2&0&0 \\ 0&2&0 \\ 0&0&1\end{matrix}\right)$

---

## 2011年

### 2011年 · 第23题 · 解答题

$\boldsymbol{A}$ 为三阶实对称矩阵， $\boldsymbol{A}$ 的秩为 $2$ ，即 $r\left(\boldsymbol{A}\right)=2$ ，且 $\boldsymbol{A}\left(\begin{matrix}1&1 \\ 0&0 \\ -1&1\end{matrix}\right)=\left(\begin{matrix}-1&1 \\ 0 &0 \\ 1&1\end{matrix}\right)$ 。

（I）求 $\boldsymbol{A}$ 的特征值与特征向量；

（II）求矩阵 $\boldsymbol{A}$ 。

---

## 2010年

### 2010年 · 第8题 · 选择题

(8) 设 $\boldsymbol{A}$ 为 4 阶实对称矩阵，且 $\boldsymbol{A}^{2} + \boldsymbol{A} = \boldsymbol{O}$ ，若 $\boldsymbol{A}$ 的秩为 3，则 $\boldsymbol{A}$ 相似于（ ）

- (A) $\begin{pmatrix}1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 0\end{pmatrix}$ .

- (B) $\begin{pmatrix}1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & -1 & 0 \\ 0 & 0 & 0 & 0\end{pmatrix}$ .

- (C) $\begin{pmatrix}1 & 0 & 0 & 0 \\ 0 & -1 & 0 & 0 \\ 0 & 0 & -1 & 0 \\ 0 & 0 & 0 & 0\end{pmatrix}$ .

- (D) $\begin{pmatrix}-1 & 0 & 0 & 0 \\ 0 & -1 & 0 & 0 \\ 0 & 0 & -1 & 0 \\ 0 & 0 & 0 & 0\end{pmatrix}$ .

---

### 2010年 · 第23题 · 解答题

设 $\boldsymbol{A} = \begin{pmatrix}0 & -1 & 4 \\ -1 & 3 & a \\ 4 & a & 0\end{pmatrix}$ ，正交矩阵 $\boldsymbol{Q}$ 使得 $\boldsymbol{Q}^{T}\boldsymbol{A}\boldsymbol{Q}$ 为对角矩阵，若 $\boldsymbol{Q}$ 的第 1 列为 $\frac{1}{\sqrt{6}}\left(1,2,1\right)^{T}$ ，求 $a, \boldsymbol{Q}$ .

*关联章节：[二次型](06-quadratic-forms.md)*

---

## 交叉考点索引

以下题目主归其他章节，点击跳转到对应章节题目；不计入本章主收录题数：

- [2025年 · 第22题](06-quadratic-forms.md)（主章节：二次型）
- [2024年 · 第8题](02-matrices.md)（主章节：矩阵运算、逆矩阵与初等变换）
- [2024年 · 第22题](06-quadratic-forms.md)（主章节：二次型）
- [2022年 · 第22题](06-quadratic-forms.md)（主章节：二次型）
- [2020年 · 第22题](06-quadratic-forms.md)（主章节：二次型）
- [2018年 · 第14题](01-determinants.md)（主章节：行列式）
- [2017年 · 第22题](04-linear-systems.md)（主章节：线性方程组）
- [2017年 · 第23题](06-quadratic-forms.md)（主章节：二次型）
- [2015年 · 第14题](01-determinants.md)（主章节：行列式）
- [2015年 · 第22题](02-matrices.md)（主章节：矩阵运算、逆矩阵与初等变换）
- [2013年 · 第23题](06-quadratic-forms.md)（主章节：二次型）
- [2012年 · 第23题](06-quadratic-forms.md)（主章节：二次型）
