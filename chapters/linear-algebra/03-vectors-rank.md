# 线性代数 · 向量组、线性相关与秩

> 2010—2026年 · 16 道完整真题 · 年份从新到旧（2026→2010）  
> 题型分布：选择题 11 题 · 填空题 2 题 · 解答题 3 题  
> 考查范围：线性表示、向量组等价、极大无关组、矩阵秩与秩分解

[查看对应网页版](03-vectors-rank.html) · [返回章节总目录](../README.md)

---

## 2026年

### 2026年 · 第22题 · 解答题

> 最新线代解答题。第一问行变换化阶梯形证极大无关组；第二问列出分解 $A=GH$（满秩分解），利用结合律 $A^{10} = G(HG)^9 H$ 降成 2 阶矩阵的幂。

已知向量组 $\displaystyle \boldsymbol{\alpha}_1= \begin{pmatrix} 1\\ 0\\ -1\\ -1 \end{pmatrix}, \qquad \boldsymbol{\alpha}_2= \begin{pmatrix} 1\\ -1\\ 0\\ -2 \end{pmatrix}, \qquad \boldsymbol{\alpha}_3= \begin{pmatrix} 0\\ -1\\ 1\\ -1 \end{pmatrix}, \qquad \boldsymbol{\alpha}_4= \begin{pmatrix} 0\\ 1\\ -1\\ 1 \end{pmatrix}.$ 记 $\displaystyle \boldsymbol A=(\boldsymbol{\alpha}_1,\boldsymbol{\alpha}_2,\boldsymbol{\alpha}_3,\boldsymbol{\alpha}_4),\qquad \boldsymbol G=(\boldsymbol{\alpha}_1,\boldsymbol{\alpha}_2).$ 1. 证明： $\boldsymbol{\alpha}_1,\boldsymbol{\alpha}_2$ 是 $\boldsymbol{\alpha}_1,\boldsymbol{\alpha}_2,\boldsymbol{\alpha}_3,\boldsymbol{\alpha}_4$ 的极大线性无关组；

2. 求矩阵 $\boldsymbol H$ 使得 $\boldsymbol A=\boldsymbol G\boldsymbol H$ ，并求 $\boldsymbol A^{10}$ .

*关联章节：[矩阵运算、逆矩阵与初等变换](02-matrices.md)*

---

## 2025年

### 2025年 · 第10题 · 选择题

(10) 设 3 阶矩阵 $\boldsymbol{A}$ ， $\boldsymbol{B}$ 满足 $r\left( \boldsymbol{A}\boldsymbol{B} \right) = r\left( \boldsymbol{B}\boldsymbol{A} \right) + 1$ ，则

- (A) 方程组 $\left( \boldsymbol{A} + \boldsymbol{B} \right)\boldsymbol{x} = 0$ 只有零解.

- (B) 方程组 $\boldsymbol{A}\boldsymbol{x} = 0$ 与方程组 $\boldsymbol{B}\boldsymbol{x} = 0$ 均只有零解.

- (C) 方程组 $\boldsymbol{A}\boldsymbol{x} = 0$ 与方程组 $\boldsymbol{B}\boldsymbol{x} = 0$ 没有公共非零解.

- (D) 方程组 $\boldsymbol{A}\boldsymbol{B}\boldsymbol{A}\boldsymbol{x} = 0$ 与方程组 $\boldsymbol{B}\boldsymbol{A}\boldsymbol{B}\boldsymbol{x} = 0$ 有公共非零解.

*关联章节：[线性方程组](04-linear-systems.md)*

---

## 2024年

### 2024年 · 第9题 · 选择题

(9) 设 $\boldsymbol A$ 为 $4$ 阶矩阵， $\boldsymbol A^*$ 为 $\boldsymbol A$ 的伴随矩阵。若 $\displaystyle \boldsymbol A(\boldsymbol A-\boldsymbol A^*)=\boldsymbol O,\qquad \boldsymbol A\ne \boldsymbol A^*,$ 则 $r(\boldsymbol A)$ 的取值为（ ）

(A) $0$ 或 $1$　　(B) $1$ 或 $3$　　(C) $2$ 或 $3$　　(D) $1$ 或 $2$

---

### 2024年 · 第16题 · 填空题

(16) 设向量 $\displaystyle \boldsymbol\alpha_1= \begin{pmatrix} a\\ 1\\ -1\\ 1 \end{pmatrix},\quad \boldsymbol\alpha_2= \begin{pmatrix} 1\\ 1\\ b\\ a \end{pmatrix},\quad \boldsymbol\alpha_3= \begin{pmatrix} 1\\ a\\ -1\\ 1 \end{pmatrix}.$ 若 $\boldsymbol\alpha_1,\boldsymbol\alpha_2,\boldsymbol\alpha_3$ 线性相关，且其中任意两个向量均线性无关，则 $ab=$ ______

