# ADR-0013: Dealer Center Architecture

状态：Accepted

日期：2026-07-22

## Context

M3 Website Platform Foundation 已完成 Database、Authentication、CMS、Media、Lead Center 和 Platform Assets 的架构冻结，并已完成 Repository Context Architecture v1。Architecture Review 已通过后，平台需要冻结 Dealer Center，避免渠道招商对象在后续 Runtime 中被混入 Customer、User、Lead、CRM Record、CMS 内容或 Platform Assets。

Dealer 是渠道招商平台的核心 Business Object。它承接 Partner Lead 的转化、Customer Lead 的未来分配、区域合作关系、渠道运营状态、CRM 流转边界和 Analytics Attribution 前置对象。如果 Dealer 边界不先冻结，M4 Platform Runtime 可能把渠道对象拆散到表单记录、后台账号、销售跟进记录或临时配置中，导致权限、审计、合规和分析口径漂移。

## Decision

将 Dealer Center 定义为 M3.6 Platform Module，并新增 `docs/DEALER_CENTER.md` 作为 Dealer Center Architecture Freeze 的专项文档。

Dealer 被定义为渠道招商核心 Business Object：

- 不是 Customer。
- 不是 User。
- 不是 Lead。
- 不是 CRM Record。

Dealer Center 冻结以下边界：

- Dealer Position
- Dealer Responsibility
- Dealer Lifecycle
- Dealer Relationship
- Dealer Governance Boundary
- Compliance
- M4 Runtime Boundary

Dealer Lifecycle 冻结为：

```text
Prospect
-> Qualified
-> Negotiating
-> Approved
-> Active
-> Suspended
-> Archived
```

M3.6 不新增 API、数据库迁移、ORM、后台 UI、CRM、Analytics Runtime、Dealer Runtime 或任何 M4 实现。

## Consequences

- M4 Platform Runtime 必须把 Dealer 作为独立渠道业务对象实现，不允许用 Lead、User、Customer 或 CRM Record 替代 Dealer。
- Lead Center 继续负责线索输入、来源、状态、分配和去重；Dealer Center 只承接符合条件的渠道对象和后续关系边界。
- CRM 未来围绕 Dealer 记录跟进、沟通、商机和任务，但 CRM 不反向定义 Dealer 的业务身份。
- Analytics 未来消费 Dealer 生命周期、区域关系、Lead 承接和渠道转化事件，但不修改 Dealer 事实状态。
- Dealer 相关高风险动作必须接入 RBAC 和 Audit。
- Dealer Center 不承诺收益、独家代理、区域授权、价格政策、自动签约或合同结果。

## Alternatives Considered

### Treat Dealer as Lead

拒绝。Lead 是一次线索输入或来源记录，Dealer 是长期渠道业务对象。把 Dealer 放进 Lead Center 会导致渠道生命周期、区域关系、权限边界和 Analytics Attribution 无法稳定沉淀。

### Treat Dealer as User

拒绝。User 是登录身份，Dealer 是业务对象。Dealer 未来可以关联外部协作账号，但登录身份不能替代渠道合作对象。

### Treat Dealer as CRM Record

拒绝。CRM Record 记录销售跟进和沟通动作。Dealer 是 CRM 记录围绕的业务对象之一，不应由 CRM 运行时反向定义。

### Implement Dealer Runtime Immediately

拒绝。当前仍处于 Architecture Freeze Only 阶段，M4 前不创建 API、ORM、Migration、Admin UI、状态机、Lead 分配算法、CRM 集成或运行时代码。
