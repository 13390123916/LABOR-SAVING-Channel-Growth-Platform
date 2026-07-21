# Platform Architecture

文档职责：作为整个 Platform 的唯一平台结构入口和 Single Source of Truth，提供 M3 Website Platform Foundation 的平台能力总览，帮助新接手人员快速理解模块关系、职责、依赖、生命周期、M3 阶段边界和 M4 Runtime 边界。本文不替代各专项文档和 ADR，不描述运行时代码实现细节。

## 1. 平台定位

LABOR-SAVING Channel Growth Platform 是工业装备渠道增长平台，不是普通企业官网。

平台能力服务三个优先级：

1. 加盟合作
2. 终端客户询盘
3. 品牌建设

所有模块必须复用已冻结的 Entity、Metadata、Schema、Publishing Workflow、RBAC、Audit 和中国 SEO / 国内 GEO 规则，不允许为了单点功能绕过平台边界。后续所有 Platform Module 必须先回到本文判断平台级能力、模块归属和统一入口更新，再允许创建或扩展专项文档。

## 1.1 Platform Module Intake Gate

任何新增或扩展 Platform Module 前，必须先回答三项问题：

```text
1. 是否属于平台级能力（Platform Capability）？
2. 应归属哪个 Platform Module？
3. 是否应纳入 PLATFORM_ARCHITECTURE.md 统一管理？
```

判断规则：

- 如果能力会被两个或两个以上模块复用，或影响 Database、Authentication、CMS、Media、Lead、Platform Assets、SEO Runtime、GEO Runtime、Audit、Backup、Deployment & Analytics 或 M4 Runtime，则必须视为 Platform Capability。
- 如果能力只是某个页面、内容模板、运营文案或一次性配置，不应提升为独立 Platform Module；应归入已有模块或专项文档。
- 如果能力改变模块关系、模块职责、模块依赖、生命周期、M3 / M4 边界、权限、审计、隐私、搜索输出、备份或部署分析边界，必须先更新本文，再更新专项文档。
- 如果能力无法明确归属，必须先停止实现，输出归属分析，不得通过新建目录、新建文档或临时代码绕开平台结构入口。

执行顺序：

```text
Platform Capability 判断
-> Platform Module 归属
-> PLATFORM_ARCHITECTURE.md 更新
-> 专项文档 / ADR 判断
-> Roadmap / TODO / Memory / Changelog 同步
-> Runtime 留到 M4
```

本文是平台结构 Single Source of Truth。专项文档只能细化已在本文登记的模块能力，不得单独定义与本文冲突的模块边界。

## 2. 模块关系

M3 平台能力按架构冻结顺序组织：

```text
Database
        |
Authentication
        |
CMS
        |
Media
        |
Lead Center
        |
Platform Assets
        |
Dealer Center
        |
Analytics
        |
Security / Permission
        |
Platform Freeze Review
```

横向支撑关系：

```text
Entity
  |-- Product
  |-- Industry
  |-- Article
  |-- Partner
  |-- FAQ
  |-- Download
  |-- Media

CMS
  |-- Metadata
  |-- Schema
  |-- Media Reference
  |-- Publishing Workflow

Runtime
  |-- SEO Runtime
  |-- GEO Runtime
  |-- Lead Center
  |-- Audit Center
```

## 3. 模块职责

| Module | 职责 | 不负责 |
| --- | --- | --- |
| Database | 冻结 Entity、业务表、关系表、索引、软删除、版本、多语言和审计字段 | 不直接实现 ORM、迁移或后台 CRUD |
| Authentication | 确认后台用户身份、Session 策略、RBAC、Resource、Action 和权限矩阵 | 不替代业务审核，不用登录状态替代权限判断 |
| CMS | 管理 Product、Industry、Article、Partner、FAQ、Download、Navigation、SEO Metadata、Schema Metadata、Redirect 和 Setting | 不吞并 Media、Lead、SEO Runtime、GEO Runtime、Audit Center 或 Backup |
| Media | 管理媒体实体、元数据、授权、图片版本、缩略图、WebP / AVIF 预留、存储适配、CDN 边界和引用关系 | 不直接编辑页面内容，不承担 Lead、SEO 提交或备份归档 |
| Lead Center | 管理 Partner Lead、Customer Lead、状态、分配、筛选、导出和 CRM 输入 | 不替代 CMS 内容审核或营销承诺 |
| Platform Assets | 管理 Company Profile、Brand Assets、Social Media Hub、Download Center、Friend Links、Contact Center 和 System Settings | 不替代 CMS Content、Lead Data、Dealer Data 或 Runtime |
| Dealer Center | 冻结 Dealer 作为渠道招商核心对象的职责、边界、生命周期、区域关系、Lead 分配、CRM 流转和权限边界 | 不承诺收益、区域独家、自动授权、价格政策或合同结果 |
| Analytics | 冻结 Lead Attribution、Source、UTM、SEO Attribution、Dealer Attribution 和 Conversion Event | 不替代业务事实来源，不直接采集未经授权的个人敏感信息 |
| Security / Permission | 复核 RBAC、Resource、Action、Permission、Audit、隐私、数据导出和高风险动作边界 | 不重写已冻结 Auth 架构，不提前实现登录、SSO 或运行时权限代码 |
| Platform Freeze Review | 统一审查 Platform Modules、ADR、Roadmap、TODO、Memory、Changelog、Runtime 边界和文档漂移 | 不新增业务功能，不进入 M4 Runtime |

