# Product Publishing Checklist

文档职责：定义 M2.4.5.3.3 First Published Product Validation 的发布验收流程。发布一个产品意味着完成一次真实 Product Entity 到可索引公开详情页的 SEO/GEO 验收，而不是单独修改状态字段。

## 1. 适用边界

- 候选实体只能是 LS40、L60、SQ35、SQ50 中资料完整且可公开发布的一项。
- LS70 是验证占位，不是 Product Entity，不得填写本清单或生成 Detail URL、Product Schema、sitemap、Related Product。
- 未获得资料来源、图片授权或公开发布确认时，清单不得标记通过。
- Related Product 可以在首个产品发布时保持禁用，但不得手写临时关联。

## 2. First Published Product Validation

| 检查项 | 发布要求 | 验证证据 | 当前状态 |
| --- | --- | --- | --- |
| Entity | Entity ID、名称、资料来源已确认 | 已审阅的 Product Entity | 待候选产品确认 |
| Slug | 唯一、小写、符合分类路径 | URL Builder 输出 | 待候选产品确认 |
| Category | 分类名称与 slug 一致 | Product Entity 分类字段 | 待候选产品确认 |
| Title | 与实体和可见 H1 一致 | Metadata Builder | 待候选产品确认 |
| Description | 来自已确认的可见内容 | Metadata 与页面正文 | 待候选产品确认 |
| Canonical | 指向唯一 Detail URL | Metadata Builder 与 HTML | 待候选产品确认 |
| Open Graph | title、description、url 与 Metadata 一致 | Metadata Builder 与 HTML | 待候选产品确认 |
| FAQ | 页面可见，答案不编造参数或承诺 | 页面与 FAQPage | 待候选产品确认 |
| Breadcrumb | 首页 -> 产品中心 -> 分类 -> 实体 | 页面与 BreadcrumbList | 待候选产品确认 |
| Product Schema | 字段均来自已确认实体和可见内容 | JSON-LD 校验 | 待候选产品确认 |
| Images | 真实、授权、清晰，具备描述性 ALT | 图片台账与页面渲染 | 待候选产品确认 |
| Internal Link | 至少保留分类返回与渠道合作入口 | 页面链接与构建结果 | 模板已具备 |
| Related Product | 仅由 `relatedEntityIds` 驱动 | Entity Relation；可暂不启用 | 暂不启用 |
| Sitemap | 仅加入通过发布门禁的 Canonical URL | sitemap 输出与构建结果 | 发布前待实现 |
| Robots | 允许正式详情抓取，不暴露未发布详情 | robots 输出与 HTTP 响应 | 发布前待实现 |
| Search Console | 上线后提交并跟踪索引状态 | 平台记录 | 上线后执行 |

## 3. 发布门禁

代码门禁保持为：

```text
detailStatus = published
AND schemaEligible = true
AND contentValidated = true
AND releaseApproved = true
```

`releaseApproved` 是内容审核和市场上线批准之间的独立门禁。只有清单中的 Entity、内容、SEO、图片与索引入口均已验收，且市场部门明确允许上线，才允许把候选实体的四个代码门禁字段全部置为可发布状态。sitemap 与 robots 未准备完成时，不得把页面视为“可索引发布完成”。

## 3.1 M2.4.5.3.5 First Published Product Acceptance

本阶段验收 Entity -> Content Package -> Metadata -> Schema -> SEO/GEO -> 发布 -> 收录 的完整路径，不追求增加页面数量。验收顺序为：

```text
Entity
-> Metadata
-> Schema
-> Canonical
-> Open Graph
-> FAQ
-> Breadcrumb
-> Internal Link
-> Sitemap
-> Robots
-> Search Console
-> Index Check
-> Published
```

通过验收前，`releaseApproved` 与 `detailStatus` 必须保持为 `false` 和 `planned`。Search Console 与 Index Check 属于上线后的外部验证，不得在本地阶段伪造通过记录。

## 4. 执行顺序

1. 选择资料最完整的真实 Product Entity，并归档资料来源、公开范围和图片授权。
2. 校验 Product Detail 可见内容、FAQ、图片、Metadata、Canonical、Open Graph、Breadcrumb 与 Product Schema。
3. 构建并验证唯一 Detail URL、内部链接与 Related Product 禁用或 Entity Relation 状态。
4. 完成 sitemap 与 robots 的正式索引入口校验。
5. 上线后提交 Search Console，并记录抓取和索引结果。

## 5. 后续 CMS 状态机

M2.4.5.3 完成后，CMS 可沿用以下状态机；当前不提前实现 CMS 或数据库逻辑：

```text
Draft
-> Internal Review
-> Content Approved
-> SEO Approved
-> Release Approved
-> Published
-> Indexed
-> Archived
```

建议映射：`Content Approved` 对应 `contentValidated`，`SEO Approved` 对应 `schemaEligible` 与本清单技术项通过，`Release Approved` 对应 `releaseApproved`，`Published` 对应公开路由、Schema、sitemap、robots 已完成，`Indexed` 对应 Search Console 或等效搜索平台记录。任何状态回退都应保留 Entity ID、版本和审计记录。
