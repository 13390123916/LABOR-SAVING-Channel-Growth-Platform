# ADR-0015: Security / Permission Architecture

状态：Accepted

日期：2026-07-22

## Context

M3 Website Platform Foundation 已完成 Database、Authentication、CMS、Media、Lead Center、Platform Assets、Dealer Center 和 Analytics 的架构冻结。Architecture Review 已通过后，平台需要冻结 Security / Permission，避免后续 M4 Platform Runtime 为了权限代码、导出、审计、隐私、风控或安全监控需求反向修改已冻结的 Authentication、RBAC、Audit、Lead、Dealer、CMS、Platform Assets 和 Analytics 边界。

Security / Permission 需要作为平台级 Governance Capability 先行冻结，确保未来对查看、创建、修改、审核、导出、删除和高风险动作的治理边界一致，不把 Runtime Security、Login、Session、JWT、OAuth 或 Permission Table 误当成 M3.8 架构内容。

## Decision

将 Security / Permission 定义为 M3.8 Platform Governance Capability，并新增 `docs/SECURITY_PERMISSION.md` 作为 Security / Permission Architecture Freeze 的专项文档。

Security / Permission 不是：

- Authentication
- Login
- Session
- JWT
- OAuth
- Runtime Security

M3.8 只冻结 Security Position、Responsibility、Security Objects、Security Flow、Permission Boundary 和 Governance Boundary。

M3.8 不新增 API、ORM、Migration、Database、RBAC 数据模型、Permission Table、Login、Session、JWT、OAuth 或 Runtime Code。

## Consequences

- M4 Platform Runtime 必须按已冻结的安全治理边界实现权限校验、导出、审计和隐私控制，不允许用实现细节反向修改 M3.8 架构。
- Security / Permission 只能冻结治理对象、分类和边界，不替代 Authentication、RBAC、Audit、Lead、Dealer、CMS、Platform Assets 或 Analytics 的事实来源。
- 高风险动作必须显式授权并进入审计与责任追溯。
- Analytics 未来只能消费经过授权、审计、脱敏或聚合后的数据，不得成为权限绕行入口。

## Alternatives Considered

### Treat Security / Permission as Authentication

拒绝。Authentication 只负责确认用户是谁，Security / Permission 冻结的是跨模块治理边界。

### Treat Security / Permission as Runtime Security

拒绝。Runtime Security 需要依赖 M4 实现，不属于 Architecture Freeze。

### Treat Security / Permission as RBAC Data Model

拒绝。RBAC 数据模型属于实现层，不在 M3.8 定义。
