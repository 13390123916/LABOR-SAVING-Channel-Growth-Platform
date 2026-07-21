# Lead Schema

文档职责：定义 LABOR-SAVING 官网线索表单字段、CRM 输入标准和后续页面开发的表单来源。

## 1. 线索类型

M2 Channel Growth Foundation 优先处理：

1. Partner Lead：代理商、经销商、区域合作伙伴、项目合作伙伴。
2. Customer Lead：终端工业客户、工况咨询、产品咨询。

当前优先级：

```text
Partner Lead > Customer Lead
```

## 2. Partner Lead 基础字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| companyName | string | 是 | 公司名称 |
| contactName | string | 是 | 联系人 |
| phone | string | 是 | 联系电话 |
| region | string | 是 | 所在地区 |
| industry | string | 是 | 客户行业或主要服务行业 |
| mainProducts | string | 是 | 主营产品 |
| customerResources | string | 是 | 已有客户资源 |
| teamSize | string | 否 | 销售团队规模 |
| existingChannels | string | 否 | 已有渠道资源 |
| cooperationIntent | enum | 是 | 区域代理、行业代理、渠道经销商、项目合作伙伴 |
| source | string | 是 | 来源渠道 |

## 3. Partner Lead 渠道判断字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| sellsIndustrialTools | boolean | 是否销售工业工具 |
| sellsHydraulicTools | boolean | 是否销售液压工具 |
| hasWindPowerCustomers | boolean | 是否有风电客户 |
| hasManufacturingCustomers | boolean | 是否有制造业客户 |
| hasPetrochemicalCustomers | boolean | 是否有石油化工客户 |
| hasHeavyIndustryCustomers | boolean | 是否有重工业客户 |

## 4. Customer Lead 基础字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| companyName | string | 是 | 公司名称 |
| contactName | string | 是 | 联系人 |
| phone | string | 是 | 联系电话 |
| region | string | 是 | 所在地区 |
| industry | string | 否 | 所属行业 |
| interestedProduct | enum | 否 | LS40、LS60、LS70、气动平衡器、液压扭矩工具集成方案 |
| applicationScenario | string | 否 | 工况或应用场景 |
| projectStage | enum | 否 | 了解、选型、报价、项目评估 |
| source | string | 是 | 来源渠道 |

## 5. CRM 状态映射

状态沿用 `docs/CRM.md`：

| 状态 | 含义 |
| --- | --- |
| new | 新线索 |
| contacted | 已联系 |
| qualifying | 沟通中 |
| assigned | 已分配 |
| won | 已成交 |
| invalid | 无效线索 |

## 6. 来源渠道

来源渠道至少包括：

- 官网自然访问
- `/partner/`
- `/distributor/`
- `/join/`
- 百度 SEO
- 360搜索
- 搜狗
- Google
- AI Search
- 百度信息流
- 抖音
- 视频号
- 公众号
- 微信搜一搜

## 7. 字段合规

- 不收集与线索判断无关的敏感个人信息。
- 不在表单中承诺收益、回本、保本、区域独家或价格政策。
- 表单提交后只表达“已收到申请，将由工作人员评估联系”，不得表达自动授权或合作通过。

## 8. 页面开发要求

任何表单开发前必须读取：

- `docs/PARTNER_FUNNEL.md`
- `docs/LEAD_SCHEMA.md`
- `docs/CRM.md`
- `docs/WEBSITE_SEO_BLUEPRINT.md`

表单字段变更必须同步更新本文档。
