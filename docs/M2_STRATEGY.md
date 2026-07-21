# M2 Strategy

历史状态：本文件记录 M2 Channel Growth Foundation 的已完成策略。M2 已冻结为 v1.0；后续运行能力迁移至 M3 Website Platform Foundation，见 `docs/MILESTONE_MAPPING.md`。不改写本文件中保留的历史阶段编号。

当前 Product Detail 执行顺序：Detail Renderer Template -> Metadata / Schema Integration -> First Published Product Entity -> SEO/GEO Validation -> Related Product。LS70 不属于 Product Entity，不能用于详情页面验证。

文档职责：定义 M2 阶段方向，避免直接进入普通网站页面开发。

## 1. 战略判断

LABOR-SAVING 不是普通工业企业官网。

普通工业网站路径：

```text
产品展示
↓
客户询价
↓
成交
```

LABOR-SAVING 的正确路径：

```text
渠道增长平台
↓
代理商增长
↓
终端市场覆盖
↓
品牌资产沉淀
```

因此，网站必须定义为：

```text
工业智能装备渠道增长入口
```

## 2. Website Traffic Weight

| 模块 | 权重 | 目标 |
| --- | --- | --- |
| 加盟合作 Partner | 35% | 获取有效代理商、经销商、区域合作伙伴线索 |
| 产品 Product | 25% | 支撑产品理解、选型咨询和渠道扩品 |
| 行业应用 Industry | 20% | 承接终端工况需求和行业 SEO |
| 知识中心 Content | 10% | 建立 SEO/GEO 内容资产和 AI Search 引用 |
| 品牌 Trust | 10% | 建立企业实体、资质、联系方式和信任背书 |

## 3. M2 路线判断

### 3.1 方案 A：M2 Website Development

路径：

```text
页面开发
↓
产品展示
↓
SEO页面
↓
招商页面
↓
表单
```

优势：快速看到网站。

风险：招商逻辑、表单字段和 CRM 承接可能后补，页面容易变成普通产品展示官网。

### 3.2 方案 B：M2 Channel Growth Foundation

路径：

```text
加盟合作系统设计
↓
Lead Funnel
↓
CRM字段
↓
表单体系
↓
页面开发
```

推荐：方案 B。

原因：

- LABOR-SAVING 的核心不是流量，而是有效代理商线索。
- 先定义 Partner Funnel 和 Lead Schema，后续页面开发才有明确转化逻辑。
- 可避免先做漂亮页面、再补招商转化和 CRM 字段的返工。

## 4. M2 新阶段定义

M2 调整为：

```text
M2 Channel Growth Foundation
```

包含：

- M2.0 Page Strategy Definition
- M2.1 Metadata System
- M2.2 SEO Schema Layer
- M2.3 Partner Page Development & Partner System Hardening
- M2.4 Product System Foundation
- M2.5 Industry Page Development
- M2.6 Lead Capture Integration
- M2.7 Admin Maintainability
- M2.8 Batch Export

当前执行口径：

```text
M2.0 Page Strategy Definition
↓
M2.1 Metadata System
↓
M2.2 SEO Schema Layer
↓
M2.3 Partner Page Development & Partner System Hardening
↓
M2.4 Product System Foundation
↓
M2.4.0 Product Entity
-> M2.4.1 Product Content Model
-> M2.4.2 Product Metadata
-> M2.4.3 Product Schema
-> M2.4.4 Product CMS Model
-> M2.4.5 Product Rendering Layer
-> M2.5 Industry Page Development
↓
M2.6 Lead Capture Integration
↓
M2.7 Admin Maintainability
↓
M2.8 Batch Export
```

其中 `docs/PARTNER_FUNNEL.md` 与 `docs/LEAD_SCHEMA.md` 是 M1.5 已完成的渠道漏斗和线索字段输入，M2 页面开发必须继续沿用。

## 4.1 M2.0 Page Strategy Definition

交付文档：

```text
docs/PAGE_SYSTEM.md
```

目标：建立页面级开发输入，统一定义每个页面的页面目标、用户角色、SEO关键词、转化目标、CTA、内部链接、Schema 和 Lead入口。

## 4.2 M2.1 Metadata System

交付文档：

```text
docs/METADATA_SCHEMA.md
```

目标：统一 title、description、keywords、canonical、og、schema 和 breadcrumb，避免每个页面自行编写 SEO。

## 4.3 M2.2 SEO Schema Layer

交付文档：

```text
docs/SEO_SCHEMA_LAYER.md
```

目标：定义 Organization、Product、Article、FAQPage、BreadcrumbList、WebPage、ContactPoint 等结构化数据的字段来源、页面输出、后台维护、数据库预留和批量导出边界。

## 4.4 M2.3 Partner Page Development & Partner System Hardening

开发 URL：

