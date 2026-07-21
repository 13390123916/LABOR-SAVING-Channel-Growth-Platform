# ADR-0009: Authentication and Authorization

状态：Accepted

日期：2026-07-21

## 背景

M3.0 Database Architecture 已通过 ADR-0008 和 `docs/DATABASE.md` 完成设计冻结。下一阶段进入 M3.1 Authentication & Authorization。若直接开发登录页、JWT、接口或后台页面，Role、Permission、Resource、Audit 和 Session 策略会在实现中反复调整，影响后续 CMS、Lead、Media、Search Runtime 和 Analytics。

M3.1 必须先冻结认证授权架构，再进入代码实现。

## 决策

M3.1 Authentication & Authorization 只冻结架构设计，不创建登录页、不实现认证 API、不接入 ORM、不创建数据库迁移、不开发后台 UI。

后台认证首期采用服务端 Session，浏览器只保存 Session ID Cookie。Cookie 必须启用 HttpOnly、Secure 和 SameSite。纯 JWT 不作为 Admin 后台默认登录态；JWT 可作为后续 Partner Portal、开放 API 或第三方集成的单独 ADR 议题。

授权模型采用 RBAC：

```text
User
-> UserRole
-> Role
-> RolePermission
-> Permission
-> Resource + Action
```

所有权限默认拒绝，只有显式授权才允许操作。每个后台请求必须校验当前 User 对指定 Resource 和 Action 的权限，不能只在前端隐藏入口。

## Role

首期角色冻结为：

- Super Admin
- Admin
- Editor
- SEO
- Sales
- Partner Manager

角色层级只表达治理权重，不自动继承所有权限。具体授权必须通过 `role_permissions` 显式配置。

## Resource

所有后台可操作对象统一作为 Resource：

- Product
- Industry
- Article
- Partner
- Lead
- Media
- Download
- FAQ
- Navigation
- SEO Metadata
- Schema Metadata
- Redirect
- Setting
- User
- Role
- Permission
- Audit Log
- Search Runtime

后续新增 CMS 或 Runtime 模块前，必须先登记 Resource 和 Permission，不得把权限写死在页面或接口中。

## Permission

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

`publish`、`approve`、`export`、`import`、`assign`、`manage` 属于高风险动作，必须独立授权并进入 Audit Log。

## Audit

Auth 审计字段冻结为：

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

Audit Log 必须记录登录、登出、登录失败、密码修改、用户角色权限变更、内容写操作、approve、publish、Lead assign/export、Media publish、Search Runtime submit 和 Setting update。

Audit Log 不允许业务后台编辑或软删除。

## Session

Session 策略：

- 服务端保存 Session。
- Cookie 只保存 Session ID。
- Cookie 必须使用 HttpOnly、Secure、SameSite。
- 登录成功后创建新 Session。
- 登出、密码修改、权限变更、用户禁用后必须使相关 Session 失效。
- 同时保留 idle timeout 和 absolute timeout。
- 高风险操作后续可要求重新认证。

## Future SSO

M3.1 不实现 SSO、OAuth2、OIDC、SAML、企业微信或飞书登录。

未来扩展原则：

- SSO 只解决 Authentication，不绕过 Authorization。
- 外部身份必须映射到内部 User、Role、Permission。
- 外部登录事件必须进入 Audit Log。
- Admin 后台与 Partner Portal 身份体系不得混用。

## 后果

- CMS、Lead、Media、Search Runtime 和 Analytics 可以共享同一权限模型。
- 后续后台不会把权限散落在页面、按钮或接口中。
- 服务端 Session 更适合作为首期 Admin 后台登录态，便于集中失效、审计和高风险操作控制。
- RBAC 简单、可审计、便于运营理解；若后续出现区域、归属、客户经理等复杂授权，可在 scope 或 ABAC 扩展中补充。

## 替代方案

### 纯 JWT 后台登录

JWT 适合开放 API 或跨服务集成，但后台管理系统需要集中失效、权限变更即时生效和审计追踪。M3.1 不把 JWT 作为 Admin 默认登录态。

### 只用角色写死权限

写死角色权限实现快，但会导致 CMS、Lead、Media 和 Search Runtime 后续难以维护。M3.1 必须使用 Resource + Action 的 Permission 模型。

### 立即实现 SSO

SSO 对企业集成有价值，但当前阶段优先冻结内部后台身份和权限模型。SSO 后续通过单独 ADR 扩展。
