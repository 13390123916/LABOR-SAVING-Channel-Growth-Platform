# TODO

## M3 Website Platform Foundation

- [x] M3.0 Database Architecture：确定 Entity、Category、Industry、Partner、Lead、Media、FAQ、Article、Download、Tag、Navigation、SEO Metadata、Schema Metadata 的数据模型、ER 图、索引、约束、生命周期、软删除、版本、slug、多语言和审计字段
- [x] M3.1 Authentication & Authorization Architecture：冻结 Admin、Editor、SEO、Sales、Partner Manager、Super Admin、RBAC、Resource、Permission、Audit、Login Flow、Session 和 Future SSO
- [x] M3.2 CMS Architecture：冻结 CMS Resource、Content Type、Field Group、Workflow、Permission Integration、Audit Integration、Import / Export 和 Future Platform Split
- [x] M3.3 Media Management Architecture：冻结 Media Entity、Media Metadata、Asset 生命周期、图片版本、ALT 来源、WebP / AVIF 预留、Thumbnail Strategy、Storage Adapter、CDN Boundary、Watermark Strategy 和引用关系
- [x] M3.4 Lead Center Architecture：冻结 Lead Entity、Lead Type、字段分层、来源归因、生命周期、分配、去重、隐私、导出边界、CRM 输入、权限和审计
- [x] M3.5 Platform Assets Architecture：冻结 Company Profile、Brand Assets、Social Media Hub、Download Center、Friend Links、Contact Center、System Settings，并确认 Platform Assets 属于 Platform Layer，不是 CMS Content、Lead Data、Dealer Data 或 Runtime
- [x] M3 Governance Enhancement：固化 Platform Module Intake Gate、Platform Architecture Single Source of Truth 和 Platform Module 归属门禁
- [x] 固化 Governance Note：M3 Governance Enhancement 属于治理演进，不属于新的 Platform Capability，不改变已冻结 Milestone 编号；M3 最终路线固定后不允许重新排列 Milestone
- [ ] M3.6 Dealer Center Architecture：冻结 Dealer Entity、Dealer Type、区域关系、招商流程、Lead 分配、CRM 流转、权限边界和生命周期
- [ ] M3.7 Analytics Architecture：冻结 Lead Attribution、Source、UTM、SEO Attribution、Dealer Attribution、Conversion Event 和 CN First 分析边界
- [ ] M3.8 Security / Permission Architecture：冻结 RBAC 复核、Resource / Action / Permission、Audit、隐私、导出、高风险动作和运行时安全边界
- [ ] M3.9 Platform Freeze Review：复核 Platform Module Registry、模块边界、ADR、Runtime 边界、文档漂移和 M4 Readiness
- [ ] M4 Platform Runtime：统一实现 Prisma、Migration、Database、RBAC、CMS、Media、Lead、SEO Runtime、API 和 Admin UI
- [x] 建立 `docs/adr/README.md` 与 ADR-0001：记录 M2 冻结和 M3 平台迁移决定
- [x] 建立 ADR-0008 与 `docs/DATABASE.md`：冻结 M3.0 Database Model，不直接写数据库代码
- [x] 建立 ADR-0009 与 `docs/AUTH_SYSTEM.md`：冻结 M3.1 Authentication & Authorization，不直接写登录或后台代码
- [x] 建立 ADR-0007 与 `docs/CMS_SYSTEM.md`：冻结 M3.2 CMS Architecture，不直接写 CMS 页面或 CRUD
- [x] 建立 ADR-0010、`docs/MEDIA_SYSTEM.md` 与 `docs/PLATFORM_ARCHITECTURE.md`：冻结 M3.3 Media Domain，并补齐平台能力总览
- [x] 建立 ADR-0011 与 `docs/LEAD_CENTER.md`：冻结 M3.4 Lead Center Architecture，不直接写表单提交、CRM 后台、ORM、迁移、通知、导出或 Admin UI
- [x] 建立 ADR-0012 与 `docs/PLATFORM_ASSETS.md`：冻结 M3.5 Platform Assets Architecture，不直接写 API、Database Migration、后台、CMS、Runtime 或 M4 实现
- [x] 建立 `docs/MILESTONE_MAPPING.md`：保留 M2.6-M2.8 历史编号并映射至 M3
- [x] 固化 Platform Module Intake Gate：后续所有 Platform Module 先判断 Platform Capability、Platform Module 归属和是否纳入 `docs/PLATFORM_ARCHITECTURE.md` 统一管理，避免模块重复定义和文档漂移

