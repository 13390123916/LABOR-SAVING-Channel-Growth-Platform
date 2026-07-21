# Memory

## M3 Website Platform Foundation 决策

- 2026-07-21 冻结 M2 Channel Growth Foundation v1.0：Entity、Product、Metadata、SEO Schema、Product Rendering 与 Publishing Workflow 后续复用，不再新增治理规则或 Publishing 子阶段，除非发现架构缺陷或严重 Bug。
- 通过 `docs/MILESTONE_MAPPING.md` 保留 M2.6 Lead Capture、M2.7 Admin、M2.8 Batch Export 历史编号，并映射到 M3 Website Platform Foundation。
- 建立 `docs/adr/README.md`，ADR-0001 记录 M2 冻结与 M3 迁移决定。后续 ADR 仅在 M3 技术选型需要具体决策时创建。
- 2026-07-21 完成 M3.0 Database Architecture 设计冻结：新增 ADR-0008 Database Model，主业务数据库采用 MySQL，数据库实现前先冻结 Entity、Category、Product、Industry、Partner、Lead、Media、Article、FAQ、Download、Navigation、SEO Metadata、Schema Metadata、Tag、Redirect 和 Audit Log；采用内部自增 ID 加稳定 `entity_id`，不默认 UUID；公开内容默认软删除，保留 `version`、`locale`、`created_at`、`updated_at`、`published_at`、`created_by`、`updated_by`、`published_by` 等字段。
- 2026-07-21 完成 M3.1 Authentication & Authorization 架构冻结：新增 `docs/AUTH_SYSTEM.md` 与 ADR-0009，首期后台采用服务端 Session，不采用纯 JWT 作为 Admin 默认登录态；权限采用 RBAC，统一 User、Role、Permission、Resource、UserRole、RolePermission；首期角色为 Super Admin、Admin、Editor、SEO、Sales、Partner Manager；后台资源统一为 Product、Industry、Article、Partner、Lead、Media、Download、FAQ、Navigation、SEO Metadata、Schema Metadata、Redirect、Setting、User、Role、Permission、Audit Log、Search Runtime；写操作和高风险动作必须进入 Audit Log。
- 2026-07-21 完成 M3.2 CMS Architecture 架构冻结：新增 `docs/CMS_SYSTEM.md` 与 ADR-0007，CMS 采用 Entity-first 内容管理模型，首期 Resource 为 Product、Industry、Article、Partner、FAQ、Download、Navigation、SEO Metadata、Schema Metadata、Redirect、Setting；CMS 只做内容管理，不吞并 Media Management、Lead Center、SEO Runtime、GEO Runtime、Audit Center、Backup & Restore；工作流沿用 Draft -> Internal Review -> Content Approved -> SEO Approved -> Release Approved -> Published -> Indexed -> Archived；后续 M3 拆分为 M3.3 Media Management、M3.4 Lead Center、M3.5 Platform Assets、M3.6 SEO Runtime、M3.7 GEO Runtime、M3.8 Audit Center / Backup & Restore、M3.9 Deployment & Analytics。
- 2026-07-21 完成 M3.3 Media Management Architecture 架构冻结：新增 `docs/PLATFORM_ARCHITECTURE.md`、`docs/MEDIA_SYSTEM.md` 与 ADR-0010。平台能力总览明确 Database -> Authentication -> CMS -> Media -> Lead Center -> SEO Runtime -> GEO Runtime -> Audit -> Backup -> Deployment & Analytics 的模块关系；Media Domain 不等同于文件上传，先冻结 Media Entity、Media Metadata、Asset 生命周期、图片版本、ALT 来源、WebP / AVIF 预留、Thumbnail Strategy、Storage Adapter、CDN Boundary、Watermark Strategy 和引用关系；本阶段未创建上传接口、图库 UI、ORM、迁移、裁切转码、CDN 接入或后台页面。
- 2026-07-21 完成 M3.4 Lead Center Architecture 架构冻结：新增 `docs/LEAD_CENTER.md` 与 ADR-0011。确认 `docs/PLATFORM_ARCHITECTURE.md` 是整个 Platform 的结构入口，阅读顺序为 README -> Platform Architecture -> Roadmap -> ADR；ADR 只记录重大平台方向决策，不为字段微调、上传策略、导出格式或列表筛选单独创建。Lead Domain 覆盖 Lead Entity、Lead Type、字段分层、来源归因、生命周期、分配、去重、隐私、导出边界、CRM 输入、权限和审计；M3.5 已确定为 Platform Assets Architecture Freeze，M3.6-M3.9 继续做架构冻结，Prisma、Migration、Database、RBAC、CMS、Media、Lead、Platform Assets、SEO Runtime、API 和 Admin UI 统一进入 M4 Platform Runtime。
- 2026-07-21 完成 M3.5 Platform Assets Architecture 架构冻结：新增 `docs/PLATFORM_ASSETS.md` 与 ADR-0012。确认当前 Repository 只服务中国大陆 `.cn`，国际 `.com` 未来独立建设，不实现国际化、多语言或 i18n；Platform Assets 属于 Platform Layer，不是 CMS Content、Lead Data、Dealer Data 或 Runtime。首期覆盖 Company Profile、Brand Assets、Social Media Hub、Download Center、Friend Links、Contact Center 和 System Settings；M3.5 不新增 API、Database Migration、后台、CMS、Runtime 或 M4 实现，M3.6-M3.9 继续架构冻结。
- 2026-07-22 固化 Platform Module Intake Gate：`docs/PLATFORM_ARCHITECTURE.md` 是整个仓库唯一的平台结构入口和 Single Source of Truth。后续所有 Platform Module 必须先判断是否属于 Platform Capability、应归属哪个 Platform Module、是否纳入 Platform Architecture 统一管理，再更新专项文档或进入实现，避免模块重复定义和文档漂移。
- 2026-07-22 优化 M3 后半段路线：保留已冻结的 M3.0-M3.5 历史编号，不返工；M3 Governance Enhancement 视为治理增强而非独立 Milestone。后续正式调整为 M3.6 Dealer Center、M3.7 Analytics、M3.8 Security / Permission、M3.9 Platform Freeze Review。Dealer 是渠道招商核心对象，决定招商流程、Lead 分配、区域管理、一地一代策略、权限边界和 CRM 流转，必须先于 Analytics 冻结；Platform Module Registry 放入 M3.9 收尾复核。
- 2026-07-22 固定 M3 最终路线并补充 Governance Note：Website -> Content -> SEO / GEO -> CMS -> Lead -> Platform Assets -> Dealer Center -> Analytics -> Security / Permission -> Platform Freeze Review -> M4 Platform Runtime。M3 Governance Enhancement 属于治理演进，不是新的 Platform Capability，不改变已冻结 Milestone 编号；后续只允许增加 Governance，不允许重新排列 Milestone。M4 统一命名为 Platform Runtime，不拆为 CMS Runtime 或 Website Runtime。
- 2026-07-22 固化 Platform Evolution Principle 与 Platform Stability Rules：平台采用 Freeze First, Runtime Later。M3 冻结 Platform Capability、Architecture Boundary、Governance 和 Documentation；M4 负责 Runtime Implementation，不重新讨论已冻结架构设计。已冻结 Platform Module 如需调整，仅允许通过 ADR 进行重大架构决策，不因 Runtime 实现细节修改 M3 Architecture Freeze。稳定性规则包括 Runtime Follows Architecture 与 No Runtime-Driven Architecture Changes。M4 统一使用 `M4 — Platform Runtime`，不使用 CMS Runtime、Website Runtime、Runtime Development 或 Platform Development 作为阶段名。

