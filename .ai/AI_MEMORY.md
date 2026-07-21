# AI Memory

## 已确认原则

- 项目优先服务渠道合作
- 不承诺收益
- 不编造案例
- 不编造参数
- 不使用 Google SEO 作为默认设计

## 已确认技术方向

- Next.js
- TypeScript
- TailwindCSS
- Node.js
- MySQL
- Docker
- GitHub Actions

## 已确认长期模块

- Website
- SEO
- GEO
- CRM
- Partner
- Marketing
- Knowledge Base
- Dashboard

## 当前任务

M2 Channel Growth Foundation 已冻结为 v1.0，核心 Collection Rendering 机制已验证。M3.0 Database Architecture 已完成设计冻结，数据库优先采用 MySQL，采用内部自增 ID + 稳定 `entity_id`，公开内容默认软删除并保留版本、审计和 `locale` 扩展字段。M3.1 Authentication & Authorization 已完成架构冻结，首期后台采用服务端 Session 和 RBAC，不直接写登录或后台代码。M3.2 CMS Architecture 已完成架构冻结，CMS 采用 Entity-first 内容管理模型，不直接写 CRUD 或后台 UI。M3.3 Media Management Architecture 已完成架构冻结，Media Domain 覆盖 Media Entity、Metadata、Asset 生命周期、图片版本、ALT 来源、WebP / AVIF、缩略图、Storage Adapter、CDN Boundary、水印和引用关系，不直接写上传运行时。M3.4 Lead Center Architecture 已完成架构冻结，Lead Domain 覆盖线索类型、字段分层、来源归因、生命周期、分配、去重、隐私、导出、CRM 输入、权限和审计，不直接写表单提交或 CRM 后台。M3.5 Platform Assets Architecture 已完成架构冻结，Platform Assets 属于 Platform Layer，不是 CMS Content、Lead Data、Dealer Data 或 Runtime；当前 Repository 只服务中国大陆 `.cn`，国际 `.com` 未来独立建设，不实现国际化、多语言或 i18n。M3.6-M3.9 继续架构冻结，Prisma、Migration、Database、RBAC、CMS、Media、Lead、Platform Assets、SEO Runtime、API 和 Admin UI 统一进入 M4 Platform Runtime。M2.4.5.3.5 的首个产品发布验收作为跨阶段质量门禁保留。

后续所有 Platform Module 必须以 `docs/PLATFORM_ARCHITECTURE.md` 为唯一平台结构入口和 Single Source of Truth，先判断是否属于 Platform Capability、归属哪个 Platform Module、是否纳入 Platform Architecture 统一管理，再更新专项文档或进入实现。
