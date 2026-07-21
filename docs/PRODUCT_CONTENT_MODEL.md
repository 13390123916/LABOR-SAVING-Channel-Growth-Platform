# Product Content Model

文档职责：定义 `/products/`、产品分类页和产品型号页的统一内容结构，避免产品内容散落在页面组件中。当前阶段只定义内容模型，不批量开发产品页面。

## 1. 内容目标

Product 内容必须同时服务：

- 终端客户理解产品类别、适用场景和咨询路径
- 渠道伙伴理解产品线、扩品方向和关联招商入口
- 中国 SEO 可抓取
- 国内 AI Search 可引用
- 后续 CMS 可维护
- 后续 Schema 可自动生成

所有 Product 内容记录必须携带 `entity_id`。页面 URL、标题或型号名称发生变化时，内容、关联资源、Lead、Analytics 和后续 CMS 仍通过 Entity ID 识别同一产品。

## 2. ProductTemplate

所有产品页面后续统一使用以下结构：

```text
ProductTemplate
|- Hero
|- Product Overview
|- Product Category / Model
|- Features
|- Applications
|- Related Industries
|- Related Resources
|- FAQ
|- Lead Entry
|- Related Products
|- Partner Entry
|- Compliance Notes
```

## 3. Hero

用途：

```text
快速说明产品是什么、面向谁、下一步如何咨询。
```

字段：

```text
eyebrow
h1
summary
primary_cta
secondary_cta
trust_note
source_status_note
```

合规：

- 不写未确认参数
- 不写价格和交期
- 不写性能夸大承诺
- 不写客户案例背书，除非已有授权

## 4. Product Overview

用途：

```text
用事实型语言解释产品定义、类别和基本用途。
```

字段：

```text
product_name
category
brand
short_description
target_users
application_summary
limitations
```

必须回答：

1. 这是什么产品
2. 属于哪个产品类别
3. 适合谁了解或咨询
4. 解决哪类问题
5. 资料不足时有哪些限制

## 5. Product Category / Model

用途：

```text
区分产品集合页、分类页和型号页。
```

页面类型：

| Page Type | URL 示例 | 内容边界 |
| --- | --- | --- |
| Product Center | `/products/` | 展示当前已确认产品范围和咨询入口 |
| Category Page | `/products/pneumatic-manipulator-arm/` | 展示产品类别、适用方向和型号入口 |
| Model Page | `/products/pneumatic-manipulator-arm/ls40/` | 展示单个型号基础信息，资料不足时不写参数 |

当前阶段不开发这些页面，只冻结内容结构。

## 6. Features

用途：

```text
表达产品能力方向，而不是虚构技术参数。
```

字段：

```text
feature_name
summary
applicable_conditions
source_status
display_order
```

允许表达：

- 助力搬运
- 重载装配辅助
- 气动平衡
- 扭矩工具集成方向
- 选型前需确认工况

禁止表达：

- 未确认载荷
- 未确认行程
- 未确认精度
- 未确认速度
- 未确认认证
- 未确认效率提升比例

## 7. Applications

用途：

```text
连接产品与行业工况，服务选型咨询和内链。
```

字段：

```text
scenario_name
industry
problem_type
related_product_ids
implementation_conditions
display_order
```

`related_product_ids` 只保存符合 `PRD-0001` 格式的 Product Entity ID，不保存产品名称或 URL。

应用表达必须写明：

- 适用前需要确认工件、空间、载荷、节拍、能源条件和安全要求
- 具体适配结果以人工选型评估为准

## 8. Related Resources

用途：

```text
承接资料下载、文章、视频和 FAQ。
```

关联类型：

- Article
- Video
- Download
- FAQ
- Case

资料不足时只显示“待补充资料”或引导咨询，不虚构文件、视频或案例。

## 9. FAQ

Product FAQ 必须采用可进入 FAQPage Schema 的问答结构。

每个 FAQ 必须回答：

1. 这是什么
2. 适合谁
3. 解决什么问题
4. 有哪些限制
5. 下一步如何咨询

示例问题方向：

- LABOR-SAVING 当前有哪些产品实体？
- 产品资料不足时是否可以直接选型？
- 终端客户和渠道伙伴应该提交哪类咨询？
- 产品页面是否包含价格、库存或交期承诺？

## 10. Lead Entry

产品内容承接两类线索：

| Lead Type | 适用对象 | 来源 |
| --- | --- | --- |
| Customer Lead | 终端工厂、设备负责人、采购和维修人员 | 产品咨询、选型咨询、工况咨询 |
| Partner Lead | 代理商、经销商、MRO、集成商 | 渠道扩品、区域合作、项目合作 |

字段来源：

```text
docs/LEAD_SCHEMA.md
```

## 11. Partner Entry

产品页面必须保留 Partner 内链入口，用于承接渠道扩品需求。

建议锚文本：

```text
了解 LABOR-SAVING 渠道合作
```

目标 URL：

```text
/partner/
```

## 12. Compliance Notes

Product 内容统一遵守：

- 不编造参数
- 不编造案例
- 不编造收益
- 不承诺价格、库存、交期
- 不承诺认证或市场排名
- 不把单一产品表达为所有工况通用方案
- 资料不足时必须提示需要进一步确认工况与资料
