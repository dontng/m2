# 高等数学 · 二重积分

> 2010—2026年 · 29 道完整真题 · 年份从新到旧（2026→2010）  
> 题型分布：选择题 9 题 · 填空题 3 题 · 解答题 17 题  
> 考查范围：积分区域、换序、对称性、极坐标与二重积分计算

[查看对应网页版](19-double-integrals.html) · [返回章节总目录](../README.md)

---

## 2026年

### 2026年 · 第7题 · 选择题

> 轮换对称性选择题。区域 $D$ 关于 $y=x$ 对称且 $f(x,y)=f(y,x)$，直接用轮换对称性将积分拆半，结合积分定义秒定选项。

(7) 设函数 $f(x,y)$ 在区域 $\displaystyle D=\{(x,y)\mid 0\le x\le 1,\ 0\le y\le 1\}$ 上连续，且 $f(x,y)=f(y,x)$ ，则 $\displaystyle \iint\limits_D f(x,y)\,dx\,dy=$

- (A) $\displaystyle 2\lim\limits_{n\to\infty}\sum\limits_{i=1}^n\sum\limits_{j=n+1-i}^n f\!\left(\frac{i}{n},\frac{j}{n}\right)\frac{1}{n^2}$

- (B) $\displaystyle \frac12\lim\limits_{n\to\infty}\sum\limits_{i=1}^n\sum\limits_{j=i}^n f\!\left(\frac{i}{n},\frac{j}{n}\right)\frac{1}{n^2}$

- (C) $\displaystyle 2\lim\limits_{n\to\infty}\sum\limits_{i=1}^{2n}\sum\limits_{j=1}^{2n+1-i} f\!\left(\frac{i}{2n},\frac{j}{2n}\right)\frac{1}{n^2}$

- (D) $\displaystyle \frac12\lim\limits_{n\to\infty}\sum\limits_{i=1}^{2n}\sum\limits_{j=1}^i f\!\left(\frac{i}{2n},\frac{j}{2n}\right)\frac{1}{n^2}$

---

### 2026年 · 第17题 · 解答题

> 二重积分计算大题。区域含 $|x|$ 且被积函数含 $\sqrt{x^2+y^2}$，画出图形明显是环形扇区，果断换极坐标，角度和半径范围切忌写错。

计算 $\displaystyle I=\int_{-1}^1 dx\int_{|x|}^{\sqrt{2-x^2}} y\sin\sqrt{x^2+y^2}\,dy.$

---

## 2025年

### 2025年 · 第5题 · 选择题

(5) 设函数 $f\left( x, y \right)$ 连续，则 $\int_{-2}^{2} \mathrm{~d} x \int_{4 - x^{2}}^{2} f\left( x, y \right) \mathrm{~d} y =$

- (A) $\int_{0}^{4} \left[ \int_{-2}^{-\sqrt{4 - y}} f\left( x, y \right) \mathrm{~d} x + \int_{\sqrt{4 - y}}^{2} f\left( x, y \right) \mathrm{~d} x \right] \mathrm{~d} y$

- (B) $\int_{0}^{4} \left[ \int_{-2}^{\sqrt{4 - y}} f\left( x, y \right) \mathrm{~d} x + \int_{\sqrt{4 - y}}^{2} f\left( x, y \right) \mathrm{~d} x \right] \mathrm{~d} y$

- (C) $\int_{0}^{4} \left[ \int_{-2}^{-\sqrt{4 - y}} f\left( x, y \right) \mathrm{~d} x + \int_{2}^{\sqrt{4 - y}} f\left( x, y \right) \mathrm{~d} x \right] \mathrm{~d} y$

- (D) $2 \int_{0}^{4} \mathrm{~d} y \int_{\sqrt{4 - y}}^{2} f\left( x, y \right) \mathrm{~d} x$

---

### 2025年 · 第20题 · 解答题

> 双圆相交二重积分。被积函数含 $x,y$，区域关于 $y=x$ 对称，先用轮换对称性将被积函数化简，再换极坐标分段定限。

已知平面有界区域 $D = \left\{ \left( x, y \right) \mid x^{2} + y^{2} \le 4x,\ x^{2} + y^{2} \le 4y \right\}$ ，计算 $\iint\limits_{D} \left( x - y \right)^{2} \mathrm{d} x \mathrm{d} y$ .