## 4. 模块依赖

### 4.1 Database 是结构基础

Database 定义稳定业务键、关系、生命周期和审计字段。后续模块不得改变 M3.0 已冻结的 `entity_id`、slug、soft delete、version、locale 和 publishing lifecycle 语义。

### 4.2 Authentication 是后台入口

Authentication 为 CMS、Media、Lead、SEO Runtime、GEO Runtime、Audit 和 Backup 提供统一 Resource、Action、Permission 和 RBAC。

### 4.3 CMS 是内容维护层

CMS 负责可审核内容和字段分层。CMS 只能引用已审核或处于明确审核状态的 Media，不负责文件上传、裁切、转码或 CDN 分发。

### 4.4 Media 是资产域

Media 为 Product、Industry、Article、Partner、FAQ、Download、SEO Metadata、Schema Metadata 和 Open Graph 提供可追溯资产。公开页面只能引用授权通过且使用范围匹配的媒体资产。

### 4.5 Dealer 是渠道增长核心对象

Dealer Center 承接 Lead Center 的渠道线索和 Platform Assets 的品牌 / 联系 / 下载资料输入，定义代理商、经销商、区域合作、Lead 分配、权限边界和 CRM 流转关系。Dealer 先于 Analytics 冻结，确保分析体系围绕已定义业务对象设计。

### 4.6 Analytics 是归因与转化复盘层

Analytics 消费 Lead、Dealer、CMS、Platform Assets、SEO / GEO 输出和 Campaign 来源，不改变内容事实来源。Lead Attribution、Source、UTM、SEO Attribution、Dealer Attribution 和 Conversion Event 必须围绕 Dealer 与 Lead 的已冻结边界设计。

### 4.7 Runtime 是公开输出层

Platform Assets 为全站公共事实、品牌资产、社媒入口、下载中心、友情链接、联系方式和系统设置提供统一输入。SEO Runtime 和 GEO Runtime 只消费已审核内容、Metadata、Schema、Media、Platform Assets 和发布状态，不直接生成未经审核的事实内容。

Company、Brand、Contact、Download、Logo、Social Profile 和 ContactPoint 等 Platform Assets 后续映射 Organization Schema、WebSite Schema、Brand Entity、ContactPoint、Logo、Social Profile 和 Download Resource 时，必须继续遵守 CN First、事实审核和国内 GEO 可引用规则。

### 4.8 Security、Audit 与 Backup 是治理底座

Audit 记录后台写操作和高风险动作。Backup & Restore 负责恢复能力，但恢复不得绕过权限、审计、软删除、Redirect 和 Search Runtime 检查。

## 5. 平台生命周期

公开内容生命周期：

```text
Draft
-> Internal Review
-> Content Approved
-> SEO Approved
-> Release Approved
-> Published
-> Indexed
-> Archived
```

媒体资产生命周期：

```text
Uploaded
-> Reviewing
-> Approved
-> Published
-> Archived
```

线索生命周期：

```text
New
-> Contacted
-> Qualifying
-> Assigned
-> Won
-> Invalid
```

运行时输出生命周期：

```text
Configured
-> Validated
-> Submitted
-> Observed
-> Reconciled
-> Archived
```

所有生命周期变更必须保留责任人、时间、来源和审计记录。

## 6. M3 阶段边界

Governance Note:

M3 Governance Enhancement 用于持续完善 Platform Governance，属于治理演进，不属于新的 Platform Capability。因此它不会改变已冻结 Milestone 编号，也不会改变已冻结模块的历史顺序。

M3 最终路线冻结为：

```text
Website
-> Content
-> SEO / GEO
-> CMS
-> Lead
-> Platform Assets
-> Dealer Center
-> Analytics
-> Security / Permission
-> Platform Freeze Review
-> M4 Platform Runtime
```

M3.6 之后只允许增加 Governance，不允许重新排列 Milestone。

