# AI_PROJECT_OPERATING_SYSTEM.md

Version: V1.2

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

## 2.1 Website Traffic Weight

网站流量和页面开发权重按以下比例判断：

| 模块 | 权重 |
| --- | --- |
| 加盟合作 Partner | 35% |
| 产品 Product | 25% |
| 行业应用 Industry | 20% |
| 知识中心 Content | 10% |
| 品牌 Trust | 10% |

网站不是普通产品展示官网，必须定义为工业智能装备渠道增长入口。

核心增长链路：

```text
渠道增长平台
↓
代理商增长
↓
终端市场覆盖
↓
品牌资产沉淀
```

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

## 7.1 必须读取文档

任何页面开发、内容生成、SEO/GEO、招商合作、CRM 或 M2 之后任务，必须优先读取：

- `docs/WEBSITE_ARCHITECTURE.md`
- `docs/WEBSITE_SEO_BLUEPRINT.md`
- `docs/CONTENT_SYSTEM.md`
- `docs/PARTNER.md`
- `docs/CRM.md`
- `docs/M2_STRATEGY.md`
- `docs/PAGE_SYSTEM.md`
- `docs/METADATA_SCHEMA.md`
- `docs/SEO_SCHEMA_LAYER.md`
- `docs/ENTITY_SYSTEM.md`
- `docs/PRODUCT_SYSTEM.md`
- `docs/PRODUCT_CONTENT_MODEL.md`
- `docs/PRODUCT_SCHEMA.md`
- `docs/PRODUCT_SEO_TEMPLATE.md`
- `docs/PRODUCT_PUBLISHING_CHECKLIST.md`
- `docs/PRODUCT_CONTENT_READINESS.md`
- `docs/MILESTONE_MAPPING.md`
- `docs/PLATFORM_ARCHITECTURE.md`
- `docs/CMS_SYSTEM.md`
- `docs/MEDIA_SYSTEM.md`
- `docs/adr/README.md`
- `docs/adr/ADR-0007-cms-architecture.md`
- `docs/adr/ADR-0008-database-model.md`
- `docs/adr/ADR-0009-authentication-and-authorization.md`
- `docs/adr/ADR-0010-media-management.md`
- `docs/DATABASE.md`
- `docs/AUTH_SYSTEM.md`
- `docs/PARTNER_FUNNEL.md`
- `docs/PARTNER_CONTENT_MODEL.md`
- `docs/PARTNER_SEO_TEMPLATE.md`
- `docs/LEAD_SCHEMA.md`

用途：