```text
/partner/
```

目标：优先开发当前最高商业价值入口，用于招募 LABOR-SAVING 全国工业渠道合作伙伴，并承接 Partner Lead。

配套内容说明文档：

```text
docs/PARTNER.md
docs/PARTNER_CONTENT_MODEL.md
docs/PARTNER_SEO_TEMPLATE.md
```

目的：将 `/partner/` 从单页开发结果升级为 Partner Program Entity、Partner Content Model、Partner SEO Template 与 Partner Lead / CRM / CMS / Export 的可维护入口。

## 4.5 M2.4 Product System Foundation

交付文档：

```text
docs/ENTITY_SYSTEM.md
docs/PRODUCT_SYSTEM.md
docs/PRODUCT_CONTENT_MODEL.md
docs/PRODUCT_SCHEMA.md
docs/PRODUCT_SEO_TEMPLATE.md
```

目标：先建立 Product Entity、Content Model、Metadata、Schema、CMS Model 和 Product Rendering Layer 的统一基础层，再进入产品列表、分类、详情、FAQ、Schema、Metadata、Breadcrumb、内链与 SEO/GEO 落地。

本阶段不执行：

- 不批量开发产品页面
- 不开发后台 CMS
- 不开发 CRM
- 不冻结数据库设计
- 不编造产品参数、价格、交期、认证、案例或市场排名

标准顺序：

```text
Entity
-> Content Model
-> Metadata
-> Schema
-> CMS Model
-> Rendering Layer / Frontend Page
-> SEO
-> GEO
```

M2.4 拆分：

```text
M2.4.0 Product Entity
-> M2.4.1 Product Content Model
-> M2.4.2 Product Metadata
-> M2.4.3 Product Schema
-> M2.4.4 Product CMS Model
-> M2.4.5 Product Rendering Layer
```

说明：数据库设计在 Product Entity、Content Model、Metadata 和 Schema 完成后再冻结，避免后续产品数量增加时反复迁移。

M2.4.5 Product Rendering Layer 拆分：

```text
M2.4.5.1 Product Listing
-> /products/

M2.4.5.2 Product Category
-> /products/pneumatic-manipulator-arm/

M2.4.5.3 Product Detail
-> 首个资料已确认的真实 Product Entity

M2.4.5.4 Related Product
-> 通过 Entity ID 建立产品关联
```

每个渲染层交付必须验证：

- Metadata
- JSON-LD Schema
- Breadcrumb
- FAQ
- Internal Link
- Canonical
- Open Graph
- SEO
- GEO

M2.4.5 以模板和渲染能力验证为目标，不以页面数量为目标。Product Listing、Product Category、Product Detail、Related Product 必须逐层验收，模板成熟后才允许批量扩展。

首个 Product Detail 必须使用具备真实、可公开发布资料的 Product Entity。LS70 在资料未确认前只保留为路由验证占位，不分配正式 Entity ID，不进入 sitemap、Product Schema 或正式收录体系。

CMS 仍放在 M2.7。Database 继续保持规划，等待 Product、Industry、Case、Knowledge 等 Entity 关系稳定后再一次冻结。

## 5. M1.5 Partner Funnel Architecture

交付文档：

```text
docs/PARTNER_FUNNEL.md
```

目标：定义代理商从访问加盟页面到区域代理审核的完整路径。

## 6. M1.5 Lead Capture Schema

交付文档：

```text
docs/LEAD_SCHEMA.md
```

目标：定义表单字段、CRM 输入标准和线索分层基础。

## 7. M2 Website Page Development

在 M2.0 与 M2.1 完成后，再开发：

- 首页
- Partner
- Product
- Industry
- Knowledge

## 8. 当前风险

### 风险 1：过早开发页面

评级：★★★★

风险：页面漂亮，但没有招商转化逻辑。

应对：先完成 `docs/PARTNER_FUNNEL.md` 与 `docs/LEAD_SCHEMA.md`。

### 风险 2：SEO 内容提前大量生成

评级：★★★

风险：产生低质量 AI 文章。

应对：严格执行 `docs/CONTENT_SYSTEM.md`，先建立 Content Governance。

### 风险 3：产品参数扩散

评级：★★★

风险：页面和内容中出现虚构参数、客户、案例、市场份额或认证。

应对：继续执行“不编造产品参数、案例、收益、授权政策和市场排名”原则。

## 9. M1.5 前置任务

M2 启动前先完成：

1. 升级 `.ai/AI_PROJECT_OPERATING_SYSTEM.md` 到 V1.2。
2. 新增 `docs/M2_STRATEGY.md`。
3. 新增 `docs/PARTNER_FUNNEL.md`。
4. 新增 `docs/LEAD_SCHEMA.md`。

完成后进入：

```text
M2 Channel Growth Foundation
```
