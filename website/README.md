# Website Workspace

此目录用于雷普赛维官网与平台前台实现。

## M1 Website Foundation

已建立：

- Next.js App Router
- TypeScript 严格模式
- TailwindCSS 基础样式
- 首页技术骨架入口
- `app/`
- `components/`
- `public/`
- `styles/`

SEO/GEO 的 URL、字段和内容规则在 `docs/WEBSITE_SEO_BLUEPRINT.md` 中定义。

M2 已新增：

- `/partner/`：LABOR-SAVING 渠道增长中心，承接 Partner Lead。
- `/products/`：Entity-driven Product Listing，承接产品分类浏览、资料状态说明和选型入口。
- `/products/[categorySlug]/`：由 Product Entity 分类自动生成的 Product Category 静态路由。
- `app/site-metadata.ts`：统一页面 metadata 来源，对齐 `docs/METADATA_SCHEMA.md`。
- `app/site-schema.ts`：统一 JSON-LD Schema 构建来源，对齐 `docs/SEO_SCHEMA_LAYER.md`。

Product Listing 数据来自 `app/products/product-entities.json`。新增 Product Entity 不修改页面模板；未发布 Entity 不生成详情链接或 Product Schema。

Product Category 使用同一数据源，通过 `categorySlug` 自动过滤。`npm test` 会验证 Entity Count、Listing Count、Category Total 与 Category Routes。

当前仍不编造产品参数、客户案例、收益结果、授权政策或市场排名。

## 本地命令

```bash
npm install
npm run typecheck
npm run lint
npm run build
```