- `docs/WEBSITE_ARCHITECTURE.md` 是页面结构来源。
- `docs/WEBSITE_SEO_BLUEPRINT.md` 是 URL、SEO 字段和 GEO 来源。
- `docs/CONTENT_SYSTEM.md` 是内容生产与合规来源。
- `docs/PARTNER.md` 是渠道合作策略来源。
- `docs/CRM.md` 是线索状态、分配和后续沉淀来源。
- `docs/M2_STRATEGY.md` 是 M2 阶段优先级来源。
- `docs/PAGE_SYSTEM.md` 是页面级目标、CTA、内链、Schema 和 Lead 入口来源。
- `docs/METADATA_SCHEMA.md` 是 title、description、keywords、canonical、og、schema 和 breadcrumb 来源。
- `docs/SEO_SCHEMA_LAYER.md` 是 Organization、Product、Article、FAQPage、BreadcrumbList、WebPage、ContactPoint 与后台维护字段来源。
- `docs/ENTITY_SYSTEM.md` 是所有长期业务模块进入 Rendering Layer 前的统一五层门禁来源。
- `docs/PRODUCT_SYSTEM.md` 是 Product Entity、生命周期、关系和阶段边界来源。
- `docs/PRODUCT_CONTENT_MODEL.md` 是 Product 内容模块、FAQ、资料和入口结构来源。
- `docs/PRODUCT_SCHEMA.md` 是 Product JSON-LD 类型、字段来源和合规边界来源。
- `docs/PRODUCT_SEO_TEMPLATE.md` 是 Product URL、Metadata、内链、Topic Cluster 和 GEO 模板来源。
- `docs/PRODUCT_PUBLISHING_CHECKLIST.md` 是首个 Product Detail 公开发布、SEO/GEO 验收和后续索引状态机来源。
- `docs/PRODUCT_CONTENT_READINESS.md` 是首个真实 Product Entity 的内容资产准备、资料确认与图片授权来源。
- `docs/MILESTONE_MAPPING.md` 是冻结 M2 历史与 M3 运行能力迁移边界来源。
- `docs/PLATFORM_ARCHITECTURE.md` 是 M3 平台模块关系、职责、依赖、生命周期和阶段边界总览来源。
- `docs/CMS_SYSTEM.md` 是 M3.2 CMS Architecture 的内容管理资源、字段分层、工作流、权限接入、审计接入和导入导出边界来源。
- `docs/MEDIA_SYSTEM.md` 是 M3.3 Media Management Architecture 的媒体实体、元数据、生命周期、版本、ALT、缩略图、存储、CDN、水印和引用关系来源。
- `docs/adr/README.md` 是长期架构决策记录入口。
- `docs/adr/ADR-0007-cms-architecture.md` 是 M3.2 CMS Architecture 的已接受架构决策来源。
- `docs/adr/ADR-0008-database-model.md` 是 M3.0 Database Model 的已接受架构决策来源。
- `docs/adr/ADR-0009-authentication-and-authorization.md` 是 M3.1 Authentication & Authorization 的已接受架构决策来源。
- `docs/adr/ADR-0010-media-management.md` 是 M3.3 Media Management Architecture 的已接受架构决策来源。
- `docs/DATABASE.md` 是 M3.0 Database Architecture 的数据模型、ER 图、约束、生命周期、版本、软删除、多语言和审计字段来源。
- `docs/AUTH_SYSTEM.md` 是 M3.1 Authentication & Authorization 的角色、权限、资源、RBAC、审计、登录流程、Session 和 Future SSO 来源。
- `docs/PARTNER_FUNNEL.md` 是渠道增长漏斗来源。
- `docs/PARTNER_CONTENT_MODEL.md` 是 Partner 页面内容模块、FAQ、CTA 与内链模型来源。
- `docs/PARTNER_SEO_TEMPLATE.md` 是 Partner 页面 SEO/GEO、Schema 和 Topic Cluster 模板来源。
- `docs/LEAD_SCHEMA.md` 是表单字段和 CRM 输入标准来源。

禁止：

- 自行设计导航。
- 自行生成 SEO 结构。
- 每个页面自行编写 Metadata。
- 每个页面自行散落手写 JSON-LD。
- 自行修改招商逻辑。
- 未读取漏斗与字段标准就开发表单或页面。

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
- `docs/AUTH_SYSTEM.md`
- `docs/CMS_SYSTEM.md`
- `docs/MEDIA_SYSTEM.md`
- `docs/PLATFORM_ARCHITECTURE.md`
- `docs/CONTENT.md`
- `docs/CONTENT_SYSTEM.md`
- `docs/WEBSITE_ARCHITECTURE.md`
- `docs/WEBSITE_SEO_BLUEPRINT.md`
- `docs/M2_STRATEGY.md`
- `docs/PARTNER_FUNNEL.md`
- `docs/LEAD_SCHEMA.md`
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

当前阶段：M3 Website Platform Foundation。M2 Channel Growth Foundation 已冻结为 v1.0；除架构缺陷或严重 Bug 外，不再新增治理规则或 Publishing 子阶段。

当前目标：推进 M3 Website Platform Foundation。M3.0 Database Architecture、M3.1 Authentication & Authorization、M3.2 CMS Architecture 与 M3.3 Media Management Architecture 已完成设计冻结，后续进入 Media Runtime 前必须沿用 `docs/MEDIA_SYSTEM.md` 与 ADR-0010 的 Media Domain 边界。M2.4.5.3.5 First Published Product Acceptance 作为首个真实产品的跨阶段发布质量门禁保留，但不再扩展 M2 治理或 Publishing 子阶段。M3 实现继续沿用 Entity -> Metadata -> Schema -> CMS -> Frontend -> SEO -> GEO 的统一模型。