## M2.4.5.3 Product Detail 决策

- 2026-07-21 进入 M2.4.5.3 Product Detail：先建立 `ProductDetailRenderer` 与统一 Detail Metadata/Schema 链路，不创建 LS70 页面。发布门禁现为 `detailStatus = published`、`schemaEligible = true`、`contentValidated = true`、`releaseApproved = true`；只有同时满足时才生成详情 URL、Product Schema、sitemap 和 Related Product。当前四个实体均未通过门禁，因此静态详情路由数为 0；首个正式产品只可从 LS40、L60、SQ35、SQ50 的资料完整实体中选择。
- 2026-07-21 进入 M2.4.5.3.3 First Published Product Validation：新增 `docs/PRODUCT_PUBLISHING_CHECKLIST.md`。首个产品发布需完成 Entity、内容、图片、Metadata、Schema、FAQ、内部链接、sitemap、robots 与上线后 Search Console 验收；不将“修改 published 状态”视为发布完成。后续 CMS 状态机规划为 Draft -> Internal Review -> Content Approved -> SEO Approved -> Published -> Indexed -> Archived。
- 2026-07-21 通过 M2.4.5.3.3 Product Publishing Validation Framework，进入 `docs/PRODUCT_CONTENT_READINESS.md` 定义的 M2.4.5.3.4 Product Content Readiness。首个候选为 `PRD-0002` L60 气动助力机械臂；技术参数仅作为 Internal Review 资料，不改变 `planned` 状态，不生成页面、Schema、sitemap 或索引。阻塞项为公开范围确认、产品图片授权、ALT、Open Graph 资产和内部内容审核。
- 2026-07-21 通过 M2.4.5.3.4 Product Content Readiness 阶段框架，进入 M2.4.5.3.5 First Published Product Acceptance。新增 `releaseApproved`，使发布链路为 `contentValidated -> releaseApproved -> published`，同时保留 `schemaEligible` 的 SEO 审核职责。L60 仍未获得真实图片、公开范围、市场上线批准、sitemap/robots 和外部收录证据，所有发布字段保持关闭。

