[« 导数、微分与求导法则](04-derivatives.md)　　[单调性、极值与零点个数 »](06-monotonicity-extrema.md)

# 高等数学 · 中值定理、零点与不等式证明

> **本章共 11 题**
> 
> - **核心必做（建议按顺序攻克关键方法）**：  
>   [第 03 题](#q03)（构造函数比较大小） → [第 08 题](#q08)（切线问题接中值定理） → [第 04 题](#q04)（罗尔与柯西的标准入口） → [第 07 题](#q07)（零点接连续两次罗尔）
> 
> - **分流与刷题建议**：  
>   - **较难挑战**：[第 02 题](#q02)（选展开点构造二阶导数）  
>   - **重在看思路**：[第 01 题](#q01)（插值误差与积分误差估计）  
>   - **首轮可跳过**：[第 06 题](#q06)、[第 10 题](#q10)、[第 11 题](#q11)（技巧较偏或综合度高，首轮不必死磕）  
> 
> - **过关目标**：能写出辅助函数、端点条件和使用定理的区间，而非只写定理名字。

---

<a id="q01"></a><a id="q2024-21"></a>

### 01 · 2024年

> *开篇硬骨头！当年压轴难题，别慌。第一问分别在 0 和 1 处写带拉格朗日余项的泰勒展开，按权重消掉一阶导；第二问对第一问两边直接取定积分，计算量其实不大。*

<img src="../bank/2024/q21.png" alt="01 (2024)" width="766" style="display: block; width: 47.9em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q02"></a><a id="q2023-21"></a>

### 02 · 2023年

> *又是一道压轴大题。第一问在 0 点左右展开泰勒相加直接出；第二问设极值点为 $x_0$，利用 $f'(x_0)=0$ 分别在 $x_0$ 展开到 $a$ 和 $-a$，做差放缩即可。*

<img src="../bank/2023/q21.png" alt="02 (2023)" width="770" style="display: block; width: 48.14em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q03"></a><a id="q2020-6"></a>

### 03 · 2020年

> *导数不等式选择题。看到 $f'(x) > f(x) > 0$，立马联想构造辅助函数 $g(x) = e^{-x}f(x)$，求导发现 $g'(x) > 0$ 单调递增，比大小直接秒。*

<img src="../bank/2020/q06.png" alt="03 (2020)" width="541" style="display: block; width: 33.83em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q04"></a><a id="q2020-20"></a>

### 04 · 2020年

> *两问都是经典中值设问。第一问移项构造辅助函数 $g(x)=(x-2)f(x)$ 用罗尔定理；第二问变限积分除以 $\ln 2$ 用柯西中值定理，比硬算轻松得多。*

<img src="../bank/2020/q20.png" alt="04 (2020)" width="781" style="display: block; width: 48.79em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q05"></a><a id="q2019-21"></a>

### 05 · 2019年

> *典型积分中值证明。第一问由积分值与端点值用连续函数介值或积分中值定理找零点；第二问用二阶泰勒展开，代入积分条件反推矛盾法或拉格朗日。*

<img src="../bank/2019/q21.png" alt="05 (2019)" width="731" style="display: block; width: 45.69em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q06"></a><a id="q2018-18"></a>

### 06 · 2018年

> *高难度不等式证明。令 $f(x)=x-\ln^2 x+2k\ln x-1$，求导发现导函数还能再求一次导。用二阶导的零点卡出一阶导单调性，分段讨论即可。*

<img src="../bank/2018/q18.png" alt="06 (2018)" width="616" style="display: block; width: 38.48em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q07"></a><a id="q2017-19"></a>

### 07 · 2017年

> *方程根的存在性大题。第一问用极限保号性判断 0 附近符号，与 $f(1)>0$ 夹出介值定理零点；第二问识别出左边是 $(f(x)f'(x))'$，罗尔定理层层下递。*

<img src="../bank/2017/q19.png" alt="07 (2017)" width="635" style="display: block; width: 39.69em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q08"></a><a id="q2015-21"></a>

### 08 · 2015年

> *几何切线不等式证明。由二阶导大于 0 可知曲线是凹的（割线在上方，切线在下方）。写出切线方程求截距 $x_0$，用拉格朗日直接证 $a < x_0 < b$。*

<img src="../bank/2015/q21.png" alt="08 (2015)" width="783" style="display: block; width: 48.93em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q09"></a><a id="q2013-18"></a>

### 09 · 2013年

> *奇函数导数证明。奇函数二阶导依然有对称性，先由奇函数 $f(0)=0$ 结合 $f(1)=1$ 用罗尔得第一问；第二问构造辅助函数 $e^x(f'(x)-1)$ 再次罗尔。*

<img src="../bank/2013/q18.png" alt="09 (2013)" width="501" style="display: block; width: 31.31em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q10"></a><a id="q2012-20"></a>

### 10 · 2012年

> *对数不等式证明。看到对称区间 $(-1,1)$，先移项构辅助函数并求导，导数若还看不出正负就求二阶导，二阶导通分后分子因式分解立现正负。*

<img src="../bank/2012/q20.png" alt="10 (2012)" width="340" style="display: block; width: 21.24em; max-width: 100%; height: auto; margin: 14px 0;">

---

<a id="q11"></a><a id="q2010-21"></a>

### 11 · 2010年

> *双中值证明经典。区间 $[0,1]$ 被 $1/2$ 劈成两半，在 $[0, 1/2]$ 和 $[1/2, 1]$ 上分别应用拉格朗日中值定理，再相加凑出平方和。*

<img src="../bank/2010/q21.png" alt="11 (2010)" width="782" style="display: block; width: 48.9em; max-width: 100%; height: auto; margin: 14px 0;">

---

[« 导数、微分与求导法则](04-derivatives.md)　　[单调性、极值与零点个数 »](06-monotonicity-extrema.md)
