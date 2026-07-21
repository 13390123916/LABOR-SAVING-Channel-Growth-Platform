# Changelog

## [0.3.7] - 2026-07-21

### Added

- 新增 `docs/PLATFORM_ASSETS.md`，冻结 M3.5 Platform Assets Architecture 的 Company Profile、Brand Assets、Social Media Hub、Download Center、Friend Links、Contact Center 和 System Settings。
- 新增 ADR-0012 Platform Assets Architecture，确认 Platform Assets 属于 Platform Layer，不是 CMS Content、Lead Data、Dealer Data 或 Runtime。

### Changed

- 明确当前 Repository 只服务中国大陆 `.cn`；国际 `.com` 未来独立建设，不在当前 Repository 内实现国际化、多语言或 i18n。
- 将 M3.5 从 SEO Runtime 调整为 Platform Assets Architecture Freeze，SEO Runtime 顺延至 M3.6，继续保持 M4 前不进入 Runtime。
- 同步更新 Platform Architecture、Roadmap、TODO、Memory、PRD、README、Project Structure、ADR Index 与治理校验清单。

## [0.3.6] - 2026-07-21

### Added

- 新增 `docs/LEAD_CENTER.md`，冻结 M3.4 Lead Center Architecture 的 Lead Entity、Lead Type、字段分层、来源归因、生命周期、分配、去重、隐私、导出边界、CRM 输入、权限和审计。
- 新增 ADR-0011 Lead Center Architecture，确认 Lead 是业务数据入口，不是普通表单记录。

### Changed

- 将 `docs/PLATFORM_ARCHITECTURE.md` 提升为 Platform 结构入口，明确 README -> Platform Architecture -> Roadmap -> ADR 的阅读顺序。
- 明确 ADR 只记录重大平台方向决策，不为字段微调、上传策略、导出格式或列表筛选单独创建 ADR。
- 将后续 M3 阶段继续定位为架构冻结阶段，真正运行时代码统一进入 M4 Platform Runtime。
- 同步更新 Roadmap、TODO、Memory、PRD、README、Project Structure、AI Context、ADR Index 与治理校验清单。

## [0.3.5] - 2026-07-21

### Added

- 新增 `docs/PLATFORM_ARCHITECTURE.md`，提供 M3 平台模块关系、模块职责、模块依赖、生命周期和阶段边界总览。
- 新增 `docs/MEDIA_SYSTEM.md`，冻结 M3.3 Media Management Architecture 的 Media Entity、Media Metadata、Asset 生命周期、图片版本、ALT 来源、WebP / AVIF 预留、Thumbnail Strategy、Storage Adapter、CDN Boundary、Watermark Strategy 和引用关系。
- 新增 ADR-0010 Media Management Architecture，确认 M3.3 先冻结 Media Domain，不直接写文件上传。

### Changed

- 将 M3.3 拆分为 Media Management Architecture 与后续 Media Runtime，避免把媒体管理简化为上传功能。
- 同步更新 Roadmap、TODO、Memory、PRD、README、Project Structure、ADR Index 与治理校验清单。

## [0.3.4] - 2026-07-21

### Added

- 新增 `docs/CMS_SYSTEM.md`，冻结 M3.2 CMS Architecture 的 CMS Resource、Content Type、Field Group、Workflow、Permission Integration、Audit Integration、Import / Export 和 Future Platform Split。
- 新增 ADR-0007 CMS Architecture，确认 CMS 采用 Entity-first 内容管理模型，并复用 Database、Auth、Metadata、Schema 与 Publishing Workflow。

### Changed

- 将 M3.2 定位为 CMS 架构冻结阶段，不直接创建 CMS 页面、CRUD、富文本、ORM、迁移、文件上传或后台 UI。
- 将后续 M3 平台能力拆分为 Media Management、Lead Center、SEO Runtime、GEO Runtime、Audit Center、Backup & Restore、Deployment & Analytics。
- 同步更新 Roadmap、TODO、Memory、PRD、README、Milestone Mapping 与治理校验清单。

