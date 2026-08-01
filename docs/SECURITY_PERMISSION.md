# Security / Permission

文档职责：冻结 M3.8 Security / Permission Architecture 的平台治理定位、职责边界、Security Objects、Security Flow、权限边界、Governance Boundary 和引用关系。架构决策见 `docs/adr/ADR-0015-security-permission-architecture.md`。

## 1. Security Position

Security / Permission 是平台级 Governance Capability，用于冻结平台安全治理边界，确保 Authentication、Authorization、RBAC、Audit、Privacy、Export、Dealer、Lead、Analytics、CMS 和 Platform Assets 在未来运行时实现中遵循统一安全原则。

Security / Permission 不是 Authentication，不负责确认用户身份。

Security / Permission 不是 Login，不负责登录交互、登录态或登录页面。

Security / Permission 不是 Runtime Security，不实现运行时代码、API、Middleware 或权限执行层。

## 2. Responsibility

属于 Security / Permission：

- 复核全平台权限边界。
- 冻结 Resource / Action / Permission 的治理分类。
- 定义高风险动作识别原则。
- 定义 Audit 必须覆盖的行为类型。
- 定义 Privacy 与 Data Access 的平台边界。
- 定义 Export 的权限、审计和风险边界。
- 定义 Lead、Dealer、Analytics、CMS、Platform Assets 的敏感数据访问原则。
- 确保 M4 Runtime 不得绕过 M3 已冻结的 Authentication、Authorization、Audit 和 Privacy 规则。

不属于 Security / Permission：

- 不重新设计 Authentication。
- 不重新设计 Login Flow。
- 不重新设计 Session。
- 不设计 JWT、OAuth 或 SSO。
- 不设计数据库结构。
- 不设计 RBAC 数据模型。
- 不设计 Permission Table。
- 不设计 API。
- 不实现 Runtime Security。
- 不替代具体业务模块的事实来源。

模块边界：

| Module | 边界 |
| --- | --- |
| Authentication | 确认用户身份、Session 策略、Login Flow、Future SSO；Security / Permission 只复核身份结果进入权限治理后的使用方式 |
| RBAC | M3.1 已冻结基础模型；M3.8 只冻结跨模块权限分类和风险边界，不重做数据模型 |
| Audit | 记录后台写操作和高风险动作；M3.8 冻结哪些行为必须审计 |
| Privacy | 冻结个人信息、商业敏感信息和访问最小化边界 |
| Export | 冻结导出权限、审计、范围限制和用途边界 |
| Dealer | 冻结 Dealer 数据访问、区域合作和高风险动作边界 |
| Lead | 冻结 Lead 查看、分配、导出和隐私边界 |
| Analytics | 冻结 Analytics 对授权、脱敏或聚合数据的消费边界 |
| CMS | 冻结内容审核、发布、删除、导入导出等风险动作边界 |
| Platform Assets | 冻结系统设置、品牌资产、联系方式和公共事实变更的高风险边界 |

## 3. Security Objects

M3.8 冻结未来 Security Governance Objects：

| Object | 含义 |
| --- | --- |
| Identity | 进入权限判断的已识别主体 |
| Role | 权限治理中的角色分类 |
| Permission | 对 Resource / Action 的治理许可 |
| Resource | 可受权限治理的稳定对象 |
| Action | 对 Resource 的可治理操作 |
| Scope | 权限生效范围 |
| Ownership | 业务归属与责任边界 |
| Data Access | 数据可访问性与最小化原则 |
| Audit Record | 审计记录 |
| Privacy Object | 隐私治理对象 |
| Export Object | 导出治理对象 |
| High-Risk Action | 高风险动作 |
| Sensitive Data | 敏感数据 |
| Public Data | 公开数据 |
| Internal Data | 内部数据 |
| Business Confidential Data | 商业敏感数据 |
| Approval Record | 审批记录 |
| Access Review | 访问复核 |
| Retention Rule | 保留与归档规则 |
| Security Exception | 安全例外 |

本阶段只定义对象，不设计数据库、字段、索引、API 或 Runtime 实现。

## 4. Security Flow

核心 Security Flow：

```text
Authentication
↓
Authorization
↓
Resource
↓
Audit
↓
Analytics（Future）
```

