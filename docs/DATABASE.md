# Database Architecture

文档职责：冻结 M3.0 Database Architecture 的数据库模型、ER 关系、约束、生命周期、版本、审计字段和后续实现边界。架构决策见 `docs/adr/ADR-0008-database-model.md`。

## 1. 阶段边界

M3.0 Database Architecture 只做数据库设计冻结，不写数据库代码、不创建迁移、不接入 ORM、不开发 CMS CRUD。

执行顺序：

```text
Database Model
-> Authentication & Authorization
-> CMS Foundation
-> Runtime Platform
-> Search Runtime
-> Analytics & CRM
```

本阶段产出：

- 数据模型
- ER 图
- 唯一索引
- 外键关系
- 生命周期
- 软删除策略
- 版本策略
- 审计字段
- 多语言扩展策略

## 2. 数据库选择

主业务数据库优先采用 MySQL。

原因：

- `.ai/AI_PROJECT_OPERATING_SYSTEM.md` 与 `docs/PROJECT_PRD.md` 已确认 MySQL 为技术方向。
- 当前核心负载是 Website、CMS、Lead、Media、SEO/GEO 和 CRM 关系数据，MySQL 可满足事务、索引、外键、JSON 字段和常规运维要求。
- 中国中小企业和工业官网后台生态中 MySQL 运维成本较低，适合先落地可维护后台。
- Search Runtime、Analytics、AI 检索如出现专用负载，可后续引入独立搜索或分析组件，不提前污染主业务库。

## 3. 核心原则

- Entity First：所有长期业务对象先进入 Entity Layer。
- 内部 `id` 可用于数据库主键和外键性能优化，但跨系统稳定业务键必须是 `entity_id`。
- 数据库不得绕过 M2 已冻结的 Entity、Metadata、Schema、Publishing Workflow。
- Slug 只服务 URL，不作为业务主键。
- 默认软删除，公开内容下线必须保留 SEO、Redirect 和审计追溯。
- 不编造产品参数、案例、收益、授权范围、市场排名或合作政策。

## 4. 数据模型

### 4.1 Entity

统一实体表，承接 Product、Industry、Partner、Article、FAQ、Download、Media 等长期对象。

字段：

```text
id
entity_id
entity_type
slug
name
summary
status
source_status
version
locale
metadata_id
schema_id
created_at
updated_at
published_at
deleted_at
created_by
updated_by
published_by
```

约束：

- `entity_id` 全局唯一。
- `entity_type + slug + locale` 唯一。
- `version` 初始为 1。
- `deleted_at` 为空才允许作为可发布候选。

### 4.2 Category

用于产品分类、文章分类、下载分类和后续知识分类。

字段：

```text
id
category_type
parent_id
slug
name
description
locale
display_order
status
created_at
updated_at
deleted_at
```

约束：

- `category_type + slug + locale` 唯一。
- `parent_id` 外键指向 `categories.id`。

### 4.3 Product

Product 是 Entity 的类型表，不单独创造与 Entity 冲突的业务身份。

字段：

```text
id
entity_id
category_id
product_slug
product_name
brand
short_description
target_users
application_summary
lead_type
cta
detail_status
schema_eligible
content_validated
release_approved
status
version
created_at
updated_at
published_at
deleted_at
```

约束：

- `entity_id` 唯一，外键关联 `entities.entity_id`。
- `category_id + product_slug + locale` 唯一。
- Product Detail、Product Schema、sitemap 和 Related Product 只对 `published + schema_eligible + content_validated + release_approved` 同时满足的实体输出。

### 4.4 Industry

承接行业应用、工况问题、适用产品和客户咨询入口。

字段：

```text
id
entity_id
slug
name
scenario_summary
common_problems
implementation_conditions
lead_type
status
version
created_at
updated_at
published_at
deleted_at
```

约束：

- `entity_id` 唯一。
- `slug + locale` 唯一。

### 4.5 Partner

承接 Partner Program、合作模式、渠道赋能和 Partner Lead 入口。

字段：

```text
id
entity_id
slug
program_name
positioning
target_roles
lead_type
cta
status
version
created_at
updated_at
published_at
deleted_at
```

配套表：

- `partner_cooperation_modes`
- `partner_enablement_modules`
- `partner_market_opportunities`

约束：

- `entity_id` 唯一。
- 不允许字段表达收益、回本周期、区域独家、自动授权或未经确认合作政策。