## [0.3.3] - 2026-07-21

### Added

- 新增 `docs/AUTH_SYSTEM.md`，冻结 M3.1 Authentication & Authorization 的 Authentication、Authorization、RBAC、Permission、Role、Resource、Audit、Login Flow、Session 和 Future SSO。
- 新增 ADR-0009 Authentication & Authorization，确定首期 Admin 后台采用服务端 Session，权限采用 RBAC，所有后台资源统一登记为 Resource。

### Changed

- 将 M3.1 定位为认证授权架构冻结阶段，不直接创建登录页、JWT、Session 代码、ORM、迁移或后台 UI。
- 同步更新 Roadmap、TODO、Memory、PRD、README、Repository Audit 与治理校验清单，下一步转向 M3.2 CMS Foundation。

## [0.3.2] - 2026-07-21

### Added

- 新增 ADR-0008 Database Model，冻结 M3.0 Database Architecture 的数据库选择、Entity 与业务表关系、ID、slug、软删除、版本、多语言和审计字段策略。
- 重写 `docs/DATABASE.md` 为 M3.0 数据库架构蓝图，覆盖 Entity、Category、Product、Industry、Partner、Lead、Media、Article、FAQ、Download、Navigation、SEO Metadata、Schema Metadata、Tag、Redirect 和 Audit Log。

### Changed

- 将 M3.0 定位为数据库设计冻结阶段，不直接创建迁移、ORM、CMS CRUD 或运行时代码。
- 同步更新 Roadmap、TODO、Memory、PRD、README、Repository Audit 与治理校验清单，下一步转向 M3.1 Authentication & Authorization。

## [0.3.1] - 2026-07-21

### Changed

- 执行 M3 Repository Audit，修正 AI Context、README、PRD、Project Structure、Product System、Roadmap 和 Memory 中遗留的 M2 当前阶段、CMS M2.7 与 M2.6-M2.8 直连表述。
- 明确 M2.4.5.3.5 是跨阶段的首个产品发布验收质量门禁，而不是继续扩展 M2 治理。

## [0.3.0] - 2026-07-21

### Added

- 新增 `docs/MILESTONE_MAPPING.md`，冻结 M2 并映射未执行的 M2.6-M2.8 规划到 M3。
- 新增 `docs/adr/README.md` 与 ADR-0001，记录 M2 冻结和 M3 Website Platform Foundation 启动决定。

### Changed

- 正式启动 M3 Website Platform Foundation，后续开发重心转向数据库、认证授权、CMS、运行平台、Search Runtime 与 Analytics/CRM。
- Entity、Product、Metadata、SEO Schema、Product Rendering 与 Publishing Workflow 冻结为 v1.0；除严重问题外不再扩展治理层。

## [0.2.10] - 2026-07-21

### Added

- 新增 `ProductDetailRenderer` 与受控的 `/products/[categorySlug]/[productSlug]/` 详情模板。
- 新增 `contentValidated` 发布门禁字段，并将 Detail URL、Product Schema、sitemap 和后续 Related Product 统一限定为 `published + schemaEligible + contentValidated`。

### Changed

- 扩展 Product Rendering 校验，覆盖详情模板、静态参数、发布门禁、Detail Metadata/Schema、FAQ 与内部链接。
- 同步更新 Product System、Product Schema、Product SEO、Roadmap、TODO、Memory 和 README 的 M2.4.5.3 执行策略。

### Notes

- 当前没有满足发布门禁的实体，因此不生成任何 Product Detail 静态路由。
- LS70 继续作为非实体验证占位，不生成详情 URL、Product Schema、sitemap 或 Related Product。

## [0.2.11] - 2026-07-21

### Added

- 新增 `docs/PRODUCT_PUBLISHING_CHECKLIST.md`，定义 M2.4.5.3.3 First Published Product Validation 的产品发布验收清单。

