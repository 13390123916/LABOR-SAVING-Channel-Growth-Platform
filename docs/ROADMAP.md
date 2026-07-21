# Roadmap

## M3 Website Platform Foundation

状态：已启动。M2 Channel Growth Foundation 已冻结为 v1.0；迁移规则见 `docs/MILESTONE_MAPPING.md`，架构决策见 `docs/adr/README.md`。

目标：从治理与渲染前置设计转向数据库、认证授权、CMS、运行平台、Search Runtime 与 Analytics/CRM 的真实运行能力。

- M3.0 Database Architecture（已完成设计冻结：ADR-0008 与 `docs/DATABASE.md`）
- M3.1 Authentication & Authorization（已完成架构冻结：ADR-0009 与 `docs/AUTH_SYSTEM.md`）
- M3.2 CMS Foundation
- M3.3 Runtime Platform
- M3.4 Search Runtime
- M3.5 Analytics & CRM

当前推进：M3.1 Authentication & Authorization 已完成架构冻结，不直接写登录、JWT、Session 或后台代码；下一步进入 M3.2 CMS Foundation，先围绕 Auth、Database、Entity、Metadata、Schema 和 Audit 定义 CMS 内容管理边界。

当前平台成熟度：

```text
Repository Governance        100%
SEO/GEO Foundation           100%
Entity Layer                 100%
Product Foundation           100%
Database Architecture        100%
Authentication Architecture  100%
CMS Foundation                 0%
Runtime Platform               0%
Analytics                      0%
```

产品发布质量门禁：M2.4.5.3 Product Detail 已进入首次发布验收阶段。只有 `published + schemaEligible + contentValidated + releaseApproved` 的真实 Product Entity 才生成详情 URL、Product Schema、sitemap 和 Related Product；LS70 继续保持非实体占位。

当前发布验收：M2.4.5.3.3 First Published Product Validation 已建立检查清单，等待选定资料完整实体后完成真实内容、图片、SEO/GEO、sitemap、robots 与上线后 Search Console 闭环。

当前验收：M2.4.5.3.5 First Published Product Acceptance 以 `PRD-0002` L60 为首个候选，验证从 Entity 到收录的完整发布闭环；不继续扩展产品页面数量或批量产品开发。

项目周期预计 12 到 24 个月，采用“Repository 治理先行、网站技术底座、SEO/GEO 基础、CRM 渐进增强、代理协作与运营分析”的路线。

## M0 Repository Bootstrap

状态：已完成

目标：

- 建立企业级仓库基础设施
- 建立 `.ai/`、`.github/`、`docs/`
- 建立 README、CHANGELOG、LICENSE、CONTRIBUTING
- 建立长期模块目录

## M0 Repository Audit

状态：已完成

目标：

- 对照 `PROJECT_STRUCTURE.md`
- 对照 `.ai/AI_PROJECT_OPERATING_SYSTEM.md`
- 对照 `CODEX_SYSTEM_PROMPT.md`
- 输出第一次仓库审计报告

交付：

- `REPOSITORY_AUDIT_REPORT.md`

## M0.1 Repository Governance Fix

状态：已完成

目标：

- 将仓库从“AI 能理解”提升为“任何 AI、任何开发人员接手都不会迷失”

交付：

- `.github/pull_request_template.md`
- `.ai/AI_PROJECT_OPERATING_SYSTEM.md` V1.1
- `docs/GIT_WORKFLOW.md`
- `docs/REPOSITORY_MAINTENANCE.md`
- `docs/ISSUE_WORKFLOW.md`
- 根目录与 `docs/` 文档职责整理
- CI 文档检查更新

## M1 Website Foundation

状态：已完成

目标：

- 建立网站技术底座，而不是直接制作完整业务页面

交付：

- Next.js App Router
- TypeScript 严格模式
- TailwindCSS 基础样式
- `docs/WEBSITE_ARCHITECTURE.md`
- `docs/WEBSITE_SEO_BLUEPRINT.md`
- `docs/CONTENT_SYSTEM.md`
- Website 技术骨架：`app/`、`components/`、`public/`、`styles/`
- CMS、内容结构与组件系统文档规划
- Website CI 校验
- Website Governance CI 校验

边界：

- 不创建产品详情、行业方案、招商合作等业务页面
- 不提前实现 `robots.txt`、`sitemap.xml`、`llms.txt` 等 SEO/GEO 路由，先在蓝图中定义
- 不编造产品参数、客户案例、收益结果、授权政策或市场排名
- 不提前创建 `application`、`domain`、`infrastructure`、`features` 等无业务支撑目录

验收状态：

