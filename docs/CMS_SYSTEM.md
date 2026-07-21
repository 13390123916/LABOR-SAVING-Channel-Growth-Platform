# CMS System

文档职责：冻结 M3.2 CMS Architecture / Content Management Foundation 的内容管理边界、资源模型、字段分层、工作流、权限接入、审计、导入导出和后续实现顺序。架构决策见 `docs/adr/ADR-0007-cms-architecture.md`。

## 1. 阶段边界

M3.2 CMS Architecture 只冻结内容管理架构，不写 CMS 页面、不创建 CRUD、不接入 ORM、不创建数据库迁移、不实现富文本编辑器、不实现文件上传运行时。

本阶段目标：

- 确认 CMS 维护哪些 Resource。
- 确认 CMS 如何复用 Entity、Database、Auth、Metadata、Schema、Publishing Workflow。
- 确认字段分层和审批发布边界。
- 确认 CMS 与 Media、Lead、SEO Runtime、GEO Runtime、Audit Center 的边界。

## 2. 核心原则

- CMS 是平台内容管理能力，不是临时后台页面。
- CMS 必须以 Entity 为入口，不允许绕过 Entity 直接维护页面散字段。
- CMS 必须复用 M3.0 Database Architecture 的 `entity_id`、soft delete、version、locale、audit fields。
- CMS 必须复用 M3.1 Authentication & Authorization 的 Resource、Action、RBAC 和 Audit。
- CMS 不负责生成未经确认的产品参数、案例、收益、授权范围、市场排名或合作政策。
- CMS 只维护可审核内容，公开发布必须经过 Content、SEO、Release 三类门禁。
- CMS 页面实现后置；M3.2 只冻结架构和字段边界。

## 3. CMS Resource

首期 CMS Resource：

```text
Product
Industry
Article
Partner
FAQ
Download
Navigation
SEO Metadata
Schema Metadata
Redirect
Setting
```

关联但不在 M3.2 实现完整中心的 Resource：

```text
Media
Lead
Audit Log
Search Runtime
GEO Runtime
```

边界说明：

- Media 在 M3.2 只作为已审核资产引用，不实现上传、裁剪、图库、授权审核或文件存储运行时；这些进入 M3.3 Media Management。
- Lead 在 M3.2 只配置 Lead Entry、CTA 和来源映射，不实现 Lead Center；这些进入 M3.4 Lead Center。
- SEO Metadata 和 Schema Metadata 在 M3.2 只维护字段与审核状态，不实现 sitemap、robots、IndexNow 或站长平台提交；这些进入 M3.5 SEO Runtime。
- GEO 内容结构在 M3.2 只维护可引用问答和摘要字段，不实现 GEO Feed；这些进入 M3.6 GEO Runtime。
- Audit Log 在 M3.2 只定义写入边界，不实现审计中心；这些进入 M3.7 Audit Center。

## 4. CMS Layer Model

CMS 必须按以下分层维护内容：

```text
Entity
-> Content Model
-> Metadata
-> Schema
-> Media Reference
-> Internal Link
-> Publishing Workflow
-> Frontend Rendering
-> SEO / GEO Runtime
```

禁止：

- 页面组件直接维护 CMS 字段。
- CMS 表单直接写 JSON-LD 原始文本作为长期来源。
- CMS 绕过 Metadata Builder 或 Schema Builder。
- CMS 允许运营填写未确认参数、案例、收益或政策。

## 5. Content Type

首期内容类型：