### Changed

- 将首个 Product Detail 的完成标准提升为真实公开发布与 SEO/GEO 验收闭环，纳入图片、sitemap、robots 与上线后 Search Console 检查。
- 记录后续 CMS 可复用的状态机：Draft -> Internal Review -> Content Approved -> SEO Approved -> Published -> Indexed -> Archived。

## [0.2.12] - 2026-07-21

### Added

- 新增 `docs/PRODUCT_CONTENT_READINESS.md`，建立 M2.4.5.3.4 Product Content Readiness 资料包标准，并录入 `PRD-0002` L60 的 Internal Review 内容草案。

### Changed

- M2.4.5.3.3 Product Publishing Validation Framework 通过后，阶段重点从代码渲染转向真实内容资产、公开范围、图片授权、ALT、Open Graph 和内部审核。

### Notes

- L60 当前仍为 `planned`，不生成公开详情页面、Product Schema、sitemap 或索引提交。

## [0.2.13] - 2026-07-21

### Added

- 新增 `releaseApproved` 发布门禁，形成 `contentValidated -> releaseApproved -> published` 的独立市场上线批准步骤。

### Changed

- 进入 M2.4.5.3.5 First Published Product Acceptance，以 L60 验证首个真实产品从 Entity、内容、Metadata、Schema、SEO/GEO 到收录的发布闭环。
- 后续 CMS 状态机扩展为 Draft -> Internal Review -> Content Approved -> SEO Approved -> Release Approved -> Published -> Indexed -> Archived。

### Notes

- L60 尚无真实图片、公开范围、市场上线批准、sitemap/robots 与外部收录证据；所有发布字段保持关闭。

本项目遵循 Semantic Versioning，并按 Milestone 记录关键变更。

## [0.0.1] - 2026-07-21

### Added

- 初始化企业级 GitHub Repository 结构。
- 建立 `.github/` 协作体系，包括 Issue Templates、CODEOWNERS 和 GitHub Actions。
- 建立 `.ai/` AI 协作操作系统，固化项目定位、执行规则、上下文、记忆和输出标准。
- 建立 `docs/` 文档体系，覆盖架构、数据库、API、SEO、GEO、CRM、Partner、内容营销与设计规范。
- 建立根目录 `README.md`、`PROJECT_PRD.md`、`ROADMAP.md`、`TODO.md`、`CONTRIBUTING.md`、`LICENSE`。
- 建立长期模块目录：`website/`、`seo/`、`geo/`、`crm/`、`partner/`、`marketing/`、`assets/`、`scripts/`、`deploy/`、`archive/`。

### Notes

- 本次为 M0 Repository Bootstrap，不包含业务页面开发。
- 后续网站、CRM、SEO/GEO 内容矩阵将在独立 Milestone 中推进。

## [0.0.2] - 2026-07-21

### Added

- 新增 `REPOSITORY_AUDIT_REPORT.md`，完成第一次仓库工程审计。
- 新增 `.github/pull_request_template.md`，固化 PR 对 SEO、GEO、商业影响、文档更新和测试结果的检查。
- 新增 `docs/GIT_WORKFLOW.md`，沉淀 Git 分支、Commit、PR 和 CI 工作流。
- 新增 `docs/REPOSITORY_MAINTENANCE.md`，沉淀长期仓库维护规则。
- 新增 `docs/ISSUE_WORKFLOW.md`，沉淀 Issue 到 TODO、开发、验证和发布的流程。

### Changed

- 升级 `.ai/AI_PROJECT_OPERATING_SYSTEM.md` 到 V1.1，使其成为唯一最高 AI 协作规则。
- 重新划分文档职责：根目录保留 `README.md` 和 `CHANGELOG.md`，详细项目文档统一维护在 `docs/`。
- 更新 GitHub Actions 的关键文件检查规则。

### Removed