---

## 2023年

### 2023年 · 第10题 · 选择题

(10) 已知向量 $\displaystyle \boldsymbol a_1= \begin{pmatrix} 1\\ 2\\ 3 \end{pmatrix},\quad \boldsymbol a_2= \begin{pmatrix} 2\\ 1\\ 1 \end{pmatrix},\quad \boldsymbol\beta_1= \begin{pmatrix} 2\\ 5\\ 9 \end{pmatrix},\quad \boldsymbol\beta_2= \begin{pmatrix} 1\\ 0\\ 1 \end{pmatrix}.$ 若 $\boldsymbol\gamma$ 既可由 $\boldsymbol a_1,\boldsymbol a_2$ 线性表示，也可由 $\boldsymbol\beta_1,\boldsymbol\beta_2$ 线性表示，则 $\boldsymbol\gamma=$ （ ）。

- (A) $\displaystyle k \begin{pmatrix} 3\\ 3\\ 4 \end{pmatrix},\ k\in\mathbb R$

- (B) $\displaystyle k \begin{pmatrix} 3\\ 5\\ 10 \end{pmatrix},\ k\in\mathbb R$

- (C) $\displaystyle k \begin{pmatrix} -1\\ 1\\ 2 \end{pmatrix},\ k\in\mathbb R$

- (D) $\displaystyle k \begin{pmatrix} 1\\ 5\\ 8 \end{pmatrix},\ k\in\mathbb R$

---

## 2022年

### 2022年 · 第10题 · 选择题

(10) 设 $\boldsymbol{a}_{1} = \left( \begin{array}{c} \lambda \\ 1 \\ 1 \end{array} \right),\quad \boldsymbol{a}_{2} = \left( \begin{array}{c} 1 \\ \lambda \\ 1 \end{array} \right),\quad \boldsymbol{a}_{3} = \left( \begin{array}{c} 1 \\ 1 \\ \lambda \end{array} \right),\quad \boldsymbol{a}_{4} = \left( \begin{array}{c} 1 \\ \lambda \\ \lambda^{2} \end{array} \right)$ 若 $\boldsymbol{a}_{1}, \boldsymbol{a}_{2}, \boldsymbol{a}_{3}$ 与 $\boldsymbol{a}_{1}, \boldsymbol{a}_{2}, \boldsymbol{a}_{4}$ 等价，则 $\lambda$ 的取值范围是 $\left( \ \right)$

(A) $\left\{ 0,1 \right\}$　　(B) $\left\{ \lambda \mid \lambda \in \mathbb{R},\ \lambda \ne -2 \right\}$

(C) $\left\{ \lambda \mid \lambda \in \mathbb{R},\ \lambda \ne -1,\ \lambda \ne -2 \right\}$　　(D) $\left\{ \lambda \mid \lambda \in \mathbb{R},\ \lambda \ne -1 \right\}$

---

## 2021年

### 2021年 · 第9题 · 选择题

> 向量表出与方程解空间选择题。向量组 $A$ 能被 $B$ 线性表出意味着 $A=BC$。转置后 $A^T = C^T B^T$，从而 $B^T x=0$ 的解必定是 $A^T x=0$ 的解。

(9) 设 3 阶矩阵 $\boldsymbol{A}=\left(\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2},\boldsymbol{\alpha}_{3}\right)$ ， $\boldsymbol{B}=\left(\boldsymbol{\beta}_{1},\boldsymbol{\beta}_{2},\boldsymbol{\beta}_{3}\right)$ 。若向量组 $\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2},\boldsymbol{\alpha}_{3}$ 可以由向量组 $\boldsymbol{\beta}_{1},\boldsymbol{\beta}_{2},\boldsymbol{\beta}_{3}$ 线性表出，则

(A) $\boldsymbol{A}\boldsymbol{x}=0$ 的解均为 $\boldsymbol{B}\boldsymbol{x}=0$ 的解　　(B) $\boldsymbol{A}^{\mathrm{T}}\boldsymbol{x}=0$ 的解均为 $\boldsymbol{B}^{\mathrm{T}}\boldsymbol{x}=0$ 的解