| Content Type | Resource | 目标 |
| --- | --- | --- |
| Product | Product | 维护产品基础资料、分类、摘要、FAQ、Lead 入口和发布门禁 |
| Industry | Industry | 维护行业场景、工况问题、相关产品和咨询入口 |
| Article | Article | 维护知识内容、技术文章、行业文章和 SEO/GEO 内容 |
| Partner Program | Partner | 维护渠道增长中心、合作模式、渠道赋能和 CTA |
| FAQ | FAQ | 维护可复用问答，并进入 FAQPage Schema |
| Download | Download | 维护样册、说明书、资料包和公开分发状态 |
| Navigation | Navigation | 维护导航树和链接关系 |
| SEO Metadata | SEO Metadata | 维护 title、description、keywords、canonical、Open Graph 和 breadcrumb |
| Schema Metadata | Schema Metadata | 维护 Schema 类型、来源字段和输出状态 |
| Redirect | Redirect | 维护 URL 下线、slug 变更和兼容路径 |
| Setting | Setting | 维护有限系统配置，不包含权限和安全配置 |

## 6. Field Group

CMS 表单必须按字段组组织：

```text
Identity Fields
Content Fields
Relationship Fields
SEO Fields
Schema Fields
Publishing Fields
Compliance Fields
Audit Fields
```

### 6.1 Identity Fields

```text
entity_id
entity_type
slug
name/title
locale
status
version
```

规则：

- `entity_id` 创建后不可修改。
- slug 修改必须检查 Redirect 和 canonical。
- locale 默认 `zh-CN`。

### 6.2 Content Fields

```text
summary
content
target_users
application_summary
faq_items
cta
lead_type
```

规则：

- Product 不允许填写未确认参数、价格、库存、交期或认证。
- Partner 不允许填写收益、回本、区域独家或自动授权。
- Case 相关内容必须等待授权资料，不在 M3.2 首期开放。

### 6.3 Relationship Fields

```text
related_products
related_industries
related_articles
related_faqs
related_downloads
related_media
```

规则：

- 关系保存 Entity ID。
- 不以名称、URL 或锚文本作为主关联键。
- Related Product 和 Topic Cluster 后续由关系表生成，不允许页面手写。

### 6.4 SEO Fields

```text
title
description
keywords
canonical_url
og_title
og_description
og_image_id
breadcrumb_json
```

规则：

- SEO 字段必须与页面可见内容一致。
- canonical 修改必须触发 Redirect 和 Search Runtime 检查。
- OG 不得写收益承诺、虚假案例或未确认背书。

### 6.5 Schema Fields

```text
schema_type
schema_source_fields
schema_json
schema_status
```

规则：

- `schema_json` 应由字段生成，不长期依赖人工粘贴。
- FAQPage 必须来自页面可见 FAQ。
- Product Schema 不得输出 price、offers、review、rating 或未确认 additionalProperty。

### 6.6 Publishing Fields

```text
content_status
seo_status
release_status
published_at
indexed_at
archived_at
```

规则：

- 内容发布不得只靠一个 `published` 开关。
- 发布前必须通过 Content、SEO 和 Release 门禁。
- Indexed 由 Search Runtime 回写或人工验收，不由 CMS 编辑直接设置。

### 6.7 Compliance Fields

```text
source_status
license_status
public_scope
compliance_notes
review_required
```

规则：

- 资料不足时必须显示限制说明。
- 媒体未授权不得公开。
- 合作政策和授权范围必须以后续真实商务资料为准。

### 6.8 Audit Fields

```text
created_by
updated_by
deleted_by
approved_by
published_by
created_at
updated_at
deleted_at
approved_at
published_at
```

规则：

- 由系统写入，CMS 表单不允许运营直接编辑。
- 所有写操作必须进入 Audit Log。

## 7. Workflow

CMS 内容工作流：

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

工作流规则：

- Draft：可编辑，不公开。
- Internal Review：进入内部审核，不公开。
- Content Approved：内容事实和合规通过，不代表 SEO 通过。
- SEO Approved：Metadata、Schema、canonical、FAQ 和内链通过。
- Release Approved：市场上线批准通过。
- Published：允许进入前端公开输出。
- Indexed：Search Runtime 或人工收录验收完成。
- Archived：下线并保留 Redirect、审计和历史追溯。

Product Detail 门禁继续使用：

```text
published + schemaEligible + contentValidated + releaseApproved
```

CMS 实现不得降低 Product Publishing Checklist 的发布要求。

## 8. Permission Integration

