# SEO Schema Layer

文档职责：定义 LABOR-SAVING 渠道增长平台的结构化数据层，连接页面 Metadata、页面内容、SEO/GEO、后台维护、数据库字段、CRM 入口与批量导出。

本层位于：

```text
PAGE_SYSTEM.md
↓
METADATA_SCHEMA.md
↓
SEO_SCHEMA_LAYER.md
↓
Next.js 页面开发
↓
Lead Capture / CRM / 后台维护 / 批量导出
```

## 1. 定位

Metadata Schema 解决页面级 SEO 元信息。

SEO Schema Layer 解决平台级结构化实体表达。

两者边界：

| 层级 | 回答的问题 | 典型字段 |
| --- | --- | --- |
| Page System | 页面为什么存在、给谁看、转化什么 | 页面目标、用户角色、CTA、Lead 入口 |
| Metadata Schema | 页面如何被搜索结果和社交平台理解 | title、description、keywords、canonical、og、breadcrumb |
| SEO Schema Layer | 页面背后的实体、FAQ、产品、组织、线索入口如何结构化表达 | Organization、Product、Article、FAQPage、BreadcrumbList、WebPage、ContactPoint |

## 2. 核心原则

- Schema 必须来自真实页面内容、真实业务实体或已确认文档。
- Schema 不得比页面正文承诺更多信息。
- 产品 Schema 不得补写未经确认的参数、价格、库存、评分、评价或认证。
- Partner Schema 不得承诺收益、回本周期、区域独家、零风险或自动授权。
- FAQ Schema 必须与页面可见 FAQ 一致。
- BreadcrumbList 必须与真实 URL 和导航层级一致。
- 后台维护、数据库、页面输出和批量导出必须使用同一套字段语义。

## 3. 页面类型到 Schema 映射

| 页面类型 | URL | 主 Schema | 辅助 Schema | Lead 入口 |
| --- | --- | --- | --- | --- |
| 加盟合作 | `/partner/` | Organization, WebPage | BreadcrumbList, FAQPage, ContactPoint | Partner Lead |
| 产品中心 | `/products/` | Product, CollectionPage | BreadcrumbList, FAQPage | Customer Lead 或 Partner Lead |
| 产品型号 | `/products/{slug}/` | Product | BreadcrumbList, FAQPage | Customer Lead |
| 行业应用 | `/applications/` | CollectionPage, Article | BreadcrumbList, FAQPage | Customer Lead |
| 行业详情 | `/applications/{slug}/` | Article | BreadcrumbList, FAQPage | Customer Lead |
| 知识中心 | `/knowledge/` | CollectionPage | BreadcrumbList | Customer Lead 或 Partner Lead |
| FAQ 内容 | `/knowledge/faq/` | FAQPage | BreadcrumbList | Customer Lead 或 Partner Lead |
| 关于 | `/about/` | Organization | BreadcrumbList, ContactPoint | Customer Lead |

## 4. 实体模型

### 4.1 Organization Entity

用于表达 LABOR-SAVING 品牌与平台实体。

字段：

```text
name
url
description
sameAs
contactPoint
```

当前可用字段：

- name: LABOR-SAVING
- url: 来自 `NEXT_PUBLIC_SITE_URL`
- description: 面向工业智能搬运、重载装配和工业渠道合作的渠道增长平台

资料不足时不得写入：

- 未确认公司资质
- 未确认认证
- 未确认地址
- 未确认电话
- 未确认社交账号

### 4.2 Product Entity

用于产品中心、产品分类和产品型号页。

当前产品范围：

- LS40 助力机械臂
- L60 助力机械臂
- SQ35 气动平衡器
- SQ50 气动平衡器

允许字段：

```text
name
category
brand
description
url
```

资料不足时不得写入：

- sku
- mpn
- offers
- price
- aggregateRating
- review
- additionalProperty 中的未确认参数

### 4.3 Application Entity

用于行业应用页。

允许表达：

- 行业场景
- 常见问题类型
- 相关产品类别
- 实施前需要确认的条件
- 咨询入口

禁止表达：

- 未授权客户名称
- 虚构项目效果
- 虚构效率提升比例
- 市场份额或排名

### 4.4 Knowledge Entity

用于知识中心、文章、FAQ 和下载内容。

必须回答：

1. 这是什么
2. 适合谁
3. 解决什么问题
4. 有哪些限制
5. 下一步如何咨询或合作

### 4.5 Lead Entry Entity

Lead Entry 不等同于公开承诺。

允许表达：

