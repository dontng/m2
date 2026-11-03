# 线性代数 · 二次型

> 2010—2026年 · 16 道完整真题 · 年份从新到旧（2026→2010）  
> 题型分布：选择题 5 题 · 填空题 3 题 · 解答题 8 题  
> 考查范围：标准形与规范形、惯性指数、合同与正交变换

[查看对应网页版](06-quadratic-forms.html) · [返回章节总目录](../README.md)

---

## 2026年

### 2026年 · 第16题 · 填空题

> 规范形与惯性指数填空。规范形为 $y_1^2$ 说明正惯性指数为 1，负惯性指数为 0，即矩阵半正定且秩为 1。由所有 2 阶子式为 0 列方程定 $a, b$。

(16) 设矩阵 $\displaystyle \boldsymbol A= \begin{pmatrix} 1&b&-1\\ a+2&3&-3a \end{pmatrix}.$ 若二次型 $\displaystyle \boldsymbol x^T(\boldsymbol A\boldsymbol A^T)\boldsymbol x$ 的规范形为 $y_1^2$ ，则 $a+b=$ ______ .

*关联章节：[向量组、线性相关与秩](03-vectors-rank.md)*

---

## 2025年

### 2025年 · 第22题 · 解答题

> 合同与正交相似大题。合同说明正负惯性指数相同，定出参数范围；第二问正交相似说明特征值完全相同，用特征值相等列方程定正交矩阵 $Q$。

已知矩阵 $\boldsymbol{A} = \begin{pmatrix} 4 & 1 & -2 \\ 1 & 1 & 1 \\ -2 & 1 & a \end{pmatrix}$ ， $\boldsymbol{B} = \begin{pmatrix} k & 0 & 0 \\ 0 & 6 & 0 \\ 0 & 0 & 0 \end{pmatrix}$ 合同.

1. 求 $a$ 的值及 $k$ 的取值范围；

2. 若存在正交矩阵 $\boldsymbol{Q}$ ，使得 $\boldsymbol{Q}^{\mathrm{T}} \boldsymbol{A} \boldsymbol{Q} = \boldsymbol{B}$ ，求 $k$ 及 $\boldsymbol{Q}$ .

*关联章节：[特征值、特征向量与相似](05-eigenvalues-similarity.md)*

---

## 2024年

### 2024年 · 第22题 · 解答题

> 解空间包含与正交对角化大题。方程组不同解但解包含，得出基础解系包含关系从而定出参数；对称化二次型矩阵 $M = \frac{BA+(BA)^T}{2}$ 后正交对角化。

设矩阵 $\displaystyle \boldsymbol A= \begin{pmatrix} 0&1&a\\ 1&0&1 \end{pmatrix},\qquad \boldsymbol B= \begin{pmatrix} 1&1\\ 1&1\\ b&2 \end{pmatrix},$ 二次型 $\displaystyle f(x_1,x_2,x_3)=\boldsymbol x^T\boldsymbol B\boldsymbol A\boldsymbol x.$ 已知方程组 $\boldsymbol A\boldsymbol x=0$ 的解是 $\boldsymbol B^T\boldsymbol x=0$ 的解，但两个方程组不同解。

1. 求 $a,b$ 的值；

2. 求正交变换 $\boldsymbol x=\boldsymbol Q\boldsymbol y$ ，将 $f(x_1,x_2,x_3)$ 化为标准形。

*关联章节：[线性方程组](04-linear-systems.md) · [特征值、特征向量与相似](05-eigenvalues-similarity.md)*

---

## 2023年

### 2023年 · 第9题 · 选择题

(9) 二次型 $\displaystyle f(x_1,x_2,x_3)=(x_1+x_2)^2+(x_1+x_3)^2-4(x_2-x_3)^2$ 的规范形为（ ）。

(A) $y_1^2+y_2^2$　　(B) $y_1^2-y_2^2$

(C) $y_1^2+y_2^2-4y_3^2$　　(D) $y_1^2+y_2^2-y_3^2$

---

## 2022年

### 2022年 · 第22题 · 解答题

> 标准二次型正交变换大题。写出实对称矩阵，求特征值与特征向量；注意如果有重特征值必须用施密特正交化，单位化后拼成正交矩阵 $Q$。

已知二次型 $f\left( x_{1},x_{2},x_{3} \right) = 3x_{1}^{2} + 4x_{2}^{2} + 3x_{3}^{2} + 2x_{1}x_{3}$