## M2.4.5.3 Product Detail

- [x] M2.4.5.3.1 Product Detail Template：建立 `ProductDetailRenderer`，统一接收 Product Entity 并输出内容区块、FAQ 与内部链接
- [x] M2.4.5.3.2 Metadata / Schema Integration：统一 Detail URL、Metadata、Breadcrumb、Product Schema 与 FAQ Schema Builder，并加入发布门禁
- [x] M2.4.5.3.3 Product Publishing Validation Framework：建立发布检查清单和后续 CMS 状态机，不将状态字段变更视为发布完成
- [x] M2.4.5.3.4 Product Content Readiness：建立 `docs/PRODUCT_CONTENT_READINESS.md` 资料包标准，并完成首个候选资料包的审核框架
- [ ] M2.4.5.3.5 First Published Product Acceptance：以 L60 完成 Entity、内容、Metadata、Schema、Canonical、Open Graph、FAQ、Breadcrumb、Internal Link、sitemap、robots、Search Console 与 Index Check 的正式发布验收
- [x] 建立 `docs/PRODUCT_PUBLISHING_CHECKLIST.md`：发布前完成 Entity、内容、图片、SEO/GEO、sitemap、robots 与上线后 Search Console 验收

## M0.1 Repository Governance Fix

- [x] 新增 `.github/pull_request_template.md`
- [x] 升级 `.ai/AI_PROJECT_OPERATING_SYSTEM.md` 到 V1.1
- [x] 新增 `docs/GIT_WORKFLOW.md`
- [x] 新增 `docs/REPOSITORY_MAINTENANCE.md`
- [x] 新增 `docs/ISSUE_WORKFLOW.md`
- [x] 删除根目录 `PROJECT_PRD.md`
- [x] 删除根目录 `ROADMAP.md`
- [x] 删除根目录 `TODO.md`
- [x] 删除重复的 `docs/CHANGELOG.md`
- [x] 明确根目录只保留 `README.md` 与 `CHANGELOG.md` 作为入口和发布记录
- [x] 更新 GitHub Actions 文档检查规则

## M1 Website Foundation

- [x] 用户确认进入 M1
- [x] M1.0 Website Architecture Definition：建立 `docs/WEBSITE_ARCHITECTURE.md`
- [x] M1.1 SEO/GEO Website Blueprint：建立 `docs/WEBSITE_SEO_BLUEPRINT.md`
- [x] 初始化 Next.js 技术底座
- [x] 建立 TypeScript 配置
- [x] 建立 TailwindCSS 配置
- [x] 在文档中规划 SEO/GEO 基础，不提前实现业务路由
- [x] 规划 CMS 与内容结构
- [x] 规划组件系统
- [x] M1.3 Content Foundation：建立 `docs/CONTENT_SYSTEM.md`
- [x] M1.4 Website Governance Check：增加 URL 规范、SEO 字段、图片命名、Markdown 规范和文档同步检查
- [x] 明确加盟合作为 `LABOR-SAVING 渠道增长中心`，主 URL 为 `/partner/`
- [x] 明确 M2 前不制作完整业务页面
- [x] M1.2 技术骨架仅保留 `app/`、`components/`、`public/`、`styles/` 等基础目录
- [x] 执行 M1 Repository Audit，更新 `REPOSITORY_AUDIT_REPORT.md`
- [x] 修正 `PROJECT_STRUCTURE.md` 中 website 骨架目录漂移

## M1.5 Channel Growth Strategy Layer

- [x] 升级 `.ai/AI_PROJECT_OPERATING_SYSTEM.md` 到 V1.2
- [x] 将 `docs/WEBSITE_ARCHITECTURE.md`、`docs/WEBSITE_SEO_BLUEPRINT.md`、`docs/CONTENT_SYSTEM.md` 纳入 AI 必读文档
- [x] 将 `docs/PARTNER.md`、`docs/CRM.md` 纳入 AI 必读文档
- [x] 新增 `docs/M2_STRATEGY.md`
- [x] 新增 `docs/PARTNER_FUNNEL.md`
- [x] 新增 `docs/LEAD_SCHEMA.md`
- [x] 确认 Website Traffic Weight：Partner 35%、Product 25%、Industry 20%、Content 10%、Trust 10%
- [x] 确认 M2 调整为 Channel Growth Foundation，不直接进入普通 Website Development
- [x] 执行 M1.5 Repository Audit，更新 `REPOSITORY_AUDIT_REPORT.md`

