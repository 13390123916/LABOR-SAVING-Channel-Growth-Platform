# Authentication & Authorization System

文档职责：冻结 M3.1 Authentication & Authorization 的认证、授权、RBAC、权限矩阵、资源模型、审计、登录流程、Session 和未来 SSO 扩展边界。架构决策见 `docs/adr/ADR-0009-authentication-and-authorization.md`。

## 1. 阶段边界

M3.1 Authentication & Authorization 先冻结架构设计，不写登录页面、不创建认证 API、不接入 ORM、不实现后台 UI。

执行顺序：

```text
Role
-> Permission
-> Resource
-> RBAC
-> Audit
-> Authentication
-> Authorization
-> Session
-> Admin UI
```

本阶段产出：

- 角色模型
- 资源模型
- 权限动作
- RBAC 关系
- 权限矩阵
- 审计字段
- 登录流程
- Session 策略
- Future SSO 扩展边界

## 2. 核心原则

- 后台权限服务 Platform Engineering，不服务临时页面。
- 默认拒绝访问，只有显式授权才允许操作。
- 每个后台请求都必须校验权限，不能只在前端隐藏按钮。
- 最小权限原则优先于操作便利。
- Super Admin 用于系统治理，不用于日常内容编辑。
- Publish、Approve、Export、Import 属于高风险动作，必须单独授权和审计。
- 认证只证明用户是谁；授权决定用户能做什么。
- 所有后台写操作必须进入 Audit Log。
- M3.1 不实现 SSO、OAuth2、OIDC，但保留扩展边界。

## 3. Authentication

Authentication 负责确认后台用户身份。

M3.1 决策：

- 首期后台采用用户名或邮箱 + 密码登录。
- 后台认证优先采用服务端 Session，不采用纯前端 JWT 作为后台默认登录态。
- 密码只保存强哈希结果，不保存明文。
- 登录失败必须记录审计与风控计数。
- 高权限角色后续必须支持 MFA，本阶段只冻结字段与流程预留。

后续实现字段预留：

```text
users.id
users.email
users.phone
users.display_name
users.password_hash
users.password_changed_at
users.mfa_enabled
users.status
users.last_login_at
users.created_at
users.updated_at
users.deleted_at
```

禁止：

- 在客户端长期保存明文 token。
- 将用户角色写死在前端代码。
- 使用共享管理员账号。
- 用是否登录替代权限判断。

## 4. Authorization

Authorization 负责判断当前用户是否可对某个 Resource 执行某个 Action。

权限判断输入：

```text
user
roles
resource
action
resource_scope
ownership
status
```

基础规则：

- 未登录：拒绝。
- 无角色：拒绝。
- 无权限：拒绝。
- 资源已归档或软删除：只允许具备恢复或审计权限的角色查看。
- Publish / Approve / Export / Import 必须显式授权。
- Lead、Audit Log、Setting 默认更严格，不继承内容编辑权限。

## 5. RBAC

M3.1 采用 RBAC 作为首期权限模型。

核心关系：

```text
User
↓
UserRole
↓
Role
↓
RolePermission
↓
Permission
↓
Resource + Action
```

数据库模型预留：

```text
users
roles
permissions
resources
user_roles
role_permissions
sessions
login_events
audit_logs
```

RBAC 不处理复杂业务所有权时，后续可在 Permission 上叠加 scope：

```text
global
own
assigned
department
region
readonly
```

## 6. Role

首期角色：

| Role | 定位 |
| --- | --- |
| Super Admin | 系统最高治理角色，管理用户、角色、权限、设置和紧急恢复 |
| Admin | 平台管理员，负责 CMS、内容、媒体、导航和常规运行配置 |
| Editor | 内容编辑，负责 Article、FAQ、Download、Product 草稿和内容维护 |
| SEO | SEO/GEO 运营，负责 Metadata、Schema、Redirect、sitemap 和 Search Runtime 配置 |
| Sales | 销售跟进，负责 Lead 查看、分配后跟进、状态更新和导出受限字段 |
| Partner Manager | 渠道经理，负责 Partner、Partner Lead、合作模式与渠道资源维护 |

角色层级只表达默认权重，不代表自动继承所有权限。继承关系必须通过 `role_permissions` 显式配置。

## 7. Permission

权限由 Resource + Action 组成。

标准 Action：

```text
create
read
update
delete
publish
approve
export
import
assign
restore
manage
```

动作含义：

| Action | 含义 |
| --- | --- |
| create | 创建草稿或后台记录 |
| read | 查看列表、详情或配置 |
| update | 修改草稿或可编辑字段 |
| delete | 软删除或归档 |
| publish | 发布到公开页面或运行时输出 |
| approve | 审核内容、SEO、上线或权限变更 |
| export | 导出 Lead、SEO/GEO 资产或内容数据 |
| import | 导入内容、媒体或批量数据 |
| assign | 分配 Lead、任务或负责人 |
| restore | 恢复归档或软删除记录 |
| manage | 管理系统级配置、用户、角色或权限 |

## 8. Resource

所有后台可操作对象统一作为 Resource。

首期 Resource：

```text
Product
Industry
Article
Partner
Lead
Media
Download
FAQ
Navigation
SEO Metadata
Schema Metadata
Redirect
Setting
User
Role
Permission
Audit Log
Search Runtime
```

资源规则：

- Resource 名称必须稳定，不随页面名称变化。
- Resource 关联 Entity 时，必须通过 `entity_id` 追溯业务对象。
- Audit Log 只允许 read，不允许 update 或 delete。
- Setting、User、Role、Permission 只允许 Super Admin 和受限 Admin 管理。

## 9. Permission Matrix

