# ADR-0008: Database Model

状态：Accepted

日期：2026-07-21

## 背景

M2 Channel Growth Foundation 已冻结 Entity、Product、Metadata、SEO Schema、Product Rendering 与 Publishing Workflow v1.0。M3 Website Platform Foundation 将进入数据库、认证授权、CMS、运行平台、Search Runtime 与 Analytics/CRM。

如果 M3.0 直接写数据库代码，Product、Partner、Lead、Media、FAQ、SEO Metadata 和 Schema Metadata 很容易在实现过程中反复迁移。进入数据库实现前，必须先冻结数据库模型、ID 策略、生命周期、索引和扩展边界。

## 决策

M3.0 Database Architecture 只冻结数据库设计，不创建迁移、不接入 ORM、不开发后台 CRUD。

数据库优先采用 MySQL，原因是项目最高 AI 协作规则和 PRD 已将 MySQL 列为确认技术方向；当前业务规模以 Website、CMS、Lead、Search Runtime 和 CRM 集成为主，MySQL 能满足关系约束、事务、索引、JSON 字段、全文检索预留和常规运维成本要求。若后续出现复杂全文检索、向量检索或分析型负载，另行通过 ADR 扩展 Elasticsearch、OpenSearch、ClickHouse 或向量库，不在主业务库中提前复杂化。

所有可长期维护的业务对象继续以 Entity Layer 为核心：

```text
Entity
-> Entity Type Table
-> Metadata
-> Schema
-> CMS Content
-> Frontend
-> SEO / GEO
-> Lead / CRM / Analytics
```

数据库允许使用内部主键 `id`，但跨 CMS、CRM、Analytics、Search Runtime 和 Frontend 的稳定业务键必须是 `entity_id`。`entity_id` 采用 M2 已冻结的 `{TYPE_PREFIX}-{4位序号}`，例如 `PRD-0001`、`IND-0001`、`FAQ-0001`。

## 数据模型范围

M3.0 冻结以下核心模型：

- Entity
- Category
- Product
- Industry
- Partner
- Lead
- Media
- Article
- FAQ
- Download
- Navigation
- SEO Metadata
- Schema Metadata
- Tag
- Redirect
- Audit Log

首批数据库实现不得超出以上模型创建业务表；认证授权、CMS 和运行平台可以在后续 M3.1-M3.3 通过单独 ADR 或实现文档细化。

## ID 策略

- 所有表允许使用内部 `id`，类型采用 unsigned bigint auto increment，作为数据库主键和外键性能优化键。
- 所有 Entity 必须保留全局唯一 `entity_id`，并建立唯一索引。
- 业务关联优先保存 `entity_id`，必要时同时保存内部 `entity_pk` 做查询优化，但不得只依赖自增 ID 表达业务关系。
- Lead、Audit Log、Job、Export 等运行记录可使用内部 ID；对外导出时使用 `lead_id`、`audit_id` 等稳定编号。
- 不在 M3.0 默认采用 UUID。若未来存在跨系统离线写入、多地域合并或公开 API 暴露 ID 需求，再通过 ADR 评估 UUID/ULID。

## Slug 策略

Slug 不作为业务主键，只作为 URL 与可读标识。

唯一策略：

- Product：`category_id + slug` 唯一，同一分类下型号 slug 不可重复。
- Category：`category_type + slug` 唯一，例如 product category 与 article category 可复用不同命名空间。
- Article / FAQ / Download / Industry / Partner Program：同一 `entity_type + locale + slug` 唯一。
- Navigation：同一 `nav_group + parent_id + slug` 唯一。
- 已归档记录保留 slug；如需复用旧 slug，必须先创建 Redirect 或明确 canonical 策略。

## 生命周期与软删除

M3.0 采用软删除和生命周期状态并行：

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

删除策略：

- Entity、Product、Industry、Partner、Article、FAQ、Download、Media、SEO Metadata、Schema Metadata 默认软删除，使用 `deleted_at`。
- Lead 默认不物理删除；合规删除需求通过脱敏字段和审计记录处理。
- Audit Log 不软删除，不允许业务后台修改。
- 公开页面下线必须先进入 `archived`，并同步 Redirect、sitemap、robots 和 Search Runtime。

## 版本策略

所有 Entity 保留 `version` 字段，语义沿用 `docs/ENTITY_SYSTEM.md`：

- `version` 表达已审核内容版本，不表达数据库迁移版本。
- 初始为 `1`。
- 只有内容审核通过并影响公开内容、Metadata、Schema、FAQ、内链或 GEO 摘要时递增。
- 草稿编辑不直接覆盖 `published_at` 和正式 `updated_at`。

M3.0 不实现完整历史版本表，但预留 `content_versions` 后续扩展位。CMS 实现时如需要回滚，再通过 M3.2 实现文档细化。

## 审计字段

核心业务表至少包含：

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

Lead 类表额外包含：

```text
source_channel
source_page
source_campaign
assigned_to
contacted_at
qualified_at
closed_at
```

SEO / Schema 类表额外包含：

```text
canonical_url
schema_type
schema_json
indexed_at
last_submitted_at
```

## 多语言扩展

当前默认语言为 `zh-CN`，M3.0 不实现多语言站点。

所有可公开内容表预留 `locale`，默认 `zh-CN`。未来多语言扩展采用：

```text
entity_id
locale
slug
title/name
summary
content
metadata_id
schema_id
```

同一 Entity 的不同语言版本共享 `entity_id`，但拥有独立 slug、Metadata、Schema、发布状态和审核状态。多语言 URL、hreflang 与翻译工作流另行通过 ADR 决策。

## 数据约束

必须冻结的约束：

- `entities.entity_id` 全局唯一。
- `entities.entity_type + slug + locale` 唯一。
- `categories.category_type + slug + locale` 唯一。
- `products.category_id + slug + locale` 唯一。
- `seo_metadata.entity_id + page_url + locale` 唯一。
- `schema_metadata.entity_id + schema_type + locale` 唯一。
- `faqs.entity_id + question_hash + locale` 唯一。
- `media.asset_path` 唯一，避免公开资源 URL 冲突。
- `redirects.source_url` 唯一。

外键必须表达真实业务关系，禁止用名称、标题或页面文案做关系键。

## 后果

- M3.0 可以先冻结数据库蓝图，再进入数据库实现，避免边开发边改模型。
- M3.1-M3.5 可围绕同一 Entity、Metadata、Schema、Lead 和 Audit 语义递进。
- MySQL 作为主业务数据库不会阻止后续引入搜索、分析或 AI 检索专用组件。
- 软删除、版本字段和审计字段会增加表结构复杂度，但能保护 SEO/GEO、CRM 和合规追溯。

## 替代方案

### PostgreSQL

PostgreSQL 在 JSON、复杂约束和全文能力上更强，但当前项目最高规则和 PRD 已确认 MySQL；在没有明确复杂查询和团队运维优势的情况下，切换会增加治理成本。

### 全 UUID 主键

UUID 适合分布式写入和公开 API，但当前项目更需要可读、稳定、可审计的 Entity ID。M3.0 保留内部自增 ID 加业务 Entity ID 的组合。

### 不采用软删除

物理删除能简化表结构，但会破坏 SEO URL、Schema、Lead 来源和审计追溯，因此不适合本项目。