(C) $\boldsymbol{B}\boldsymbol{x}=0$ 的解均为 $\boldsymbol{A}\boldsymbol{x}=0$ 的解　　(D) $\boldsymbol{B}^{\mathrm{T}}\boldsymbol{x}=0$ 的解均为 $\boldsymbol{A}^{\mathrm{T}}\boldsymbol{x}=0$ 的解

*关联章节：[线性方程组](04-linear-systems.md)*

---

## 2019年

### 2019年 · 第7题 · 选择题

(7) 设 $\boldsymbol{A}$ 是四阶矩阵， $\boldsymbol{A}^{*}$ 是 $\boldsymbol{A}$ 的伴随矩阵。若线性方程组 $\displaystyle \boldsymbol{A}\boldsymbol{x}=\boldsymbol{0}$ 的基础解系中只有 $2$ 个向量，则 $\boldsymbol{A}^{*}$ 的秩是

(A) $0$　　(B) $1$　　(C) $2$　　(D) $3$

---

### 2019年 · 第22题 · 解答题

> 两向量组等价大题。两向量组等价充分必要条件是秩相等且可互相线性表出，联立大矩阵做行初等变换同时解决秩与表出系数。

已知向量组 $\displaystyle \text{(I)}\quad \boldsymbol{\alpha}_{1}= \begin{pmatrix}1\\1\\4\end{pmatrix}, \quad \boldsymbol{\alpha}_{2}= \begin{pmatrix}1\\0\\4\end{pmatrix}, \quad \boldsymbol{\alpha}_{3}= \begin{pmatrix}1\\2\\a^{2}+3\end{pmatrix},$ $\displaystyle \text{(II)}\quad \boldsymbol{\beta}_{1}= \begin{pmatrix}1\\1\\a+3\end{pmatrix}, \quad \boldsymbol{\beta}_{2}= \begin{pmatrix}0\\2\\1-a\end{pmatrix}, \quad \boldsymbol{\beta}_{3}= \begin{pmatrix}1\\3\\a^{2}+3\end{pmatrix}.$ 若向量组（I）和向量组（II）等价，求 $a$ 的取值，并将 $\boldsymbol{\beta}_{3}$ 用 $\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2},\boldsymbol{\alpha}_{3}$ 线性表示。

---

## 2018年

### 2018年 · 第8题 · 选择题

(8) 设 $\boldsymbol A,\boldsymbol B$ 为 $n$ 阶矩阵，记 $r(\boldsymbol X)$ 为矩阵 $\boldsymbol X$ 的秩， $(\boldsymbol X,\boldsymbol Y)$ 表示分块矩阵，则 $\left(\ \right)$

(A) $r(\boldsymbol A,\boldsymbol A\boldsymbol B)=r(\boldsymbol A)$　　(B) $r(\boldsymbol A,\boldsymbol B\boldsymbol A)=r(\boldsymbol A)$

(C) $r(\boldsymbol A,\boldsymbol B)=\max\{r(\boldsymbol A),r(\boldsymbol B)\}$　　(D) $r(\boldsymbol A,\boldsymbol B)=r(\boldsymbol A^T,\boldsymbol B^T)$

---

## 2016年

### 2016年 · 第14题 · 填空题

(14) 设矩阵 $\displaystyle \begin{pmatrix} a&-1&-1\\ -1&a&-1\\ -1&-1&a \end{pmatrix}$ 与 $\displaystyle \begin{pmatrix} 1&1&0\\ 0&-1&1\\ 1&0&1 \end{pmatrix}$ 等价，则 $a=$ ______ 。

---

## 2014年

### 2014年 · 第8题 · 选择题

(8) 设 $\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2},\boldsymbol{\alpha}_{3}$ 是三维向量，则对任意的常数 $k,l$ ，向量 $\boldsymbol{\alpha}_{1}+k\boldsymbol{\alpha}_{3}$ ， $\boldsymbol{\alpha}_{2}+l\boldsymbol{\alpha}_{3}$ 线性无关是向量 $\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2},\boldsymbol{\alpha}_{3}$ 线性无关的（ ）

(A) 必要而非充分条件　　(B) 充分而非必要条件　　(C) 充分必要条件　　(D) 非充分非必要条件

---

## 2013年

### 2013年 · 第7题 · 选择题

(7) 设矩阵 $\boldsymbol{A},\boldsymbol{B},\boldsymbol{C}$ 均为 $n$ 阶矩阵，若 $\boldsymbol{A}\boldsymbol{B}=\boldsymbol{C}$ ，且 $\boldsymbol{B}$ 可逆，则（ ）

- (A) 矩阵 $\boldsymbol{C}$ 的行向量组与矩阵 $\boldsymbol{A}$ 的行向量组等价

