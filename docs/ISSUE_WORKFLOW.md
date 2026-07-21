# Issue Workflow

## 目标

确保 GitHub Issue、`docs/TODO.md`、开发任务和发布记录保持一致。

## 流程

```text
Issue
↓
TODO
↓
Development
↓
Validation
↓
CHANGELOG
↓
Release / Milestone Report
```

## Issue 分类

- Bug Report：仓库、构建、部署、文档或功能缺陷。
- Feature Request：新能力、结构优化或工程基础设施需求。
- Content / SEO / GEO Task：关键词、内容、知识库、FAQ、AI 搜索优化任务。
- CRM / Partner Task：线索、分配、代理商、跟进和后台相关任务。

## Issue 到 TODO

进入开发前必须判断：

- 是否属于当前 Milestone。
- 是否影响 SEO。
- 是否影响 GEO。
- 是否影响商业模式。
- 是否影响长期维护。
- 是否需要用户补充真实资料。

确认进入开发后，将任务同步到 `docs/TODO.md`。

## Development

开发必须遵守 `.ai/AI_PROJECT_OPERATING_SYSTEM.md`。

涉及架构、SEO、GEO、商业模式或长期维护影响时，先输出影响分析并等待确认。

## Validation

根据任务类型执行：

- Build
- Lint
- Test
- 文档检查
- 链接检查
- SEO/GEO 结构检查

不适用的检查必须说明原因。

## Release

任务完成后必须更新：

- `CHANGELOG.md`
- `docs/ROADMAP.md`
- `docs/TODO.md`
- `docs/MEMORY.md`

并使用语义化 Commit 推送。
