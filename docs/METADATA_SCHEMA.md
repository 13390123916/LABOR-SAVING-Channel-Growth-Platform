# Metadata Schema

文档职责：定义 LABOR-SAVING 官网统一 Metadata 输入标准，避免页面开发过程中各页面自行编写 SEO。

## 1. 统一字段

每个可索引页面必须统一定义：

- title
- description
- keywords
- canonical
- og
- schema
- breadcrumb

字段来源优先级：

1. `docs/PAGE_SYSTEM.md`
2. `docs/SEO_SCHEMA_LAYER.md`
3. `docs/WEBSITE_SEO_BLUEPRINT.md`
4. `docs/CONTENT_SYSTEM.md`
5. 页面真实内容

## 2. Metadata 模板

```text
id:
url:
title:
description:
keywords:
canonical:
og:
  title:
  description:
  url:
  type:
schema:
  - Organization
  - BreadcrumbList
  - FAQPage
breadcrumb:
  - name:
    url:
```

## 3. 字段规则

### 3.1 title

- 必须体现页面主题、业务目标和 LABOR-SAVING。
- 不堆砌关键词。
- 不使用收益、排名、授权范围等未经确认表达。

### 3.2 description

- 必须说明页面面向谁、解决什么问题、下一步如何咨询或合作。
- 招商页面只能表达合作方向和申请入口，不承诺收益或政策结果。

### 3.3 keywords

- 使用中国 SEO 与 GEO 场景下的核心词组。
- 每页关键词必须与页面真实内容匹配。
- 不用无关大词抢流量。

### 3.4 canonical

- 分类页和主页面必须使用稳定主 URL。
- `/partner/` 是加盟合作主 SEO 页面。
- `/distributor/` 与 `/join/` 只作为后续投放短链或重定向兼容路径。

### 3.5 og

- OG 标题和描述必须与 title、description 语义一致。
- OG 不得写收益承诺、回本承诺、区域独家或虚假背书。

### 3.6 schema

Schema 必须服务页面事实结构。

本文件只定义页面 Metadata 中应声明的 Schema 类型；Schema 字段来源、实体边界、后台维护、数据库预留和批量导出规则统一以 `docs/SEO_SCHEMA_LAYER.md` 为准。

推荐映射：

| 页面类型 | Schema |
| --- | --- |
| 加盟合作 | Organization, BreadcrumbList, FAQPage |
| 产品中心 | Product, BreadcrumbList, FAQPage |
| 行业应用 | Article, BreadcrumbList, FAQPage |
| 解决方案 | Article, BreadcrumbList, FAQPage |
| 知识内容 | Article 或 FAQPage, BreadcrumbList |
| 关于 | Organization, BreadcrumbList |

### 3.7 breadcrumb

- 每个重要页面必须具备面包屑。
- 面包屑名称使用中文业务名称。
- URL 使用英文小写、连字符和 `/` 结尾规则。

## 4. Partner 页面 Metadata

```text
id: partner
url: /partner/
title: LABOR-SAVING 渠道增长中心 | 工业装备合作伙伴招募
description: 面向工业工具经销商、MRO、自动化集成商和设备贸易商，了解 LABOR-SAVING 工业智能搬运与重载装配渠道合作方向、合作模式、渠道赋能和区域合作伙伴申请入口。
keywords:
  - LABOR-SAVING 渠道增长中心
  - 经销商加盟
  - 区域代理
  - 行业代理
  - 工业工具代理
  - 渠道经销商
  - 工业装备渠道合作
canonical: /partner/
og:
  title: LABOR-SAVING 渠道增长中心
  description: 面向工业工具经销商、MRO、自动化集成商和设备贸易商的渠道合作入口。
  url: /partner/
  type: website
schema:
  - Organization
  - BreadcrumbList
  - FAQPage
breadcrumb:
  - name: 首页
    url: /
  - name: 加盟合作
    url: /partner/
```

## 5. Product 页面 Metadata

```text
id: products
url: /products/
title: LABOR-SAVING 产品中心 | 工业助力与扭矩工具方案
description: 了解 LABOR-SAVING 当前产品范围，包括 LS40 助力机械臂、L60 助力机械臂、SQ35 气动平衡器、SQ50 气动平衡器，并进入产品咨询、选型咨询和渠道扩品入口。
keywords:
  - LS40 助力机械臂
  - L60 助力机械臂
  - SQ35 气动平衡器
  - SQ50 气动平衡器
  - 工业助力机械臂
  - 气动平衡器
canonical: /products/
og:
  title: LABOR-SAVING 产品中心
  description: 面向工业客户和渠道伙伴的产品理解、选型咨询和渠道扩品入口。
  url: /products/
  type: website
schema:
  - Product
  - BreadcrumbList
  - FAQPage
breadcrumb:
  - name: 首页
    url: /
  - name: 产品中心
    url: /products/
```

## 6. Applications 页面 Metadata

```text
id: applications
url: /applications/
title: LABOR-SAVING 行业应用 | 工业助力与重载装配场景
description: 面向风电、石油化工、装备制造、汽车制造、船舶和重工业等场景，沉淀工业助力、重载搬运、检修维护和扭矩工具应用内容。
keywords:
  - 工业自动化升级
  - 重载搬运需求
  - 风电装备维护
  - 石油化工检修
  - 智能制造装配
canonical: /applications/
og:
  title: LABOR-SAVING 行业应用
  description: 面向工业场景的助力搬运、重载装配和检修维护应用入口。
  url: /applications/
  type: website
schema:
  - Article
  - BreadcrumbList
  - FAQPage
breadcrumb:
  - name: 首页
    url: /
  - name: 行业应用
    url: /applications/
```

## 7. Knowledge 页面 Metadata

```text
id: knowledge
url: /knowledge/
title: LABOR-SAVING 知识中心 | 工业助力与渠道增长内容
description: 沉淀工业助力机械臂、气动平衡器、液压扭矩工具、行业应用、技术 FAQ 和渠道合作知识内容，支撑中国 SEO 与国内 AI Search 引用。
keywords:
  - 工业助力机械臂 FAQ
  - 气动平衡器选型
  - 液压扭矩工具应用
  - 重载装配知识
  - 工业工具渠道合作
canonical: /knowledge/
og:
  title: LABOR-SAVING 知识中心
  description: 面向工业客户和渠道伙伴的结构化知识内容入口。
  url: /knowledge/
  type: website
schema:
  - Article
  - FAQPage
  - BreadcrumbList
breadcrumb:
  - name: 首页
    url: /
  - name: 知识中心
    url: /knowledge/
```

## 8. 开发实现要求

- Next.js 页面必须从统一 metadata 定义中读取 title、description、keywords、canonical、og 和 breadcrumb。
- JSON-LD Schema 必须与页面内容一致。
- 页面内容变更影响 Metadata 时，必须同步更新本文件。
- 新增页面类型前，先补充本文件的字段标准。
