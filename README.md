# 工具集

基于 [Jekyll](https://jekyllrb.com/) + [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) 主题构建的在线工具集合。

## 工具列表

### 文本处理

| 工具 | 说明 |
|------|------|
| [文本对比](/app/text-diff/) | LCS 行级 diff，高亮增删行，统计差异 |
| [字数统计](/app/word-count/) | 实时统计字符、单词、中文、行数、段落、UTF-8 字节 |
| [大小写转换](/app/case-convert/) | 全大写/小写/首字母大写 + camelCase/snake_case/kebab-case 等命名风格互转 |
| [文本去重](/app/text-dedup/) | 按行去重，支持忽略大小写和空行过滤 |

### 编码 / 加密

| 工具 | 说明 |
|------|------|
| [JSON 格式化](/app/json/) | 格式化/压缩/验证，树状视图，JSONPath 路径查询 |
| [Base64 编解码](/app/base64/) | UTF-8 中文支持，URL 安全模式，MIME 换行 |
| [URL 编解码](/app/url-encode/) | URI 编码 / 组件编码两种模式 |
| [Unicode 转换](/app/unicode/) | 字符与 Unicode 码点互转，HTML 实体 / JS 转义输出 |
| [Hash 计算](/app/hash/) | MD5 / SHA-1 / SHA-256 / SHA-512 即时计算 |

### 格式化 / 匹配

| 工具 | 说明 |
|------|------|
| [正则表达式测试](/app/regex/) | 实时匹配高亮，分组捕获，常用正则模板 |

### 可视化

| 工具 | 说明 |
|------|------|
| [二维码生成](/app/qrcode/) | 自定义尺寸和颜色，支持下载 PNG |
| [颜色转换](/app/color/) | HEX / RGB / HSL 互转，原生取色器，预设色板 |

### 开发辅助

| 工具 | 说明 |
|------|------|
| [数字转换](/app/numbers/) | 多分隔符数字转换，去重、排序和数值统计 |
| [时间戳转换](/app/timestamp/) | 秒/毫秒级时间戳互转，实时时钟，多格式日期输出 |

## 本地预览

```bash
bundle install
bundle exec jekyll serve
```

访问 `http://localhost:4000` 查看站点。

## 技术栈

- **Jekyll** — 静态站点生成
- **Minimal Mistakes** — 主题（remote_theme）
- **Vanilla JavaScript** — 工具交互逻辑，无框架依赖
- **Web Crypto API** — SHA-1/SHA-256/SHA-512 哈希计算

