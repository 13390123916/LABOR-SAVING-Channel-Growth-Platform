# Product Content Readiness

文档职责：定义 M2.4.5.3.4 Product Content Readiness，并沉淀首个真实 Product Entity 的发布资料包。M2.4.5.3.4 阶段框架已通过，下一阶段为 M2.4.5.3.5 First Published Product Acceptance。该阶段不开发产品页面、不改变发布状态、不生成详情 URL、Product Schema、sitemap 或 Search Console 提交。资料包完成后进入 Product Publishing Checklist。

## 1. 阶段目标

发布瓶颈已从渲染框架转移为内容资产。每个候选产品必须先完成可追溯、可公开确认的资料包，再进入 `docs/PRODUCT_PUBLISHING_CHECKLIST.md` 的 First Published Product Validation。

标准资料包必须包含：

| 模块 | 是否必须 | 当前处理原则 |
| --- | --- | --- |
| 产品正式名称、Entity ID、分类、URL Slug | 是 | 与 Product Entity 一致 |
| 简介与详细介绍 | 是 | 仅使用已确认的公开资料 |
| 技术参数 | 是 | 仅记录确认可公开的字段 |
| 应用行业与应用场景 | 是 | 不承诺所有工况适用 |
| 产品图片与授权信息 | 是 | 未授权不得发布 |
| 图片 ALT 与 Open Graph 图片 | 是 | 从真实图片和页面内容生成 |
| FAQ | 是 | 不编造价格、交期、认证或收益 |
| SEO Title、Meta Description、Canonical | 是 | 与实体和可见内容一致 |
| JSON-LD 字段确认 | 是 | 不输出 offers、rating、review 等无来源字段 |

## 2. 首个候选资料包：PRD-0002 L60

状态：`Internal Review`。以下技术资料来自本次项目输入，尚未确认其公开发布范围、正式图片授权和最终对外文案，因此不能进入发布门禁。

### 2.1 Entity 基础信息

| 字段 | 内容 |
| --- | --- |
| Product Entity | `PRD-0002` |
| 正式名称候选 | L60 气动助力机械臂 |
| 分类 | 气动助力机械臂 |
| Category Slug | `pneumatic-manipulator-arm` |
| Product Slug | `l60` |
| 规划 Canonical | `/products/pneumatic-manipulator-arm/l60/` |
| 发布状态 | `planned`，不改变 |

### 2.2 内容草案

简介：L60 气动助力机械臂是用于重载装配与搬运辅助的产品实体候选。其资料包以多负载零重力悬浮、气动安全保护和非标端拾器集成为核心说明方向，实际选型仍需结合工件、载荷、空间、节拍、能源与安全条件确认。

详细介绍：L60 面向需要降低人工搬运负担、辅助装配和改善操作姿态的工业作业场景。根据当前输入资料，产品支持多负载一键零重力悬浮、全套气动安全保护，并可快速集成各类非标端拾器。该描述不构成对任何具体工况、效率、收益或适配结果的承诺。

### 2.3 已提供技术参数

| 字段 | 当前资料值 | 发布前确认 |
| --- | --- | --- |
| 额定负载 | 60 kg | 待确认公开范围与测试依据 |
| 作业半径 | 2000 mm | 待确认公开范围与配置前提 |
| 提升行程 | 1000 mm | 待确认公开范围与配置前提 |
| 工作气压 | 0.6-0.8 MPa | 待确认公开范围与现场条件 |
| 立柱旋转 | 360 度全回转 | 待确认安装和安全边界 |
| 末端姿态 | 4 x 90 度手动翻转 | 待确认末端配置和负载边界 |

### 2.4 应用与 FAQ 草案

应用行业与场景待由产品负责人确认。发布时必须明确“适合谁、解决什么问题、有哪些限制、下一步如何咨询”，但不得将资料包的通用描述扩展为未确认行业案例或性能承诺。

FAQ 草案只允许覆盖：是否需要工况确认、如何核实配置与安全要求、渠道伙伴如何咨询产品线。不得写入价格、库存、交期、认证、回本或收益承诺。

### 2.5 图片与 Open Graph 资产

当前没有可用于发布的 L60 产品图片、Open Graph 图片或授权记录。以下项目均为发布阻塞项：

- 产品主图原文件、来源、授权范围和适用渠道。
- 至少一条与实际画面一致的描述性 ALT 文本。
- 适配 Open Graph 的真实产品图，不使用合成参数图或无授权第三方素材。
- 图片尺寸、清晰度与页面版式适配确认。

## 3. Content Readiness 完成条件

L60 资料包只有在以下项目完成后，才可从 `Internal Review` 进入 `Content Approved`：

1. 产品负责人确认正式名称、技术参数、公开范围和应用边界。
2. 产品图片及其授权、ALT 和 Open Graph 资产齐备。
3. 内容、FAQ、Title、Meta Description、Canonical 与 JSON-LD 字段经过内部审核。
4. 无未确认参数、价格、交期、认证、案例、收益或市场排名表达。

通过后才执行发布检查清单、sitemap/robots 准备、上线与 Search Console 提交。Related Product 继续保持禁用，直到 Entity Relation 有已确认数据。
