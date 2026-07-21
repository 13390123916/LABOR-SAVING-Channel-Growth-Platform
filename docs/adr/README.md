# Architecture Decision Records

本目录用于记录影响长期架构、数据模型、运行平台和维护成本的不可逆决策。ADR 不重复描述实现细节，而是记录背景、决定、后果与替代方案。

| ADR | 状态 | 决策 |
| --- | --- | --- |
| ADR-0001 | Accepted | 冻结 M2 v1.0，并采用 Mapping 迁移至 M3 Website Platform Foundation |
| ADR-0002 | Planned | Entity First |
| ADR-0003 | Planned | Metadata Builder |
| ADR-0004 | Planned | Schema Builder |
| ADR-0005 | Planned | Publishing Gate |
| ADR-0006 | Planned | Search Runtime |
| ADR-0007 | Accepted | CMS Architecture |
| ADR-0008 | Accepted | Database Model |
| ADR-0009 | Accepted | Authentication & Authorization |
| ADR-0010 | Accepted | Media Management Architecture |
| ADR-0011 | Accepted | Lead Center Architecture |

ADR 只记录重大平台方向决策。只有改变平台模块边界、核心数据模型、认证授权、审计隐私、Runtime 技术选型或长期维护成本时，才创建后续 ADR，避免把 ADR 变成重复的治理文档。字段微调、上传策略细节、导出格式、列表筛选和不改变模块边界的局部实现策略不单独创建 ADR。

## Accepted ADR

- `ADR-0001-m2-freeze-and-m3-platform-foundation.md`
- `ADR-0007-cms-architecture.md`
- `ADR-0008-database-model.md`
- `ADR-0009-authentication-and-authorization.md`
- `ADR-0010-media-management.md`
- `ADR-0011-lead-center.md`
