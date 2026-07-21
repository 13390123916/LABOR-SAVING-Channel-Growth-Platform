# Memory

## 已确认定位

LABOR-SAVING Channel Growth Platform 是工业装备渠道增长平台，不是普通企业官网。

## 商业优先级

1. 加盟合作
2. 终端客户询盘
3. 品牌建设

## 目标客户

- 液压扭矩扳手代理商
- 液压拉伸器代理商
- 工业工具代理商
- 自动化集成商
- 工业机器人集成商
- MRO
- 设备贸易商
- 终端制造企业

## 当前产品

- LS40 助力机械臂
- L60 助力机械臂
- SQ35 气动平衡器
- SQ50 气动平衡器

## 技术决策

- Next.js
- TypeScript
- TailwindCSS
- Node.js
- MySQL
- Docker
- GitHub Actions

## 当前阶段

M1 Website Foundation 已完成。下一阶段可进入 M2 Lead Capture Foundation。

## 文档职责决策

- 根目录保留 `README.md` 和 `CHANGELOG.md`。
- 项目详细文档统一维护在 `docs/`。
- `.ai/AI_PROJECT_OPERATING_SYSTEM.md` V1.1 是唯一最高 AI 协作规则。
- `CODEX_SYSTEM_PROMPT.md` 只作为 Codex 启动辅助。

## M0.1 治理决策

- 必须存在 `.github/pull_request_template.md`。
- 必须存在 `docs/GIT_WORKFLOW.md`。
- 必须存在 `docs/ISSUE_WORKFLOW.md`。
- 必须存在 `docs/REPOSITORY_MAINTENANCE.md`。
- M0.1 不提前创建 `application`、`domain`、`infrastructure`、`features` 等目录。

## M1 Website Foundation 决策

- `website/` 采用独立 Next.js App Router 工程。
- 使用 TypeScript 严格模式、TailwindCSS 和 ESLint。
- 建立 `robots.txt`、`sitemap.xml`、`llms.txt` 和基础 metadata。
- 首页仅作为可抓取的平台入口，不创建产品详情、行业方案、招商合作等业务页面。
- CMS、内容结构与组件系统先通过 `config/`、`lib/`、`components/` 轻量规划，不提前创建无业务支撑的分层目录。
