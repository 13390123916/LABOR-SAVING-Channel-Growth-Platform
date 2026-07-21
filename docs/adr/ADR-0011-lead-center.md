# ADR-0011: Lead Center Architecture

状态：Accepted

日期：2026-07-21

## 背景

M3.0 Database Architecture、M3.1 Authentication & Authorization、M3.2 CMS Architecture 和 M3.3 Media Management Architecture 已完成设计冻结。Lead 是平台业务数据入口，承接加盟合作、终端客户询盘、SEO/GEO 内容转化和后续 Analytics / CRM。

现有 `docs/LEAD_SCHEMA.md` 和 `docs/CRM.md` 已定义表单字段和基础 CRM 状态，但还缺少平台级 Lead Center 架构，无法统一约束线索来源、状态、分配、去重、隐私、导出、CRM 输入、权限和审计。

## 决策

M3.4 命名为 Lead Center Architecture，先冻结 Lead Domain，不直接实现运行时代码。

已确认：

- Lead 是业务数据入口，不是普通表单记录。
- 首期 Lead 类型包括 Partner Lead、Customer Lead、Manual Lead 和 Imported Lead。
- Partner Lead 优先级高于 Customer Lead，符合项目商业优先级。
- Lead 不作为公开内容 Entity，不生成公开 URL、Metadata、Schema 或 sitemap。
- Lead 字段按 Identity、Contact、Business、Intent、Source、Status、Assignment、Privacy 和 Audit 分层。
- Lead 生命周期采用 New -> Contacted -> Qualifying -> Assigned -> Won -> Invalid。
- 来源归因保留搜索、AI 搜索、社媒、投放、直接访问、人工录入和导入来源。
- 分配策略先冻结边界，不实现自动分配。
- 去重只生成候选提示，不自动删除。
- Lead 导出、分配、脱敏、导入和批量操作必须接入 RBAC 和 Audit。
- Lead Center 是 CRM 输入，不是完整 CRM。
- M3.4 后不进入 Lead Runtime；数据库、API、RBAC、CMS、Media、Lead、SEO Runtime 和 Admin UI 统一进入 M4 Platform Runtime。

## 后果

正向影响：

- M3.4 能冻结业务数据入口，不会过早落成不可治理的表单提交。
- Lead、SEO Runtime、GEO Runtime 和 Analytics 的依赖顺序更清晰。
- 后续 M4 实现可以一次性处理 Prisma、Migration、RBAC、API、Admin UI 和审计，不在 M3 中分散半成品运行时代码。
- 个人信息、导出和分配被纳入权限与审计边界。

成本：

- 真实表单提交、CRM 后台、通知、导出和自动分配继续后置。
- 后续实现需要同时处理 Lead 数据、权限、审计、隐私和 Analytics 边界。

## 替代方案

### 方案 A：直接实现表单提交

拒绝。表单提交不能解决来源归因、分配、去重、隐私、导出、CRM 输入和审计问题，后续返工风险高。

### 方案 B：把 Lead 作为 CMS 字段

拒绝。Lead 是业务数据入口，包含个人信息、状态流转和分配动作，不应被 CMS 内容模型吞并。

### 方案 C：先接第三方 CRM

暂不采用。第三方 CRM 可作为 M4 或后续集成选项，但当前必须先冻结内部 Lead Domain，避免外部工具反向决定平台数据模型。

## ADR 治理说明

ADR 只记录重大平台方向决策。后续上传策略、字段微调、导出格式、列表筛选等局部策略不单独创建 ADR，除非会改变平台模块边界、数据模型、运行时选型或长期维护成本。

## 验收

- `docs/LEAD_CENTER.md` 已冻结 Lead Domain。
- `docs/PLATFORM_ARCHITECTURE.md` 已明确 M3.4 和 M4 Platform Runtime 边界。
- Roadmap、TODO、Memory、PRD、README、CHANGELOG 和治理校验已同步。
- 未创建表单提交接口、CRM 后台、ORM、迁移、通知、导出运行时、API 或 Admin UI。
