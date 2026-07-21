# Milestone Mapping

文档职责：冻结已完成的 M2 历史，并将未执行的 M2 运行能力规划映射到 M3 Website Platform Foundation。映射不删除、不重编号、不重写既有 Git Commit、Audit、README、Roadmap、TODO 或 Changelog。

## 1. M2 Frozen v1.0

```text
M2 Channel Growth Foundation (Frozen v1.0)

Entity Layer
Product System
Metadata System
SEO Schema Layer
Product Rendering Layer
Publishing Workflow
```

除非发现架构缺陷或严重 Bug，不再新增治理规则，也不再拆分新的 Publishing 子阶段。后续产品、栏目、行业和案例必须复用已冻结的 Entity、Metadata、Schema、SEO/GEO 与发布门禁。

## 2. 历史规划映射

| 历史编号 | 历史规划 | M3 承接阶段 | 说明 |
| --- | --- | --- | --- |
| M2.6 | Lead Capture Integration | M3.3 Runtime Platform、M3.5 Analytics & CRM | 线索入口、状态流转、导出、CRM 对接与转化数据统一实现 |
| M2.7 | Admin Maintainability | M3.1 Authentication & Authorization、M3.2 CMS Foundation、M3.3 Runtime Platform | 权限、后台内容维护、媒体、审计日志与任务能力统一实现 |
| M2.8 | Batch Export | M3.3 Runtime Platform | 导入、导出、任务队列和操作日志统一实现 |

历史编号保留为规划记录，不表示 M2 已实现这些能力。

## 3. M3 Website Platform Foundation

| 阶段 | 目标 |
| --- | --- |
| M3.0 Database Architecture | 数据模型、ER 图、索引、唯一约束、外键、生命周期与版本管理 |
| M3.1 Authentication & Authorization | Admin、Editor、SEO、Sales、Partner Manager、Super Admin 与 RBAC |
| M3.2 CMS Foundation | 内容、媒体、导航、SEO、Schema、FAQ、设置的后台维护 |
| M3.3 Runtime Platform | Lead Center、Media Center、导入导出、任务队列、通知、操作日志与审计日志 |
| M3.4 Search Runtime | sitemap、robots、canonical、redirect、RSS、IndexNow、SEO/GEO Feed 与站长平台接入 |
| M3.5 Analytics & CRM | Lead、Partner、Traffic、Conversion、Channel、Campaign、Source 与 CRM 集成 |

M3 的成功标准是运行能力和可维护性，而不是新增页面数量。
