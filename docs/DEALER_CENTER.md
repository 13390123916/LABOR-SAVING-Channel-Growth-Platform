# Dealer Center

文档职责：冻结 M3.6 Dealer Center Architecture 的 Dealer 平台定位、职责边界、生命周期、模块关系、治理边界、合规原则和 M4 Runtime 边界。架构决策见 `docs/adr/ADR-0013-dealer-center.md`。

## 1. 阶段边界

M3.6 Dealer Center Architecture 只冻结 Dealer Center Domain，不新增 API、不创建数据库迁移、不设计 ORM、不开发后台 UI、不实现 CRM、不开发 Runtime、不提前进入 M4。

本阶段目标：

- 确认 Dealer 是渠道招商核心 Business Object。
- 确认 Dealer 不是 Customer、User、Lead 或 CRM Record。
- 确认 Dealer 与 Lead Center、CRM、Platform Assets、Authentication、RBAC、Analytics 和 Audit 的职责边界。
- 确认 Dealer 生命周期、关系依赖、合规边界和 Runtime Boundary。
- 为 M3.7 Analytics Architecture 提供稳定的 Dealer Attribution 前置对象。

## 2. Dealer Position

Dealer 是平台中的渠道招商核心 Business Object。

Dealer 不是 Customer。Customer 指终端采购、使用或咨询产品和解决方案的企业对象。Dealer 面向渠道合作、代理协作、区域覆盖和长期增长关系。

Dealer 不是 User。User 是后台登录身份，由 Authentication 和 RBAC 管理。Dealer 未来可以关联后台账号或外部协作身份，但 Dealer 本身不是登录主体。

Dealer 不是 Lead。Lead 是一次线索、一次咨询或一次来源归因记录。Dealer 是可被沉淀、审核、维护和长期运营的渠道对象。一个 Dealer 可以由多个 Lead 转化而来，也可以长期产生、承接或分配 Lead。

Dealer 不是 CRM Record。CRM Record 负责销售跟进、沟通动作、任务、商机阶段和结果记录。Dealer 是业务对象，CRM 是未来围绕该对象发生的运营记录系统。

Dealer 的核心职责是承接渠道招商业务中的经销商、代理商、区域合作伙伴、设备贸易商、MRO、自动化集成商和工业机器人集成商等合作对象，定义其合作状态、区域关系、生命周期、线索承接边界、CRM 流转边界、权限接入边界和分析归因基础。

## 3. Dealer Responsibility

属于 Dealer Center：

- Dealer 作为渠道 Business Object 的定义。
- Dealer Type 的业务边界，包括代理商、经销商、区域合作伙伴、集成商、贸易商和 MRO 服务商等。
- Dealer Lifecycle 的状态语义。
- Dealer 与区域、行业、产品兴趣、合作阶段之间的关系边界。
- Dealer 与 Partner Lead 的转化关系。
- Dealer 与 Customer Lead 的承接或分配关系。
- Dealer 与未来 CRM 跟进记录之间的对象边界。
- Dealer 可见性、状态变更、暂停、归档等治理规则。
- Dealer 相关权限、审计、合规和数据导出边界的架构要求。

不属于 Dealer Center：

- 不负责公开页面内容生产，这是 CMS / Website 范围。
- 不负责线索采集表单、线索字段、去重和分配执行，这是 Lead Center 范围。
- 不负责销售跟进记录、回访动作、商机阶段和沟通日志，这是未来 CRM 范围。
- 不负责公司资料、品牌资料、下载资料和联系方式，这是 Platform Assets 范围。
- 不负责登录、Session 和后台用户身份，这是 Authentication 范围。
- 不直接定义 RBAC 实现，只声明 Dealer 资源需要被 RBAC 管控。
- 不负责归因模型、转化事件和报表口径，这是 Analytics 范围。
- 不负责合同、价格、返点、授权书、结算或法务流程。

模块区分：

