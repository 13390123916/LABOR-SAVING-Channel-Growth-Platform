# Product Schema

文档职责：定义 Product JSON-LD、Metadata 字段来源和 Schema 输出边界，确保产品页面后续从统一 Product Entity 生成结构化数据，而不是在页面中手写 JSON-LD。

## 1. Schema 原则

Product Schema 只表达真实、已确认、页面可见的产品事实。

禁止在 Product Schema 中补写：

- sku
- mpn
- offers
- price
- priceCurrency
- availability
- aggregateRating
- review
- 未确认 additionalProperty 参数
- 未确认认证
- 未授权案例

## 2. Product Schema 类型

后续产品相关页面使用：

| 页面类型 | URL 示例 | Schema |
| --- | --- | --- |
| Product Center | `/products/` | CollectionPage, Product, BreadcrumbList, FAQPage |
| Product Category | `/products/pneumatic-manipulator-arm/` | CollectionPage, Product, BreadcrumbList, FAQPage |
| Product Model | `/products/pneumatic-manipulator-arm/ls40/` | Product, BreadcrumbList, FAQPage |

当前阶段只定义标准，不开发页面。

## 3. Product Entity 到 Schema 映射

允许映射：

| Schema Field | Entity Field | 说明 |
| --- | --- | --- |
| `@type` | fixed | `Product` |
| `name` | `name` | 产品名称 |
| `brand.name` | `brand` | 当前为 LABOR-SAVING |
| `category` | `category` | 产品类别 |
| `description` | `description` | 必须与页面可见内容一致 |
| `url` | `slug` / metadata canonical | 规范 URL |

`entity_id` 不作为 Schema.org `Product` 的虚构字段输出。它用于系统内部追溯 Schema 来源；后续如需稳定公开标识，必须另行确认采用标准字段或 URL 标识策略。

暂不映射：

| Schema Field | 后置原因 |
| --- | --- |
| `sku` | 当前未确认 |
| `mpn` | 当前未确认 |
| `offers` | 不公开价格、库存、交期 |
| `aggregateRating` | 无真实评价数据 |
| `review` | 无真实授权评价 |
| `additionalProperty` | 参数未冻结 |

## 4. 当前产品 Schema 输出边界

当前允许进入 Product Schema 的实体：

```text
PRD-0001  LS40 助力机械臂
PRD-0002  L60 助力机械臂
PRD-0003  SQ35 气动平衡器
PRD-0004  SQ50 气动平衡器
```

每个 Product Schema 只允许包含：

```text
@context
@type
name
brand
category
description
url
```

资料不足时，`description` 必须保持谨慎表达，不得暗示参数、性能或案例已经确认。

## 5. CollectionPage Schema

`/products/` 后续作为产品集合页时，允许输出：

```text
@context
@type: CollectionPage
name
url
description
isPartOf
about
mainEntity
```

`mainEntity` 只能引用当前已确认 Product Entity。

## 6. FAQPage Schema

Product FAQPage 必须来自页面可见 FAQ。

FAQ 答案必须包含限制说明或下一步咨询方式，不能比页面正文承诺更多。

禁止 FAQ 进入 Schema：

- 价格是多少
- 多久回本
- 是否保证收益
- 是否区域独家
- 库存和交期是否固定
- 未确认参数是多少

如必须承接类似搜索意图，应改写为合规问答，例如：

```text
Q: 产品价格和交期如何确认？
A: 需要结合型号、工况、配置和项目条件由工作人员评估确认，页面不直接承诺价格、库存或交期。
```

## 7. BreadcrumbList

产品页面面包屑统一：

```text
首页 -> 产品中心
首页 -> 产品中心 -> 产品分类
首页 -> 产品中心 -> 产品分类 -> 产品型号
```

面包屑名称必须与页面 H1 或产品实体名称一致。

## 8. Metadata 来源

Product Metadata 字段来源优先级：

1. `docs/PRODUCT_SYSTEM.md`
2. `docs/PRODUCT_CONTENT_MODEL.md`
3. `docs/PRODUCT_SCHEMA.md`
4. `docs/PRODUCT_SEO_TEMPLATE.md`
5. `docs/METADATA_SCHEMA.md`
6. 页面真实可见内容

## 9. 后续实现要求

后续 Next.js 实现时：

- Product Schema 构建函数必须集中维护
- 页面不得散落手写 JSON-LD
- Schema 输出必须通过 `application/ld+json`
- Schema 字段必须能追溯到 Product Entity 或文档
- Build 前必须通过治理校验