## 已确认定位

LABOR-SAVING Channel Growth Platform 是工业装备渠道增长平台，不是普通企业官网。

## 商业优先级

1. 加盟合作
2. 终端客户询盘
3. 品牌建设

## 目标客户

- 液压扭矩扳手代理商
- 液压拉伸器代理商
- 工业工具代理商
- 自动化集成商
- 工业机器人集成商
- MRO
- 设备贸易商
- 终端制造企业

## 当前产品

- LS40 助力机械臂
- L60 助力机械臂
- SQ35 气动平衡器
- SQ50 气动平衡器

## 技术决策

- Next.js
- TypeScript
- TailwindCSS
- Node.js
- MySQL
- Docker
- GitHub Actions

## 当前阶段

M2 Channel Growth Foundation 已冻结为 v1.0。已完成 Page System、Metadata System、SEO Schema Layer、Partner Page v1、Partner System Hardening 和 Product System Foundation；M2.4.5.3.5 保留为首个产品跨阶段发布验收质量门禁，平台运行能力进入 M3。

## 文档职责决策

- 根目录保留 `README.md` 和 `CHANGELOG.md`。
- 项目详细文档统一维护在 `docs/`。
- `.ai/AI_PROJECT_OPERATING_SYSTEM.md` V1.1 是唯一最高 AI 协作规则。
- `CODEX_SYSTEM_PROMPT.md` 只作为 Codex 启动辅助。

## M0.1 治理决策

- 必须存在 `.github/pull_request_template.md`。
- 必须存在 `docs/GIT_WORKFLOW.md`。
- 必须存在 `docs/ISSUE_WORKFLOW.md`。
- 必须存在 `docs/REPOSITORY_MAINTENANCE.md`。
- M0.1 不提前创建 `application`、`domain`、`infrastructure`、`features` 等目录。

## M1 Website Foundation 决策

- `website/` 采用独立 Next.js App Router 工程。
- 使用 TypeScript 严格模式、TailwindCSS 和 ESLint。
- M1.2 只保留 `README.md`、`.gitignore`、`package.json`、`next.config.ts`、`app/`、`components/`、`public/`、`styles/` 技术骨架。
- 首页仅作为技术骨架入口，不创建产品详情、行业方案、招商合作、SEO/GEO 路由等业务页面。
- 内容结构与组件系统先通过文档定义，不提前创建无业务支撑的 `config/`、`lib/`、`application`、`domain`、`infrastructure`、`features` 等目录。
- M1.0 建立 `docs/WEBSITE_ARCHITECTURE.md`，官网导航权重为：加盟合作、产品中心最高，行业应用、解决方案次之，知识中心作为 SEO/GEO 内容沉淀。
- M1.1 建立 `docs/WEBSITE_SEO_BLUEPRINT.md`，加盟合作主 URL 采用 `/partner/`，`/distributor/` 与 `/join/` 只作为兼容路径或投放路径。
- M1.3 建立 `docs/CONTENT_SYSTEM.md`，定义产品文章、行业文章、案例文章、技术 FAQ、招商内容和 AI 搜索回答内容规则。
- M1.4 建立 `scripts/validate-website-governance.mjs`，CI 检查 URL 规范、SEO 字段、图片命名、Markdown 规范和文档同步。
- 加盟合作页面定位为 `LABOR-SAVING 渠道增长中心`，不是普通招商页面。
- 加盟合作页后续 CRM 留资字段为：公司名称、所在地区、主营产品、客户行业、销售团队规模、已有渠道资源。

