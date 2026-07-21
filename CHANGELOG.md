# Changelog

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
