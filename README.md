# LABOR-SAVING Channel Growth Platform

当前已进入 M2.4.5.3.5 First Published Product Acceptance：详情模板与发布门禁已建立；未满足 `published + schemaEligible + contentValidated + releaseApproved` 的实体不生成详情 URL、Product Schema 或 sitemap，LS70 保持非实体占位。

当前平台阶段：M3 Website Platform Foundation。`docs/PLATFORM_ARCHITECTURE.md` 是整个 Platform 的结构入口。M3.0 Database Architecture 已完成设计冻结，见 ADR-0008 与 `docs/DATABASE.md`；M3.1 Authentication & Authorization 已完成架构冻结，见 ADR-0009 与 `docs/AUTH_SYSTEM.md`；M3.2 CMS Architecture 已完成架构冻结，见 ADR-0007 与 `docs/CMS_SYSTEM.md`；M3.3 Media Management Architecture 已完成架构冻结，见 ADR-0010 与 `docs/MEDIA_SYSTEM.md`；M3.4 Lead Center Architecture 已完成架构冻结，见 ADR-0011 与 `docs/LEAD_CENTER.md`；M3.5 Platform Assets Architecture 已完成架构冻结，见 ADR-0012 与 `docs/PLATFORM_ASSETS.md`。M2 Channel Growth Foundation 已冻结为 v1.0，历史 M2.6-M2.8 通过 `docs/MILESTONE_MAPPING.md` 映射到 M3。后续 M3.6-M3.9 继续做架构冻结，真正运行时代码统一进入 M4 Platform Runtime。

雷普赛维渠道增长平台是面向工业装备渠道合作、终端客户询盘、中国 SEO 与国内 AI 搜索优化的长期增长平台，不是普通企业官网。

## 当前定位

1. B 端渠道合作获客
2. 终端客户工况与产品咨询
3. 品牌与内容资产沉淀

## 当前工程结构

- `website/`：官网与平台前台工作区，M1 已建立 Next.js、TypeScript、TailwindCSS、SEO/GEO 基础。
- `docs/`：PRD、路线图、记忆、SEO/GEO、CRM、架构、Git 工作流与仓库维护文档。
- `seo/`：SEO 关键词、站点地图、结构化数据预留。
- `geo/`：AI 搜索知识与问答资产预留。
- `crm/`：线索与后续分配预留。

## 首批产品范围

- LS40 助力机械臂
- L60 助力机械臂
- SQ35 气动平衡器
- SQ50 气动平衡器

## 开发原则

- Next.js + TypeScript + TailwindCSS
- SSR / SSG 优先
- 中国 SEO / 国内 GEO 友好
- 不编造收益、案例、排名、授权政策和产品参数
- 所有新增功能同步更新文档

## 当前阶段状态

