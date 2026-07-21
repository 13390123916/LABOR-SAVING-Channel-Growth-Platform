# LABOR-SAVING Channel Growth Platform

GitHub Repository Structure

Version: V1.1

## 项目定位

雷普赛维渠道增长平台是工业渠道增长平台，不是普通企业官网。

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
├─ .ai/
├─ .github/
├─ docs/
├─ website/
│  ├─ README.md
│  └─ .gitignore
├─ seo/
├─ geo/
├─ crm/
├─ partner/
├─ marketing/
├─ assets/
├─ scripts/
├─ deploy/
└─ archive/
```

## 目录原则

1. 新增目录必须先说明用途
2. 不重复建目录
3. 不重复建模块
4. 不把临时代码塞进页面组件
5. M0.1 不提前创建 `application`、`domain`、`infrastructure`、`features` 等无业务支撑目录

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

任何新增功能都必须同步检查：

- `docs/MEMORY.md`
- `docs/ROADMAP.md`
- `docs/TODO.md`
- `CHANGELOG.md`

## 当前策略

M0.1 先完成仓库治理。M1 再建立网站技术底座，且 M1 不是直接制作页面。
