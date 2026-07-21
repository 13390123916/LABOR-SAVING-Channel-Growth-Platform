# Platform Architecture

文档职责：提供 M3 Website Platform Foundation 的平台能力总览，帮助新接手人员快速理解模块关系、职责、依赖、生命周期和 M3 阶段边界。本文不替代各专项文档和 ADR，不描述运行时代码实现细节。

## 1. 平台定位

LABOR-SAVING Channel Growth Platform 是工业装备渠道增长平台，不是普通企业官网。

平台能力服务三个优先级：

1. 加盟合作
2. 终端客户询盘
3. 品牌建设

所有模块必须复用已冻结的 Entity、Metadata、Schema、Publishing Workflow、RBAC、Audit 和中国 SEO / 国内 GEO 规则，不允许为了单点功能绕过平台边界。

## 2. 模块关系

M3 平台能力按依赖顺序组织：

```text
Database
        |
Authentication
        |
CMS
        |
Media
        |
Lead Center
        |
SEO Runtime
        |
GEO Runtime
        |
Audit
        |
Backup
        |
Deployment & Analytics
```

横向支撑关系：

```text
Entity
  |-- Product
  |-- Industry
  |-- Article
  |-- Partner
  |-- FAQ
  |-- Download
  |-- Media

CMS
  |-- Metadata
  |-- Schema
  |-- Media Reference
  |-- Publishing Workflow

Runtime
  |-- SEO Runtime
  |-- GEO Runtime
  |-- Lead Center
  |-- Audit Center
```

## 3. 模块职责

| Module | 职责 | 不负责 |
| --- | --- | --- |
| Database | 冻结 Entity、业务表、关系表、索引、软删除、版本、多语言和审计字段 | 不直接实现 ORM、迁移或后台 CRUD |
| Authentication | 确认后台用户身份、Session 策略、RBAC、Resource、Action 和权限矩阵 | 不替代业务审核，不用登录状态替代权限判断 |
| CMS | 管理 Product、Industry、Article、Partner、FAQ、Download、Navigation、SEO Metadata、Schema Metadata、Redirect 和 Setting | 不吞并 Media、Lead、SEO Runtime、GEO Runtime、Audit Center 或 Backup |
| Media | 管理媒体实体、元数据、授权、图片版本、缩略图、WebP / AVIF 预留、存储适配、CDN 边界和引用关系 | 不直接编辑页面内容，不承担 Lead、SEO 提交或备份归档 |
| Lead Center | 管理 Partner Lead、Customer Lead、状态、分配、筛选、导出和 CRM 输入 | 不替代 CMS 内容审核或营销承诺 |
| SEO Runtime | 管理 sitemap、robots、RSS、canonical、redirect、IndexNow 和站长平台提交 | 不生成未经审核的 Metadata 或 Schema |
| GEO Runtime | 管理 AI Search Feed、FAQ 摘要、实体知识包和国内 AI 搜索引用资产 | 不编造产品参数、案例、收益或授权政策 |
| Audit Center | 查询、归档、导出操作日志和高风险动作追踪 | 不允许编辑或软删除 Audit Log |
| Backup & Restore | 数据备份、恢复、版本回滚、灾备和批量归档 | 不绕过权限、审计和发布门禁 |
| Deployment & Analytics | 部署运行、监控、流量、转化、渠道、活动来源和 CRM 集成 | 不改变内容事实来源 |

## 4. 模块依赖

### 4.1 Database 是结构基础

Database 定义稳定业务键、关系、生命周期和审计字段。后续模块不得改变 M3.0 已冻结的 `entity_id`、slug、soft delete、version、locale 和 publishing lifecycle 语义。

### 4.2 Authentication 是后台入口

Authentication 为 CMS、Media、Lead、SEO Runtime、GEO Runtime、Audit 和 Backup 提供统一 Resource、Action、Permission 和 RBAC。

### 4.3 CMS 是内容维护层

CMS 负责可审核内容和字段分层。CMS 只能引用已审核或处于明确审核状态的 Media，不负责文件上传、裁切、转码或 CDN 分发。

### 4.4 Media 是资产域

Media 为 Product、Industry、Article、Partner、FAQ、Download、SEO Metadata、Schema Metadata 和 Open Graph 提供可追溯资产。公开页面只能引用授权通过且使用范围匹配的媒体资产。

