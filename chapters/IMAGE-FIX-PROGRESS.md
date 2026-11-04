# 题图字号修复进度

2026-11-04：修复代码与全量检查已完成。385 张图在本地均已无损补白，25 章 Markdown 已统一显示比例；题面逐像素保留检查通过，章节内容及年度 HTML 未变。

本检查点保存全部修复脚本、规范、目标哈希清单及已上传的一批题图。其余题图正在上传，本分支尚未交付，不应将临时的混合画布作为最终显示效果。

恢复方法：运行 `python3 chapters/scripts/image_geometry.py`，然后运行 `python3 chapters/scripts/build.py` 和 `python3 chapters/scripts/check_image_geometry.py`。完整检查通过后提交并合入 main。后续分批推送题图，避免进度只保留于会话。
