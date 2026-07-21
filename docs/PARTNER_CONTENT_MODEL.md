# Partner Content Model

文档职责：定义 `/partner/` 与后续 Partner 子页面的内容模块模型，避免合作内容散落在页面组件中。

## 1. 内容模型目标

Partner 内容必须服务：

- 渠道合作伙伴快速理解合作价值
- SEO/GEO 可抓取和可引用
- Partner Lead 转化
- 后台 CMS 可维护
- 后续批量导出和审核

## 2. PartnerTemplate

所有 Partner 页面统一使用以下内容结构：

```text
PartnerTemplate
|
├── Hero
|
├── Market Opportunity
|
├── Cooperation Models
|
├── Channel Enablement
|
├── Partner Requirements
|
├── Lead Entry
|
├── FAQ
|
├── Related Products
|
├── Related Applications
|
└── Compliance Notes
```

## 3. Hero

用途：

```text
3 秒内说明为什么成为 LABOR-SAVING 合作伙伴。
```

字段：

```text
eyebrow
h1
summary
primary_cta
secondary_cta
trust_note
```

当前内容：

- eyebrow: LABOR-SAVING 渠道增长中心
- h1: 成为 LABOR-SAVING 授权合作伙伴
- primary_cta: 申请成为区域合作伙伴

合规：

- 不写收益。
- 不写回本。
- 不写区域独家。
- 不写自动授权。

## 4. Market Opportunity

用途：

```text
让渠道伙伴理解工业增长方向。
```

字段：

```text
opportunity_name
summary
related_industries
related_products
display_order
```

当前模块：

- 工业自动化升级
- 重载搬运需求
- 风电装备市场
- 石油化工维修市场
- 智能制造趋势

合规：

- 只表达市场方向。
- 不表达市场份额、增长率、排名或收益。

## 5. Cooperation Models

用途：

```text
说明适合哪些合作方式，帮助用户自我筛选合作意向。
```

字段：

```text
mode_name
target_partner
description
qualification_notes
crm_value
display_order
```

当前模块：

- 区域代理
- 行业代理
- 渠道经销商
- 项目合作伙伴

CRM 映射：

```text
cooperationIntent
```

## 6. Channel Enablement

用途：

```text
说明总部可能提供的渠道支持方向，形成区别于普通招商页的内容资产。
```

字段：

```text
module_name
summary
content
related_assets
display_order
```

当前模块：

- 产品赋能
- 技术赋能
- 销售赋能
- 市场赋能
- 内容赋能
- 培训赋能
- 售后赋能
- 品牌赋能

## 7. Partner Requirements

用途：

```text
帮助线索自我筛选，提高 Partner Lead 有效性。
```

建议字段：

```text
company_type
served_industries
main_products
sales_team
customer_resources
service_capability
region
```

合规：

- 只作为评估方向，不作为自动通过条件。

## 8. Lead Entry

用途：

```text
承接 Partner Lead。
```

字段来源：

```text
docs/LEAD_SCHEMA.md
```

当前必须字段：

- companyName
- contactName
- phone
- region
- industry
- mainProducts
- customerResources
- cooperationIntent
- source

提交后表达：

```text
已收到申请，将由工作人员评估联系。
```

禁止表达：

- 已授权
- 已通过
- 保证合作
- 保证收益

## 9. FAQ

用途：

```text
沉淀 GEO 问答内容，并进入 FAQPage Schema。
```

FAQ 必须回答：

1. 这是什么
2. 适合谁
3. 解决什么问题
4. 有哪些限制
5. 下一步如何申请

当前 FAQ 重点：

- 渠道增长中心适合哪些合作伙伴
- 提交 Partner Lead 后是否代表已经获得授权
- 页面是否承诺收益、回本周期或区域独家

## 10. Related Products

用途：

```text
形成 Partner 页面到 Product Growth Engine 的内部链接。
```

推荐链接：

- `/products/`
- `/products/pneumatic-manipulator-arm/`
- `/products/pneumatic-balancer/`
- `/products/hydraulic-torque-wrench-integration/`

产品页面未开发前，只保留规划，不强行创建不存在链接。

## 11. Related Applications

用途：

```text
形成 Partner 页面到行业 Topic Cluster 的内部链接。
```

推荐链接：

- `/applications/`
- `/applications/wind-power/`
- `/applications/petrochemical/`
- `/applications/equipment-manufacturing/`

行业页面未开发前，只保留规划，不强行创建不存在链接。

## 12. Compliance Notes

所有 Partner 内容必须遵守：

- 不承诺收益。
- 不承诺回本周期。
- 不承诺区域独家。
- 不承诺零风险。
- 不编造客户案例。
- 不编造市场份额。
- 不编造认证或授权范围。
- 合作政策、价格体系和区域规则必须以后续真实商务资料为准。
