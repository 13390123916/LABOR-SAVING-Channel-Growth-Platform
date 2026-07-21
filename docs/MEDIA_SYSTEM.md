# Media System

文档职责：冻结 M3.3 Media Management Architecture 的媒体领域模型、元数据、生命周期、图片版本、ALT 来源、格式预留、缩略图策略、存储适配、CDN 边界、水印策略和引用关系。架构决策见 `docs/adr/ADR-0010-media-management.md`。

## 1. 阶段边界

M3.3 Media Management Architecture 只冻结 Media Domain，不写文件上传接口、不创建图库 UI、不接入 ORM、不创建数据库迁移、不实现裁切转码、不接入 CDN 或对象存储运行时。

本阶段目标：

- 确认 Media Entity 与业务 Entity 的关系。
- 确认 Media Metadata、授权状态、使用范围和 ALT 来源。
- 确认 Asset 生命周期、图片版本、缩略图、WebP / AVIF、CDN 和 Storage Adapter 边界。
- 确认 Product、Article、Case、Industry、Partner、Download、SEO Metadata 和 Open Graph 的引用规则。

## 2. 核心原则

- Media 是平台资产域，不是 CMS 附属上传按钮。
- 所有公开媒体必须可追溯来源、授权、用途、版本和引用对象。
- 未授权、来源不清、使用范围不匹配的媒体不得公开发布、投放或进入 Open Graph。
- CMS 只能引用 Media，不直接管理文件存储、转码、缩略图或 CDN 分发。
- Media 必须复用 M3.0 Database 的 `entity_id`、soft delete、version、locale 和 audit fields。
- Media 必须复用 M3.1 Auth 的 Resource、Action、Permission、RBAC 和 Audit。
- Media 不得承载未经确认的产品参数、案例、收益、授权政策或市场排名。

## 3. Media Entity

Media 作为独立 Entity 类型进入平台。

字段分层：

```text
Identity Fields
Asset Fields
Metadata Fields
Source / License Fields
Transformation Fields
Relationship Fields
Publishing Fields
Audit Fields
```

基础字段：

```text
id
entity_id
asset_type
asset_path
original_filename
mime_type
file_size
width
height
duration
checksum
alt_text
alt_source
caption
source_status
license_status
usage_scope
storage_adapter
cdn_status
watermark_status
status
version
locale
created_at
updated_at
published_at
deleted_at
created_by
updated_by
published_by
approved_by
```

规则：

- `entity_id` 全局唯一，使用 `MED-0001` 等稳定编号。
- `checksum` 用于重复资产识别和完整性校验。
- `asset_path` 必须唯一，不允许同一路径覆盖不同内容。
- 图片、视频、PDF、Open Graph 资产和资料封面均可作为 Media Entity。

## 4. Media Metadata

Media Metadata 用于运营、SEO/GEO、授权和分发。

字段：

```text
title
alt_text
alt_source
caption
description
dominant_color
orientation
aspect_ratio
shot_type
brand_elements
product_entity_id
industry_entity_id
source_document
license_status
usage_scope
compliance_notes
```

规则：

- Metadata 必须描述媒体事实，不得添加未经确认的性能、收益或案例背书。
- `dominant_color`、`orientation` 和 `aspect_ratio` 服务缩略图、Open Graph 和投放适配。
- `product_entity_id`、`industry_entity_id` 等关联只保存 Entity ID，不保存页面 URL 或名称作为主关联键。

## 5. Asset 生命周期

媒体生命周期：

```text
Uploaded
-> Reviewing
-> Approved
-> Published
-> Archived
```

状态含义：

| Status | 含义 |
| --- | --- |
| Uploaded | 文件已进入系统，但未完成来源、授权和画质检查 |
| Reviewing | 正在审核清晰度、授权、用途、ALT 和引用范围 |
| Approved | 可被 CMS 或 SEO Metadata 引用，但不代表已公开 |
| Published | 已被公开页面、Open Graph、下载或投放资产使用 |
| Archived | 下线保留，不再作为新引用候选 |

发布规则：

- 只有 `license_status = approved` 且 `usage_scope` 覆盖目标用途时，媒体才允许 Published。
- Published 媒体被归档前必须检查引用关系、Open Graph、sitemap、GEO Feed 和页面渲染。
- Archived 不等于物理删除；默认保留审计和历史引用。

