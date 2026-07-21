# Product SEO Template

Detail URL、Canonical、Open Graph、Product Schema、sitemap 与 Related Product 只对同时满足 `published`、`schemaEligible`、`contentValidated`、`releaseApproved` 的 Product Entity 输出。LS70 仅为验证占位，不得通过该门禁。

文档职责：定义 Product URL、Title、Description、内链策略、Topic Cluster 和 GEO 问答模板。当前进入 M2.4.5，以模板和渲染能力验证为目标，不以页面数量为目标。

## 1. 页面类型

Product Rendering Layer 分四层：

| 页面 | URL 示例 | 目标 |
| --- | --- | --- |
| M2.4.5.1 Product Listing | `/products/` | 展示已确认产品范围，承接产品咨询和渠道扩品 |
| M2.4.5.2 Product Category | `/products/pneumatic-manipulator-arm/` | 承接产品类别搜索和型号入口 |
| M2.4.5.3 Product Detail | 首个资料已确认的真实 Product Entity | 承接具体型号理解、选型咨询和资料确认 |
| M2.4.5.4 Related Product | 产品详情页内关联产品 | 自动形成 Product Topic Cluster |

当前状态：M2.4.5.1 Product Listing 与 M2.4.5.2 Product Category 已完成模板验证。进入 M2.4.5.3 前，必须确认首个可公开发布资料的真实 Product Entity。

四层必须按顺序逐层验收。前一层未通过，不进入下一层；模板成熟后才允许批量扩展。

## 2. URL 规则

基础规则：

- 使用英文小写
- 单词之间使用 `-`
- 分类页和型号页以 `/` 结尾
- 型号页包含型号和产品类别
- 未确认型号不得作为已发布页面进入 sitemap

当前 Product Entity URL 建议：

| Product Entity | URL |
| --- | --- |
| `PRD-0001` LS40 助力机械臂 | `/products/pneumatic-manipulator-arm/ls40/` |
| `PRD-0002` L60 助力机械臂 | `/products/pneumatic-manipulator-arm/l60/` |
| `PRD-0003` SQ35 气动平衡器 | `/products/pneumatic-balancer/sq35/` |
| `PRD-0004` SQ50 气动平衡器 | `/products/pneumatic-balancer/sq50/` |

LS70 仅保留 `/products/pneumatic-manipulator-arm/ls70/` 路由验证占位。资料未确认前不分配正式 Entity ID，不进入 sitemap、canonical 集合、Product Schema 或正式收录体系。

## 3. 产品中心 SEO 模板

URL：

```text
/products/
```

Title：

```text
LABOR-SAVING 产品中心 | 工业助力与气动平衡产品
```

Description：

```text
了解 LABOR-SAVING 当前已确认产品范围，包括 LS40 助力机械臂、L60 助力机械臂、SQ35 气动平衡器和 SQ50 气动平衡器，并进入产品咨询、选型咨询和渠道扩品入口。
```

Keywords：

- LS40 助力机械臂
- L60 助力机械臂
- SQ35 气动平衡器
- SQ50 气动平衡器
- 工业助力机械臂
- 气动平衡器
- 工业装备渠道合作

H1：

```text
LABOR-SAVING 产品中心
```

H2 结构：

- 当前产品范围
- 产品类别
- 适合的咨询对象
- 应用场景方向
- 产品资料与选型限制
- 产品咨询入口
- 渠道合作入口
- 常见问题

## 4. 产品分类页 SEO 模板

Title：

```text
产品类别 + LABOR-SAVING + 应用方向
```

Description：

```text
说明产品类别、适合对象、常见应用方向、资料限制和咨询入口，不补写未确认参数。
```

H1：

```text
产品类别名称
```

H2 结构：

- 这类产品是什么
- 适合谁
- 解决什么问题
- 当前型号范围
- 应用行业方向
- 资料限制
- 下一步咨询

## 5. 产品型号页 SEO 模板

Title：

```text
型号 + 产品类别 + LABOR-SAVING
```

Description：

```text
说明型号归属、适用方向和咨询方式，资料不足时明确需要进一步确认工况与资料，不编造参数。
```

