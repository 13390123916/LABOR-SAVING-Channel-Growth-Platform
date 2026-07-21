# Memory

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

M1.5 Channel Growth Strategy Layer 已完成。下一阶段可进入 M2 Channel Growth Foundation。

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
- 当时 M2 顺序暂定为：M2.0 Partner Funnel Architecture、M2.1 Lead Capture Schema、M2.2 Website Page Development；该顺序已在 M2 Channel Growth Foundation 中更新为 Page System、Metadata System、SEO Schema Layer、Partner Page、Product Page、Industry Page、Lead Capture Integration、Admin Maintainability、Batch Export。

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