- 删除根目录 `PROJECT_PRD.md`、`ROADMAP.md`、`TODO.md`，避免与 `docs/` 版本双维护。
- 删除 `docs/CHANGELOG.md`，保留根目录 `CHANGELOG.md` 作为唯一变更记录。

### Notes

- 本次为 M0.1 Repository Governance Fix，不开发网站功能，不创建业务代码。

## [0.1.0] - 2026-07-21

### Added

- 初始化 `website/` Next.js App Router 技术底座。
- 建立 TypeScript 严格模式、TailwindCSS、ESLint 与 npm scripts。
- 建立基础首页技术骨架入口。
- 建立 `app/`、`components/`、`public/`、`styles/` 技术骨架。
- 建立 `docs/WEBSITE_ARCHITECTURE.md`，定义官网信息架构、导航权重和加盟合作页面结构。
- 建立 `docs/WEBSITE_SEO_BLUEPRINT.md`，定义 URL 规则、页面 SEO 字段标准和 GEO 优化规则。
- 建立 `docs/CONTENT_SYSTEM.md`，定义产品文章、行业文章、案例文章、技术 FAQ、招商内容和 AI 搜索回答内容规则。
- 建立 `scripts/validate-website-governance.mjs`，检查 URL 规范、SEO 字段完整性、图片命名、Markdown 规范和文档同步。

### Changed

- 更新 `website/.gitignore`，允许提交 `.env.example`，并继续忽略 Next.js 生成类型入口。
- 更新 CI，加入 website 的 install、typecheck、lint 和 build 校验。
- 更新 CI，加入 M1 website governance 校验。
- 将加盟合作定义为 `LABOR-SAVING 渠道增长中心`，主 URL 规划为 `/partner/`。
- 将 website 首页收敛为 M1 技术骨架入口，不制作完整业务页面。
- 收回 M1 阶段多余的 `config/`、`lib/` 和 SEO/GEO 路由实现，保持 M1.2 仅为技术骨架。
- 同步更新 README、ROADMAP、TODO、MEMORY 与 PRD 当前阶段。

### Notes

- 本次为 M1 Website Foundation，不创建产品详情、行业方案、招商合作等业务页面。
- 本次只在文档中定义 SEO/GEO 蓝图，不提前实现完整 SEO/GEO 路由。
- 本次不编造产品参数、客户案例、收益结果、授权政策或市场排名。

## [0.1.1] - 2026-07-21

### Changed

- 执行 M1 Repository Audit，重写 `REPOSITORY_AUDIT_REPORT.md` 为当前 M1 状态审计报告。
- 修正 `PROJECT_STRUCTURE.md` 中 website 骨架目录，与 M1.2 实际结构保持一致。
- 更新 `docs/TODO.md` 与 `docs/MEMORY.md`，记录审计结论、已修复问题和 M2 前置建议。

### Notes

- 本次不开发业务页面。
- 本次不新增产品参数、客户案例、收益结果、授权政策或市场排名。

## [0.1.2] - 2026-07-21

### Added

- 新增 `docs/M2_STRATEGY.md`，明确 M2 调整为 Channel Growth Foundation。
- 新增 `docs/PARTNER_FUNNEL.md`，定义代理商从访问加盟页面到区域代理审核的渠道增长漏斗。
- 新增 `docs/LEAD_SCHEMA.md`，定义 Partner Lead 与 Customer Lead 表单字段和 CRM 输入标准。

### Changed

- 升级 `.ai/AI_PROJECT_OPERATING_SYSTEM.md` 到 V1.2，新增 M1/M1.5 核心文档必读规则。
- 明确网站为工业智能装备渠道增长入口，不是普通产品展示官网。
- 明确 Website Traffic Weight：Partner 35%、Product 25%、Industry 20%、Content 10%、Trust 10%。
- 更新 CI 与 website governance 脚本，检查 M2 Strategy、Partner Funnel 和 Lead Schema 文档。
- 同步更新 Roadmap、TODO、Memory、PRD 和 AI 上下文。

