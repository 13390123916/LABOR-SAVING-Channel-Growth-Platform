# Repository Maintenance

## 目标

将本仓库长期维护为企业级 GitHub Repository，让任何 AI、任何开发人员接手都不会迷失。

## 维护范围

- Repository 目录结构
- 文档完整性
- 重复代码
- 重复文档
- SEO/GEO 规范一致性
- Issue 与 TODO 同步
- CHANGELOG 完整性
- Git Commit 规范
- GitHub Actions
- Issue Template
- Pull Request Template

## 文档职责

根目录只保留：

- `README.md`：仓库入口、项目定位、文档导航。
- `CHANGELOG.md`：版本与 Milestone 变更记录。

详细项目文档统一放在 `docs/`：

- `docs/PROJECT_PRD.md`
- `docs/ROADMAP.md`
- `docs/TODO.md`
- `docs/MEMORY.md`
- `docs/ARCHITECTURE.md`
- `docs/SEO.md`
- `docs/GEO.md`
- `docs/CRM.md`
- `docs/PARTNER.md`
- `docs/API.md`
- `docs/DATABASE.md`
- `docs/CONTENT.md`
- `docs/STYLEGUIDE.md`
- `docs/DEPLOYMENT.md`
- `docs/GIT_WORKFLOW.md`
- `docs/ISSUE_WORKFLOW.md`

## 目录治理

- 新目录必须有明确职责。
- 不创建没有业务依据的漂亮空架构。
- `website/` 在 M0.1 仅保留 `README.md` 和 `.gitignore`。
- `application`、`domain`、`infrastructure`、`features` 等目录等待 M1 技术架构确定后创建。

## 定期审计

建议每个 Milestone 完成后执行一次轻量审计：

1. 检查目录是否符合 `PROJECT_STRUCTURE.md`。
2. 检查 `.ai/AI_PROJECT_OPERATING_SYSTEM.md` 是否仍为最高规则。
3. 检查 TODO 与 Issue 是否同步。
4. 检查 CHANGELOG 是否记录变更。
5. 检查 SEO/GEO 规范是否被破坏。
6. 检查是否出现重复文档或重复模块。

## 整改规则

发现治理问题时：

1. 先输出影响分析。
2. 给出整改方案。
3. 涉及架构时等待确认。
4. 整改后更新文档。
5. 使用语义化 Commit。