### 4.5 Runtime 是公开输出层

SEO Runtime 和 GEO Runtime 只消费已审核内容、Metadata、Schema、Media 和发布状态，不直接生成未经审核的事实内容。

### 4.6 Audit 与 Backup 是治理底座

Audit 记录后台写操作和高风险动作。Backup & Restore 负责恢复能力，但恢复不得绕过权限、审计、软删除、Redirect 和 Search Runtime 检查。

## 5. 平台生命周期

公开内容生命周期：

```text
Draft
-> Internal Review
-> Content Approved
-> SEO Approved
-> Release Approved
-> Published
-> Indexed
-> Archived
```

媒体资产生命周期：

```text
Uploaded
-> Reviewing
-> Approved
-> Published
-> Archived
```

线索生命周期：

```text
New
-> Contacted
-> Qualifying
-> Assigned
-> Won
-> Invalid
```

运行时输出生命周期：

```text
Configured
-> Validated
-> Submitted
-> Observed
-> Reconciled
-> Archived
```

所有生命周期变更必须保留责任人、时间、来源和审计记录。

## 6. M3 阶段边界

| Stage | 状态 | 边界 |
| --- | --- | --- |
| M3.0 Database Architecture | 已冻结 | 数据模型、ER、索引、生命周期、版本、软删除、多语言和审计字段 |
| M3.1 Authentication & Authorization | 已冻结 | Authentication、Authorization、RBAC、Permission、Role、Resource、Audit、Login Flow、Session、Future SSO |
| M3.2 CMS Architecture | 已冻结 | CMS Resource、Content Type、Field Group、Workflow、Permission Integration、Audit Integration、Import / Export、Future Platform Split |
| M3.3 Media Management Architecture | 本轮冻结 | Media Entity、Media Metadata、Asset 生命周期、图片版本、ALT 来源、WebP / AVIF 预留、Thumbnail Strategy、Storage Adapter、CDN Boundary、Watermark Strategy、引用关系 |
| M3.4 Lead Center | 待启动 | Partner Lead、Customer Lead、状态、分配、筛选、导出和 CRM 输入 |
| M3.5 SEO Runtime | 待启动 | sitemap、robots、RSS、canonical、redirect、IndexNow、站长平台接入 |
| M3.6 GEO Runtime | 待启动 | AI Search Feed、FAQ 摘要、实体知识包和国内 AI 搜索引用资产 |
| M3.7 Audit Center | 待启动 | 操作日志、审计查询、归档、合规导出和高风险动作追踪 |
| M3.8 Backup & Restore | 待启动 | 数据备份、恢复、版本回滚、灾备和批量归档 |
| M3.9 Deployment & Analytics | 待启动 | 部署运行、监控、流量、转化、渠道、活动来源和 CRM 集成 |

## 7. 设计冻结规则

- 每个 M3 阶段先冻结架构和 ADR，再进入运行时代码。
- 架构冻结阶段不得创建页面、CRUD、ORM、迁移、上传接口、后台 UI 或第三方运行集成。
- 涉及公开内容、媒体、SEO、GEO、Lead 或导出时，必须复用 RBAC 和 Audit。
- 涉及产品参数、客户案例、收益、授权范围、市场排名或合作政策时，只能使用已确认事实资料。

## 8. 快速阅读路径

新接手人员建议按以下顺序阅读：

1. `README.md`
2. `.ai/AI_PROJECT_OPERATING_SYSTEM.md`
3. `docs/PROJECT_PRD.md`
4. `docs/PLATFORM_ARCHITECTURE.md`
5. `docs/MILESTONE_MAPPING.md`
6. `docs/DATABASE.md`
7. `docs/AUTH_SYSTEM.md`
8. `docs/CMS_SYSTEM.md`
9. `docs/MEDIA_SYSTEM.md`
10. `docs/ROADMAP.md`
11. `docs/adr/README.md`

## 9. 验收标准

- 平台模块关系、模块职责、模块依赖、生命周期和 M3 各阶段边界已在本文档中可读化。
- 本文档不替代 Database、Auth、CMS、Media 或 ADR 的详细边界。
- `README.md`、`docs/PROJECT_PRD.md`、`docs/ROADMAP.md`、`docs/TODO.md`、`docs/MEMORY.md`、`CHANGELOG.md` 和治理校验清单已同步。