## 6. 图片版本

媒体版本分为原始资产和派生版本。

版本类型：

```text
original
optimized
thumbnail
open_graph
square
wide
print
watermarked
```

字段：

```text
media_entity_id
version_type
version_no
format
width
height
file_size
asset_path
checksum
created_at
created_by
```

规则：

- `original` 永不覆盖，只能归档。
- `optimized` 服务前台图片加载。
- `open_graph` 服务社交分享，不得自动套用未经审核文案。
- `print` 只作为线下物料预留，不在 M3.3 实现印刷导出。
- 新派生版本不得改变原始资产授权范围。

## 7. ALT 来源

ALT 必须有来源标记。

ALT 来源枚举：

```text
manual
product_name
industry_context
cms_generated
seo_reviewed
imported
```

规则：

- 公开页面优先使用 `seo_reviewed` 或 `manual`。
- `product_name` 可作为初始建议，但不能表达未确认参数。
- `cms_generated` 必须进入 SEO Review 后才可作为公开页面 ALT。
- ALT 应描述图像内容和业务对象，不堆砌关键词。

## 8. WebP / AVIF 预留

M3.3 只冻结格式策略，不实现转码运行时。

格式策略：

```text
source: jpg / png / webp / svg / pdf / mp4
delivery: jpg / png / webp
future_delivery: avif
```

规则：

- WebP 作为首期前台优化格式预留。
- AVIF 作为未来低带宽优化预留，需评估兼容性和生成成本。
- SVG 仅限 logo、图标或可审计矢量资产，不承载未经审核文本。
- 视频转码与字幕策略不在 M3.3 首期运行时实现。

## 9. Thumbnail Strategy

缩略图用于 CMS 列表、产品卡片、文章卡片、Open Graph 候选和后续投放资产。

预留尺寸：

| Type | 用途 | 比例 |
| --- | --- | --- |
| thumb_square | CMS 列表、头像式资产 | 1:1 |
| thumb_card | 产品卡片、文章卡片 | 4:3 |
| thumb_wide | 页面横幅、知识内容封面 | 16:9 |
| og_image | Open Graph、社交分享 | 1.91:1 |
| detail_gallery | 产品详情图库 | 原图约束下的展示比例 |

规则：

- 缩略图来源必须指向原始 Media Entity。
- 裁切不得遮挡产品主体、品牌标识和关键工况信息。
- Open Graph 图必须经过 SEO / Release 审核。

## 10. Storage Adapter

M3.3 不绑定具体存储服务，先冻结适配边界。

适配器能力：

```text
save
read
delete_or_archive
get_public_url
get_signed_url
calculate_checksum
generate_derivatives
```

首期可支持：

- Local Storage：开发与低成本初期部署。
- Object Storage：后续云存储或私有对象存储。
- CDN Origin：公开资产分发源站。

规则：

- 业务层只能调用 Storage Adapter，不直接拼接存储服务 SDK。
- 删除公开资产必须走归档流程，不直接物理删除。
- 存储路径不得泄漏内部审批状态或敏感信息。

## 11. CDN Boundary

CDN 只负责公开资产分发，不负责媒体审核、权限、授权或内容事实判断。

边界：

- CDN URL 由 Media Delivery 层生成。
- 未 Published 的媒体不得生成公开 CDN URL。
- 私有预览使用 signed URL 或后台受控访问。
- CDN 缓存清理必须进入 Audit Log。
- CDN 失效策略与 SEO Runtime、Open Graph 和页面发布同步。

M3.3 只冻结边界，不接入真实 CDN。

## 12. Watermark Strategy

水印策略用于投放素材、招商海报、案例图和未经授权扩散风险较高的资产。

策略：

```text
none
brand_mark
confidential_review
partner_preview
campaign_mark
```

规则：

- 产品页正式图默认不强制水印，避免影响 SEO、GEO 和页面可信度。
- 投放图、招商预览图和渠道素材可使用品牌水印或活动水印。
- `confidential_review` 只能用于内部审核，不得公开。
- 水印派生图必须保留对原始 Media Entity 的引用。

## 13. 引用关系

Media 可被以下对象引用：

