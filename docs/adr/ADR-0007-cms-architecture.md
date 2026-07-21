# ADR-0007: CMS Architecture

状态：Accepted

日期：2026-07-21

## 背景

M2 Channel Growth Foundation 已冻结 Entity、Product、Metadata、Schema、Rendering 和 Publishing Workflow。M3.0 已冻结 Database Architecture，M3.1 已冻结 Authentication & Authorization。下一步需要进入 CMS Architecture，但不能直接开发 CRUD、富文本、上传或后台页面。

如果 CMS 直接按页面或表单开发，Product、Industry、Article、Partner、FAQ、Download、Navigation、SEO Metadata 和 Schema Metadata 会再次散落，权限、审计、发布和 Search Runtime 也会反复返工。

## 决策

M3.2 CMS Architecture 只冻结内容管理架构，不创建 CMS 页面、不实现 CRUD、不接入 ORM、不创建数据库迁移、不实现富文本编辑器、不实现文件上传运行时。

CMS 采用 Entity-first 内容管理模型：

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

CMS 必须复用：

- ADR-0008 Database Model：`entity_id`、soft delete、version、locale、audit fields。
- ADR-0009 Authentication & Authorization：Resource、Action、Role、Permission、RBAC、Audit。
- M2 Publishing Workflow：Draft、Internal Review、Content Approved、SEO Approved、Release Approved、Published、Indexed、Archived。

## CMS Resource

M3.2 首期 CMS Resource：

- Product
- Industry
- Article
- Partner
- FAQ
- Download
- Navigation
- SEO Metadata
- Schema Metadata
- Redirect
- Setting

Media、Lead、Audit Log、SEO Runtime、GEO Runtime 只作为引用或集成边界，不在 M3.2 实现完整运行中心。

## Content Boundary

CMS 允许维护：

- 基础内容字段。
- Entity 关系。
- Metadata 字段。
- Schema 来源字段。
- FAQ。
- Navigation。
- Redirect。
- Publishing status。
- Compliance notes。

CMS 不允许维护或生成：

- 未确认产品参数。
- 未授权案例。
- 收益、回本、保本、零风险。
- 区域独家或未确认授权政策。
- 市场排名或虚假背书。
- 未授权媒体公开使用。

## Workflow

CMS 统一使用以下工作流：

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

`Published` 不等于 `Indexed`。Search Runtime 或人工收录验收后才可进入 Indexed。

Product Detail 继续执行：

```text
published + schemaEligible + contentValidated + releaseApproved
```

## Permission

CMS 权限由 Resource + Action 表达，不允许写死在页面或接口中。

核心 Action：

```text
create
read
update
delete
approve
publish
import
export
restore
manage
```

Editor 可创建和编辑内容草稿，但不默认发布。SEO 可维护和审核 SEO Metadata、Schema Metadata、Redirect 和 Search Runtime 相关字段。Partner Manager 可维护 Partner 相关内容。Sales 不维护 CMS 内容。Admin 可管理多数内容资源。Super Admin 管理系统级权限和设置。

## Audit

CMS 写操作必须进入 Audit Log：

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

Audit Log 不允许 CMS 编辑或删除。

## Platform Split

M3.2 后续平台能力按以下方向拆分：

- M3.3 Media Management
- M3.4 Lead Center
- M3.5 SEO Runtime
- M3.6 GEO Runtime
- M3.7 Audit Center
- M3.8 Backup & Restore
- M3.9 Deployment & Analytics

CMS 不吞并这些运行中心，只定义与它们的关系。

## 后果

- CMS 后续实现可以复用 Entity、Database、Auth、Metadata、Schema 和 Publishing Workflow。
- 内容维护、媒体管理、线索管理、Search Runtime 和审计中心边界更清晰。
- 初期会增加文档和字段设计成本，但能避免后台 CRUD 先行造成返工。

## 替代方案

### 直接开发 CRUD

直接 CRUD 能快速看到后台页面，但会让字段、权限、审计和发布流程散落，不适合当前平台阶段。

### 使用 Headless CMS

Headless CMS 可以加快内容后台建设，但本项目已有 Entity、Metadata、Schema、Publishing、Database 和 Auth 决策，直接接入外部 CMS 会增加模型映射复杂度。后续如需要评估外部 CMS，必须单独 ADR。

### 把 Media、Lead、SEO Runtime 全部放入 CMS

这样能减少阶段数量，但会让 CMS 变成泛后台，边界过宽。M3.2 只冻结内容管理，运行中心拆到后续平台阶段。
