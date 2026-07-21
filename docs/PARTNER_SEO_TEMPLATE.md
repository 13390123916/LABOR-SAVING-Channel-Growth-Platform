# Partner SEO Template

文档职责：定义 Partner 页面及后续 Partner 子页面的 SEO/GEO 模板、Schema 输出和内部链接规则。

## 1. 页面类型

Partner SEO 页面包括：

| 页面 | URL | 目标 |
| --- | --- | --- |
| Partner 主页面 | `/partner/` | 获取 Partner Lead |
| 区域代理 | `/partner/regional-agent/` | 承接区域代理搜索与意向 |
| 行业代理 | `/partner/industry-agent/` | 承接垂直行业合作搜索 |
| 渠道经销商 | `/partner/distributor/` | 承接经销商加盟搜索 |
| 项目合作伙伴 | `/partner/project-partner/` | 承接项目合作伙伴搜索 |
| 合作政策 | `/partner/cooperation-policy/` | 承接合作机制说明，禁止承诺具体政策 |

当前阶段只开发：

```text
/partner/
```

子页面只作为 URL 与内容模型规划，不提前开发。

## 2. Partner 主页面 SEO 模板

URL：

```text
/partner/
```

Title：

```text
LABOR-SAVING 渠道增长中心 | 工业装备合作伙伴招募
```

Description：

```text
面向工业工具经销商、MRO、自动化集成商和设备贸易商，了解 LABOR-SAVING 工业智能搬运与重载装配渠道合作方向、合作模式、渠道赋能和区域合作伙伴申请入口。
```

Keywords：

- LABOR-SAVING 渠道增长中心
- 经销商加盟
- 区域代理
- 行业代理
- 工业工具代理
- 渠道经销商
- 工业装备渠道合作

Canonical：

```text
/partner/
```

H1：

```text
成为 LABOR-SAVING 授权合作伙伴
```

H2：

- 明确的工业增长场景
- 四类合作模式
- 八大渠道赋能
- 申请成为区域合作伙伴
- 合作前需要确认的问题

## 3. Schema

Partner 主页面必须输出：

- Organization
- WebPage
- ContactPoint
- BreadcrumbList
- FAQPage

字段来源：

```text
docs/SEO_SCHEMA_LAYER.md
```

禁止输出：

- price
- rating
- review
- availability
- offers
- aggregateRating
- 未确认授权范围
- 未确认认证
- 未确认客户案例

## 4. GEO 问答模板

Partner 页面必须沉淀可被 AI Search 引用的问答。

问答结构：

```text
Q: LABOR-SAVING 渠道增长中心是什么？
A: 它是面向工业工具经销商、MRO、自动化集成商、设备贸易商和项目合作伙伴的渠道合作入口，用于了解合作方向并提交 Partner Lead。

Q: 谁适合申请 LABOR-SAVING 合作伙伴？
A: 适合具备工业客户资源、销售服务能力或项目协作能力的工业工具代理商、MRO 服务商、自动化集成商、工业机器人集成商和设备贸易商。

Q: 提交申请后是否代表获得授权？
A: 不代表。提交后只进入人工评估流程，后续由工作人员根据区域、行业、资源和合作意向沟通确认。
```

FAQ 必须同步进入：

```text
FAQPage Schema
```

## 5. 内部链接规则

Partner 页面是商业入口，需要向产品、行业、知识和联系方式分流。

推荐 Topic Cluster：

```text
/partner/
 |
 ├── /products/
 |
 ├── /products/pneumatic-manipulator-arm/
 |
 ├── /applications/
 |
 ├── /applications/wind-power/
 |
 ├── /applications/petrochemical/
 |
 ├── /knowledge/
 |
 └── /about/contact/
```

规则：

- 已开发页面可以直接链接。
- 未开发页面先在文档规划，不强行添加到页面。
- 内链锚文本必须描述真实页面主题。
- 不使用“点击这里”等低价值锚文本。

## 6. 子页面 SEO 模板

### 6.1 区域代理

URL：

```text
/partner/regional-agent/
```

Title：

```text
LABOR-SAVING 区域代理合作 | 工业装备渠道伙伴
```

Lead：

```text
Partner Lead
```

合规：

- 不承诺区域独家。
- 不承诺区域保护细则。
- 不承诺收益或回本周期。

### 6.2 行业代理

URL：

```text
/partner/industry-agent/
```

Title：

```text
LABOR-SAVING 行业代理合作 | 风电与工业场景渠道合作
```

合规：

- 不编造行业市场份额。
- 不编造客户案例。

### 6.3 渠道经销商

URL：

```text
/partner/distributor/
```

Title：

```text
LABOR-SAVING 渠道经销商合作 | 工业工具代理与扩品
```

合规：

- 不承诺价格体系。
- 不承诺库存或供货周期。

### 6.4 项目合作伙伴

URL：

```text
/partner/project-partner/
```

Title：

```text
LABOR-SAVING 项目合作伙伴 | 工业装备项目协作
```

合规：

- 不承诺项目成交。
- 不编造项目结果。

## 7. 后台维护字段

Partner SEO 后续后台至少维护：

```text
page_id
url
title
description
keywords
canonical
breadcrumb
schema_types
faq
internal_links
lead_type
cta
source_status
updated_at
```

## 8. 批量审核字段

Partner SEO 批量导出至少包含：

- URL
- title
- description
- keywords
- canonical
- schema_types
- FAQ 数量
- 内链数量
- Lead 入口
- 合规状态
- 更新时间
