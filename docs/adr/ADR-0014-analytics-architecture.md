# ADR-0014: Analytics Architecture

状态：Accepted

日期：2026-07-22

## Context

M3 Website Platform Foundation 已完成 Database、Authentication、CMS、Media、Lead Center、Platform Assets 和 Dealer Center 的架构冻结。Architecture Review 已通过后，平台需要冻结 Analytics，避免后续 M4 Platform Runtime 为了 Dashboard、BI、Reporting、Chart 或 Runtime Event System 需求反向修改已冻结的 Website、Lead、Dealer、CMS、Platform Assets、SEO / GEO、RBAC 和 Audit 边界。

Analytics 需要作为平台级 Measurement Capability 先行冻结，确保未来衡量 Lead Attribution、Source、UTM、SEO Attribution、Dealer Attribution 和 Conversion Event 时，只消费已冻结业务事实，不替代事实来源。

## Decision

将 Analytics 定义为 M3.7 Platform Measurement Capability，并新增 `docs/ANALYTICS.md` 作为 Analytics Architecture Freeze 的专项文档。

Analytics 不是：

- BI
- Dashboard
- Reporting
- Chart
- Runtime Event System

M3.7 只冻结 Analytics Position、Responsibility、Measurement Objects、Measurement Flow、Business Metrics、Governance Boundary 和 Runtime Boundary。

M3.7 不新增 API、ORM、Migration、Database、Runtime Event、Dashboard、BI、Reporting、Chart、Admin UI、Analytics Runtime 或 Runtime Code。

## Consequences

- M4 Platform Runtime 必须按已冻结 Measurement Objects 和 Measurement Flow 实现 Analytics，不允许用 Dashboard、BI 或报表需求反向修改 M3.7 架构。
- Analytics 只能消费 Website、Lead、Dealer、CMS、Platform Assets、Product、Solution、Region、Channel、SEO / GEO 和 CRM Future 的已治理事实。
- Analytics 不替代 Dealer Center、Lead Center、CMS、Website、Platform Assets、Authentication、RBAC、Audit 或 CRM Future。
- Analytics 相关高风险查看、导出、配置和未来运行时采集必须遵守 RBAC、Audit、隐私和 CN First Platform 边界。

## Alternatives Considered

### Treat Analytics as Dashboard

拒绝。Dashboard 是展示层，属于 M4 Platform Runtime 或更后阶段。M3.7 只冻结 Measurement Capability。

### Treat Analytics as BI

拒绝。BI 涉及跨系统建模、自由分析和企业级经营分析，超出当前渠道增长平台 M3 Architecture Freeze 范围。

### Treat Analytics as Runtime Event System

拒绝。Runtime Event System 涉及埋点、事件采集、存储、计算和 API，必须延期到 M4 Platform Runtime。