### Notes

- 本次为 M1.5 Channel Growth Strategy Layer，不开发业务页面。
- 本次不新增产品参数、客户案例、收益结果、授权政策或市场排名。

## [0.1.3] - 2026-07-21

### Changed

- 执行 M1.5 Repository Audit，更新 `REPOSITORY_AUDIT_REPORT.md` 为 M1.5 当前状态。
- 将 `docs/M2_STRATEGY.md`、`docs/PARTNER_FUNNEL.md`、`docs/LEAD_SCHEMA.md` 纳入审计报告目录树和检查项。
- 更新 `docs/TODO.md` 与 `docs/MEMORY.md`，记录 M1.5 Audit 结果。

### Notes

- 本次不开发业务页面。
- 本次不新增产品参数、客户案例、收益结果、授权政策或市场排名。

## [0.2.0] - 2026-07-21

### Added

- 新增 `docs/PAGE_SYSTEM.md`，定义页面目标、用户角色、SEO关键词、转化目标、CTA、内部链接、Schema 和 Lead入口。
- 新增 `docs/METADATA_SCHEMA.md`，统一 title、description、keywords、canonical、og、schema 和 breadcrumb。
- 新增 `docs/SEO_SCHEMA_LAYER.md`，补齐 Metadata 与页面开发之间的结构化数据层。
- 重写 `docs/PARTNER.md`，明确 Partner Program Entity、Partner Program Database、Partner Content Model、Partner SEO Template、Partner Schema、Partner Template、Partner Page、Partner Lead / CRM / CMS / Export 的长期架构。
- 新增 `docs/PARTNER_CONTENT_MODEL.md`，定义 PartnerTemplate、Hero、Market Opportunity、Cooperation Models、Channel Enablement、Lead Entry、FAQ、内链与合规边界。
- 新增 `docs/PARTNER_SEO_TEMPLATE.md`，定义 Partner 页面 SEO/GEO、Schema、FAQPage、Topic Cluster、后台维护与批量审核字段。
- 新增 `/partner/` 页面，作为 LABOR-SAVING 渠道增长中心和 Partner Lead 入口。
- 新增 `website/app/site-metadata.ts`，集中维护页面 metadata。
- 新增 `website/app/site-schema.ts`，集中维护 Organization、WebPage、ContactPoint、BreadcrumbList 和 FAQPage JSON-LD 构建。

### Changed

- 更新 `docs/M2_STRATEGY.md`，明确 M2 执行顺序为 Page Strategy、Metadata System、SEO Schema Layer、Partner Page、Product Page、Industry Page、Lead Capture Integration、Admin Maintainability、Batch Export。
- 更新 website governance 校验，将 `docs/PAGE_SYSTEM.md`、`docs/METADATA_SCHEMA.md`、`docs/SEO_SCHEMA_LAYER.md`、`docs/PARTNER_CONTENT_MODEL.md` 与 `docs/PARTNER_SEO_TEMPLATE.md` 纳入必检文档。
- 同步更新 README、Roadmap、TODO、Memory 与 website README。

### Notes

- 本次优先完成 `/partner/` 商业入口，不开发 `/products/`、`/applications/` 和 `/knowledge/`。
- 本次不接入 CRM 后端；Lead Capture Integration 留到 M2.6。
- 本次不新增产品参数、客户案例、收益结果、授权政策、区域独家或市场排名。

## [0.2.1] - 2026-07-21

### Changed

- 执行 M2 Repository Audit，重写 `REPOSITORY_AUDIT_REPORT.md` 为当前 M2 状态。
- 修正 `.ai/AI_CONTEXT.md`、`.ai/AI_MEMORY.md`、`.ai/AI_PROJECT_OPERATING_SYSTEM.md` 当前阶段口径，从 M1.5 更新为 M2 Channel Growth Foundation。
- 修正 README 与 PRD 当前阶段说明。
- 更新 GitHub Actions 文档存在性检查，显式纳入 Page System、Metadata Schema、SEO Schema Layer、Partner Content Model 和 Partner SEO Template。