| Module | 边界 |
| --- | --- |
| Dealer Center | 长期渠道业务对象、合作状态、区域关系、Lead 承接边界和 CRM 流转边界 |
| Lead Center | 线索输入、来源、状态、分配和去重 |
| CRM | 未来销售跟进、沟通记录、商机推进和任务管理 |
| Platform Assets | 品牌、公司、联系方式、下载资源等公共事实资料 |
| Authentication | 后台用户身份与登录 |
| RBAC | 谁能看、改、审核、暂停、归档、导出 Dealer 相关资源 |
| Analytics | Dealer 来源、转化、贡献、区域覆盖和渠道效果分析 |

## 4. Dealer Lifecycle

Dealer 生命周期：

```text
Prospect
-> Qualified
-> Negotiating
-> Approved
-> Active
-> Suspended
-> Archived
```

状态含义：

| Status | 含义 |
| --- | --- |
| Prospect | 潜在渠道对象，可能来自 Partner Lead、展会、人工录入或未来导入，尚未完成资格判断 |
| Qualified | 已完成基础资质或合作匹配度判断，适合进入招商沟通 |
| Negotiating | 正在沟通合作条件、区域、产品方向、服务能力或资料确认 |
| Approved | 已通过内部合作审核，但尚未进入稳定运营状态 |
| Active | 有效合作中的渠道对象，可参与线索承接、区域覆盖、渠道分析和运营复盘 |
| Suspended | 暂缓合作、暂停分配、资料异常或合规原因导致不可继续正常运营 |
| Archived | 历史渠道对象，不再参与分配或运营，仅保留审计和历史归因 |

生命周期只冻结状态语义，不设计数据库字段、状态机代码或后台操作流。

## 5. Dealer Relationship

### 5.1 Website / Lead Center / Dealer Center

Website 产生 Partner Lead 或 Customer Lead。Lead Center 接收并管理线索。符合条件的 Partner Lead 可转化为 Dealer Prospect；Customer Lead 可在未来按规则分配给 Active Dealer。

依赖方向：

```text
Website
-> Lead Center
-> Dealer Center
```

Dealer 消费 Lead，不替代 Lead 采集。

### 5.2 CMS / Website / Dealer Center

CMS 负责招商页、产品页、行业页、FAQ 和下载内容的内容维护。Dealer Center 不生产页面内容，但可引用已审核内容作为渠道沟通和资料支持。

依赖方向：

```text
CMS
-> Website / SEO / GEO
-> Dealer Center
```

### 5.3 Platform Assets / Dealer Center

Platform Assets 提供公司资料、品牌资产、联系方式、下载中心、社媒入口和系统设置。Dealer Center 可以引用这些已审核资产，但不维护品牌公共事实。

依赖方向：

```text
Platform Assets
-> Dealer Center
```

### 5.4 Solution / Product / Industry / Dealer Center

Dealer 可与产品方向、行业解决方案或区域市场覆盖发生关系，用于判断合作适配度和后续分析。Dealer 不定义 Product 参数，也不创造 Solution 或 Industry 内容事实。

依赖方向：

```text
Product / Industry / Solution
-> Dealer Center
```

### 5.5 Dealer Center / Analytics

Analytics 未来消费 Dealer 生命周期、来源、区域、Lead 承接、转化事件和渠道贡献。Analytics 不反向修改 Dealer 事实状态。

依赖方向：

```text
Dealer Center
-> Analytics
```

### 5.6 Dealer Center / CRM

Dealer 是未来 CRM 跟进记录的业务对象来源之一。CRM 记录沟通、拜访、商机、任务和结果。Dealer 不提前承担 CRM 运行时职责。

依赖方向：

```text
Dealer Center
-> CRM
```

### 5.7 Authentication / RBAC / Dealer Center

Authentication 提供后台用户身份。RBAC 判断用户是否可以查看、创建、审核、暂停、归档、导出 Dealer 资源。Dealer 不创建用户体系。

依赖方向：

```text
Authentication
-> RBAC
-> Dealer Center
```

### 5.8 Dealer Center / Audit

Dealer 的状态变更、审核、暂停、归档、导出和高风险修改必须进入 Audit。Audit 记录行为，不决定业务状态。

依赖方向：

```text
Dealer Center
-> Audit
```

