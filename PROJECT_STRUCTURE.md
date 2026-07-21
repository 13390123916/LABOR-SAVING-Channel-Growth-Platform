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

当前执行顺序：

```text
PAGE_SYSTEM.md
↓
METADATA_SCHEMA.md
↓
SEO_SCHEMA_LAYER.md
↓
Next.js 页面开发
↓
Lead Capture / CRM / 后台维护 / 批量导出
```

下一步进入 `/products/` 产品实体页面开发，仍不得编造产品参数、客户案例、收益结果、授权政策或市场排名。
