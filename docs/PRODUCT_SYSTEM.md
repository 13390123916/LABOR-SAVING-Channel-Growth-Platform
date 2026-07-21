# Product System

## M2.4.5.3 Product Detail 发布门禁

状态：进行中。已完成 Detail Renderer Template 与 Metadata/Schema Integration；首个正式产品仍待资料确认。

M2.4.5.3.3 Product Publishing Validation Framework 与 M2.4.5.3.4 Product Content Readiness 阶段框架已通过。当前进入 M2.4.5.3.5 First Published Product Acceptance，首个候选资料包见 `docs/PRODUCT_CONTENT_READINESS.md`；在资料、授权、市场上线批准和外部索引验收完成前，任何实体均不改变发布状态。

统一模板为 `ProductDetailRenderer`，输入为单个 Product Entity，输出为 Detail URL、Metadata、Breadcrumb、Product Schema、FAQ Schema、Content Sections 和 Internal Links。

Detail URL、Product Schema、sitemap 和 Related Product 的共同发布门禁为：`detailStatus = published`、`schemaEligible = true`、`contentValidated = true`、`releaseApproved = true`。

字段门禁之外，首个正式产品必须完成 `docs/PRODUCT_PUBLISHING_CHECKLIST.md` 的 First Published Product Validation，才可视为 SEO/GEO 发布闭环完成。

详情静态参数只从满足上述门禁的 Entity 生成，并以 `dynamicParams = false` 阻止未发布路径被动态渲染。LS70 不是 Product Entity，不进入数据源、详情 URL、Product Schema、sitemap 或 Related Product。

首个正式 Product Detail 必须从 LS40、L60、SQ35、SQ50 中选择资料完整且经确认可公开发布的实体。本阶段不为测试目的创建 LS70 页面，也不手写产品关联。

文档职责：定义 LABOR-SAVING Product Entity 的基础层，明确产品实体、生命周期、与行业、案例、文章、视频、下载和 FAQ 的关联关系。M2.4 Product System Foundation 已通过验收，当前进入 M2.4.5 Product Rendering Layer；仍不批量开发页面、不开发后台 CMS、不开发 CRM、不冻结数据库。

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

| Entity ID | Product Entity | Category Slug | Product Slug | Source Status |
| --- | --- | --- | --- | --- |
| `PRD-0001` | LS40 助力机械臂 | `pneumatic-manipulator-arm` | `ls40` | confirmed basic entity |
| `PRD-0002` | L60 助力机械臂 | `pneumatic-manipulator-arm` | `l60` | confirmed basic entity |
| `PRD-0003` | SQ35 气动平衡器 | `pneumatic-balancer` | `sq35` | confirmed basic entity |
| `PRD-0004` | SQ50 气动平衡器 | `pneumatic-balancer` | `sq50` | confirmed basic entity |

当前不允许新增未确认型号作为 Product Entity。

如果历史 URL 规划中出现未确认型号，只能作为信息架构占位，不得进入页面正文、Schema、FAQ 或 CMS 字段。

## 4. Product Entity 字段

Product Entity 当前只定义语义字段，不定义数据库表：

```text
entity_id
slug
name
category
brand
summary
description
version
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
published_at
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

Product Entity 同时冻结 `version`、`status`、`published_at`、`updated_at` 字段语义，沿用 `docs/ENTITY_SYSTEM.md` 的统一版本规则。当前 Product JSON 数据源不实现版本发布逻辑。

## 6. 关联关系

Product 必须与其他 Entity 通过关系维护，而不是在页面中手写散落链接。

所有关系字段保存 Entity ID，例如 `PRD-0001`、`IND-0001`，不得以产品名称或锚文本作为关联键。

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
| M2.4.5.3 | Product Detail | 首个资料已确认的真实 Product Entity | 产品详情渲染、Product Schema、Breadcrumb、FAQ、咨询入口 |
| M2.4.5.4 | Related Product | 通过 Entity ID 建立关系 | Related Product、Topic Cluster、内部链接 |

每一层必须验证：

- Metadata
- JSON-LD Schema
- Breadcrumb
- FAQ
- Internal Link
- Canonical
- Open Graph
- SEO
- GEO

本阶段以模板和渲染能力验证为目标，不以页面数量为目标。每一层验收通过后，才允许进入下一层；模板成熟后才允许批量扩展。

LS70 继续作为路由验证占位，不分配正式 Product Entity ID，不进入 sitemap、正式 Product Schema、可索引页面或 Related Product 关系。首个正式 Product Detail 必须使用已确认且具备可公开发布资料的 Product Entity。

CMS 仍放在 M2.7。Database 继续保持规划，等待 Product、Industry、Case、Knowledge 等 Entity 关系稳定后再一次冻结。

## 10. M2.4.5.1 Product Listing 验收

状态：已完成。

实现：

- `/products/` 从 `website/app/products/product-entities.json` 读取 Product Entity。
- 分类由 Product Entity 自动聚合，页面模板不维护型号或分类副本。
- 产品卡片由统一 `ProductCard` 渲染；新增 Entity 不需要修改页面模板。
- 产品详情 URL 由 Category Slug 与 Product Slug 统一生成。
- 未发布 Product Entity 不生成可点击详情链接，也不进入 Product Schema。
- Metadata、Canonical、Open Graph、Breadcrumb、CollectionPage、FAQPage 由统一层生成。
- 页面级代码不硬编码 LS40、L60、SQ35、SQ50。

验证：

```text
Product Entity JSON
-> Category Grouping
-> ProductCard Template
-> Product Listing
```

通过以上链路后，M2.4.5.2 Product Category 可以复用同一 Entity 数据源、URL 构建函数、Metadata Builder、Schema Builder 和产品卡片组件。

## 11. M2.4.5.2 Product Category 验收

状态：已完成。

实现：

- `/products/[categorySlug]/` 的静态参数由 Product Entity 分类集合自动生成。
- Category 页面通过 `categorySlug` 过滤统一 Product Entity 数据源，不维护独立型号清单。
- Category Metadata、Canonical、Open Graph 和 Breadcrumb 由 `buildProductCategoryMetadata` 自动生成。
- CollectionPage、BreadcrumbList 与 FAQPage 由 `buildProductCategorySchemas` 自动生成。
- Category FAQ 从过滤后的 Entity Group 生成，产品名称不在页面模板中硬编码。
- Listing 的分类内链由 Entity Category Slug 生成。
- 未发布 Product Entity 不生成详情链接或 Product Schema。

自动计数验证：

```text
Entity Count = 4
Listing Count = 4
Category Total = 4
Category Routes = 2
```

新增 Product Entity 后，Listing Count 与对应 Category Count 自动增加；新增 Category Slug 后，`generateStaticParams` 自动增加 Category 路由，无需修改模板。