### 4.6 Lead

承接 Partner Lead 与 Customer Lead。

字段：

```text
id
lead_no
lead_type
company_name
contact_name
phone
region
industry
main_products
customer_resources
cooperation_intent
interested_product
application_scenario
project_stage
source_channel
source_page
source_campaign
status
assigned_to
contacted_at
qualified_at
closed_at
created_at
updated_at
```

约束：

- `lead_no` 唯一。
- `status` 使用 `new, contacted, qualifying, assigned, won, invalid`。
- Lead 不默认物理删除；合规删除使用脱敏与审计记录。

### 4.7 Media

承接图片、视频、资料封面、Open Graph 资产和可公开附件。

字段：

```text
id
entity_id
asset_type
asset_path
original_filename
mime_type
file_size
alt_text
caption
source_status
license_status
usage_scope
created_at
updated_at
deleted_at
```

约束：

- `asset_path` 唯一。
- 没有 `license_status = approved` 的媒体不得用于公开页面或投放素材。

### 4.8 Article

承接知识中心、技术文章、行业文章和 SEO/GEO 内容。

字段：

```text
id
entity_id
category_id
slug
title
summary
content
content_type
target_audience
locale
status
version
created_at
updated_at
published_at
deleted_at
```

约束：

- `slug + locale` 唯一。
- `entity_id` 唯一。

### 4.9 FAQ

FAQ 是可复用 Entity，可关联 Product、Partner、Industry、Article 和 Download。

字段：

```text
id
entity_id
question
answer
question_hash
locale
status
version
created_at
updated_at
published_at
deleted_at
```

约束：

- `entity_id + question_hash + locale` 唯一。
- FAQPage Schema 必须来自页面可见 FAQ。

### 4.10 Download

承接样册、说明书、资料包和白皮书。

字段：

```text
id
entity_id
category_id
slug
title
summary
media_id
public_access
license_status
status
version
created_at
updated_at
published_at
deleted_at
```

约束：

- `slug + locale` 唯一。
- 未确认可公开分发的文件不得发布。

### 4.11 Navigation

承接一级导航、页脚导航、专题导航和 CMS 菜单。

字段：

```text
id
nav_group
parent_id
slug
label
url
entity_id
display_order
is_external
status
created_at
updated_at
deleted_at
```

约束：

- `nav_group + parent_id + slug` 唯一。
- 公开导航不得指向未发布页面。

### 4.12 SEO Metadata

承接 title、description、keywords、canonical、Open Graph 和 breadcrumb。

字段：

```text
id
entity_id
page_url
title
description
keywords
canonical_url
og_title
og_description
og_image_id
breadcrumb_json
locale
status
created_at
updated_at
published_at
deleted_at
```

约束：

- `entity_id + page_url + locale` 唯一。
- canonical 必须与 URL 规范一致。

### 4.13 Schema Metadata

承接 Organization、Product、Article、FAQPage、BreadcrumbList、WebPage 和 ContactPoint。

字段：

```text
id
entity_id
page_url
schema_type
schema_json
source_doc
source_status
locale
status
created_at
updated_at
published_at
deleted_at
```

约束：

- `entity_id + schema_type + locale` 唯一。
- `schema_json` 必须能由后台字段重新生成，不长期依赖人工粘贴。

### 4.14 Tag

承接内容主题、产品方向、行业方向和后续 Search Runtime Feed。

字段：

```text
id
slug
name
tag_type
locale
status
created_at
updated_at
deleted_at
```

约束：

- `tag_type + slug + locale` 唯一。

### 4.15 Redirect

承接 URL 下线、slug 变更和兼容路径。

字段：

```text
id
source_url
target_url
status_code
reason
created_at
updated_at
deleted_at
```

约束：

- `source_url` 唯一。
- `status_code` 只能为 301 或 302。

### 4.16 Audit Log

承接后台操作、内容发布、Lead 分配、导入导出和 Search Runtime 提交记录。

字段：

```text
id
actor_id
action
entity_id
target_table
target_id
before_json
after_json
ip_address
user_agent
created_at
```

约束：

- Audit Log 不软删除。
- 后台不得提供编辑 Audit Log 的能力。

## 5. ER 图

