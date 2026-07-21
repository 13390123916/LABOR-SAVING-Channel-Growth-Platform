# Project PRD

当前阶段补充：M2.4.5.3.5 First Published Product Acceptance 以首个真实 Product Entity 的完整发布验收闭环为目标，而非为 LS70 创建测试页面。只有 `published + schemaEligible + contentValidated + releaseApproved` 同时满足时，才允许输出 Detail URL、Product Schema、sitemap 和 Related Product。

项目名称：LABOR-SAVING Channel Growth Platform（雷普赛维渠道增长平台）

文档职责：项目长期需求主文档

当前阶段：M3 Website Platform Foundation 进行中；`docs/PLATFORM_ARCHITECTURE.md` 是整个 Platform 的唯一平台结构入口和 Single Source of Truth。M3.0 Database Architecture 已完成设计冻结，见 ADR-0008 与 `docs/DATABASE.md`；M3.1 Authentication & Authorization 已完成架构冻结，见 ADR-0009 与 `docs/AUTH_SYSTEM.md`；M3.2 CMS Architecture 已完成架构冻结，见 ADR-0007 与 `docs/CMS_SYSTEM.md`；M3.3 Media Management Architecture 已完成架构冻结，见 ADR-0010 与 `docs/MEDIA_SYSTEM.md`；M3.4 Lead Center Architecture 已完成架构冻结，见 ADR-0011 与 `docs/LEAD_CENTER.md`；M3.5 Platform Assets Architecture 已完成架构冻结，见 ADR-0012 与 `docs/PLATFORM_ASSETS.md`；M3 Governance Enhancement 已完成 Platform Module Intake Gate。M2 Channel Growth Foundation 已冻结为 v1.0，未执行的 M2.6-M2.8 通过 `docs/MILESTONE_MAPPING.md` 映射至 M3。后续路线为 M3.6 Dealer Center、M3.7 Analytics、M3.8 Security / Permission、M3.9 Platform Freeze Review，真正运行时代码统一进入 M4 Platform Runtime。后续所有 Platform Module 必须先判断 Platform Capability、Platform Module 归属和是否纳入 Platform Architecture 统一管理。平台采用 Freeze First, Runtime Later；M3 冻结 Platform Capability、Architecture Boundary、Governance 和 Documentation，M4 负责 Runtime Implementation，不因 Runtime 实现细节修改 M3 Architecture Freeze。

## 1. 项目定位

本项目是工业装备渠道增长平台，不是普通企业官网。

网站只是整个增长系统的一部分。长期系统将包括：

- Website 官网
- SEO 中国搜索引擎优化
- GEO 国内 AI 搜索优化
- CRM 询盘管理
- Partner 加盟合作与代理协作
- Marketing 内容营销
- Knowledge Base AI 知识库
- Dashboard 运营后台

## 2. 商业目标

### Priority 1：加盟合作

面向 B 端经销商、代理商、MRO、自动化集成商、工业机器人集成商和设备贸易商，获取渠道合作线索。

### Priority 2：终端客户询盘

面向终端制造企业，获取产品咨询、选型咨询、工况咨询和报价线索。

### Priority 3：品牌建设

通过中国 SEO、国内 AI 搜索优化和内容营销建立品牌搜索资产。

## 3. 目标客户

重点客户：

- 液压扭矩扳手代理商
- 液压拉伸器代理商
- 工业工具代理商
- 自动化集成商
- 工业机器人集成商
- MRO
- 设备贸易商

其次客户：

- 终端制造企业
- 工厂设备负责人
- 检修维护负责人
- 采购负责人

## 4. 当前产品范围

- LS40 助力机械臂
- L60 助力机械臂
- SQ35 气动平衡器
- SQ50 气动平衡器

产品资料不足时，不得编造参数、案例、收益、授权范围和市场排名。

## 5. SEO 原则

只按中国搜索环境设计，重点考虑：

- 百度
- 360
- 搜狗
- 神马
- 微信搜一搜
- 知乎
- 抖音
- 小红书

不以 Google SEO 作为默认设计依据。

## 6. GEO 原则

重点面向：

- DeepSeek
- 豆包
- 腾讯元宝
- Kimi
- 通义千问

内容必须结构化、事实型、可引用、可总结。

## 7. 技术栈方向

- Next.js
- TypeScript
- TailwindCSS
- Node.js
- MySQL
- Docker
- GitHub Actions

## 7.1 M3.0 Database Architecture

M3.0 不直接写数据库代码，先冻结数据库设计。

已确认：

- 主业务数据库优先采用 MySQL。
- Entity 与业务表采用统一 Entity Layer + 类型表关系。
- 内部数据库主键可使用自增 `id`，跨 CMS、CRM、Analytics、Search Runtime 和 Frontend 的稳定业务键使用 `entity_id`。
- 当前不默认采用 UUID；如未来出现跨系统离线写入、多地域合并或公开 API 暴露 ID 需求，再通过 ADR 评估。
- 公开内容默认软删除，使用 `deleted_at`，已发布页面下线必须同步 Redirect、sitemap、robots 和 Search Runtime。
- 所有可公开内容保留 `version`、`locale`、`created_at`、`updated_at`、`published_at`、`created_by`、`updated_by`、`published_by` 等字段。
- Slug 不作为业务主键，唯一约束必须按 Entity Type、Category、Locale 或父级作用域限定。

