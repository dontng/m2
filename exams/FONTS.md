# 字体与 PDF 缺字检查

本地字体必须覆盖完整页面，不能只从题目正文提取字符。当前宋体和黑体来自 Noto CJK（SIL OFL，许可见 `assets/LICENSE-Noto.txt`）；均按年度 HTML、卷头、题型说明、导航及 CSS 页脚的实际文字生成精简文件。两个字体分别用于正文/页脚和题头，优先于系统字体，避免导出机器决定能否显示某个字。未改变积分及其他数学符号的 KaTeX 字体。

来源地址、原始文件哈希和版本见 `assets/font-sources.json`；输出字体哈希与覆盖检查见 `assets/font-coverage.json`。这两个文件是可追溯信息，不替代每次动态检查。

## 导出链路

正式导出 `scripts/export-pdf.cjs` 和样稿导出 `scripts/export-preview.cjs` 共用以下检查：

1. 导出前运行 `font_assets.py`：重新扫描完整 HTML 和页脚内容，逐字符验证两个本地字体的 cmap，检查本地字体优先路由。新增文字超出字体覆盖时，失败并列出字符，禁止静默回退。
2. 浏览器内确认正文/题头字体加载成功、所有已使用字体无加载错误、字体路由正确，再运行题目/公式/附图/溢出检查。
3. PDF 先写入临时文件，再由 `pdf_glyphs.py` 检查实际字形轨迹。遇到标准字体的 glyph 0、NUL、替换字符即失败；通过后才替换目标文件。PDF 可提取出“案”字，不代表它的可见字形正确。

Chromium 的合法 Type3 汉字轮廓也可能报告 glyph 0，因此不能一律按 glyph 0 判错。Type3 情况由前置字体 cmap 覆盖和浏览器加载/路由检查配合保障。检查是对明确缺字机制的防线，不能替代全部数学内容和版式的人工审核。

## 检查与重建

依赖 Python fonttools、PyMuPDF（`pip install -r exams/scripts/font-requirements.txt`）；导出还需 Playwright 与 Chromium。

```sh
python exams/scripts/font_assets.py
python exams/scripts/test_font_chain.py
python exams/scripts/pdf_glyphs.py path/to/paper.pdf
```

新增文字导致覆盖检查失败后，从 `font-sources.json` 的上游地址取得完整字体，核对来源与哈希，重新生成；不要手改 cmap 或只在导出电脑安装一个临时字体：

```sh
python exams/scripts/font_assets.py --build --serif-source NotoSerifCJKsc-Regular.otf --sans-source NotoSansCJKsc-Regular.otf
```

正式导出的 `PDF_OUTPUT` 可指定临时验证目录，样稿用 `PDF_PREVIEW_OUTPUT`；这些目录仅是输出位置，不会绕过检查。`SOURCE_COMMIT` 可显式记录已核对的源码提交。

## 本轮范围

先修链路、更新两份样稿；2010—2026 全部年份只作临时导出验证。其余已存在的年度 PDF 与题图暂不覆盖，待用户确认样稿后再统一更新。旧 PDF 不会因修改字体资产自动变好。