## M1 Repository Audit 决策

- 2026-07-21 执行 M1 Repository Audit，更新 `REPOSITORY_AUDIT_REPORT.md`。
- 审计结论：AI Governance、Website Architecture、SEO/GEO Strategy、Website Technical Skeleton、Content System 均通过。
- 审计修复：`PROJECT_STRUCTURE.md` 移除过期的 `website/config/` 与 `website/lib/`，改为 M1.2 真实骨架。
- 后续建议：启动 M2 前确认优先做 Website Development 还是 Lead Capture Foundation。
- 后续建议：将 `.ai/AI_PROJECT_OPERATING_SYSTEM.md` 升级到 V1.2 时，纳入 `docs/WEBSITE_ARCHITECTURE.md`、`docs/WEBSITE_SEO_BLUEPRINT.md`、`docs/CONTENT_SYSTEM.md`。

## M1.5 Channel Growth Strategy 决策

- `.ai/AI_PROJECT_OPERATING_SYSTEM.md` 已升级到 V1.2。
- AI 后续页面、内容、SEO/GEO、Partner、CRM 任务必须读取 `docs/WEBSITE_ARCHITECTURE.md`、`docs/WEBSITE_SEO_BLUEPRINT.md`、`docs/CONTENT_SYSTEM.md`、`docs/PARTNER.md`、`docs/CRM.md`、`docs/M2_STRATEGY.md`、`docs/PARTNER_FUNNEL.md`、`docs/LEAD_SCHEMA.md`。
- 网站定义为工业智能装备渠道增长入口，不是普通产品展示官网。
- Website Traffic Weight：加盟合作 Partner 35%、产品 Product 25%、行业应用 Industry 20%、知识中心 Content 10%、品牌 Trust 10%。
- M2 调整为 `M2 Channel Growth Foundation`。
- 当时 M2 顺序暂定为：M2.0 Partner Funnel Architecture、M2.1 Lead Capture Schema、M2.2 Website Page Development；该顺序已在 M2 Channel Growth Foundation 中更新为 Page System、Metadata System、SEO Schema Layer、Partner Page、Product System Foundation、Product Page、Industry Page、Lead Capture Integration、Admin Maintainability、Batch Export。

## M1.5 Repository Audit 决策

- 2026-07-21 执行 M1.5 Repository Audit，更新 `REPOSITORY_AUDIT_REPORT.md`。
- 审计结论：M1.5 已完成 Channel Growth Strategy、Partner Funnel、Lead Schema 与 CI Governance。
- 当前总体评分：97 / 100。
- M2.0 Partner Funnel Architecture 与 M2.1 Lead Capture Schema 已通过文档层完成；该结论已作为 M2 Page System、Metadata System 与 SEO Schema Layer 的输入。

## M2 Channel Growth Foundation 决策

