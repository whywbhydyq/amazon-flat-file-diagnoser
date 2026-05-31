# 30 天验证清单

目标不是证明想法伟大，而是验证是否有人真的上传错误报告、真的愿意补充 flat file、真的会点击修正版文件或人工分诊入口。

## 需要看的事件

| 事件 | 含义 | 判断 |
|---|---|---|
| `processing_report_uploaded` | 用户上传真实 Processing Report | 免费入口是否成立 |
| `sample_report_loaded` | 用户只看示例 | 不能算真实需求 |
| `fix_list_copied` | 用户复制修复清单 | 诊断结果是否有用 |
| `csv_exported` | 用户导出 CSV | 进入工作流的强信号 |
| `variation_triage_clicked` | 用户阅读 variation triage | 变体买点是否吸引 |
| `flat_file_uploaded` | 用户补充 flat file | 高价值验证信号 |
| `manual_review_clicked` | 用户点人工分诊 | 服务化意向 |
| `repaired_file_clicked` | 用户点修正版 flat file | 付费意向 |
| `repaired_flat_file_draft_downloaded` | 用户下载低风险修复草稿 | 自动修复能力信号 |
| `contact_page_opened` | 用户从结果页进入询盘页 | CTA 是否有效 |
| `inquiry_brief_generated` | 用户生成脱敏询盘摘要 | 最强非支付验证信号 |
| `email_draft_opened` | 用户准备用本地邮件草稿发起私有询盘 | 私有人工服务意向 |
| `github_issue_opened` | 用户准备提交公开 issue | 仅适合脱敏错误码反馈，不作为主要服务询盘路径 |

## 第 1 周：让页面可被找到

- 提交 `https://flatfile.ymirtool.com/sitemap.xml` 到 Google Search Console。
- 在 Vercel Dashboard 查看 Web Analytics 是否开始记录访问。
- 用真实浏览器测试主工具页、`/amazon-variation-triage`、`/contact`。
- 准备 3 份脱敏示例报告，覆盖 8541、99010、90244。
- 准备 2 份脱敏 flat file 样例，覆盖 parent_sku missing、theme mismatch、child missing size/color。

## 第 2 周：找真实错误报告

去这些地方找人测试：

- 雨果问答：回答“亚马逊批量上传报错”“flat file error”“处理报告怎么看”相关问题。
- 知乎：回答“亚马逊 8541 怎么解决”“亚马逊 99010 报错”。
- CSDN：发布错误码修复教程，文章末尾放工具链接。
- 小红书：发“亚马逊批量上传处理报告怎么看”的实操笔记。
- Reddit：在 r/AmazonSeller 或 r/FulfillmentByAmazon 发英文版工具介绍，避免硬广。
- Fiverr / Upwork 服务商：把工具定位成 client-ready report generator，而不是替代服务商。

## 第 3 周：验证 variation triage 是否真有需求

继续条件：

- 至少 20 次真实 Processing Report 上传。
- 至少 5 次 `flat_file_uploaded`。
- 至少 3 次 `repaired_file_clicked` 或 `manual_review_clicked`。
- 至少 3 次 `repaired_flat_file_draft_downloaded`，并观察下载后是否仍进入 manual review。
- 至少 1 次 `inquiry_brief_generated`。

如果只有 Processing Report 上传，没有 flat file 上传，说明 variation triage 不是当前主买点，应继续强化 error code / fix list 工作流。

## 第 4 周：判断是否继续

继续条件：

- 至少 100 个自然访问。
- 至少 20 次真实上传或导出行为。
- 至少 10 次复制或导出修复清单。
- 至少 5 次 flat file 上传。
- 至少 3 个用户进入询盘页。
- 至少 1 个用户明确说“这个帮我解决了”或提交可跟进询盘。

放弃或换角度条件：

- 30 天内没有真实错误报告反馈。
- 30 天内没有任何用户愿意提交脱敏报告。
- 用户只看文章，不使用工具。
- 用户上传 flat file 后仍然无法得到可解释结果。
- 80% 以上 case 都必须登录 Seller Central 或走 Seller Support，文件层面无法判断。

## 下一批长尾词

- Amazon flat file error 8541
- Amazon error 99010 flat file
- Amazon processing report 中文
- 亚马逊批量上传处理报告怎么看
- 亚马逊变体上传 90244
- 亚马逊 8560 SKU 创建失败
- Amazon parent child variation checker
- Amazon flat file variation triage
- Amazon child ASIN not showing under parent
- Amazon variation dropdown not showing

## Stage 5 events to compare

Track these two events together:

| Event | What it indicates |
|---|---|
| `repaired_flat_file_draft_downloaded` | User found enough safe file-level fixes to download a draft. |
| `manual_review_needed_csv_downloaded` | User found value in a manual repair queue, even when the tool refuses risky auto-fixes. |

A useful signal is not only high draft-download volume. If users download the manual-review CSV, VA/agency positioning may be stronger than full automation.


## Private inquiry handoff note

Service requests should be measured primarily through `email_draft_opened`, `manual_review_clicked`, and `repaired_file_clicked`. GitHub Issues remain public-safe feedback only.