- 入口类型：Partner Lead / Customer Lead
- 来源页面
- 合作意向
- 后续进入人工评估

禁止表达：

- 自动授权
- 自动报价
- 自动审批通过
- 收益承诺
- 回本承诺

## 5. Partner 页面 Schema 标准

URL：

```text
/partner/
```

必须输出：

- Organization
- WebPage
- BreadcrumbList
- FAQPage
- ContactPoint

Organization：

```text
name: LABOR-SAVING
description: 面向工业智能搬运、重载装配和工业渠道合作的渠道增长平台
url: siteBaseUrl
```

WebPage：

```text
name: LABOR-SAVING 渠道增长中心
url: /partner/
description: 与页面 metadata description 保持一致
isPartOf: Organization
about: 渠道合作、工业智能搬运、重载装配
potentialAction: 申请成为区域合作伙伴
```

ContactPoint：

```text
contactType: Partner Lead
areaServed: CN
availableLanguage: zh-CN
```

FAQPage：

- 必须来自页面可见 FAQ。
- 答案必须包含限制或评估边界。

BreadcrumbList：

```text
首页 -> 加盟合作
```

## 6. Product 页面 Schema 标准

URL：

```text
/products/
```

必须输出：

- CollectionPage
- Product
- BreadcrumbList
- FAQPage

Product 只表达当前已确认产品实体，不补写参数。

当前产品实体：

```text
LS40 助力机械臂
L60 助力机械臂
SQ35 气动平衡器
SQ50 气动平衡器
```

产品资料不足时，页面和 Schema 都必须表达“需进一步确认工况与资料”，不得用虚构参数填充。

## 7. Applications 页面 Schema 标准

URL：

```text
/applications/
```

必须输出：

- CollectionPage
- Article
- BreadcrumbList
- FAQPage

行业场景优先覆盖：

- 风电
- 石油化工
- 装备制造
- 汽车制造
- 船舶
- 重工业

## 8. Knowledge 页面 Schema 标准

URL：

```text
/knowledge/
```

必须输出：

- CollectionPage
- BreadcrumbList

具体文章或 FAQ 再输出：

- Article
- FAQPage

## 9. 后台维护来源

后续后台维护时，Schema 字段来源必须分层：

| 字段类型 | 后台来源 | 页面输出 |
| --- | --- | --- |
| 页面 metadata | Page SEO 配置 | Next.js Metadata |
| 页面 breadcrumb | 页面树 / URL 配置 | BreadcrumbList |
| Organization | 企业实体资料 | Organization / ContactPoint |
| Product | 产品实体库 | Product |
| Application | 行业应用库 | Article / CollectionPage |
| FAQ | FAQ 内容库 | FAQPage |
| Lead Entry | Lead Schema / CRM 字段 | WebPage potentialAction |

## 10. 数据库字段预留

后续数据库至少预留：

```text
page_id
url
schema_type
schema_json
entity_type
entity_id
source_doc
source_status
updated_at
published_at
```

`schema_json` 必须可由后台字段重新生成，不应长期依赖人工粘贴。

## 11. 批量导出要求

批量导出不仅导出 Lead，也应能导出 SEO/GEO 资产：

- 页面 URL
- title
- description
- canonical
- schema_type
- schema_json
- FAQ
- Lead 入口
- 更新时间
- 资料状态

用途：

- SEO 审核
- GEO 内容审计
- 后台内容迁移
- 页面批量巡检
- CRM 来源复盘

## 12. Next.js 输出要求

- 页面不得各自散落手写 JSON-LD。
- Schema 构建函数必须集中维护。
- 每个页面输出的 Schema 类型必须能在 `docs/SEO_SCHEMA_LAYER.md` 中找到映射。
- JSON-LD 必须通过 `application/ld+json` 输出。
- 页面构建时不得依赖浏览器端脚本补 Schema。

## 13. 审核清单

每个核心页面开发完成后必须审核：

- 是否已在 `docs/PAGE_SYSTEM.md` 定义页面目标和 Lead 入口。
- 是否已在 `docs/METADATA_SCHEMA.md` 定义 metadata。
- 是否已在 `docs/SEO_SCHEMA_LAYER.md` 定义 Schema 类型和字段来源。
- 页面可见内容是否覆盖 Schema 中的 FAQ 与主要实体。
- JSON-LD 是否不包含未确认参数、收益、排名、区域独家或授权承诺。
- `npm run build` 是否通过。
- `node scripts/validate-website-governance.mjs` 是否通过。