```text
Repository
        |
        +-- AI Governance ✅
        |
        +-- Website Architecture ✅
        |
        +-- SEO/GEO Strategy ✅
        |
        +-- Website Technical Skeleton ✅
        |
        +-- Content System ✅
```

M1 完成后不直接进入页面开发，先进入 M1.5 Channel Growth Strategy Layer，再进入 M2 Channel Growth Foundation。

## M1.5 Channel Growth Strategy Layer

状态：已完成

目标：

- 在 M2 前固化渠道增长策略，避免过早页面开发导致招商转化逻辑后补

交付：

- `.ai/AI_PROJECT_OPERATING_SYSTEM.md` V1.2
- `docs/M2_STRATEGY.md`
- `docs/PARTNER_FUNNEL.md`
- `docs/LEAD_SCHEMA.md`

战略确认：

- 网站定义为工业智能装备渠道增长入口。
- Website Traffic Weight：Partner 35%、Product 25%、Industry 20%、Content 10%、Trust 10%。
- M2 不直接进入普通 Website Development，而进入 Channel Growth Foundation。

## M2 Channel Growth Foundation

状态：已冻结为 v1.0。M2.6-M2.8 为历史规划，映射至 M3；M2.4.5.3.5 仅保留为首个产品跨阶段发布验收质量门禁。

目标：

- 建立页面级开发输入、统一 Metadata、Partner 商业入口和后续 Lead Capture 集成基础

范围：

- M2.0 Page Strategy Definition：`docs/PAGE_SYSTEM.md`
- M2.1 Metadata System：`docs/METADATA_SCHEMA.md`
- M2.2 SEO Schema Layer：`docs/SEO_SCHEMA_LAYER.md`
- M2.3 Partner Page Development & Partner System Hardening：`/partner/`、`docs/PARTNER_CONTENT_MODEL.md`、`docs/PARTNER_SEO_TEMPLATE.md`
- M2.4 Product System Foundation：`docs/ENTITY_SYSTEM.md`、`docs/PRODUCT_SYSTEM.md`、`docs/PRODUCT_CONTENT_MODEL.md`、`docs/PRODUCT_SCHEMA.md`、`docs/PRODUCT_SEO_TEMPLATE.md`
- M2.4 Repository Audit：已通过，治理入口、CI 文档清单与产品 URL 规范已同步
- M2.4.5 Product Rendering Layer：已批准进入，按 Listing、Category、首个真实 Detail、Related Product 逐层验证模板，不按页面数量推进
- M2.4.5.1 Product Listing：已完成，`/products/` 由 Product Entity 数据源自动分组和渲染，统一 Metadata、Schema、Breadcrumb 与 FAQ 已验证
- M2.4.5.2 Product Category：已完成，分类路由、Entity 过滤、Metadata、Canonical、Breadcrumb、CollectionPage 与 FAQ 均自动生成
- M2.4.5.2 Repository Audit：已通过，CI 现同时验证仓库治理与 Product Rendering 约束
- M2.5 Industry Page Development：`/applications/`
- M2.6 Lead Capture Integration
- M2.7 Admin Maintainability
- M2.8 Batch Export
- 继续沿用 M1.5 已完成的 `docs/PARTNER_FUNNEL.md` 与 `docs/LEAD_SCHEMA.md`
- 表单结构与输入校验
- 来源追踪与 CRM 字段预留
- 后续 MySQL 数据模型

M2.4 调整说明：

```text
M2.4 Product System Foundation
-> M2.4.0 Product Entity
-> M2.4.1 Product Content Model
-> M2.4.2 Product Metadata
-> M2.4.3 Product Schema
-> M2.4.4 Product CMS Model
-> M2.4.5 Product Rendering Layer
```

当前阶段先冻结 Entity、Content Model、Metadata、Schema 和 SEO/GEO 模板，不开发 `/products/` 页面、不开发后台 CMS、不开发 CRM、不冻结数据库。

下一阶段命名为：

```text
M2.4.5 Product Rendering Layer
```

范围包括 Product Listing、Product Category、Product Detail、FAQ、Schema、Metadata、Breadcrumb、Related Product、Internal Link 和 SEO/GEO 落地。

每层同时验证 Canonical 与 Open Graph。首个正式 Product Detail 必须使用资料已确认的 Product Entity；LS70 资料未确认前不进入正式收录体系。

## M3 SEO/GEO Foundation

状态：待启动

目标：

- 建立中国 SEO 与国内 AI 搜索可持续优化基础

范围：

- 关键词库
- 产品实体库
- FAQ 矩阵
- sitemap / robots 扩展
- 内容规范