| Resource / Role | Super Admin | Admin | Editor | SEO | Sales | Partner Manager |
| --- | --- | --- | --- | --- | --- | --- |
| Product | manage | create/read/update/delete/publish | create/read/update | read/update/approve | read | read |
| Industry | manage | create/read/update/delete/publish | create/read/update | read/update/approve | read | read |
| Article | manage | create/read/update/delete/publish | create/read/update | read/update/approve | read | read |
| Partner | manage | create/read/update/delete/publish | read/update | read/update/approve | read | create/read/update/publish |
| Lead | manage | read/update/export/assign | none | read | read/update/export assigned | read/update/export/assign partner |
| Media | manage | create/read/update/delete/publish | create/read/update | read/update/approve | read | create/read/update |
| Download | manage | create/read/update/delete/publish | create/read/update | read/update/approve | read | read/update |
| FAQ | manage | create/read/update/delete/publish | create/read/update | read/update/approve | read | read/update |
| Navigation | manage | create/read/update/delete/publish | read | read/update/approve | none | read |
| SEO Metadata | manage | read/update/publish | read | create/read/update/approve/publish | none | read |
| Schema Metadata | manage | read/update/publish | read | create/read/update/approve/publish | none | read |
| Redirect | manage | create/read/update/delete/publish | none | create/read/update/approve/publish | none | none |
| Setting | manage | read/update limited | none | read limited | none | none |
| User | manage | read limited | none | none | none | none |
| Role | manage | read | none | none | none | none |
| Permission | manage | read | none | none | none | none |
| Audit Log | read/export/manage retention | read | none | read own actions | read own actions | read own actions |
| Search Runtime | manage | read/update | none | create/read/update/approve/publish | none | none |

矩阵说明：

- `none` 表示默认无权限。
- `assigned` 表示只能访问分配给自己的 Lead。
- `partner` 表示只能访问 Partner Lead 或渠道相关资源。
- `limited` 表示必须在实现阶段列出具体字段，不允许笼统放权。

## 10. Audit

审计是 M3.1 的硬性边界，后台写操作不得绕过。

业务表审计字段：

```text
created_by
updated_by
deleted_by
published_by
approved_by
created_at
updated_at
deleted_at
published_at
approved_at
```

Audit Log 字段：

```text
id
actor_id
actor_role_ids
action
resource
resource_id
entity_id
before_json
after_json
ip_address
user_agent
request_id
created_at
```

必须记录：

- 登录成功和失败。
- 登出。
- 密码修改。
- 用户、角色、权限变更。
- 内容 create/update/delete/restore。
- approve/publish。
- Lead assign/export。
- Media publish。
- Search Runtime submit。
- Setting update。

Audit Log 不允许后台编辑或软删除。保留周期、归档和导出策略进入 M3.3 Runtime Platform。

## 11. Login Flow

后台登录流程：

```text
Open Admin Login
↓
Submit username/email + password
↓
Rate limit and login risk check
↓
Verify user status
↓
Verify password hash
↓
Optional MFA challenge
↓
Create server-side session
↓
Set secure session cookie
↓
Record login event
↓
Redirect to admin dashboard
```

失败处理：

- 不提示账号是否存在。
- 记录登录失败事件。
- 达到阈值后临时限制。
- 高权限账户失败频繁时触发通知预留。

## 12. Session

后台 Session 策略：

- 服务端保存 Session。
- 浏览器只保存 Session ID Cookie。
- Cookie 必须使用 HttpOnly、Secure、SameSite。
- Session ID 登录后生成，权限变化、密码变化、退出登录后失效。
- 空闲超时和绝对过期时间必须同时存在。
- 高风险操作可要求重新认证。

M3.1 不采用纯 JWT 作为后台默认 Session。JWT 可用于后续 API、Partner Portal 或第三方集成，但必须另行评估失效、刷新、存储和审计策略。

## 13. Future SSO

M3.1 不实现 SSO。

未来扩展方向：

- OAuth2
- OIDC
- 企业微信登录
- 飞书登录
- SAML
- Partner Portal 独立身份体系

扩展原则：

- SSO 只替代 Authentication，不绕过 Authorization。
- 外部身份必须映射到内部 User、Role、Permission。
- 外部登录事件必须进入 Audit Log。
- Partner Portal 与 Admin 后台权限不得混用。

## 14. Database Relation

M3.1 与 M3.0 Database Architecture 的关系：

```text
users
↓
user_roles
↓
roles
↓
role_permissions
↓
permissions
↓
resources
```

业务表统一使用：

```text
created_by -> users.id
updated_by -> users.id
deleted_by -> users.id
published_by -> users.id
approved_by -> users.id
```

Auth 实现不得改变 M3.0 已冻结的 Entity ID、slug、soft delete、version、locale 和 publishing lifecycle 语义。

## 15. Security Reference

M3.1 安全边界参考：

- OWASP Authorization Cheat Sheet：least privilege、deny by default、每次请求校验权限。
- OWASP Session Management Cheat Sheet：Session ID 保护、HttpOnly、Secure Cookie。
- OWASP CSRF Prevention Cheat Sheet：SameSite Cookie、Origin 校验和高风险操作保护。

## 16. M3.1 验收标准

- ADR-0009 Authentication & Authorization 已 Accepted。
- `docs/AUTH_SYSTEM.md` 已覆盖 Authentication、Authorization、RBAC、Permission、Role、Resource、Audit、Login Flow、Session 和 Future SSO。
- `docs/ROADMAP.md`、`docs/TODO.md`、`docs/MEMORY.md`、`CHANGELOG.md` 已同步。
- `scripts/validate-website-governance.mjs` 已纳入 Auth System 与 ADR-0009。
- 未创建登录页、认证 API、Session 代码、JWT、ORM、数据库迁移或后台 UI。
- Governance、Product Rendering、TypeScript、ESLint 和 Build 验证通过。
