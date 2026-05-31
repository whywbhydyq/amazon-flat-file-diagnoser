# Amazon Flat File 错误诊断器

一个纯前端网页工具，用来解析 Amazon Flat File / Seller Central 批量上传后的 Processing Report。

Production: https://flatfile.ymirtool.com/

## 功能

- 本地解析 `.txt`、`.csv`、`.tsv` 报告
- 自动识别 SKU、错误码、错误信息、字段、行号
- 支持 8541、99010、90112、8560、90244、8036、8008、13013、20000、8058
- 按错误码、SKU、行号分组
- 生成中文修复步骤和 Seller Support Case 话术
- 导出 CSV 或复制 Markdown 修复清单
- SEO 长尾页面覆盖常见 Flat File 错误码和上传失败场景
- About / Contact / Privacy Policy / Terms 页面，便于信任建设和后续广告审核

## 本地运行

直接打开 `index.html`，或运行：

```bash
python -m http.server 4173 --bind 127.0.0.1
```

然后访问 `http://127.0.0.1:4173`。

## 隐私

文件只在浏览器本地解析，不上传服务器。

## Search Console

Sitemap:

```text
https://flatfile.ymirtool.com/sitemap.xml
```

The homepage includes a Google Search Console verification meta tag.


## Variation triage upgrade

The homepage now keeps the Processing Report checker as the primary entry and adds optional flat file structure checks for parent-child variation issues, including parent_sku, parentage, relationship_type, variation_theme, and size/color/style fields.