## 6. Dealer Governance Boundary

属于 M3.6：

- Dealer 平台定位冻结。
- Dealer 与 Customer / User / Lead / CRM Record 的概念边界冻结。
- Dealer 职责与不负责事项冻结。
- Dealer Lifecycle 状态语义冻结。
- Dealer 与 Website、Lead Center、CMS、Platform Assets、Solution、Analytics、CRM、Authentication、RBAC 和 Audit 的依赖关系冻结。
- Dealer 商业合规边界冻结。
- Dealer Runtime Boundary 冻结。

延期到 M4 Platform Runtime：

- Dealer 数据表、ORM Model、Migration。
- Dealer API。
- Dealer Admin UI。
- Dealer CRUD。
- Dealer 状态机实现。
- Dealer Lead 分配算法。
- Dealer 导入导出运行时。
- Dealer 与 CRM 的实际集成。
- Dealer 权限代码。
- Dealer Audit 写入代码。
- Dealer Analytics 事件采集。
- Dealer 搜索、筛选、报表和后台操作界面。

Runtime Boundary：

M3.6 只做 Architecture Freeze，不创建运行时代码。所有可执行能力统一进入 M4 Platform Runtime，并跟随已冻结架构，不允许 M4 因实现便利反向修改 M3.6 Dealer Architecture。

## 7. Compliance

Dealer Center 必须遵守招商合作合规边界：

- 不承诺收益、回本周期、利润率或保本结果。
- 不承诺独家代理。
- 不承诺区域授权结果。
- 不承诺固定价格政策、返点政策或结算条件。
- 不承诺自动通过审核、自动签约或自动授权。
- 不提前进入合同管理、法务条款、授权书生成或价格体系管理。
- 不编造客户案例、合作数量、市场排名、渠道规模或资质认证。
- 招商表达必须以合作咨询、资质评估、区域沟通、资料审核和总部支持方向为边界。
- Dealer 状态只能代表平台内部业务管理阶段，不代表法律授权、合同生效或商业收益保证。

## 8. Permission Boundary

Dealer Center 只声明资源需要被 RBAC 管控，不在 M3.6 实现权限代码。

后续 Dealer 资源的高风险动作必须进入权限和审计：

- create
- update
- qualify
- approve
- activate
- suspend
- archive
- assign lead
- export

权限实现统一进入 M4 Platform Runtime，并复用 M3.1 Authentication & Authorization。

## 9. Audit Boundary

Dealer 相关高风险行为必须写入 Audit：

- Dealer 创建、更新、资格判断、审核、激活、暂停和归档。
- Dealer 与 Lead 的转化或分配关系变化。
- Dealer 区域关系、合作阶段或资料状态变化。
- Dealer 导出、批量操作和未来 CRM 关联变化。

Audit 只记录行为证据，不替代业务审核和合作决策。

## 10. M4 Platform Runtime 边界

M3.6 之后继续进行 M3.7-M3.9 Architecture Freeze，不进入 Dealer Runtime。

真正运行时代码统一进入 M4 Platform Runtime：

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

M4 前不得创建 Dealer 数据库迁移、ORM、API、后台 UI、CRUD、状态机、Lead 分配算法、CRM 集成、权限代码、审计写入代码、报表或导出运行时。

## 11. M3.6 验收标准

- Architecture Review 已通过，当前 Draft 不再进行非必要调整。
- ADR-0013 Dealer Center Architecture 已 Accepted。
- `docs/DEALER_CENTER.md` 已覆盖 Dealer Position、Dealer Responsibility、Dealer Lifecycle、Dealer Relationship、Dealer Governance Boundary、Compliance 和 Runtime Boundary。
- `docs/PLATFORM_ARCHITECTURE.md` 已将 M3.6 标记为 Dealer Center Architecture Freeze。
- `docs/ROADMAP.md`、`docs/TODO.md`、`CHANGELOG.md` 和治理校验清单已同步。
- 未新增 API、Database Migration、ORM、后台 UI、CRM、Analytics Runtime、Dealer Runtime 或 M4 实现。
