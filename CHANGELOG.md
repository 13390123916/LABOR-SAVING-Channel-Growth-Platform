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