---

## 2024年

### 2024年 · 第6题 · 选择题

(6) 设 $f(x,y)$ 为连续函数，则 $\displaystyle \int_{\pi/6}^{\pi/2}dx\int_{\sin x}^{1}f(x,y)\,dy = (\ \ )$

(A) $\displaystyle \int_{1/2}^{1}dy\int_{\pi/6}^{\arcsin y}f(x,y)\,dx$　　(B) $\displaystyle \int_{1/2}^{1}dy\int_{\arcsin y}^{\pi/2}f(x,y)\,dx$

(C) $\displaystyle \int_0^{1/2}dy\int_{\pi/6}^{\arcsin y}f(x,y)\,dx$　　(D) $\displaystyle \int_0^{1/2}dy\int_{\arcsin y}^{\pi/2}f(x,y)\,dx$

---

### 2024年 · 第17题 · 解答题

设平面有界区域 $D$ 位于第一象限，由曲线 $\displaystyle xy=\frac13,\qquad xy=3$ 与直线 $\displaystyle y=\frac13x,\qquad y=3x$ 围成，计算 $\displaystyle \iint\limits_D(1+x-y)\,dx\,dy.$

---

## 2023年

### 2023年 · 第20题 · 解答题

> 斜椭圆环状区域积分。曲线方程含 $x^2+y^2-xy$，换极坐标后把 $1 - \sin\theta\cos\theta$ 提到分母，先积 $r$ 再积 $\theta$ 会非常丝滑。

设平面有界区域 $D$ 位于第一象限，由曲线 $\displaystyle x^2+y^2-xy=1,\qquad x^2+y^2-xy=2$ 与直线 $\displaystyle y=\sqrt3\,x,\qquad y=0$ 围成，计算 $\displaystyle \iint\limits_D \frac{1}{3x^2+y^2}\,dx\,dy.$

---

## 2022年

### 2022年 · 第2题 · 选择题

(2) $\int_{0}^{2} \mathrm{d}y \int_{y}^{2} \frac{y}{\sqrt{\left( 1 + x^{3} \right)}} \mathrm{~d}x = \left( \ \right)$

(A) $\frac{\sqrt{2}}{6}$　　(B) $\frac{1}{3}$　　(C) $\frac{\sqrt{2}}{3}$　　(D) $\frac{2}{3}$

---

### 2022年 · 第19题 · 解答题

已知平面区域 $D = \left\{ \left( x,y \right) \mid y - 2 \le x \le \sqrt{4 - y^{2}},\ 0 \le y \le 2 \right\}$ 计算 $I = \iint\limits_{D} \frac{\left( x-y \right)^{2}}{x^{2} + y^{2}} \mathrm{~d}x \mathrm{~d}y$

---

## 2021年

### 2021年 · 第21题 · 解答题

> 双纽线区域二重积分。方程 $\left(x^2+y^2\right)^2 = x^2-y^2$ 是标准双纽线，直接换极坐标 $r^2 = \cos 2\theta$，半径积分一眼出结果。

曲线 $\displaystyle \left(x^{2}+y^{2}\right)^{2}=x^{2}-y^{2},$ 其中 $x \ge 0,\ y \ge 0$ ，与 $x$ 轴围成的区域为 $D$ ，求 $\displaystyle \iint\limits_{D} xy \,\mathrm{d}x\,\mathrm{d}y.$

---

## 2020年

### 2020年 · 第10题 · 填空题

(10) $\int_{0}^{1}{\mathrm{d} y \int_{\sqrt{y}}^{1}{\sqrt{x^{3}+1} \mathrm{~d} x}} =$ ______ .

---

### 2020年 · 第19题 · 解答题

设平面区域 $D$ 由直线 $x=1$ ， $x=2$ ， $y=x$ 与 $x$ 轴围成。计算 $\displaystyle \iint\limits_{D}{\dfrac{\sqrt{x^{2}+y^{2}}}{x} \mathrm{~d} x \mathrm{~d} y}$

---

## 2019年

### 2019年 · 第5题 · 选择题