| Stage | 状态 | 边界 |
| --- | --- | --- |
| M3.0 Database Architecture | 已冻结 | 数据模型、ER、索引、生命周期、版本、软删除、多语言和审计字段 |
| M3.1 Authentication & Authorization | 已冻结 | Authentication、Authorization、RBAC、Permission、Role、Resource、Audit、Login Flow、Session、Future SSO |
| M3.2 CMS Architecture | 已冻结 | CMS Resource、Content Type、Field Group、Workflow、Permission Integration、Audit Integration、Import / Export、Future Platform Split |
| M3.3 Media Management Architecture | 已冻结 | Media Entity、Media Metadata、Asset 生命周期、图片版本、ALT 来源、WebP / AVIF 预留、Thumbnail Strategy、Storage Adapter、CDN Boundary、Watermark Strategy、引用关系 |
| M3.4 Lead Center Architecture | 已冻结 | Lead Entity、Lead Type、字段分层、来源归因、生命周期、分配、去重、隐私、导出边界、CRM 输入、权限、审计 |
| M3.5 Platform Assets Architecture | 本轮冻结 | Company Profile、Brand Assets、Social Media Hub、Download Center、Friend Links、Contact Center、System Settings |
| M3 Governance Enhancement | 已完成 | Platform Module Intake Gate、Single Source of Truth 和 Platform Module 归属门禁 |
| M3.6 Dealer Center Architecture | 待启动 | Dealer Entity、Dealer Type、区域关系、招商流程、Lead 分配、CRM 流转、权限边界和生命周期 |
| M3.7 Analytics Architecture | 待启动 | Lead Attribution、Source、UTM、SEO Attribution、Dealer Attribution、Conversion Event 和 CN First 分析边界 |
| M3.8 Security / Permission Architecture | 待启动 | RBAC 复核、Resource / Action / Permission、Audit、隐私、导出、高风险动作和运行时安全边界 |
| M3.9 Platform Freeze Review | 待启动 | Platform Module Registry、模块边界复核、ADR 复核、Runtime 边界、文档漂移和 M4 Readiness |

## 7. ADR 治理规则

ADR 只记录重大平台方向决策。

适合创建 ADR 的事项：

- 改变平台模块边界。
- 改变核心数据模型。
- 改变认证、权限、审计或隐私边界。
- 改变 Runtime 技术选型。
- 改变长期维护成本或部署方式。

不单独创建 ADR 的事项：

- 字段命名微调。
- 上传策略细节。
- 导出格式细节。
- 列表筛选和 UI 操作细节。
- 不改变模块边界的局部实现策略。

ADR 数量必须克制，避免把 ADR 变成重复的治理文档。

## 8. 设计冻结规则

- 每个 M3 阶段先冻结架构和 ADR，再进入运行时代码。
- 架构冻结阶段不得创建页面、CRUD、ORM、迁移、上传接口、后台 UI 或第三方运行集成。
- 涉及公开内容、媒体、SEO、GEO、Lead 或导出时，必须复用 RBAC 和 Audit。
- 涉及产品参数、客户案例、收益、授权范围、市场排名或合作政策时，只能使用已确认事实资料。

## 9. M4 Platform Runtime

M3 只做 Architecture Freeze。真正运行时代码统一进入 M4 Platform Runtime。

M4 统一命名为 Platform Runtime，不拆成 CMS Runtime 或 Website Runtime。M4 运行的是 Website、CMS、Lead、Dealer、Platform Assets、Analytics、SEO Runtime 和 Admin UI 等完整平台能力。

M4 建议顺序：

```text
Prisma
-> Migration
-> Database
-> RBAC
-> CMS
-> Media
-> Lead
-> Platform Assets
-> Dealer
-> Analytics
-> SEO Runtime
-> API
-> Admin UI
```

M4 之前不得提前创建：

- 数据库迁移。
- ORM Model。
- API。
- 后台 UI。
- 文件上传运行时。
- 表单提交运行时。
- 搜索提交运行时。
- 导出运行时。

## 10. 快速阅读路径

Platform 阅读顺序：

1. `README.md`
2. `docs/PLATFORM_ARCHITECTURE.md`
3. `docs/ROADMAP.md`
4. `docs/adr/README.md`

专项阅读顺序：

1. `.ai/AI_PROJECT_OPERATING_SYSTEM.md`
2. `docs/PROJECT_PRD.md`
3. `docs/MILESTONE_MAPPING.md`
4. `docs/DATABASE.md`
5. `docs/AUTH_SYSTEM.md`
6. `docs/CMS_SYSTEM.md`
7. `docs/MEDIA_SYSTEM.md`
8. `docs/LEAD_CENTER.md`
9. `docs/PLATFORM_ASSETS.md`

## 11. 验收标准

- 平台模块关系、模块职责、模块依赖、生命周期和 M3 各阶段边界已在本文档中可读化。
- Platform Module Intake Gate 已明确后续模块必须先判断 Platform Capability、Platform Module 归属和是否纳入本文统一管理。
- 本文档不替代 Database、Auth、CMS、Media、Lead 或 ADR 的详细边界。
- `README.md`、`docs/PROJECT_PRD.md`、`docs/ROADMAP.md`、`docs/TODO.md`、`docs/MEMORY.md`、`CHANGELOG.md` 和治理校验清单已同步。
