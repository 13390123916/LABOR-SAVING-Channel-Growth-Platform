# ADR-0001: Freeze M2 and Start M3 Website Platform Foundation

状态：Accepted

日期：2026-07-21

## 背景

M2 已完成 Entity、Product、Metadata、SEO Schema、Product Rendering 与 Publishing Workflow 的 v1.0 基础。继续拆分治理或 Publishing 子阶段会增加规则密度，却不能增加网站运行能力。

## 决策

冻结 `M2 Channel Growth Foundation v1.0`。除严重架构缺陷或 Bug 外，不再扩展其治理模型。

未执行的 M2.6 Lead Capture、M2.7 Admin Maintainability、M2.8 Batch Export 通过 `docs/MILESTONE_MAPPING.md` 映射到 M3，不删除或重编号历史里程碑。

启动 `M3 Website Platform Foundation`，依次冻结 Database Architecture、Authentication & Authorization、CMS Architecture、Media Management Architecture、Lead Center Architecture、Platform Assets Architecture、SEO Runtime Architecture、GEO Runtime Architecture、Audit Center / Backup & Restore Architecture、Deployment & Analytics Architecture。真正运行时代码统一进入 M4 Platform Runtime。

## 后果

- 历史审计、Git Commit、README、Roadmap、TODO 与 Changelog 保持可追溯。
- 后续产品和内容按 M2 v1.0 规范执行，不继续创建新的治理层。
- M3 阶段必须先记录平台架构边界；Prisma、Migration、Database、RBAC、CMS、Media、Lead、SEO Runtime、API 和 Admin UI 统一进入 M4 Platform Runtime。