- M0 Repository Bootstrap 已完成
- M0 Repository Audit 已完成
- M0.1 Repository Governance Fix 已完成
- M1 Website Foundation 已完成
- M1.5 Channel Growth Strategy Layer 已完成
- M2 Channel Growth Foundation 已冻结为 v1.0；M3 Website Platform Foundation 已启动
- 已完成 Page System、Metadata System、SEO Schema Layer、Partner Page v1 和 Partner System Hardening
- 已完成 Product System Foundation：先冻结 Product Entity、Content Model、Metadata、Schema 与 SEO/GEO 模板，再进入 M2.4.5 Product Rendering Layer
- 已完成 M2.4 Repository Audit：Entity 门禁、产品 URL、CI 与 AI 治理入口已同步
- 已进入 M2.4.5 Product Rendering Layer：以模板验证为目标，按 Listing、Category、首个真实 Detail、Related Product 逐层推进
- 已完成 M2.4.5.1 Product Listing：`/products/` 由 Product Entity 自动分组渲染
- 已完成 M2.4.5.2 Product Category：分类路由和 SEO/Schema 层由 Entity 自动生成；M2.4.5.3.5 作为首个真实产品发布验收质量门禁保留
- 已完成 M3.0 Database Architecture：ADR-0008 与 `docs/DATABASE.md` 已冻结数据库架构
- 已完成 M3.1 Authentication & Authorization Architecture：ADR-0009 与 `docs/AUTH_SYSTEM.md` 已冻结认证授权架构
- 已完成 M3.2 CMS Architecture：ADR-0007 与 `docs/CMS_SYSTEM.md` 已冻结内容管理架构
- 已完成 M3.3 Media Management Architecture：ADR-0010 与 `docs/MEDIA_SYSTEM.md` 已冻结媒体领域架构；本阶段不实现文件上传、图库 UI、ORM、迁移、裁切转码或 CDN 接入
- 已完成 M3.4 Lead Center Architecture：ADR-0011 与 `docs/LEAD_CENTER.md` 已冻结线索领域架构；本阶段不实现表单提交、CRM 后台、ORM、迁移、通知、导出或 Admin UI
- 已完成 M3.5 Platform Assets Architecture：ADR-0012 与 `docs/PLATFORM_ASSETS.md` 已冻结平台公共资产架构；Platform Assets 属于 Platform Layer，不是 CMS Content、Lead Data、Dealer Data 或 Runtime；本阶段不新增 API、Database Migration、后台、CMS 或 Runtime

## 平台成熟度

```text
Repository Governance        100%
SEO/GEO Foundation           100%
Entity Layer                 100%
Product Foundation           100%
Database Architecture        100%
Authentication Architecture  100%
CMS Architecture             100%
Media Management Architecture 100%
Lead Center Architecture      100%
Platform Assets Architecture  100%
SEO Runtime                    0%
GEO Runtime                    0%
Audit Center                   0%
Backup & Restore               0%
Deployment & Analytics         0%
M4 Platform Runtime            0%
```

## 文档入口

Platform 阅读顺序：`README.md` -> `docs/PLATFORM_ARCHITECTURE.md` -> `docs/ROADMAP.md` -> `docs/adr/README.md`。

- `docs/PROJECT_PRD.md`
- `docs/ROADMAP.md`
- `docs/TODO.md`
- `docs/MEMORY.md`
- `docs/M2_STRATEGY.md`
- `docs/PAGE_SYSTEM.md`
- `docs/METADATA_SCHEMA.md`
- `docs/SEO_SCHEMA_LAYER.md`
- `docs/ENTITY_SYSTEM.md`
- `docs/PRODUCT_SYSTEM.md`
- `docs/PRODUCT_CONTENT_MODEL.md`
- `docs/PRODUCT_SCHEMA.md`
- `docs/PRODUCT_SEO_TEMPLATE.md`
- `docs/PRODUCT_PUBLISHING_CHECKLIST.md`
- `docs/PRODUCT_CONTENT_READINESS.md`
- `docs/MILESTONE_MAPPING.md`
- `docs/PLATFORM_ARCHITECTURE.md`
- `docs/AUTH_SYSTEM.md`
- `docs/CMS_SYSTEM.md`
- `docs/MEDIA_SYSTEM.md`
- `docs/LEAD_CENTER.md`
- `docs/PLATFORM_ASSETS.md`
- `docs/adr/README.md`
- `docs/adr/ADR-0007-cms-architecture.md`
- `docs/adr/ADR-0008-database-model.md`
- `docs/adr/ADR-0009-authentication-and-authorization.md`
- `docs/adr/ADR-0010-media-management.md`
- `docs/adr/ADR-0011-lead-center.md`
- `docs/adr/ADR-0012-platform-assets.md`
- `docs/PARTNER_FUNNEL.md`
- `docs/PARTNER_CONTENT_MODEL.md`
- `docs/PARTNER_SEO_TEMPLATE.md`
- `docs/LEAD_SCHEMA.md`
- `.ai/AI_PROJECT_OPERATING_SYSTEM.md`