（I） 求正交矩阵 $\boldsymbol{Q}$ ，使正交变换 $\boldsymbol{x} = \boldsymbol{Q}\boldsymbol{y}$ 将二次型 $f\left( x_{1},x_{2},x_{3} \right)$ 化为标准形；

（II） 证明 $\min\limits_{\boldsymbol{x} \ne \boldsymbol{0}} \frac{f\left( \boldsymbol{x} \right)}{\boldsymbol{x}^{T}\boldsymbol{x}} = 2$

*关联章节：[特征值、特征向量与相似](05-eigenvalues-similarity.md)*

---

## 2021年

### 2021年 · 第8题 · 选择题

(8) 二次型 $\displaystyle f(x_1,x_2,x_3)=\left(x_1+x_2\right)^2+\left(x_2+x_3\right)^2-\left(x_3-x_1\right)^2$ 的正惯性指数与负惯性指数依次为

(A) $2,0$　　(B) $1,1$　　(C) $2,1$　　(D) $1,2$

---

## 2020年

### 2020年 · 第22题 · 解答题

设二次型 $\displaystyle f(x_1,x_2,x_3)=x_1^2+x_2^2+x_3^2+2ax_1x_2+2ax_1x_3+2ax_2x_3$ 经过可逆线性变换 $\displaystyle \begin{pmatrix} x_1\\ x_2\\ x_3 \end{pmatrix} = \boldsymbol{P} \begin{pmatrix} y_1\\ y_2\\ y_3 \end{pmatrix}$ 化为二次型 $\displaystyle g(y_1,y_2,y_3)=y_1^2+y_2^2+4y_3^2+2y_1y_2.$ 1. 求 $a$ 的值；

2. 求可逆矩阵 $\boldsymbol{P}$ 。

*关联章节：[特征值、特征向量与相似](05-eigenvalues-similarity.md)*

---

## 2019年

### 2019年 · 第8题 · 选择题

(8) 设 $\boldsymbol{A}$ 是 $3$ 阶实对称矩阵， $\boldsymbol{E}$ 是 $3$ 阶单位矩阵。若 $\displaystyle \boldsymbol{A}^{2}+\boldsymbol{A}=2\boldsymbol{E},\qquad |\boldsymbol{A}|=4,$ 则二次型 $\boldsymbol{X}^{T}\boldsymbol{A}\boldsymbol{X}$ 的规范形为

(A) $y_{1}^{2}+y_{2}^{2}+y_{3}^{2}$　　(B) $y_{1}^{2}+y_{2}^{2}-y_{3}^{2}$

(C) $y_{1}^{2}-y_{2}^{2}-y_{3}^{2}$　　(D) $-y_{1}^{2}-y_{2}^{2}-y_{3}^{2}$

---

## 2018年

### 2018年 · 第22题 · 解答题

> 完全平方式求二次型参数。写出二次型矩阵，求秩为 2 或正定条件；配方法直接观察平方项系数，比硬算特征值快得多。

设实二次型 $\displaystyle f(x_1,x_2,x_3) = (x_1-x_2+x_3)^2+(x_2+x_3)^2+(x_1+a x_3)^2,$ 其中 $a$ 是参数。

（1）求 $f(x_1,x_2,x_3)=0$ 的解；

（2）求 $f(x_1,x_2,x_3)$ 的规范形。

*关联章节：[线性方程组](04-linear-systems.md) · [向量组、线性相关与秩](03-vectors-rank.md)*

---

## 2017年

### 2017年 · 第23题 · 解答题

设二次型 $\displaystyle f(x_1,x_2,x_3) = 2x_1^2-x_2^2+ax_3^2 +2x_1x_2-8x_1x_3+2x_2x_3$ 在正交变换 $\boldsymbol X=\boldsymbol Q\boldsymbol Y$ 下的标准型为 $\displaystyle \lambda_1y_1^2+\lambda_2y_2^2.$ 求 $a$ 的值及一个正交矩阵 $\boldsymbol Q$ 。

*关联章节：[特征值、特征向量与相似](05-eigenvalues-similarity.md)*

---

## 2016年

### 2016年 · 第8题 · 选择题

(8) 设二次型 $\displaystyle f(x_1,x_2,x_3)=a(x_1^2+x_2^2+x_3^2)+2x_1x_2+2x_2x_3+2x_1x_3$ 的正、负惯性指数分别为 $1,2$ ，则：

(A) $a>1$ 。　　(B) $a<-2$ 。　　(C) $-2<a<1$ 。　　(D) $a=1$ 与 $a=-2$ 。

