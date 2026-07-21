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

## 文档维护原则

任何新增功能都必须检查并按需更新：

- `README.md`
- `CHANGELOG.md`
- `docs/PROJECT_PRD.md`
- `docs/ROADMAP.md`
- `docs/TODO.md`
- `docs/MEMORY.md`

## 当前策略

M1 Website Foundation 已完成。当前 `website/` 只保留技术骨架；SEO/GEO URL 与页面结构先沉淀在文档中。下一阶段进入 M2 Website Development 或 Lead Capture Foundation 时，再建立业务页面、表单、线索数据结构和 CRM 字段映射。