## 7.2 M3.1 Authentication & Authorization

M3.1 不直接写登录或后台代码，先冻结认证授权设计。

已确认：

- 首期 Admin 后台采用服务端 Session，不采用纯 JWT 作为默认登录态。
- 权限模型采用 RBAC：User -> UserRole -> Role -> RolePermission -> Permission -> Resource + Action。
- 首期角色为 Super Admin、Admin、Editor、SEO、Sales、Partner Manager。
- 所有后台资源统一登记为 Resource，不允许把权限写死在页面或接口中。
- Publish、Approve、Export、Import、Assign、Manage 属于高风险动作，必须单独授权并审计。
- M3.1 不实现 SSO、OAuth2、OIDC、SAML、企业微信或飞书登录，但保留扩展边界。

## 7.3 M3.2 CMS Architecture

M3.2 不直接写 CMS 页面、CRUD、富文本、ORM 或迁移，先冻结内容管理架构。

已确认：

- CMS 采用 Entity-first 内容管理模型。
- CMS 必须复用 M3.0 的 `entity_id`、soft delete、version、locale 和 audit fields。
- CMS 必须复用 M3.1 的 RBAC、Resource、Action、Permission 和 Audit。
- 首期 CMS Resource 为 Product、Industry、Article、Partner、FAQ、Download、Navigation、SEO Metadata、Schema Metadata、Redirect、Setting。
- CMS 不吞并 Media Management、Lead Center、SEO Runtime、GEO Runtime、Audit Center、Backup & Restore。
- CMS 工作流沿用 Draft -> Internal Review -> Content Approved -> SEO Approved -> Release Approved -> Published -> Indexed -> Archived。

## 7.4 M3.3 Media Management Architecture

M3.3 不直接写文件上传、图库 UI、ORM、迁移、裁切转码或 CDN 接入，先冻结 Media Domain。

已确认：

- 平台能力总览采用 Database -> Authentication -> CMS -> Media -> Lead Center -> SEO Runtime -> GEO Runtime -> Audit -> Backup -> Deployment & Analytics 的模块关系。
- Media 是独立 Entity 类型，不是 CMS 的临时附件字段。
- Media Metadata 覆盖标题、ALT、ALT 来源、caption、描述、比例、方向、主色、来源、授权、用途和合规备注。
- Asset 生命周期采用 Uploaded -> Reviewing -> Approved -> Published -> Archived。
- 图片版本区分 original、optimized、thumbnail、open_graph、square、wide、print、watermarked。
- ALT 必须标记来源，公开页面优先使用 `seo_reviewed` 或 `manual`。
- WebP 作为首期前台优化格式预留，AVIF 作为未来格式预留。
- Storage Adapter 与 CDN Boundary 先冻结边界，不绑定具体存储或 CDN 服务。
- Media 引用关系必须覆盖 Product、Industry、Article、Partner、Case、Download、FAQ、SEO Metadata、Schema Metadata 和 GEO Runtime。

## 7.5 M3.4 Lead Center Architecture

M3.4 不直接写表单提交、CRM 后台、ORM、迁移、通知、导出运行时、API 或 Admin UI，先冻结 Lead Domain。

已确认：

- Lead 是业务数据入口，不是普通表单记录。
- 首期 Lead 类型包括 Partner Lead、Customer Lead、Manual Lead 和 Imported Lead。
- Partner Lead 优先级高于 Customer Lead，符合加盟合作优先的商业顺序。
- Lead 不作为公开内容 Entity，不生成公开 URL、Metadata、Schema 或 sitemap。
- Lead 字段按 Identity、Contact、Business、Intent、Source、Status、Assignment、Privacy 和 Audit 分层。
- Lead 生命周期采用 New -> Contacted -> Qualifying -> Assigned -> Won -> Invalid。
- 来源归因覆盖 Organic Search、AI Search、Social、Paid Campaign、Direct、Manual 和 Import。
- Lead Center 是 CRM 输入，不是完整 CRM。
- Lead 导出、分配、脱敏、导入和批量操作必须接入 RBAC 和 Audit。
- M3.6-M3.9 继续架构冻结；Prisma、Migration、Database、RBAC、CMS、Media、Lead、Platform Assets、SEO Runtime、API 和 Admin UI 统一进入 M4 Platform Runtime。

## 7.6 M3.5 Platform Assets Architecture

M3.5 不新增 API、Database Migration、后台、CMS 或 Runtime，先冻结平台公共资产架构。

已确认：

