# Platform Assets

文档职责：冻结 M3.5 Platform Assets Architecture 的平台公共资产边界、资产类型、字段分层、生命周期、权限、审计、与 CMS / Media / Lead / Dealer / Runtime 的关系，以及中国大陆 `.cn` Repository 的资产治理原则。架构决策见 `docs/adr/ADR-0012-platform-assets.md`。

## 1. 阶段边界

M3.5 Platform Assets Architecture 只冻结 Platform Assets Domain，不新增 API、不创建数据库迁移、不开发后台、不开发 CMS、不开发 Runtime、不提前进入 M4。

本阶段目标：

- 确认 Platform Assets 属于 Platform Layer。
- 确认平台公共资产与 CMS Content、Lead Data、Dealer Data、Runtime 的边界。
- 确认 Company Profile、Brand Assets、Social Media Hub、Download Center、Friend Links、Contact Center 和 System Settings 的架构范围。
- 确认当前 Repository 只服务中国大陆 `.cn`，国际 `.com` 未来独立建设。
- 确认 Platform Assets 后续如何复用 Database、Authentication、CMS、Media、Lead Center、SEO Runtime、GEO Runtime、Audit 和 M4 Runtime。

## 2. 核心原则

- 当前 Repository 是 CN First Platform，只服务中国大陆 `.cn`。
- 国际平台 `.com` 未来独立建设；当前 Repository 不实现国际化、多语言、i18n、国际社媒账号运行逻辑或国际内容发布能力。
- Platform Assets 是 Platform Layer 的公共配置和品牌资产，不是 CMS Content。
- Platform Assets 不是 Lead Data，不承接用户提交、渠道咨询、客户询盘或销售跟进信息。
- Platform Assets 不是 Dealer Data，不保存代理商账号、授权政策、区域关系、合同或价格政策。
- Platform Assets 不是 Runtime，本阶段不写 API、Admin UI、ORM、Migration、上传、下载、表单或统计运行逻辑。
- Platform Assets 必须复用 M3.0 Database 的稳定 ID、软删除、版本和审计字段，复用 M3.1 Authentication 的 RBAC、Resource、Action、Permission 和 Audit。
- Platform Assets 只能记录已确认事实，不得编造资质、荣誉、认证、客户案例、收益结果、授权政策或市场排名。

## 3. Platform Assets 范围

首期冻结以下平台公共资产：

```text
Company Profile
Brand Assets
Social Media Hub
Download Center
Friend Links
Contact Center
System Settings
```

它们共同服务：

- 官网可信度。
- 中国 SEO 基础事实。
- 国内 GEO 可引用事实。
- 招商合作转化信任。
- 运营人员统一维护。
- 后续 M4 Runtime 的低风险配置输入。

## 4. Company Profile

Company Profile 是企业基础事实源，不是普通关于我们页面正文。

包含：

```text
Company Information
Brand Information
Contact Information
Office Information
Corporate Description
Certificates
ICP
Copyright
```

字段分层：

| Field Group | 示例字段 | 用途 |
| --- | --- | --- |
| Company Information | company_name、legal_name、business_scope、founded_year | 组织事实、页脚、Schema |
| Brand Information | brand_name、brand_slogan、brand_positioning | 品牌识别、官网展示 |
| Contact Information | phone、email、service_phone | ContactPoint、Contact Center |
| Office Information | address、province、city、map_reference | 联系页、Local SEO |
| Corporate Description | short_description、long_description | 官网简介、GEO 摘要 |
| Certificates | certificate_name、certificate_no、issuer、valid_until | 资质事实，需真实资料 |
| ICP | icp_number、public_security_record | 中国大陆合规备案 |
| Copyright | copyright_owner、copyright_year | 页脚和法律声明 |

规则：

- 证书、备案、办公地址和版权信息必须来自真实资料。
- Corporate Description 不得包含未经确认的行业排名、客户规模、销量、收益或授权承诺。
- ICP 与版权字段优先服务中国大陆 `.cn` 站点。

## 5. Brand Assets

Brand Assets 是品牌识别资产和投放复用资产的治理入口，不替代 Media System 的文件实体和授权管理。

包含：

```text
Logo
Brand Color
Typography
Icon
Marketing Assets
```

规则：

- Logo、Icon 和 Marketing Assets 的实际文件必须通过 Media Domain 管理来源、授权、版本、ALT、用途和引用关系。
- Brand Color 与 Typography 作为设计规范和前台主题输入，不直接写运行时代码。
- Marketing Assets 可指向招商海报、宣传图、Open Graph 图、展会物料和渠道素材，但必须标记用途范围。
- 不得盗用第三方品牌 Logo、未授权素材或未经确认的资质视觉。

## 6. Social Media Hub

Social Media Hub 管理公开可展示的社媒账号入口，不负责内容发布、账号运营或数据采集。

国内平台：

```text
微信公众号
视频号
抖音
小红书
知乎
Bilibili
```

字段建议：

```text
platform
display_name
profile_url
qr_media_id
account_id
description
status
usage_scope
verified_status
created_at
updated_at
```