含义：

- Authentication 只回答“当前操作者是谁”。
- Authorization 基于 Identity、Role、Permission、Resource、Action、Scope 和 Ownership 判断是否允许操作。
- Resource 是权限判断的稳定对象，不随页面名称变化。
- Audit 记录被允许执行的后台写操作、高风险动作、权限变更、导出、删除、恢复和安全异常。
- Analytics 未来只能消费经过授权、审计、脱敏或聚合后的安全事件与业务事件，不得成为绕过权限查看敏感数据的入口。

该 Flow 是治理依赖，不是 Runtime 实现流程图。

## 5. Permission Boundary

M3.8 冻结权限分类，不设计权限代码。

基础权限分类：

- 查看：访问列表、详情、配置、审计摘要或有限字段。
- 创建：创建草稿、记录、配置项或业务对象。
- 修改：修改非发布状态内容、运营字段或业务状态。
- 审核：批准内容、SEO、GEO、发布、权限变更或高风险业务动作。
- 发布：使内容、资料、Schema、Redirect 或公共输出进入公开状态。
- 导入：批量引入内容、媒体、线索或配置，属于高风险动作。
- 导出：导出 Lead、Dealer、Analytics、SEO/GEO、内容或审计数据，属于高风险动作。
- 删除：软删除、归档、撤回或下架对象，属于风险动作。
- 恢复：恢复归档、软删除或撤回对象，属于高风险动作。
- 分配：分配 Lead、Dealer、负责人、区域或跟进任务，属于业务风险动作。
- 管理：管理 User、Role、Permission、Setting、Retention、Security Exception，属于最高风险动作。

高风险动作包括：

- Permission / Role 变更
- User 管理
- Lead 导出
- Dealer 区域或合作状态变更
- Analytics 明细访问或导出
- Public content publish
- SEO / GEO / Schema publish
- Redirect publish
- System Setting 修改
- Contact / Brand / Download 公共事实修改
- 删除、恢复、批量导入、批量导出
- Audit retention 或归档策略修改

所有高风险动作必须具备显式授权、审计记录和可追溯责任人。

## 6. Governance Boundary

属于 M3.8：

- Security / Permission 架构定位
- Security Governance Objects 定义
- 跨模块 Permission Boundary
- Audit 覆盖边界
- Privacy 边界
- Export 风险边界
- High-Risk Action 分类
- Analytics future consumption boundary
- M3 / M4 安全治理分界
- 是否需要 ADR 的判断
- 文档同步和治理校验计划

属于 M4：

- Runtime 权限校验代码
- ORM / Migration
- RBAC 数据表
- Permission Table
- API middleware
- Admin UI 权限控制
- Login / Session / JWT / OAuth / SSO 实现
- Export runtime
- Audit runtime
- Analytics event runtime
- Security monitoring runtime
- Access review runtime

M4 必须跟随 M3.8 冻结后的安全治理边界，不得通过实现细节反向修改 M3 Architecture Freeze。

## 7. References

- `docs/PLATFORM_ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/TODO.md`
- `docs/AUTH_SYSTEM.md`
- `docs/DEALER_CENTER.md`
- `docs/LEAD_CENTER.md`
- `docs/CMS_SYSTEM.md`
- `docs/PLATFORM_ASSETS.md`
- `docs/ANALYTICS.md`
- `docs/adr/ADR-0015-security-permission-architecture.md`

## 8. M3.8 验收标准

- Architecture Review 已通过，当前 Draft 不再进行非必要调整。
- ADR-0015 Security / Permission Architecture 已 Accepted。
- `docs/SECURITY_PERMISSION.md` 已覆盖 Position、Responsibility、Security Objects、Security Flow、Permission Boundary、Governance Boundary 和 References。
- `docs/PLATFORM_ARCHITECTURE.md` 已将 M3.8 标记为 Security / Permission Architecture Freeze。
- `docs/ROADMAP.md`、`docs/TODO.md`、`CHANGELOG.md` 和治理校验清单已同步。
- 未新增 API、ORM、Migration、Database、RBAC 数据模型、Permission Table、Login、Session、JWT、OAuth 或 Runtime Code。