CMS 权限必须引用 `docs/AUTH_SYSTEM.md`。

关键权限：

| CMS Action | Required Permission |
| --- | --- |
| 创建内容 | resource:create |
| 查看内容 | resource:read |
| 编辑内容 | resource:update |
| 归档内容 | resource:delete |
| 内容审核 | resource:approve |
| 发布内容 | resource:publish |
| 导入内容 | resource:import |
| 导出内容 | resource:export |
| 恢复归档 | resource:restore |
| 管理设置 | resource:manage |

角色默认边界：

- Editor 可创建和编辑内容草稿，但不默认发布。
- SEO 可审核和维护 SEO Metadata、Schema Metadata、Redirect 和 Search Runtime 相关字段。
- Partner Manager 可维护 Partner 相关内容和 Partner Lead 入口。
- Sales 不维护 CMS 内容，只查看必要内容和 Lead 关联信息。
- Admin 可管理大多数内容资源，但 User、Role、Permission 仍由 Super Admin 控制。

## 9. Audit Integration

CMS 必须写入 Audit Log：

- create
- update
- delete / archive
- restore
- approve
- publish
- import
- export
- slug change
- canonical change
- schema status change
- release approval change

Audit Log 至少记录：

```text
actor_id
actor_role_ids
action
resource
resource_id
entity_id
before_json
after_json
ip_address
user_agent
request_id
created_at
```

## 10. Import / Export

M3.2 只冻结导入导出边界，不实现运行时。

允许导出：

- Content review list
- SEO Metadata list
- Schema Metadata list
- FAQ list
- Navigation list
- Publishing status list

后置到 M3.7 Audit Center 或 M3.8 Backup & Restore：

- 全量数据库备份。
- 审计日志归档。
- 大规模批量导入。
- 版本回滚。

导入规则：

- 导入不得绕过权限。
- 导入必须进入 Audit Log。
- 导入不能直接发布内容。
- 导入后默认进入 Draft 或 Internal Review。

## 11. Admin UI Boundary

M3.2 不设计具体 UI，也不创建页面代码。

后续实现必须遵循：

- 不把 UI 状态当作权限控制。
- 表单字段按 Field Group 分区。
- 高风险动作必须二次确认。
- Publish、Approve、Export、Import 不与普通 Save 混在一起。
- Archive 不等于物理删除。
- 页面必须显示 `source_status`、`license_status` 和合规限制。

## 12. Future Platform Split

M3 后续平台阶段建议：

```text
M3.0 Database Architecture
M3.1 Authentication & Authorization
M3.2 CMS Architecture
M3.3 Media Management
M3.4 Lead Center
M3.5 SEO Runtime
M3.6 GEO Runtime
M3.7 Audit Center
M3.8 Backup & Restore
M3.9 Deployment
```

拆分原则：

- CMS 负责内容维护。
- Media Management 负责资产上传、授权、裁切、版本和分发。
- Lead Center 负责线索状态、分配、筛选和导出。
- SEO Runtime 负责 sitemap、robots、canonical、redirect、IndexNow 和站长平台。
- GEO Runtime 负责 AI Search Feed、问答摘要和结构化内容包。
- Audit Center 负责审计查询、归档和合规导出。
- Backup & Restore 负责备份、恢复、回滚和灾备。

## 13. M3.2 验收标准

- ADR-0007 CMS Architecture 已 Accepted。
- `docs/CMS_SYSTEM.md` 已覆盖 CMS Resource、Content Type、Field Group、Workflow、Permission Integration、Audit Integration、Import / Export 和 Future Platform Split。
- `docs/ROADMAP.md`、`docs/TODO.md`、`docs/MEMORY.md`、`CHANGELOG.md` 已同步。
- `scripts/validate-website-governance.mjs` 已纳入 CMS System 与 ADR-0007。
- 未创建 CMS 页面、CRUD、富文本、ORM、数据库迁移、文件上传或后台 UI。
- Governance、Product Rendering、TypeScript、ESLint 和 Build 验证通过。