### Notes

- 本次审计不新增业务页面。
- 本次审计后，下一步已明确为先完成 Product System Foundation，再进入 Product Rendering Layer。

## [0.2.2] - 2026-07-21

### Added

- 新增 `docs/ENTITY_SYSTEM.md`，定义全站 Entity Layer，统一 Partner、Product、Industry、Case、Article、Video、Download、FAQ 的长期模型。
- 新增 `docs/PRODUCT_SYSTEM.md`，定义 Product Entity、生命周期、关联关系和 CMS Model 边界。
- 新增 `docs/PRODUCT_CONTENT_MODEL.md`，定义 ProductTemplate、产品概述、特点、应用、资料、FAQ、Lead Entry 和 Partner Entry。
- 新增 `docs/PRODUCT_SCHEMA.md`，定义 Product JSON-LD、CollectionPage、FAQPage、BreadcrumbList 和字段来源。
- 新增 `docs/PRODUCT_SEO_TEMPLATE.md`，定义 Product URL、Title、Description、内链策略、Topic Cluster 和 GEO 问答模板。

### Changed

- 将 M2.4 从 Product Page Development 调整为 Product System Foundation。
- 将 Product Page 后置为 M2.4.5，确认当前阶段不批量开发产品页面、不开发后台 CMS、不开发 CRM、不冻结数据库。
- 更新 Roadmap、TODO、Memory、PRD、README 和 AI 当前阶段口径。
- 更新 website governance 校验，将 Entity 与 Product Foundation 文档纳入必检范围。

### Notes

- 本次只完成产品系统基础层，不新增 `/products/` 页面。
- 本次不新增产品参数、价格、交期、认证、客户案例、收益承诺、授权范围或市场排名。

## [0.2.3] - 2026-07-21

### Changed

- 将下一阶段正式命名为 `M2.4.5 Product Rendering Layer`。
- 拆分 Product Rendering Layer 为 Product Listing、Product Category、Product Detail 和 Related Product。
- 明确每个产品渲染阶段必须验证 Metadata、Schema、Breadcrumb、FAQ、Internal Link、SEO 和 GEO。
- 在 `docs/ENTITY_SYSTEM.md` 中固化 Entity、Content Model、Metadata、Schema、SEO Template 五层齐备后才允许进入 Rendering Layer / Page Development。
- 继续确认 CMS 留到 M2.7，Database 继续保持规划，等待 Industry、Case、Knowledge 等 Entity 关系稳定后再冻结。

### Notes

- 本次仍不开发 CMS、CRM 或数据库。
- 本次仍不批量开发产品页面。

## [0.2.4] - 2026-07-21

### Changed

- 执行 M2.4 Repository Audit，重写 `REPOSITORY_AUDIT_REPORT.md` 为 Product System Foundation 当前验收状态。
- 将 `PROJECT_STRUCTURE.md` 的旧页面开发顺序更新为 Entity 五层门禁与 Product Rendering Layer 顺序。
- 将 Entity 与 Product Foundation 五份文档补入 AI 必读清单和 GitHub Actions 显式文档检查。
- 将产品 URL 统一为 `/products/{category-slug}/{product-slug}/`，并修正旧版扁平型号路径。
- 扩展 website governance 校验，防止治理入口漏列 Foundation 文档或旧版扁平产品 URL 回归。
- 明确 LS70 仅作为 M2.4.5 产品详情验证占位，实体与资料确认前不得发布。

### Notes

- 本次审计未开发产品页面、CMS、CRM 或数据库。
- Website governance、TypeScript、ESLint 与 Next.js production build 均通过。

## [0.2.5] - 2026-07-21

### Added

