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
- `app/site-metadata.ts`：统一页面 metadata 来源，对齐 `docs/METADATA_SCHEMA.md`。
- `app/site-schema.ts`：统一 JSON-LD Schema 构建来源，对齐 `docs/SEO_SCHEMA_LAYER.md`。

当前仍不编造产品参数、客户案例、收益结果、授权政策或市场排名。

## 本地命令

```bash
npm install
npm run typecheck
npm run lint
npm run build
```
