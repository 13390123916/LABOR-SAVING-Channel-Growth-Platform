# ADR-0010: Media Management Architecture

状态：Accepted

日期：2026-07-21

## 背景

M3.0 Database Architecture、M3.1 Authentication & Authorization 和 M3.2 CMS Architecture 已完成设计冻结。M3.2 明确 CMS 只引用已审核媒体，不实现上传、裁切、图库、授权审核或文件存储运行时。

进入 M3.3 前，需要先冻结 Media Domain，避免把 Media Management 简化成“文件上传”功能。平台媒体资产会被 Product、Industry、Article、Partner、Download、SEO Metadata、Schema Metadata、Open Graph、GEO Runtime 和后续投放物料共同引用，必须先明确资产身份、授权、版本、派生、ALT、存储、CDN 和审计边界。

## 决策

M3.3 命名为 Media Management Architecture，先冻结媒体领域架构，不直接实现运行时代码。

已确认：

- Media 是独立 Entity 类型，使用稳定 `entity_id`，不作为 CMS 表单的临时附件。
- Media Metadata 必须覆盖标题、ALT、ALT 来源、caption、描述、比例、方向、主色、来源、授权、用途和合规备注。
- 媒体生命周期采用 Uploaded -> Reviewing -> Approved -> Published -> Archived。
- 图片版本区分 original、optimized、thumbnail、open_graph、square、wide、print、watermarked。
- ALT 必须有来源，公开页面优先使用 `seo_reviewed` 或 `manual`。
- WebP 作为首期前台优化格式预留，AVIF 作为未来格式预留。
- Thumbnail Strategy 覆盖 1:1、4:3、16:9、Open Graph 和详情图库场景。
- Storage Adapter 抽象 save、read、archive、public URL、signed URL、checksum 和 derivative 能力。
- CDN 只负责公开分发，不负责授权、审核或事实判断。
- Watermark Strategy 只用于需要品牌标记、内部审核、渠道预览或活动标记的派生资产。
- Media 引用关系必须记录 Entity ID、usage type、usage scope 和 active usage。
- Media 必须接入 RBAC 和 Audit，公开发布、授权审核、CDN purge、批量导入和存储策略变更均为高风险动作。

## 后果

正向影响：

- 避免 M3.3 过早落成不可治理的上传功能。
- CMS、SEO Metadata、Open Graph、Product Schema 和 GEO Runtime 能共享同一套可追溯媒体资产。
- 后续接入本地存储、对象存储或 CDN 时，不需要改变业务层语义。
- 媒体授权、ALT、版本、缩略图和引用关系可进入统一审计。

成本：

- 运行时文件上传、图库 UI、裁切、WebP / AVIF 转码和 CDN 接入后置。
- 首期需要多维护一层 Media Entity 与引用关系，而不是直接在内容字段中保存图片 URL。

## 替代方案

### 方案 A：直接实现文件上传

拒绝。文件上传不能解决授权、用途、ALT、派生图、Open Graph、CDN、审计和跨模块引用问题，后续返工风险高。

### 方案 B：CMS 内嵌媒体字段

拒绝。CMS 内嵌字段会让 Product、Article、Partner、SEO Metadata 和 GEO Runtime 各自维护图片 URL，无法统一授权和引用追溯。

### 方案 C：先只使用 `website/public/assets`

部分保留。静态资产可作为当前前台骨架使用，但不能替代长期 Media Domain。公开资产治理、授权、版本和引用关系仍必须进入 M3.3 设计。

## 验收

- `docs/MEDIA_SYSTEM.md` 已冻结 Media Domain。
- `docs/PLATFORM_ARCHITECTURE.md` 已补充平台能力总览。
- Roadmap、TODO、Memory、PRD、README、CHANGELOG 和治理校验已同步。
- 未创建上传接口、图库 UI、ORM、迁移、存储 SDK、转码 worker、CDN 接入或后台页面。