## 暂不执行

- [x] 不创建产品详情、行业方案、招商合作等业务页面
- [x] 不提前实现 `robots.txt`、`sitemap.xml`、`llms.txt` 等 SEO/GEO 路由
- [x] 不生成未经确认的产品参数、案例、收益或政策内容
- [x] 不创建 `application`、`domain`、`infrastructure`、`features` 等提前抽象目录

## M2 Channel Growth Foundation

- [x] 启动 M2 前确认优先路径：Channel Growth Foundation
- [x] 评估并完成 `.ai/AI_PROJECT_OPERATING_SYSTEM.md` V1.2，纳入 M1/M1.5 新增文档清单
- [x] M2.0 Partner Funnel Architecture
- [x] M2.1 Lead Capture Schema
- [x] M2.0 Page Strategy Definition：新增 `docs/PAGE_SYSTEM.md`
- [x] M2.1 Metadata System：新增 `docs/METADATA_SCHEMA.md`
- [x] M2.2 SEO Schema Layer：新增 `docs/SEO_SCHEMA_LAYER.md`
- [x] M2.3 Partner Page Development：新增 `/partner/`
- [x] M2.3.1 Partner System Hardening：更新 `docs/PARTNER.md`，新增 `docs/PARTNER_CONTENT_MODEL.md` 与 `docs/PARTNER_SEO_TEMPLATE.md`
- [x] 执行 M2 Repository Audit，更新 `REPOSITORY_AUDIT_REPORT.md`
- [x] M2.4 Product System Foundation：新增 `docs/ENTITY_SYSTEM.md` 与 Product Foundation 文档
- [x] M2.4.0 Product Entity：新增 `docs/PRODUCT_SYSTEM.md`
- [x] M2.4.1 Product Content Model：新增 `docs/PRODUCT_CONTENT_MODEL.md`
- [x] M2.4.2 Product Metadata：补齐 `docs/PRODUCT_SEO_TEMPLATE.md` 与 Metadata 来源
- [x] M2.4.3 Product Schema：新增 `docs/PRODUCT_SCHEMA.md`
- [x] M2.4.4 Product CMS Model：完成文档边界定义，后台开发后置
- [x] 执行 M2.4 Repository Audit，更新 `REPOSITORY_AUDIT_REPORT.md` 并修复治理入口漂移
- [x] 执行 M2.4.5.2 Repository Audit：同步审计报告，并将 Product Rendering 校验加入 CI
- [ ] M2.4.5 Product Rendering Layer：已批准进入；以模板验证为目标，逐层验收 Metadata、JSON-LD、Breadcrumb、FAQ、Internal Link、Canonical、Open Graph 与 SEO/GEO
- [x] M2.4.5.1 Product Listing：完成 `/products/` Entity-driven 模板、Metadata、Canonical、Open Graph、Breadcrumb、CollectionPage、FAQPage 与内链验证
- [x] M2.4.5.2 Product Category：完成 `/products/[categorySlug]/` Entity 自动过滤、Metadata、Canonical、Open Graph、Breadcrumb、CollectionPage、FAQ 与计数验证
- [ ] M2.4.5.3 Product Detail：待完成首个已发布实体与 SEO/GEO 验证；LS70 不得正式收录
- [ ] M2.4.5.4 Related Product：通过 Entity ID 建立产品关联与 Topic Cluster 渲染
- [ ] M2.5 Industry Page Development：开发 `/applications/`
- [ ] M2.6 Lead Capture Integration：历史规划，已映射至 M3.4 Lead Center 与 M3.9 Deployment & Analytics
- [ ] M2.7 Admin Maintainability：历史规划，已映射至 M3.1、M3.2 与 M3.3
- [ ] M2.8 Batch Export：历史规划，已映射至 M3.7 Audit Center 与 M3.8 Backup & Restore
- [ ] M2 Website Page Development 后续页面扩展
- [ ] 规划线索表单字段
- [ ] 规划输入校验与风控
- [ ] 规划 CRM 字段映射
- [ ] 规划线索来源追踪