- 建立统一 Entity ID 规范，采用 `{TYPE_PREFIX}-{4位序号}`，供未来 CMS、CRM、Analytics、Database 和实体关系使用。
- 为当前产品分配 `PRD-0001` LS40、`PRD-0002` L60、`PRD-0003` SQ35、`PRD-0004` SQ50。

### Changed

- 正式进入 M2.4.5 Product Rendering Layer，并明确以模板和渲染能力验证为目标，不以页面数量为目标。
- 将开发顺序固定为 Product Listing、Product Category、首个真实 Product Detail、Related Product，前一层验收后才进入下一层。
- 将 Canonical 与 Open Graph 纳入每个渲染层的强制验收项。
- 明确首个 Product Detail 必须使用资料已确认的真实 Product Entity；LS70 未确认前保持非收录占位。

### Notes

- 本次只固化阶段入口与 Entity ID 治理规则，不开发产品页面、CMS、CRM 或数据库。

## [0.2.6] - 2026-07-21

### Added

- 新增 `/products/` Product Listing 静态路由。
- 新增 `website/app/products/product-entities.json`，作为 Product Listing 唯一 Product Entity 数据源。
- 新增自动分类、Product URL Builder、ProductCard 模板和 Product Listing Schema Builder。
- 新增 `scripts/validate-product-listing.mjs`，验证 Entity ID、URL 唯一性、页面无型号硬编码以及统一 Metadata/Schema 接入。

### Changed

- 将 `siteBaseUrl` 安全默认值从 `example.com` 修正为已确认的 `https://www.labor-saving.cn`。
- 扩展 website test，使 Product Listing 模板验证与 TypeScript 检查共同执行。
- 更新 M2.4.5 状态：Product Listing 已完成，下一步为 Product Category。

### Notes

- 当前 Product Entity 均未生成详情链接或 Product Schema，避免未确认资料进入正式收录体系。
- 本次未开发 CMS、CRM、数据库、Product Category 或 Product Detail。

## [0.2.7] - 2026-07-21

### Added

- 接入 LABOR-SAVING 品牌 Logo 网页资产 `website/public/assets/labor-saving-logo.jpg`。

### Changed

- 更新 Product Listing 顶部品牌导航，使用 Logo 图片并保留无障碍替代文本。
- 对原始 Logo 做透明边界裁切，仅优化网页显示留白，不修改外部原始素材。

## [0.2.8] - 2026-07-21

### Added

- 新增 `/products/[categorySlug]/` Product Category 静态生成模板。
- 新增共享 ProductHeader、ProductBreadcrumbs 与 Product Category FAQ Builder。
- 冻结 Entity Version 字段语义：`version`、`status`、`published_at`、`updated_at`。

### Changed

- Listing 分类链接改为由 Product Entity Category Slug 自动生成。
- Category Metadata、Canonical、Open Graph、Breadcrumb、CollectionPage 和 FAQ 改为统一 Builder 输出。
- 将产品验证脚本升级为 `validate-product-rendering.mjs`，自动核对 Entity、Listing、Category 总数与分类路由数。

### Notes

- 当前计数：Entity 4、Listing 4、Category Total 4、Category Routes 2。
- 未生成 Product Detail、未确认 Product Schema、CMS、CRM 或数据库结构。

## [0.2.9] - 2026-07-21

### Changed

- 执行 M2.4.5.2 Repository Audit，并将 `REPOSITORY_AUDIT_REPORT.md` 更新为当前实现状态。
- 将 `scripts/validate-product-rendering.mjs` 加入 GitHub Actions，避免 Product Entity、Listing、Category 和静态分类路由约束只在本地验证。
- 同步更新 Roadmap、TODO 和 Memory 的审计结论。

### Notes

- 审计通过时的生产构建路由为 `/`、`/partner/`、`/products/`、`/products/pneumatic-manipulator-arm/` 与 `/products/pneumatic-balancer/`。
- 首个 Product Detail 仍必须等待真实 Product Entity 的可公开资料确认；LS70 继续保持非收录占位。
