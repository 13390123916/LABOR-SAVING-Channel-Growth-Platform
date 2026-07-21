# Git Workflow

## 目标

确保 LABOR-SAVING Channel Growth Platform 的 Git 历史可读、可审计、可追溯，适合 12 到 24 个月长期演进。

## 分支策略

- `main`：稳定主分支，必须保持可审计、可交付。
- 功能分支：后续多人协作时使用 `codex/`、`feature/`、`docs/` 等语义化前缀。
- 直接提交到 `main` 只允许在用户明确要求或 M0/M0.1 初始化阶段执行。

## Commit 规范

Commit 必须具有语义，推荐格式：

```text
[M0] Repository Bootstrap
[M0] Repository Audit Report
[M0.1] Repository Governance Fix
[M1] Website Foundation
[M2] SEO Foundation
[M3] GEO Knowledge Base
[M4] CRM Lead System
```

禁止使用：

- update
- fix
- 修改
- 保存
- 存档

## 提交流程

1. 检查 `git status --short --branch`。
2. 确认无用户未说明的变更被覆盖。
3. 完成任务范围内修改。
4. 执行 Build / Lint / Test 或说明不适用原因。
5. 更新文档。
6. `git add -A`。
7. `git commit -m "<semantic message>"`。
8. `git push`。

## PR 要求

PR 必须说明：

- 修改目的
- 影响模块
- SEO 影响
- GEO 影响
- 商业影响
- 文档更新
- 测试结果
- 风险与回滚

## GitHub Actions

CI 至少应检查：

- 关键文件存在
- 文档结构存在
- GitHub 模板存在
- 后续 M1 开始后增加 Build / Lint / Test
