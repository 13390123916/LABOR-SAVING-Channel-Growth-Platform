# Product System

文档职责：定义 LABOR-SAVING Product Entity 的基础层，明确产品实体、生命周期、与行业、案例、文章、视频、下载和 FAQ 的关联关系。当前阶段只完成产品系统基础，不开发 `/products/` 页面、不开发后台 CMS、不开发 CRM、不冻结数据库。

## 1. 定位

Product System 是产品增长内容的底层实体系统，不是产品页面本身。

标准链路：

```text
Product Entity
-> Product Content Model
-> Product Metadata
-> Product Schema
-> Product CMS Model
-> Product Rendering Layer
```

在进入产品页面开发前，必须先完成 M2.4 Product System Foundation。

## 2. M2.4 阶段拆分

M2.4 调整为：

```text
M2.4 Product System Foundation
```

拆分为：

| 阶段 | 名称 | 交付 |
| --- | --- | --- |
| M2.4.0 | Product Entity | `docs/PRODUCT_SYSTEM.md` |
| M2.4.1 | Product Content Model | `docs/PRODUCT_CONTENT_MODEL.md` |
| M2.4.2 | Product Metadata | `docs/METADATA_SCHEMA.md` 与 `docs/PRODUCT_SEO_TEMPLATE.md` |
| M2.4.3 | Product Schema | `docs/PRODUCT_SCHEMA.md` |
| M2.4.4 | Product CMS Model | 文档定义，后台开发后置 |
| M2.4.5 | Product Rendering Layer | Product Listing、Product Category、Product Detail、Related Product 与 SEO/GEO 落地 |

## 3. 当前 Product Entity 范围

当前仅允许表达已确认产品实体：

| Product Entity | Category | Slug 建议 | Source Status |
| --- | --- | --- | --- |
| LS40 助力机械臂 | pneumatic manipulator arm | `ls40-pneumatic-arm` | confirmed basic entity |
| L60 助力机械臂 | pneumatic manipulator arm | `l60-pneumatic-arm` | confirmed basic entity |
| SQ35 气动平衡器 | pneumatic balancer | `sq35-pneumatic-balancer` | confirmed basic entity |
| SQ50 气动平衡器 | pneumatic balancer | `sq50-pneumatic-balancer` | confirmed basic entity |

当前不允许新增未确认型号作为 Product Entity。

如果历史 URL 规划中出现未确认型号，只能作为信息架构占位，不得进入页面正文、Schema、FAQ 或 CMS 字段。

## 4. Product Entity 字段

Product Entity 当前只定义语义字段，不定义数据库表：

```text
id
slug
name
category
brand
summary
description
target_users
application_scenarios
related_industries
related_cases
related_articles
related_videos
related_downloads
faq_items
lead_type
cta
metadata_id
schema_id
source_status
status
updated_at
```

当前允许公开表达字段：

- `name`
- `category`
- `brand`
- `summary`
- `description`
- `url`
- `related_industries`
- `faq_items`
- `lead_type`

资料不足时不得公开表达：

- 具体参数
- 价格
- 库存
- 交期
- 配置
- 认证
- 客户案例
- 性能承诺
- 市场排名

## 5. 生命周期

Product Entity 生命周期：

| Status | 含义 | 是否可上页面 |
| --- | --- | --- |
| draft | 内部草稿，资料未核验 | 否 |
| source_pending | 基础实体存在，参数或资料不足 | 可用于集合页弱表达 |
| reviewed | 已完成内容、Metadata、Schema 审核 | 可进入页面开发 |
| published | 已发布并可被索引 | 是 |
| archived | 停用或下线 | 否，保留重定向策略 |

当前四个产品处于 `source_pending` 到 `reviewed` 之间，只允许做基础实体与内容框架，不补写参数。

## 6. 关联关系

Product 必须与其他 Entity 通过关系维护，而不是在页面中手写散落链接。

| 关联对象 | 用途 |
| --- | --- |
| Industry | 产品适用行业、工况入口和应用页内链 |
| Case | 真实案例承接，未授权不得展示客户名 |
| Article | 产品选型、技术解释和知识内容 |
| Video | 产品演示、应用说明、招商素材 |
| Download | 样册、说明书、资料包 |
| FAQ | Product FAQPage 和 GEO 问答 |
| Partner | 渠道扩品和代理合作入口 |

## 7. Product CMS Model 边界

当前阶段只定义 CMS Model，不开发后台。

后续 CMS 至少应允许维护：

- 产品基础信息
- 产品分类
- 产品摘要
- 应用场景
- 关联行业
- 关联资料
- FAQ
- Metadata
- Schema 输出状态
- 资料状态
- Lead 类型与 CTA

后台不得允许运营直接填写：

- 未确认参数
- 虚构案例
- 价格、库存、交期
- 收益、回本或保本承诺
- 未确认认证和市场排名

## 8. 下一阶段进入条件

进入 M2.4.5 Product Rendering Layer 前，必须满足：

- Product Entity 已定义
- Product Content Model 已定义
- Product Metadata 已定义
- Product Schema 已定义
- Product SEO Template 已定义
- Product CMS Model 边界已定义
- 数据库实现仍后置

## 9. Product Rendering Layer 拆分

M2.4.5 不再作为单一 Product Page Development，而是：

```text
M2.4.5 Product Rendering Layer
```

阶段拆分：

| 阶段 | 名称 | URL 示例 | 验收重点 |
| --- | --- | --- | --- |
| M2.4.5.1 | Product Listing | `/products/` | 产品中心列表、Metadata、Schema、Breadcrumb、FAQ、Internal Link、SEO/GEO |
| M2.4.5.2 | Product Category | `/products/pneumatic-manipulator-arm/` | 分类实体渲染、型号入口、分类 FAQ、内链 |
| M2.4.5.3 | Product Detail | `/products/pneumatic-manipulator-arm/ls70/` | 产品详情渲染、Product Schema、Breadcrumb、FAQ、咨询入口 |
| M2.4.5.4 | Related Product | LS70 关联 LS50、LS40、SQ 系列 | Related Product、Topic Cluster、内部链接 |

每一层必须验证：

- Metadata
- Schema
- Breadcrumb
- FAQ
- Internal Link
- SEO
- GEO

CMS 仍放在 M2.7。Database 继续保持规划，等待 Product、Industry、Case、Knowledge 等 Entity 关系稳定后再一次冻结。
