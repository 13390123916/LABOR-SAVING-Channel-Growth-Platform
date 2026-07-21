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
| M2.6 | Lead Capture Integration | M3.4 Lead Center、M3.6 Dealer Center、M3.7 Analytics | 线索入口、渠道对象、状态流转、CRM 对接与转化数据统一实现 |
| M2.7 | Admin Maintainability | M3.1 Authentication & Authorization、M3.2 CMS Architecture、M3.3 Media Management、M3.8 Security / Permission | 权限、后台内容维护、媒体、审计日志与高风险动作能力统一实现 |
| M2.8 | Batch Export | M3.7 Analytics、M3.8 Security / Permission、M3.9 Platform Freeze Review | 导入、导出、归档、备份、操作日志和 M4 Readiness 统一复核 |

历史编号保留为规划记录，不表示 M2 已实现这些能力。

## 3. M3 Website Platform Foundation

| 阶段 | 目标 |
| --- | --- |
| M3.0 Database Architecture | 数据模型、ER 图、索引、唯一约束、外键、生命周期与版本管理 |
| M3.1 Authentication & Authorization | Admin、Editor、SEO、Sales、Partner Manager、Super Admin 与 RBAC |
| M3.2 CMS Architecture | 内容管理边界、字段分层、工作流、权限接入、审计接入与导入导出边界 |
| M3.3 Media Management Architecture | Media Entity、Media Metadata、Asset 生命周期、图片版本、ALT 来源、WebP / AVIF 预留、Thumbnail Strategy、Storage Adapter、CDN Boundary、Watermark Strategy 和引用关系 |
| M3.4 Lead Center Architecture | Lead Entity、Lead Type、字段分层、来源归因、生命周期、分配、去重、隐私、导出边界、CRM 输入、权限和审计 |
| M3.5 Platform Assets Architecture | Company Profile、Brand Assets、Social Media Hub、Download Center、Friend Links、Contact Center、System Settings |
| M3 Governance Enhancement | Platform Module Intake Gate、Platform Architecture Single Source of Truth 和模块归属门禁 |
| M3.6 Dealer Center Architecture | Dealer Entity、Dealer Type、区域关系、招商流程、Lead 分配、CRM 流转、权限边界和生命周期 |
| M3.7 Analytics Architecture | Lead Attribution、Source、UTM、SEO Attribution、Dealer Attribution、Conversion Event 和 CN First 分析边界 |
| M3.8 Security / Permission Architecture | RBAC 复核、Resource / Action / Permission、Audit、隐私、导出、高风险动作和运行时安全边界 |
| M3.9 Platform Freeze Review | Platform Module Registry、模块边界复核、ADR 复核、Runtime 边界、文档漂移和 M4 Readiness |
| M4 Platform Runtime | Prisma、Migration、Database、RBAC、CMS、Media、Lead、Platform Assets、Dealer、Analytics、SEO Runtime、API 和 Admin UI |

M3 的成功标准是架构边界清晰和可维护性，而不是新增页面数量或半成品运行时代码。真正运行能力统一进入 M4 Platform Runtime。