- 当前 Repository 只服务中国大陆 `.cn`，国际 `.com` 未来独立建设，不在当前 Repository 内实现国际化、多语言或 i18n。
- Platform Assets 属于 Platform Layer，不是 CMS Content、Lead Data、Dealer Data 或 Runtime。
- Platform Assets 覆盖 Company Profile、Brand Assets、Social Media Hub、Download Center、Friend Links、Contact Center 和 System Settings。
- Company Profile 统一企业信息、品牌信息、联系方式、办公信息、企业简介、证书、ICP 和 Copyright。
- Brand Assets 统一 Logo、Brand Color、Typography、Icon 和 Marketing Assets；文件资产仍由 Media Domain 管理。
- Social Media Hub 首期只覆盖国内平台：微信公众号、视频号、抖音、小红书、知乎、Bilibili；国际平台仅保留未来扩展说明。
- Download Center 覆盖 Product Catalog、Datasheet、Manual、CAD、Certification、Whitepaper 和 Marketing Material。
- Contact Center 统一 Phone、Email、Address、Map、Working Hours、QR Code 和 Contact Form；真实提交数据进入 Lead Center。
- System Settings 覆盖 Website Name、Footer、Announcement、Default SEO、Analytics Code、ICP 和 Sitemap Reference。
- Platform Assets 后续必须接入 RBAC 和 Audit，高风险变更包括 ICP、Analytics Code、证书、联系方式、下载资料和二维码。

## 8. M1 阶段范围

M1 建立网站技术底座，而不是直接制作完整业务页面。

纳入：

- Next.js App Router
- TypeScript 严格模式
- TailwindCSS
- 官网信息架构：`docs/WEBSITE_ARCHITECTURE.md`
- SEO/GEO 网站蓝图：`docs/WEBSITE_SEO_BLUEPRINT.md`
- 内容系统：`docs/CONTENT_SYSTEM.md`
- Website 技术骨架：`app/`、`components/`、`public/`、`styles/`
- CMS、内容结构与组件系统文档规划
- Website CI 校验
- Website Governance CI 校验

不纳入：

- 产品详情页
- 行业方案页
- 招商合作页
- SEO/GEO 业务路由实现
- CRM 表单提交
- 数据库实现
- 未经确认的产品参数、客户案例、收益结果、授权政策或市场排名

## 9. 加盟合作定位

加盟合作不作为普通“招商页面”，而定义为 `LABOR-SAVING 渠道增长中心`。

主 URL：`/partner/`

页面目标：

- 3 秒内说明加入价值。
- 展示工业自动化升级、重载搬运需求、风电装备市场、石油化工维修市场和智能制造趋势。
- 说明区域代理、行业代理、渠道经销商和项目合作伙伴四类模式。
- 建立产品赋能、技术赋能、销售赋能、市场赋能、内容赋能、培训赋能、售后赋能、品牌赋能八大渠道赋能。
- 引导“申请成为区域合作伙伴”，后续进入 CRM 留资。

## 10. M1.5 Channel Growth Strategy

网站定义：

```text
工业智能装备渠道增长入口
```

Website Traffic Weight：

| 模块 | 权重 |
| --- | --- |
| 加盟合作 Partner | 35% |
| 产品 Product | 25% |
| 行业应用 Industry | 20% |
| 知识中心 Content | 10% |
| 品牌 Trust | 10% |

M2 不直接进入普通页面开发，而进入：

```text
M2 Channel Growth Foundation
```

M2 顺序：

1. M2.0 Page Strategy Definition：建立 `docs/PAGE_SYSTEM.md`
2. M2.1 Metadata System：建立 `docs/METADATA_SCHEMA.md`
3. M2.2 SEO Schema Layer：建立 `docs/SEO_SCHEMA_LAYER.md`
4. M2.3 Partner Page Development & Partner System Hardening：优先开发 `/partner/`，并补齐 Partner Program Entity、Partner Content Model、Partner SEO Template 与 Partner Lead / CRM / CMS / Export 内容说明
5. M2.4 Product System Foundation：先完成 Product Entity、Content Model、Metadata、Schema、CMS Model 和 SEO/GEO 模板，不直接开发 `/products/`
6. M2.4.5 Product Rendering Layer：已批准进入；按 Product Listing、Category、首个真实 Detail、Related Product 逐层验证模板，并检查 Metadata、JSON-LD、Breadcrumb、FAQ、Internal Link、Canonical、Open Graph 和 SEO/GEO
   - M2.4.5.1 Product Listing 已完成：`/products/` 基于 Product Entity 数据源渲染，未确认 Entity 不生成详情链接或 Product Schema
   - M2.4.5.2 Product Category 已完成：`/products/[categorySlug]/` 由 Product Entity 分类自动生成，并通过统一 Metadata、Canonical、Breadcrumb、CollectionPage 与 FAQ 验证
7. M2.5 Industry Page Development：开发 `/applications/`
8. M2.6 Lead Capture Integration：接入线索提交、来源追踪和 CRM 字段映射
9. M2.7 Admin Maintainability：后台维护页面、Metadata、Schema、FAQ 与 Lead 配置
10. M2.8 Batch Export：批量导出 Lead、SEO/GEO 资产和 Schema JSON

M1.5 已完成 `docs/PARTNER_FUNNEL.md` 与 `docs/LEAD_SCHEMA.md`，M2 页面与表单必须继续沿用。