- 新增 `docs/PAGE_SYSTEM.md`，作为页面开发最高输入标准，要求每个页面先定义页面目标、用户角色、SEO关键词、转化目标、CTA、内部链接、Schema 和 Lead入口。
- 新增 `docs/METADATA_SCHEMA.md`，统一 title、description、keywords、canonical、og、schema 和 breadcrumb，避免每个页面自行编写 SEO。
- 新增 `docs/SEO_SCHEMA_LAYER.md`，定义 Organization、Product、Article、FAQPage、BreadcrumbList、WebPage、ContactPoint 与后台维护、数据库预留、批量导出边界。
- M2 页面开发顺序调整为：SEO Schema Layer 后再进入 `/partner/`、`/products/`、`/applications/`、`/knowledge/`。
- 已开发 `/partner/`，页面定位为 `LABOR-SAVING 渠道增长中心`，主要 CTA 为“申请成为区域合作伙伴”，Lead 入口为 Partner Lead。
- `/partner/` 当前只完成前端页面和表单入口，不接入 CRM 后端；Lead Capture Integration 进入 M2.6。
- `website/app/site-metadata.ts` 作为当前 Next.js 页面统一 metadata 来源。
- `website/app/site-schema.ts` 作为当前 Next.js 页面统一 Schema JSON-LD 构建来源。
- 已完成 Partner System Hardening：`docs/PARTNER.md` 定义 Partner Program Entity 到 CRM/CMS/Export 的长期架构，`docs/PARTNER_CONTENT_MODEL.md` 定义 PartnerTemplate，`docs/PARTNER_SEO_TEMPLATE.md` 定义 Partner SEO/GEO、Schema 与 Topic Cluster。
- 2026-07-21 执行 M2 Repository Audit，更新 `REPOSITORY_AUDIT_REPORT.md`，审计结论为 M2 Channel Growth Foundation 当前通过；该建议已被后续决策细化为先完成 Product System Foundation，再进入 M2.4.5 Product Rendering Layer。
- 2026-07-21 完成 M2.4 Product System Foundation：新增 `docs/ENTITY_SYSTEM.md`、`docs/PRODUCT_SYSTEM.md`、`docs/PRODUCT_CONTENT_MODEL.md`、`docs/PRODUCT_SCHEMA.md`、`docs/PRODUCT_SEO_TEMPLATE.md`。确认所有长期模块按 Entity -> Metadata -> Schema -> CMS -> Frontend -> SEO -> GEO 统一建模，数据库设计后置，下一阶段命名为 M2.4.5 Product Rendering Layer。
- 2026-07-21 执行 M2.4 Repository Audit：确认远程分支与 `9a551d8` 同步，修复 `PROJECT_STRUCTURE.md` 的旧页面开发顺序、AI 必读文档清单、CI 显式文档清单和产品 URL 规范漂移。LS70 仅作为 M2.4.5 产品详情验证占位，实体与资料确认前不得发布。
- 2026-07-21 正式批准进入 M2.4.5 Product Rendering Layer：不以页面数量为目标，按 Product Listing、Product Category、首个真实 Product Detail、Related Product 逐层验证。建立 Entity ID 规范，当前产品编号为 `PRD-0001` LS40、`PRD-0002` L60、`PRD-0003` SQ35、`PRD-0004` SQ50；CMS、CRM、Analytics、Database 和实体关系后续均关联 Entity ID。LS70 未确认前继续保持非收录占位。
- 2026-07-21 完成 M2.4.5.1 Product Listing：新增 `/products/`、Product Entity JSON 数据源、自动分类、统一 ProductCard、Product Listing Metadata 与 Schema Builder。页面模板不硬编码产品，未发布 Entity 不生成详情链接或 Product Schema；下一阶段为 M2.4.5.2 Product Category。
- 2026-07-21 完成 M2.4.5.2 Product Category：新增 `/products/[categorySlug]/` 动态静态生成模板，分类参数、Entity 过滤、Metadata、Canonical、Open Graph、Breadcrumb、CollectionPage 和 FAQ 均来自统一数据与 Builder。CI 自动验证 Entity Count 4、Listing Count 4、Category Total 4、Category Routes 2。Entity Version 字段 `version`、`status`、`published_at`、`updated_at` 已冻结语义，暂不实现 CMS 或数据库版本逻辑。
- 2026-07-21 执行 M2.4.5.2 Repository Audit：治理、产品渲染、TypeScript、ESLint 和生产构建均通过。审计发现 CI 未直接执行产品渲染校验，现已补入 `.github/workflows/ci.yml`；产品实体计数与分类路由约束将随每次 CI 运行验证。下一步仍为首个资料已确认的真实 Product Detail。