---

## 2015年

### 2015年 · 第8题 · 选择题

(8) 设二次型 $f\left(x_{1},x_{2},x_{3}\right)$ 在正交变换 $\boldsymbol{x}=\boldsymbol{P}\boldsymbol{y}$ 下的标准形为 $2y_{1}^{2}+y_{2}^{2}-y_{3}^{2}$ ，其中 $\boldsymbol{P}=\left(\boldsymbol{e}_{1},\boldsymbol{e}_{2},\boldsymbol{e}_{3}\right)$ ，若 $\boldsymbol{Q}=\left(\boldsymbol{e}_{1},-\boldsymbol{e}_{3},\boldsymbol{e}_{2}\right)$ ，则 $f\left(x_{1},x_{2},x_{3}\right)$ 在正交变换 $\boldsymbol{x}=\boldsymbol{Q}\boldsymbol{y}$ 下的标准形为（ ）

(A) $2y_{1}^{2}-y_{2}^{2}+y_{3}^{2}$　　(B) $2y_{1}^{2}+y_{2}^{2}-y_{3}^{2}$

(C) $2y_{1}^{2}-y_{2}^{2}-y_{3}^{2}$　　(D) $2y_{1}^{2}+y_{2}^{2}+y_{3}^{2}$

---

## 2014年

### 2014年 · 第14题 · 填空题

(14) 设二次型 $f\left(x_{1},x_{2},x_{3}\right)=x_{1}^{2}-x_{2}^{2}+2ax_{1}x_{3}+4x_{2}x_{3}$ 的负惯性指数是 $1$ ，则 $a$ 的取值范围是 ______ 。

---

## 2013年

### 2013年 · 第23题 · 解答题

设二次型 $f\left(x_{1},x_{2},x_{3}\right)=2\left(a_{1}x_{1}+a_{2}x_{2}+a_{3}x_{3}\right)^{2}+\left(b_{1}x_{1}+b_{2}x_{2}+b_{3}x_{3}\right)^{2}$ ， 记 $\boldsymbol{\alpha}=\left(\begin{matrix}a_{1}\\a_{2}\\a_{3}\end{matrix}\right),\quad \boldsymbol{\beta}=\left(\begin{matrix}b_{1}\\b_{2}\\b_{3}\end{matrix}\right)$ 。

（I）证明二次型 $f$ 对应的矩阵为 $2\boldsymbol{\alpha}\boldsymbol{\alpha}^{T}+\boldsymbol{\beta}\boldsymbol{\beta}^{T}$ ；

（II）若 $\boldsymbol{\alpha},\boldsymbol{\beta}$ 正交且均为单位向量，证明二次型 $f$ 在正交变换下的标准形为二次型 $2y_{1}^{2}+y_{2}^{2}$ 。

*关联章节：[向量组、线性相关与秩](03-vectors-rank.md) · [特征值、特征向量与相似](05-eigenvalues-similarity.md)*

---

## 2012年

### 2012年 · 第23题 · 解答题

三阶矩阵 $\boldsymbol{A}=\left(\begin{matrix}1&0&1 \\ 0&1&1 \\ -1&0&a\end{matrix}\right)$ ， $\boldsymbol{A}^{T}$ 为矩阵 $\boldsymbol{A}$ 的转置，已知 $r\left(\boldsymbol{A}^{T}\boldsymbol{A}\right)=2$ ，且二次型 $f=\boldsymbol{x}^{T}\boldsymbol{A}^{T}\boldsymbol{A}\boldsymbol{x}$ 。

（1）求 $a$ ；

（2）求二次型对应的二次型矩阵，并将二次型化为标准型，写出正交变换过程。

*关联章节：[向量组、线性相关与秩](03-vectors-rank.md) · [特征值、特征向量与相似](05-eigenvalues-similarity.md)*

---

## 2011年

### 2011年 · 第14题 · 填空题

(14) 二次型 $f\left(x_{1},x_{2},x_{3}\right)=x_{1}^{2}+3x_{2}^{2}+x_{3}^{2}+2x_{1}x_{2}+2x_{1}x_{3}+2x_{2}x_{3}$ 的正惯性指数为 ______ .

---

## 交叉考点索引

以下题目主归其他章节，点击跳转到对应章节题目；不计入本章主收录题数：

- [2025年 · 第8题](05-eigenvalues-similarity.md)（主章节：特征值、特征向量与相似）
- [2010年 · 第23题](05-eigenvalues-similarity.md)（主章节：特征值、特征向量与相似）