- (B) 矩阵 $\boldsymbol{C}$ 的列向量组与矩阵 $\boldsymbol{A}$ 的列向量组等价

- (C) 矩阵 $\boldsymbol{C}$ 的行向量组与矩阵 $\boldsymbol{B}$ 的行向量组等价

- (D) 矩阵 $\boldsymbol{C}$ 的行向量组与矩阵 $\boldsymbol{B}$ 的列向量组等价

*关联章节：[矩阵运算、逆矩阵与初等变换](02-matrices.md)*

---

## 2012年

### 2012年 · 第7题 · 选择题

(7) 设 $\boldsymbol{\alpha}_{1} = \begin{pmatrix} 0 \\ 0 \\ c_{1} \end{pmatrix}$ ， $\boldsymbol{\alpha}_{2} = \begin{pmatrix} 0 \\ 1 \\ c_{2}\end{pmatrix}$ ， $\boldsymbol{\alpha}_{3}=\begin{pmatrix} 1 \\ -1 \\c_{3}\end{pmatrix}$ ， $\boldsymbol{\alpha}_{4}=\begin{pmatrix}-1 \\1 \\ c_{4}\end{pmatrix}$ ， 其中 $c_{1},c_{2},c_{3},c_{4}$ 为任意常数，则下列向量组线性相关的是（ ）

(A) $\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2},\boldsymbol{\alpha}_{3}$　　(B) $\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2},\boldsymbol{\alpha}_{4}$

(C) $\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{3},\boldsymbol{\alpha}_{4}$　　(D) $\boldsymbol{\alpha}_{2},\boldsymbol{\alpha}_{3},\boldsymbol{\alpha}_{4}$

---

## 2011年

### 2011年 · 第22题 · 解答题

设向量组 $\boldsymbol{\alpha}_{1}=\left(1,0,1\right)^{T}$ ， $\boldsymbol{\alpha}_{2}=\left(0,1,1\right)^{T}$ ， $\boldsymbol{\alpha}_{3}=\left(1,3,5\right)^{T}$ ， 不能由向量组 $\boldsymbol{\beta}_{1}=\left(1,1,1\right)^{T}$ ， $\boldsymbol{\beta}_{2}=\left(1,2,3\right)^{T}$ ， $\boldsymbol{\beta}_{3}=\left(3,4,a\right)^{T}$ 线性表示。

（I）求 $a$ 的值；

（II）将 $\boldsymbol{\beta}_{1},\boldsymbol{\beta}_{2},\boldsymbol{\beta}_{3}$ 由 $\boldsymbol{\alpha}_{1},\boldsymbol{\alpha}_{2},\boldsymbol{\alpha}_{3}$ 线性表示。

---

## 2010年

### 2010年 · 第7题 · 选择题

(7) 设向量组 I： $\boldsymbol{\alpha}_{1}, \boldsymbol{\alpha}_{2}, \cdots, \boldsymbol{\alpha}_{r}$ 可由向量组 II： $\boldsymbol{\beta}_{1}, \boldsymbol{\beta}_{2}, \cdots, \boldsymbol{\beta}_{s}$ 线性表示，下列命题正确的是（ ）

(A) 若向量组 I 线性无关，则 $r \le s$ .　　(B) 若向量组 I 线性相关，则 $r > s$ .

(C) 若向量组 II 线性无关，则 $r \le s$ .　　(D) 若向量组 II 线性相关，则 $r > s$ .

---

## 交叉考点索引

以下题目主归其他章节，点击跳转到对应章节题目；不计入本章主收录题数：

- [2026年 · 第9题](04-linear-systems.md)（主章节：线性方程组）
- [2026年 · 第10题](05-eigenvalues-similarity.md)（主章节：特征值、特征向量与相似）
- [2026年 · 第16题](06-quadratic-forms.md)（主章节：二次型）
- [2018年 · 第14题](01-determinants.md)（主章节：行列式）
- [2018年 · 第22题](06-quadratic-forms.md)（主章节：二次型）
- [2017年 · 第22题](04-linear-systems.md)（主章节：线性方程组）
- [2016年 · 第22题](04-linear-systems.md)（主章节：线性方程组）
- [2016年 · 第23题](05-eigenvalues-similarity.md)（主章节：特征值、特征向量与相似）
- [2013年 · 第23题](06-quadratic-forms.md)（主章节：二次型）
- [2012年 · 第23题](06-quadratic-forms.md)（主章节：二次型）
- [2011年 · 第8题](04-linear-systems.md)（主章节：线性方程组）