(5) 已知积分区域 $\displaystyle D=\left\{(x,y)\mid |x|+|y|\le \frac{\pi}{2}\right\},$ 且 $\displaystyle I_{1}=\iint\limits_{D}\sqrt{x^{2}+y^{2}}\,\mathrm{d}x\mathrm{d}y,$ $\displaystyle I_{2}=\iint\limits_{D}\sin\sqrt{x^{2}+y^{2}}\,\mathrm{d}x\mathrm{d}y,$ $\displaystyle I_{3}=\iint\limits_{D}\left(1-\cos\sqrt{x^{2}+y^{2}}\right)\mathrm{d}x\mathrm{d}y,$ 则大小关系为

(A) $I_{3}<I_{2}<I_{1}$　　(B) $I_{1}<I_{2}<I_{3}$　　(C) $I_{2}<I_{1}<I_{3}$　　(D) $I_{2}<I_{3}<I_{1}$

---

### 2019年 · 第18题 · 解答题

已知平面区域 $D$ 满足 $\displaystyle |x|\le y,\qquad (x^2+y^2)^3\le y^4,$ 求 $\displaystyle \iint\limits_D\frac{x+y}{\sqrt{x^2+y^2}}\,\mathrm{d}x\mathrm{d}y.$

---

## 2018年

### 2018年 · 第6题 · 选择题

(6) $\displaystyle \int_{-1}^{0}\mathrm{d}x\int_{-x}^{2-x^{2}}(1-xy)\,\mathrm{d}y + \int_{0}^{1}\mathrm{d}x\int_{x}^{2-x^{2}}(1-xy)\,\mathrm{d}y = \left(\ \right)$

(A) $\dfrac{5}{3}$　　(B) $\dfrac{5}{6}$　　(C) $\dfrac{7}{3}$　　(D) $\dfrac{7}{6}$

---

### 2018年 · 第17题 · 解答题

设平面区域 $D$ 由曲线 $\displaystyle \begin{cases} x=t-\sin t,\\ y=1-\cos t \end{cases} \qquad 0\leq t\leq 2\pi$ 与 $x$ 轴围成，计算二重积分 $\displaystyle \iint\limits_D(x+2y)\,\mathrm{d}x\,\mathrm{d}y.$

---

## 2017年

### 2017年 · 第13题 · 填空题

(13) $\displaystyle \int_0^1\mathrm{d}y\int_y^1\frac{\tan x}{x}\mathrm{d}x=$ ______ .

---

### 2017年 · 第20题 · 解答题

已知平面区域 $\displaystyle D=\{(x,y)\mid x^2+y^2\le2y\},$ 计算二重积分 $\displaystyle \iint\limits_D(x+1)^2\mathrm{d}x\mathrm{d}y.$

---

## 2016年

### 2016年 · 第18题 · 解答题

设 $D$ 是由直线 $y=1$ ， $y=x$ ， $y=-x$ 围成的有界区域，计算二重积分 $\displaystyle \iint\limits_D\frac{x^2-xy-y^2}{x^2+y^2}\,\mathrm{d}x\,\mathrm{d}y.$

---

## 2015年

### 2015年 · 第6题 · 选择题

(6) 设 $D$ 是第一象限中由曲线 $2xy=1$ 、 $4xy=1$ 与直线 $y=x$ 、 $y=\sqrt3x$ 围成的平面区域，函数 $f(x,y)$ 在 $D$ 上连续，则 $\displaystyle\iint\limits_D f(x,y)\,\mathrm dx\,\mathrm dy=$ （ ）

- (A) $\displaystyle\int_{\pi/4}^{\pi/3}\mathrm d\theta\int_{\frac1{2\sin2\theta}}^{\frac1{\sin2\theta}} f(r\cos\theta,r\sin\theta)r\,\mathrm dr$

- (B) $\displaystyle\int_{\pi/4}^{\pi/3}\mathrm d\theta\int_{\frac1{\sqrt{2\sin2\theta}}}^{\frac1{\sqrt{\sin2\theta}}} f(r\cos\theta,r\sin\theta)r\,\mathrm dr$

- (C) $\displaystyle\int_{\pi/4}^{\pi/3}\mathrm d\theta\int_{\frac1{2\sin2\theta}}^{\frac1{\sin2\theta}} f(r\cos\theta,r\sin\theta)\,\mathrm dr$

- (D) $\displaystyle\int_{\pi/4}^{\pi/3}\mathrm d\theta\int_{\frac1{\sqrt{2\sin2\theta}}}^{\frac1{\sqrt{\sin2\theta}}} f(r\cos\theta,r\sin\theta)\,\mathrm dr$

