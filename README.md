# LABOR-SAVING Channel Growth Platform

当前已进入 M2.4.5.3.5 First Published Product Acceptance：详情模板与发布门禁已建立；未满足 `published + schemaEligible + contentValidated + releaseApproved` 的实体不生成详情 URL、Product Schema 或 sitemap，LS70 保持非实体占位。

当前平台阶段：M3 Website Platform Foundation。M2 Channel Growth Foundation 已冻结为 v1.0，历史 M2.6-M2.8 通过 `docs/MILESTONE_MAPPING.md` 映射到 M3，后续重点转向数据库、认证、CMS、运行平台、Search Runtime 与 Analytics/CRM。

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
- M2 Channel Growth Foundation 进行中
- 已完成 Page System、Metadata System、SEO Schema Layer、Partner Page v1 和 Partner System Hardening
- 已完成 Product System Foundation：先冻结 Product Entity、Content Model、Metadata、Schema 与 SEO/GEO 模板，再进入 M2.4.5 Product Rendering Layer
- 已完成 M2.4 Repository Audit：Entity 门禁、产品 URL、CI 与 AI 治理入口已同步
- 已进入 M2.4.5 Product Rendering Layer：以模板验证为目标，按 Listing、Category、首个真实 Detail、Related Product 逐层推进
- 已完成 M2.4.5.1 Product Listing：`/products/` 由 Product Entity 自动分组渲染
- 已完成 M2.4.5.2 Product Category：分类路由和 SEO/Schema 层由 Entity 自动生成，下一步为首个真实 Product Detail 资料确认

## 文档入口

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
- `docs/adr/README.md`
- `docs/PARTNER_FUNNEL.md`
- `docs/PARTNER_CONTENT_MODEL.md`
- `docs/PARTNER_SEO_TEMPLATE.md`
- `docs/LEAD_SCHEMA.md`
- `.ai/AI_PROJECT_OPERATING_SYSTEM.md`