国际平台：

- 仅保留未来扩展说明。
- 当前 Repository 不实现 `.com` 国际平台账号配置、国际站跳转、国际内容聚合或多语言字段。

规则：

- 二维码和账号截图引用 Media Entity。
- 已停用账号不得继续出现在公开页面。
- Social Media Hub 不采集粉丝数据、评论数据、私信数据或投放数据；这些属于后续 Deployment & Analytics 或外部运营系统。

## 7. Download Center

Download Center 管理可公开或受控下载资料的资产目录，不直接实现文件下载运行时。

包含：

```text
Product Catalog
Datasheet
Manual
CAD
Certification
Whitepaper
Marketing Material
```

规则：

- Download Center 只保存下载资料的分类、标题、适用产品、版本、公开范围和 Media 引用。
- 文件实体、授权、版本、大小、格式、封面图和派生文件由 Media System 管理。
- Product Catalog、Datasheet、Manual、CAD 和 Certification 必须基于真实资料，不得补写未确认参数。
- Marketing Material 不得包含收益承诺、保本、回本周期、区域独家、自动授权或未经确认案例。
- 受控下载、留资下载和下载统计统一进入 M4 Runtime 或后续 Analytics，不在 M3.5 实现。

## 8. Friend Links

Friend Links 管理经过审核的外部链接，不等同于广告投放或第三方背书。

支持：

```text
Industry
Partner
Government
Media
```

字段建议：

```text
link_type
display_name
url
description
logo_media_id
nofollow_policy
status
reviewed_by
reviewed_at
```

规则：

- Government 链接只放置真实政务或备案相关链接。
- Partner 链接不得暗示未经确认的授权合作、客户案例或背书。
- Media 链接必须区分新闻报道、媒体资料、品牌自媒体和外部转载。
- Friend Links 下线必须检查公开页面、sitemap、GEO Feed 和内链引用。

## 9. Contact Center

Contact Center 是统一联系信息源，不是 Lead Center。

统一：

```text
Phone
Email
Address
Map
Working Hours
QR Code
Contact Form
```

规则：

- Phone、Email、Address、Working Hours 和 QR Code 作为公开联系入口配置。
- QR Code 资产引用 Media Entity。
- Contact Form 只保存表单入口配置和跳转关系；用户提交数据进入 Lead Center，不存入 Platform Assets。
- Map 仅保存地图引用、坐标或外部地图链接的配置，不实现地图 SDK。
- Contact Center 必须支持 Partner Lead 与 Customer Lead 的入口区分，但不直接处理线索。

## 10. System Settings

System Settings 是平台级基础配置，不是运行时代码。

包括：

```text
Website Name
Footer
Announcement
Default SEO
Analytics Code
ICP
Sitemap Reference
```

规则：

- Website Name、Footer、ICP 与 Copyright 优先引用 Company Profile。
- Announcement 只保存配置边界；发布、置顶、过期和审计进入 M4 Runtime。
- Default SEO 只能作为兜底，不得覆盖页面级 Metadata、Entity Metadata 或 SEO 审核结果。
- Analytics Code 只冻结配置边界；实际脚本接入、数据采集、同意管理和报表进入 M3.9 / M4。
- Sitemap Reference 指向后续 SEO Runtime 的输出，不在 M3.5 生成 sitemap。

## 11. 字段分层

Platform Assets 字段按以下分层：

```text
Identity Fields
Asset Type Fields
Content / Config Fields
Media Reference Fields
Scope Fields
Publishing Fields
Compliance Fields
Audit Fields
```

基础字段建议：

```text
id
asset_key
asset_type
locale_scope
cn_scope
title
value_json
media_entity_id
related_entity_id
usage_scope
status
version
published_at
deleted_at
created_at
updated_at
created_by
updated_by
approved_by
published_by
```

规则：

- `asset_key` 是稳定配置键，不使用页面标题作为主键。
- `locale_scope` 当前固定服务中国大陆 `.cn`，不扩展 i18n。
- `media_entity_id` 只能引用 M3.3 Media Domain 中授权匹配的资产。
- `value_json` 后续实现时必须有 schema 校验，不允许任意堆字段。

## 12. 生命周期

Platform Assets 生命周期：

```text
Draft
-> Reviewing
-> Approved
-> Published
-> Archived
```

状态含义：

| Status | 含义 |
| --- | --- |
| Draft | 资产或配置已创建，未完成审核 |
| Reviewing | 正在审核事实、授权、用途、SEO/GEO 和合规 |
| Approved | 可供引用，但未必公开 |
| Published | 已在 `.cn` 平台公开或被 Runtime 消费 |
| Archived | 下线保留，不再作为新引用候选 |

规则：

- ICP、证书、联系方式、Logo、二维码和下载资料进入 Published 前必须完成事实和授权审核。
- Archived 不等于物理删除；历史配置必须保留审计。
- Published 配置变更可能影响全站页脚、Schema、ContactPoint、Open Graph、Download 和 SEO Runtime，必须进入 Audit Log。