| 引用方 | 关系 |
| --- | --- |
| Product | 主图、图库、规格说明图、Open Graph |
| Industry | 场景图、工况图、方案封面 |
| Article | 封面图、正文图、信息图 |
| Partner | 招商页视觉、渠道赋能图、活动封面 |
| Case | 案例图，必须等待授权资料 |
| Download | 样册封面、PDF 文件 |
| FAQ | 必要的说明图 |
| SEO Metadata | `og_image_id` |
| Schema Metadata | 与页面可见图一致的 image 字段 |
| GEO Runtime | AI 引用资产包中的可公开图 |

关系表建议：

```text
entity_media
media_versions
media_usages
media_derivatives
```

引用规则：

- 关系保存 Entity ID，不保存可变标题或 URL。
- 一个 Media 可被多个 Entity 引用，但每个引用必须记录 `usage_type` 和 `usage_scope`。
- 删除或归档媒体前必须检查 active usage。
- Product Schema、Open Graph 和 GEO Feed 不得引用未发布或授权不匹配的媒体。

## 14. Permission Integration

Media 权限引用 `docs/AUTH_SYSTEM.md`。

关键动作：

| Media Action | Required Permission |
| --- | --- |
| 上传候选资产 | Media:create |
| 查看媒体 | Media:read |
| 修改 Metadata / ALT | Media:update |
| 归档资产 | Media:delete |
| 授权审核 | Media:approve |
| 公开发布 | Media:publish |
| 批量导入 | Media:import |
| 导出清单 | Media:export |
| 存储和派生策略管理 | Media:manage |

角色边界：

- Editor 可创建和编辑候选媒体。
- SEO 可审核 ALT、Open Graph、Schema image 和搜索引用适配。
- Partner Manager 可提交渠道相关媒体，但不默认发布。
- Admin 可管理媒体流程，但高风险批量操作必须审计。
- Super Admin 负责存储适配、CDN 边界和紧急治理。

## 15. Audit Integration

Media 必须写入 Audit Log：

- upload
- metadata update
- alt update
- license status change
- usage scope change
- approve
- publish
- archive
- derivative generated
- CDN purge
- storage adapter change
- watermark generated

Audit Log 至少记录：

```text
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

## 16. Admin UI Boundary

M3.3 不设计具体 UI，也不创建页面代码。

后续实现必须遵循：

- 上传、授权审核、ALT、版本、引用关系和公开发布分区展示。
- Publish、Approve、Archive、CDN Purge、Bulk Import 不与普通 Save 混在一起。
- 页面必须显示 `source_status`、`license_status`、`usage_scope` 和 active usage。
- 存储失败、派生失败和 CDN 失败不得静默吞掉。

## 17. M4 Platform Runtime 边界

M3.3 之后不进入 Media Runtime。M3.4、M3.5、M3.6、M3.7、M3.8、M3.9 继续保持 Architecture Freeze。

真正运行时代码统一进入 M4 Platform Runtime：

```text
Prisma
-> Migration
-> Database
-> RBAC
-> CMS
-> Media
-> Lead
-> SEO Runtime
-> API
-> Admin UI
```

M4 前不得创建文件上传接口、图库 UI、ORM、迁移、裁切转码、CDN 接入、存储 SDK、API 或后台页面。

## 18. M3.3 验收标准

- ADR-0010 Media Management 已 Accepted。
- `docs/MEDIA_SYSTEM.md` 已覆盖 Media Entity、Media Metadata、Asset 生命周期、图片版本、ALT 来源、WebP / AVIF 预留、Thumbnail Strategy、Storage Adapter、CDN Boundary、Watermark Strategy 和引用关系。
- `docs/PLATFORM_ARCHITECTURE.md` 已提供平台模块关系、模块职责、模块依赖、生命周期和 M3 阶段边界总览。
- `README.md`、`docs/PROJECT_PRD.md`、`docs/ROADMAP.md`、`docs/TODO.md`、`docs/MEMORY.md`、`CHANGELOG.md` 已同步。
- `scripts/validate-website-governance.mjs` 已纳入 Platform Architecture、Media System 与 ADR-0010。
- 未创建文件上传、图库 UI、ORM、迁移、裁切转码、CDN 接入或后台页面。
