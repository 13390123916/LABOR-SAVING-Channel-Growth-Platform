# AI_PROJECT_OPERATING_SYSTEM.md

Version: V1.1

项目名称：LABOR-SAVING Channel Growth Platform（雷普赛维渠道增长平台）

文档级别：唯一最高 AI 协作规则

适用对象：Codex、ChatGPT、Claude、Cursor、Gemini、Trae 以及后续接入本仓库的所有 AI 与开发人员。

最后更新：2026-07-21

## 1. 最高定位

本项目不是普通企业官网，而是工业装备渠道增长平台。

官网只是增长系统的一部分。长期系统包括：

- Website 官网获客
- 中国 SEO
- GEO / 国内 AI 搜索优化
- CRM 询盘管理
- Partner 加盟与代理协作
- Marketing 内容营销
- Knowledge Base AI 知识库
- Dashboard 运营后台

任何 AI 不得只完成单点任务，必须站在 CTO、系统架构师、SEO/GEO 工程师、产品负责人和 DevOps 负责人视角维护整个项目。

## 2. 商业优先级

1. 加盟合作：B 端经销商、代理商、MRO、自动化集成商、工业机器人集成商、设备贸易商。
2. 终端客户询盘：终端制造企业、工厂设备负责人、检修维护负责人、采购负责人。
3. 品牌建设：中国搜索资产、AI 搜索认知、行业内容资产。

如果一个实现会削弱加盟合作、询盘转化或品牌可信度，必须停止编码并先输出影响分析。

## 3. 当前产品范围

- LS40 助力机械臂
- L60 助力机械臂
- SQ35 气动平衡器
- SQ50 气动平衡器

不得编造产品参数、客户案例、收益结果、授权范围、市场排名或合作政策。

## 4. 中国 SEO 规则

SEO 只按中国环境设计，重点考虑：

- 百度
- 360
- 搜狗
- 神马
- 微信搜一搜
- 知乎
- 抖音
- 小红书

不以 Google SEO 作为默认设计依据。

核心要求：

- 页面必须可抓取。
- 核心内容不得纯图片化。
- 重要页面必须有 title、description、H1、面包屑和内链。
- URL、内容结构和站点地图必须服务中国搜索生态。

## 5. GEO 规则

GEO 面向国内 AI 搜索：

- DeepSeek
- 豆包
- 腾讯元宝
- Kimi
- 通义千问

内容必须结构化、事实型、可引用、可总结。

每个重要内容单元优先回答：

1. 这是什么
2. 适合谁
3. 解决什么问题
4. 有哪些限制
5. 下一步如何咨询或合作

## 6. 技术方向

优先技术栈：

- Next.js
- TypeScript
- TailwindCSS
- Node.js
- MySQL
- Docker
- GitHub Actions

架构原则：

- Clean Architecture
- SOLID
- DRY
- KISS
- 模块化
- 高内聚
- 低耦合
- SSR / SSG / ISR 友好

不得为了当前任务提前制造无业务支撑的目录或抽象。

## 7. 固定工作流

每次任务必须按以下顺序执行：

1. 读取项目文档。
2. 理解商业模式。
3. 分析需求。
4. 输出实施方案。
5. 涉及架构、SEO、GEO、商业模式或长期维护时等待确认。
6. 开发或执行文档治理。
7. Build。
8. Lint。
9. Test。
10. 更新文档。
11. Git Commit。
12. Git Push。
13. 输出阶段报告。

如果任务明确要求“不开发功能”，不得创建业务代码。

## 8. 必须停止编码的情况

发现以下影响时，必须停止编码，先输出影响分析：

- 影响 SEO
- 影响 GEO
- 影响商业模式
- 影响长期维护
- 影响目录边界
- 影响合规表达
- 需要编造参数、收益、案例或政策

## 9. 文档同步规则

根目录只保留入口和发布记录：

- `README.md`
- `CHANGELOG.md`

项目详细文档统一维护在 `docs/`：

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
- `docs/REPOSITORY_MAINTENANCE.md`

每次有效变更必须检查并按需更新：

- `README.md`
- `CHANGELOG.md`
- `docs/PROJECT_PRD.md`
- `docs/ROADMAP.md`
- `docs/TODO.md`
- `docs/MEMORY.md`

## 10. Git 规则

Commit 必须语义化，建议格式：

```text
[M0] Repository Bootstrap
[M0] Repository Audit Report
[M0.1] Repository Governance Fix
[M1] Website Foundation
[M2] SEO Foundation
[M3] GEO Knowledge Base
[M4] CRM Lead System
```

禁止使用以下无效 Commit：

- update
- fix
- 修改
- 保存
- 存档

每个 Milestone 完成后必须：

1. 自检。
2. 更新文档。
3. Commit。
4. Push。
5. 输出阶段报告。

## 11. Repository Maintenance

AI 不仅负责开发，还负责长期维护 GitHub Repository。

必须持续检查：

- Repository 目录结构
- 文档完整性
- 重复代码
- 重复文档
- SEO/GEO 规范一致性
- Issue 与 TODO 是否同步
- CHANGELOG 是否完整
- Git Commit 是否符合规范

发现问题时，必须主动提出整改或重构方案。涉及架构调整时，等待用户确认后实施。

## 12. CODEX_SYSTEM_PROMPT.md 的地位

`CODEX_SYSTEM_PROMPT.md` 仅作为 Codex 启动辅助文档。

本文件 `.ai/AI_PROJECT_OPERATING_SYSTEM.md` 是唯一最高规则。若二者冲突，以本文件为准。

## 13. 当前阶段

当前阶段：M0.1 Repository Governance Fix。

当前目标：将仓库从“AI 能理解”提升到“任何 AI、任何开发人员接手都不会迷失”。
