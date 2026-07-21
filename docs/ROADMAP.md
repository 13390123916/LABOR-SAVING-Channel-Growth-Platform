# Roadmap

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

状态：进行中

目标：

- 建立页面级开发输入、统一 Metadata、Partner 商业入口和后续 Lead Capture 集成基础

范围：

- M2.0 Page Strategy Definition：`docs/PAGE_SYSTEM.md`
- M2.1 Metadata System：`docs/METADATA_SCHEMA.md`
- M2.2 SEO Schema Layer：`docs/SEO_SCHEMA_LAYER.md`
- M2.3 Partner Page Development & Partner System Hardening：`/partner/`、`docs/PARTNER_CONTENT_MODEL.md`、`docs/PARTNER_SEO_TEMPLATE.md`
- M2.4 Product Page Development：`/products/`
- M2.5 Industry Page Development：`/applications/`
- M2.6 Lead Capture Integration
- M2.7 Admin Maintainability
- M2.8 Batch Export
- 继续沿用 M1.5 已完成的 `docs/PARTNER_FUNNEL.md` 与 `docs/LEAD_SCHEMA.md`
- 表单结构与输入校验
- 来源追踪与 CRM 字段预留
- 后续 MySQL 数据模型

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
