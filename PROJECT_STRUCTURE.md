# LABOR-SAVING Channel Growth Platform

GitHub Repository Structure

Version: V1.2

## 项目定位

雷普赛维渠道增长平台是工业装备渠道增长平台，不是普通企业官网。

完整系统长期覆盖：

- 官网获客
- 中国 SEO
- GEO / AI 搜索优化
- 线索收集
- CRM 分配
- 代理商协作
- 运营分析
- 内容资产

## 当前工程落点

```text
/
├── .ai/
├── .github/
├── docs/
├── website/
│   ├── app/
│   │   ├── partner/
│   │   ├── site-metadata.ts
│   │   └── site-schema.ts
│   ├── components/
│   ├── public/
│   ├── styles/
│   ├── package.json
│   └── README.md
├── seo/
├── geo/
├── crm/
├── partner/
├── marketing/
├── assets/
├── scripts/
├── deploy/
└── archive/
```

## 目录原则

1. 新增目录必须先说明用途。
2. 不重复建目录。
3. 不重复建模块。
4. 不把临时代码塞进页面组件。
5. M1.2 只建立 `website/` 技术骨架，不提前创建 `config`、`lib`、`application`、`domain`、`infrastructure`、`features` 等无业务支撑目录。

## 文档职责

根目录只保留入口和发布记录：

- `README.md`
- `CHANGELOG.md`

项目详细文档统一维护在 `docs/`：

- `docs/PROJECT_PRD.md`
- `docs/ROADMAP.md`
- `docs/TODO.md`
- `docs/MEMORY.md`
- `docs/ARCHITECTURE.md`
- `docs/SEO.md`
- `docs/GEO.md`
- `docs/CRM.md`
- `docs/PARTNER.md`
- `docs/API.md`
- `docs/DATABASE.md`
- `docs/CONTENT.md`
- `docs/STYLEGUIDE.md`
- `docs/DEPLOYMENT.md`
- `docs/GIT_WORKFLOW.md`
- `docs/ISSUE_WORKFLOW.md`
- `docs/REPOSITORY_MAINTENANCE.md`
- `docs/WEBSITE_ARCHITECTURE.md`
- `docs/WEBSITE_SEO_BLUEPRINT.md`
- `docs/CONTENT_SYSTEM.md`
- `docs/M2_STRATEGY.md`
- `docs/PAGE_SYSTEM.md`
- `docs/METADATA_SCHEMA.md`
- `docs/SEO_SCHEMA_LAYER.md`
- `docs/ENTITY_SYSTEM.md`
- `docs/PRODUCT_SYSTEM.md`
- `docs/PRODUCT_CONTENT_MODEL.md`
- `docs/PRODUCT_SCHEMA.md`
- `docs/PRODUCT_SEO_TEMPLATE.md`
- `docs/PARTNER_FUNNEL.md`
- `docs/PARTNER_CONTENT_MODEL.md`
- `docs/PARTNER_SEO_TEMPLATE.md`
- `docs/LEAD_SCHEMA.md`

## 文档维护原则

任何新增功能都必须检查并按需更新：

- `README.md`
- `CHANGELOG.md`
- `docs/PROJECT_PRD.md`
- `docs/ROADMAP.md`
- `docs/TODO.md`
- `docs/MEMORY.md`

## 当前策略

M2 Channel Growth Foundation 已启动。当前已建立页面级输入标准、Metadata System、SEO Schema Layer 和 `/partner/` 商业入口。

当前及后续 Entity 模块统一执行顺序：

```text
Entity
-> Content Model
-> Metadata
-> Schema
-> SEO Template
-> Rendering Layer
-> CMS / CRM / Database / Batch Export
```

M2.4 Product System Foundation 已完成。下一步为 M2.4.5 Product Rendering Layer，按 Product Listing、Product Category、Product Detail、Related Product 顺序验证 Metadata、Schema、Breadcrumb、FAQ、Internal Link、SEO 与 GEO。

CMS 继续后置到 M2.7，Database 在 Product、Industry、Case、Knowledge 等 Entity 关系稳定后再冻结。任何阶段仍不得编造产品参数、客户案例、收益结果、授权政策或市场排名。
