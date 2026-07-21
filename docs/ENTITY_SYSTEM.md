# Entity System

文档职责：定义 LABOR-SAVING Channel Growth Platform 的统一 Entity Layer，确保 Partner、Product、Industry、Case、Article、Video、Download、FAQ 后续新增模块都遵循同一模型，不再按单页临时开发。

## 1. 核心原则

所有可长期维护、可被搜索引擎理解、可进入 CMS 或可被前端复用的业务对象，统一视为 Entity。

标准链路：

```text
Entity
-> Metadata
-> Schema
-> CMS
-> Frontend
-> SEO
-> GEO
```

禁止跳过 Entity Layer 直接进入页面、CMS、数据库或 CRM 开发。

## 2. Entity 范围

当前与后续模块统一纳入 Entity：

| Entity Type | 说明 | 当前阶段 |
| --- | --- | --- |
| Partner | 渠道合作计划、合作模式、渠道赋能内容 | 已完成 Partner System Hardening |
| Product | 产品型号、产品分类、产品资料、应用关联 | M2.4 Product System Foundation |
| Industry | 行业应用场景、工况问题、适用产品 | 后续 M2.5 |
| Case | 真实或授权案例内容 | 后续 Knowledge / Trust |
| Article | 技术文章、选型文章、行业文章 | 后续 Knowledge |
| Video | 产品视频、应用视频、招商视频 | 后续 Marketing / GEO |
| Download | 样册、说明书、资料包、白皮书 | 后续 Knowledge |
| FAQ | 产品、行业、合作和服务问答 | 后续全站复用 |

## 3. Entity 基础字段

所有 Entity 至少预留以下语义字段，数据库实现后置：

```text
id
entity_type
slug
name
summary
status
source_status
related_entities
metadata_id
schema_id
created_at
updated_at
published_at
```

字段说明：

- `entity_type` 用于区分 Partner、Product、Industry、Case、Article、Video、Download、FAQ。
- `source_status` 用于标记资料是否已确认，不允许资料不足时补写参数、案例、认证、收益或政策。
- `related_entities` 用于维护产品、行业、案例、文章、视频、下载和 FAQ 之间的内链关系。
- `metadata_id` 与 `schema_id` 连接统一 Metadata 和 Schema 层。

## 4. 分层边界

| 层级 | 解决的问题 | 禁止事项 |
| --- | --- | --- |
| Entity | 这个对象是什么、属于哪类、与哪些对象关联 | 不直接写页面文案和 Schema JSON |
| Metadata | 页面如何被搜索结果理解 | 不按页面临时散落填写 title / description |
| Schema | 结构化数据如何表达事实 | 不输出未确认参数、价格、评分、案例或收益 |
| CMS | 运营后台维护哪些字段 | 当前阶段不开发后台 |
| Frontend | 页面如何展示实体内容 | 当前 Product Foundation 不开发产品页面 |
| SEO | URL、标题、描述、内链和 Topic Cluster | 不为抢流量创建低质量页面 |
| GEO | 面向 AI Search 的问答与事实摘要 | 不写不可核验或夸大承诺 |

## 5. 新模块进入条件

新增任何模块前，必须先完成：

1. Entity 定义
2. Content Model
3. Metadata 字段
4. Schema 字段与来源
5. SEO Template
6. GEO 问答模板
7. 合规边界

硬性检查标准：

```text
Entity
+ Content Model
+ Metadata
+ Schema
+ SEO Template
= 允许进入 Rendering Layer / Page Development
```

Partner、Product、Industry、Case、Article、Video、Download、FAQ 全部适用同一规则。缺少以上五层中的任意一层，禁止开发页面、后台 CMS、CRM、数据库表或批量导出。

完成后才允许进入：

```text
CMS Model
-> Rendering Layer / Frontend Page
-> Lead / CRM
-> Database
-> Batch Export
```

## 6. 数据库后置原则

当前阶段不冻结数据库表结构。

正确顺序：

```text
Entity
-> Content Model
-> Metadata
-> Schema
-> CMS Model
-> Database
```

原因：

- 先明确业务语义，再设计字段，避免频繁迁移。
- 先统一实体、内容和 Schema，后续数据库可一次冻结。
- Product、Industry、Case、Article、Video、Download、FAQ 可共用 Entity Layer。

## 7. 合规边界

Entity Layer 不得记录或衍生以下内容，除非已有真实可核验资料：

- 未确认产品参数
- 未确认认证或资质
- 未授权客户案例
- 价格、库存、交期和配置承诺
- 收益、回本周期、保本、零风险
- 区域独家、授权范围和市场排名