## 13. Permission Integration

Platform Assets 权限引用 `docs/AUTH_SYSTEM.md`。

关键动作：

| Platform Asset Action | Required Permission |
| --- | --- |
| 查看平台资产 | PlatformAsset:read |
| 创建平台资产 | PlatformAsset:create |
| 更新平台资产 | PlatformAsset:update |
| 审核平台资产 | PlatformAsset:approve |
| 发布平台资产 | PlatformAsset:publish |
| 归档平台资产 | PlatformAsset:delete |
| 导入平台资产 | PlatformAsset:import |
| 导出平台资产 | PlatformAsset:export |
| 管理平台设置 | PlatformAsset:manage |

角色边界：

- Editor 可维护普通简介、链接、下载资料草稿和展示文案。
- SEO 可审核 Default SEO、ContactPoint、Organization Schema、Friend Links 和 GEO 引用适配。
- Partner Manager 可维护招商相关下载资料和社媒入口草稿，但不默认发布。
- Admin 可管理常规 Platform Assets。
- Super Admin 负责 ICP、Analytics Code、System Settings、归档和高风险变更。

## 14. Audit Integration

Platform Assets 必须写入 Audit Log：

- create
- update
- approve
- publish
- archive
- import
- export
- media reference change
- contact information change
- certificate change
- ICP change
- analytics code change
- sitemap reference change

Audit Log 至少记录：

```text
actor_id
actor_role_ids
action
resource
resource_id
asset_key
before_json
after_json
ip_address
user_agent
request_id
created_at
```

## 15. 与其他模块的关系

### 15.1 与 CMS Content 的关系

CMS Content 负责 Product、Industry、Article、Partner、FAQ、Download、Navigation、SEO Metadata、Schema Metadata、Redirect 和 Setting 的内容维护。Platform Assets 提供全站公共事实和配置输入。

规则：

- CMS 可引用 Platform Assets，但不得把企业基础信息、Logo、ICP、全局联系方式散落在页面内容里。
- Platform Assets 不替代 CMS 的页面内容审核和发布流程。

### 15.2 与 Media 的关系

Media 负责文件实体、授权、版本、ALT、缩略图、CDN 边界和引用关系。Platform Assets 只保存对 Media Entity 的业务引用。

### 15.3 与 Lead Center 的关系

Contact Center 和 Contact Form 提供入口配置；真实提交、来源归因、状态、分配、隐私和 CRM 输入属于 Lead Center。

### 15.4 与 Dealer Data 的关系

Friend Links 或 Partner 类资产可展示公开合作链接，但不保存代理商账号、区域授权、合同、价格政策、返利、库存或销售业绩。

### 15.5 与 SEO / GEO Runtime 的关系

Platform Assets 为 Organization、ContactPoint、Footer、Default SEO、Download、Social Profile 和 GEO Fact Pack 提供输入。SEO Runtime 和 GEO Runtime 只能消费已 Published 且审核通过的资产。

## 16. Admin UI Boundary

M3.5 不设计具体 UI，也不创建页面代码。

后续实现必须遵循：

- Company Profile、Brand Assets、Social Media Hub、Download Center、Friend Links、Contact Center 和 System Settings 分区维护。
- ICP、Analytics Code、证书、联系方式、下载资料和二维码变更必须有审核状态和审计记录。
- Publish、Archive、Import、Export、Analytics Code Update 不与普通 Save 混在一起。
- 运营界面必须显示资产来源、用途范围、审核状态、引用关系和最后更新时间。

## 17. M4 Platform Runtime 边界

M3.5 之后继续进行 M3.6-M3.9 Architecture Freeze，不进入 Platform Assets Runtime。

真正运行时代码统一进入 M4 Platform Runtime：

```text
Prisma
-> Migration
-> Database
-> RBAC
-> CMS
-> Media
-> Lead
-> Platform Assets
-> SEO Runtime
-> API
-> Admin UI
```

M4 前不得创建数据库迁移、ORM、API、后台 UI、资产维护页、上传下载运行时、表单提交接口、统计脚本接入或 sitemap 生成运行时。

## 18. M3.5 验收标准

- ADR-0012 Platform Assets 已 Accepted。
- `docs/PLATFORM_ASSETS.md` 已覆盖 Company Profile、Brand Assets、Social Media Hub、Download Center、Friend Links、Contact Center、System Settings。
- `docs/PLATFORM_ARCHITECTURE.md` 已将 M3.5 标记为 Platform Assets Architecture Freeze，并明确 Platform Assets 属于 Platform Layer，不是 CMS Content、Lead Data、Dealer Data 或 Runtime。
- `README.md`、`docs/PROJECT_PRD.md`、`docs/ROADMAP.md`、`docs/TODO.md`、`docs/MEMORY.md`、`CHANGELOG.md` 已同步。
- `scripts/validate-website-governance.mjs` 已纳入 Platform Assets 与 ADR-0012。
- 未新增 API、Database Migration、后台、CMS、Runtime 或 M4 实现。
