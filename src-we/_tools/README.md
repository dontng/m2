# 微信数学文章转换工具

`convert_wechat_math.py` 将 `src-we/inbox/` 中的微信公众号 HTML 重建为同名 Markdown。

每日一题会保留：

- 标题、发布日期和题目前的有效正文；
- 正文中的加粗、斜体、下划线、高亮、颜色和链接；
- `No.N-1` 昨日题目、文字/视频解析及 `No.N` 今日习题三张核心图片。

每日一题后面的直播预告、目标院校、课程广告，以及微信页面控件不会进入结果。其他数学文章按原文顺序保留正文和有意义格式，并去掉卖课、报名、价格、返现、课程跳转、宣传二维码以及末尾点赞、分享等内容；夹在正文中间的广告按区间删除，不会连带丢掉后续有效正文。标题和发布时间直接读取 HTML 元数据，使重复转换保持稳定。

批量转换：

```bash
PYTHONDONTWRITEBYTECODE=1 python3 src-we/_tools/convert_wechat_math.py src-we/inbox
```

检查现有 Markdown 是否为最新转换结果：

```bash
PYTHONDONTWRITEBYTECODE=1 python3 src-we/_tools/convert_wechat_math.py src-we/inbox --check
```

脚本仅依赖 Python 标准库。遇到无法识别的每日一题结构时会报错，不会静默生成残缺文件。
