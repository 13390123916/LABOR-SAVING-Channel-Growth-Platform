# ADR-0012: Platform Assets Architecture

状态：Accepted

日期：2026-07-21

## Context

M3 Website Platform Foundation 已完成 Database、Authentication、CMS、Media 和 Lead Center 的架构冻结。Architecture Review 已通过后，平台需要继续冻结公共资产层，避免 Company Profile、Brand Assets、Social Media Hub、Download Center、Friend Links、Contact Center 和 System Settings 在后续 Runtime 中散落到 CMS 内容、页面组件、Lead 数据或临时配置中。

当前 Repository 只服务中国大陆 `.cn` 平台。国际 `.com` 未来独立建设，不在当前 Repository 内实现国际化、多语言或 i18n 能力。

## Decision

将 Platform Assets 定义为 Platform Layer 的公共资产和配置领域，并新增 `docs/PLATFORM_ASSETS.md` 作为 M3.5 Platform Assets Architecture Freeze 的专项文档。

Platform Assets 包括：

- Company Profile
- Brand Assets
- Social Media Hub
- Download Center
- Friend Links
- Contact Center
- System Settings

Platform Assets 不属于：

- CMS Content
- Lead Data
- Dealer Data
- Runtime

Platform Assets 必须复用 Database 的稳定 ID、软删除、版本和审计字段，复用 Authentication 的 RBAC、Resource、Action、Permission 和 Audit，并通过 Media Domain 引用文件资产。SEO Runtime 和 GEO Runtime 只能消费已审核、已发布且适用范围匹配的 Platform Assets。

## Consequences

- 后续 M4 Runtime 需要把 Platform Assets 作为独立平台资源接入，不允许把全站 Logo、ICP、联系方式、下载资料、社媒二维码、页脚和默认 SEO 散落在页面或 CMS 文案中。
- Platform Assets 的高风险变更，例如 ICP、Analytics Code、证书、联系方式、下载资料和二维码，必须进入权限控制和审计。
- 当前 Repository 继续保持 CN First Platform，不实现 `.com` 国际平台、多语言字段或 i18n Runtime。
- M3.5 不新增 API、数据库迁移、后台页面、CMS、上传下载运行时、表单提交或统计脚本接入。

## Alternatives Considered

### Fold Platform Assets into CMS Setting

拒绝。CMS Setting 可以维护部分配置，但如果把 Platform Assets 全部并入 CMS，会让企业事实、品牌资产、联系方式、下载资料和社媒入口与普通页面内容混淆，后续难以做权限、审计、SEO/GEO 消费和跨模块引用。

### Treat Platform Assets as Media

拒绝。Media 负责文件实体、授权、版本、ALT、缩略图和 CDN 边界；Platform Assets 负责业务语义、配置和公共事实。Logo 文件可由 Media 管理，但 Logo 的品牌用途、发布状态和全站引用应属于 Platform Assets。

### Implement Runtime Immediately

拒绝。当前仍处于 Architecture Freeze Only 阶段，M4 前不创建 API、ORM、Migration、Admin UI 或运行时代码。