```text
Entity
  |-- Product
  |     |-- Category
  |     |-- Media
  |     |-- FAQ
  |     |-- SEO Metadata
  |     |-- Schema Metadata
  |
  |-- Industry
  |     |-- Product Relation
  |     |-- Article
  |     |-- FAQ
  |
  |-- Partner
  |     |-- Cooperation Mode
  |     |-- Enablement Module
  |     |-- Market Opportunity
  |     |-- Lead
  |
  |-- Article
  |     |-- Category
  |     |-- Tag
  |     |-- Media
  |     |-- FAQ
  |
  |-- Download
  |     |-- Media
  |
  |-- SEO Metadata
  |-- Schema Metadata

Navigation
  |-- Entity

Lead
  |-- source_page
  |-- source_entity_id
  |-- assigned_to

Redirect
  |-- source_url
  |-- target_url

Audit Log
  |-- actor_id
  |-- entity_id
```

核心链路：

```text
Entity
↓
Category
↓
Product
↓
Media
↓
SEO Metadata
↓
Schema Metadata
↓
Search Runtime
```

## 6. 关系表

需要预留的多对多关系：

- `entity_relations`：跨 Entity 内链、Related Product、Topic Cluster。
- `entity_media`：实体与媒体资产关联。
- `entity_faqs`：实体与 FAQ 关联。
- `entity_tags`：实体与 Tag 关联。
- `product_industries`：Product 与 Industry 关联。
- `article_tags`：Article 与 Tag 关联。

关系表统一字段：

```text
id
source_entity_id
target_entity_id
relation_type
display_order
status
created_at
updated_at
deleted_at
```

## 7. 生命周期

公开内容生命周期：

```text
draft
internal_review
content_approved
seo_approved
release_approved
published
indexed
archived
```

Lead 生命周期：

```text
new
contacted
qualifying
assigned
won
invalid
```

媒体生命周期：

```text
uploaded
reviewing
approved
published
archived
```

## 8. 删除策略

- Entity、Product、Industry、Partner、Article、FAQ、Download、Media、SEO Metadata、Schema Metadata、Navigation、Redirect 默认软删除。
- Soft delete 字段统一使用 `deleted_at`。
- 已发布页面不可直接物理删除，必须先进入 `archived` 并检查 Redirect、sitemap、robots 和 Search Runtime。
- Lead 不默认删除；如遇个人信息删除请求，执行字段脱敏并保留审计。
- Audit Log 不删除。

## 9. 版本策略

版本字段统一使用 `version`。

规则：

- 初始为 1。
- 只有审核通过且影响公开内容时递增。
- 草稿编辑不覆盖正式 `updated_at`。
- `published_at` 记录首次发布时间，不随后续内容更新改变。
- SEO Schema 中 `dateModified` 来源于已审核内容的 `updated_at`，不得使用构建时间伪造。

## 10. 审计字段

核心业务表默认字段：

```text
created_at
updated_at
published_at
deleted_at
created_by
updated_by
published_by
source_status
status
version
```

后续 M3.1 认证授权实现前，`created_by`、`updated_by`、`published_by` 仅作为字段预留，不在 M3.0 写入业务逻辑。

## 11. 多语言扩展策略

当前默认语言：`zh-CN`。

M3.0 不实现多语言，但所有公开内容表预留 `locale`。

未来策略：

- 同一业务实体共享 `entity_id`。
- 不同语言拥有独立 slug、Metadata、Schema、发布状态和审核状态。
- 唯一约束必须包含 `locale`。
- hreflang、翻译工作流和多语言 URL 另行通过 ADR 决策。

## 12. M3 / M4 边界

M3 只冻结平台架构边界，不创建数据库迁移、ORM、API、后台 UI 或运行时代码。

M4 Platform Runtime 再统一进入：

```text
Prisma
-> Migration
-> Database
-> RBAC
-> CMS
-> Media
-> Lead
-> SEO Runtime
-> API
-> Admin UI
```

## 13. M3.0 验收标准

- ADR-0008 Database Model 已 Accepted。
- `docs/DATABASE.md` 已覆盖数据模型、ER 图、约束、软删除、版本、slug、多语言和审计字段。
- `docs/ROADMAP.md`、`docs/TODO.md`、`docs/MEMORY.md`、`CHANGELOG.md` 已同步。
- 未创建数据库迁移、ORM、CMS CRUD 或运行时代码。
- Governance、Product Rendering、TypeScript、ESLint 和 Build 验证通过。