---

### 2015年 · 第18题 · 解答题

计算二重积分 $\iint\limits_{D}x\left(x+y\right)\mathrm{~d}x\mathrm{~d}y$ ，其中 $D=\left\{\left(x,y\right)\middle|x^{2}+y^{2}\leq 2,y\geq x^{2}\right\}$ 。

---

## 2014年

### 2014年 · 第17题 · 解答题

设平面区域 $D=\left\{\left(x,y\right)\middle|1\leq x^{2}+y^{2}\leq 4,x\geq 0,y\geq 0\right\}$ 。计算 $\iint\limits_{D}\frac{x\sin\left(\pi\sqrt{x^{2}+y^{2}}\right)}{x+y}\mathrm{~d}x\mathrm{~d}y$ 。

---

## 2013年

### 2013年 · 第6题 · 选择题

(6) 设 $D_{k}$ 是圆域 $D=\left\{\left(x,y\right)\middle|x^{2}+y^{2}\leq 1\right\}$ 在第 $k$ 象限的部分，记 $I_{k}=\iint\limits_{D_{k}}\left(y-x\right)\mathrm{~d}x\mathrm{~d}y\left(k=1,2,3,4\right)$ ，则（ ）

(A) $I_{1}>0$　　(B) $I_{2}>0$　　(C) $I_{3}>0$　　(D) $I_{4}>0$

---

### 2013年 · 第17题 · 解答题

设平面内区域 $D$ 由直线 $x=3y$ ， $y=3x$ 及 $x+y=8$ 围成，计算 $\iint\limits_{D}x^{2}\mathrm{~d}x\mathrm{~d}y$ 。

---

## 2012年

### 2012年 · 第6题 · 选择题

(6) 设区域 $D$ 由曲线 $y=\sin x$ ， $x=\pm\frac{\pi}{2}$ ， $y=1$ 围成，则 $\iint\limits_{D}\left(x^{5}y-1\right)\mathrm{~d}x\mathrm{~d}y=$ （ ）

(A) $\pi$　　(B) $2$　　(C) $-2$　　(D) $-\pi$

---

### 2012年 · 第18题 · 解答题

计算二重积分 $\iint\limits_{D}xy\mathrm{d}\sigma$ ，其中区域 $D$ 为曲线 $r=1+\cos\theta\left(0\leq\theta\leq\pi\right)$ 与极轴围成。

---

## 2011年

### 2011年 · 第13题 · 填空题

(13) 设平面区域 $D$ 由直线 $y=x$ ，圆 $x^{2}+y^{2}=2y$ 及 $y$ 轴围成，则二重积分 $\iint\limits_{D}xy\mathrm{d}\sigma=$ ______ .

---

### 2011年 · 第21题 · 解答题

已知函数 $f\left(x,y\right)$ 具有二阶连续偏导数，且 $f\left(1,y\right)=0$ ， $f\left(x,1\right)=0$ ， $\iint\limits_{D}f\left(x,y\right)\mathrm{~d}x\mathrm{~d}y=a$ ，其中 $D=\left\{\left(x,y\right)\middle|0\leq x\leq 1,0\leq y\leq 1\right\}$ 。计算二重积分 $I=\iint\limits_{D}xyf_{xy}^{\prime\prime}\left(x,y\right)\mathrm{~d}x\mathrm{~d}y$ 。

*关联章节：[多元复合函数与隐函数求导](17-chain-implicit.md)*

---

## 2010年

### 2010年 · 第20题 · 解答题

计算二重积分 $I = \iint\limits_{D}r^{2}\sin \theta \sqrt{1 - r^{2}\cos 2\theta}\mathrm{~d}r\mathrm{~d}\theta$ ，其中 $D = \left\{\left(r, \theta\right)\mid 0 \le r \le \sec \theta, 0 \le \theta \le \frac{\pi}{4}\right\}$ .

---

## 交叉考点索引

以下题目主归其他章节，点击跳转到对应章节题目；不计入本章主收录题数：

- [2021年 · 第14题](11-definite-integrals.md)（主章节：定积分、变上限积分与积分性质）
- [2010年 · 第6题](02-sequences.md)（主章节：数列极限与求和极限）