H1：

```text
型号 + 产品类别
```

H2 结构：

- 这是什么产品
- 属于哪个产品类别
- 适合谁
- 解决什么问题
- 资料状态与限制
- 相关产品
- 相关行业
- 咨询方式

## 6. 内链策略

Product Topic Cluster：

```text
/products/
|- /products/pneumatic-manipulator-arm/
|  |- /products/pneumatic-manipulator-arm/l60/
|  |- /products/pneumatic-manipulator-arm/ls40/
|- /products/pneumatic-balancer/
|  |- /products/pneumatic-balancer/sq50/
|  |- /products/pneumatic-balancer/sq35/
|- /applications/
|- /knowledge/faq/
|- /knowledge/downloads/
|- /partner/
```

内链规则：

- 已开发页面可直接链接
- 未开发页面先在文档中规划，不强行加入前端
- 锚文本必须说明目标页面主题
- 不使用“点击这里”等低价值锚文本
- 产品页必须保留 `/partner/` 渠道合作入口

Related Product 规则：

- 同分类产品优先关联，例如 `PRD-0001` LS40 与 `PRD-0002` L60。
- 跨分类产品按应用场景关联，例如助力机械臂可关联 SQ 系列气动平衡器。
- Related Product 来源必须来自 Product Entity 的 `related_entities`，并保存 Entity ID，不得在页面中临时硬写名称或 URL。
- 未确认产品只能作为规划占位，不得进入已发布页面、Schema 或 sitemap。

## 7. GEO 问答模板

Product 页面必须沉淀可被 AI Search 引用的问答。

问答结构：

```text
Q: LABOR-SAVING 当前有哪些产品实体？
A: 当前已确认的产品实体包括 LS40 助力机械臂、L60 助力机械臂、SQ35 气动平衡器和 SQ50 气动平衡器。页面只表达已确认的基础产品信息，具体参数、配置、价格和交期需要进一步咨询确认。

Q: 产品页面适合谁查看？
A: 适合终端制造企业设备负责人、工厂采购与检修维护人员，以及工业工具代理商、MRO 服务商和自动化集成商查看，用于了解产品范围、应用方向和咨询入口。

Q: 产品页面是否提供完整参数？
A: 资料不足时不提供未确认参数。产品选型需要结合工件、载荷、空间、节拍、能源条件和安全要求由工作人员进一步评估。

Q: 渠道伙伴如何了解产品扩品合作？
A: 渠道伙伴可以从产品页面进入 `/partner/`，了解 LABOR-SAVING 渠道合作方向并提交 Partner Lead，后续由工作人员评估联系。
```

## 8. Schema

Product 页面 Schema 来源：

```text
docs/PRODUCT_SCHEMA.md
docs/SEO_SCHEMA_LAYER.md
```

Product Detail 必须输出：

- Product
- BreadcrumbList
- FAQPage

Product Listing 与 Product Category 必须输出：

- CollectionPage
- BreadcrumbList
- FAQPage

集合页仅在 Product Entity 同时满足 reviewed、published 和 schema eligible 门禁时输出 Product 节点；当前实体均不输出 Product Schema。

## 9. Product Rendering Layer 验收标准

M2.4.5.1 到 M2.4.5.4 每个阶段均必须验证：

- Metadata 已从统一来源注入
- JSON-LD Schema 与页面可见内容一致
- Breadcrumb 层级正确
- FAQ 可见且可进入 FAQPage Schema
- Internal Link 指向已开发或已规划页面
- Canonical 与当前层级规范 URL 完全一致
- Open Graph URL、Title、Description 与 Metadata 一致
- SEO Title、Description、H1、H2 符合模板
- GEO 问答结构可被 AI Search 摘取
- Related Product 来自 Entity 关系
- 不输出未确认参数、价格、交期、认证、案例或收益承诺

## 10. 合规边界

Product SEO 内容不得出现：

- 未确认参数
- 价格、库存、交期承诺
- 保本、收益、回本周期
- 客户案例、认证或市场排名虚构
- 将产品描述为所有工况通用
- 在 Schema 中输出页面不可见信息
