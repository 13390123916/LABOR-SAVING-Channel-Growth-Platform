# Partner System

文档职责：定义 LABOR-SAVING Partner 系统的长期边界，说明加盟合作页面如何从单一页面升级为 Partner Growth Engine，并承接 Partner Lead、CRM、CMS、后台维护和批量导出。

## 1. 定位

Partner 系统不是普通招商页面，也不是简单表单收集。

它服务于：

- 工业渠道合作伙伴识别
- 区域代理机会判断
- 行业代理机会判断
- 渠道经销商拓展
- 项目合作伙伴筛选
- Partner Lead 进入 CRM
- 后续合作审核、跟进和复盘

当前 `/partner/` 定义为：

```text
LABOR-SAVING 渠道增长中心
```

## 2. 正确架构

Partner 页面必须遵循：

```text
Partner Program Entity
↓
Partner Program Database
↓
Partner Content Model
↓
Partner SEO Template
↓
Partner Schema
↓
Partner Template
↓
Partner Page
↓
Partner Lead / CRM / CMS / Export
```

禁止将 Partner 系统退化为：

```text
/partner/
一个 TSX 页面
页面里写文案
页面里写 metadata
页面里写 schema
页面里写 FAQ
页面里写表单字段
```

## 3. Partner Program Entity

Partner Program Entity 用于表达一个可维护的渠道合作计划，而不是一次性页面文案。

核心字段：

```text
id
slug
program_name
positioning
target_roles
market_opportunities
cooperation_modes
enablement_modules
lead_type
cta
seo_id
schema_id
status
created_at
updated_at
```

当前主实体：

```text
slug: partner
program_name: LABOR-SAVING 渠道增长中心
lead_type: Partner Lead
cta: 申请成为区域合作伙伴
```

## 4. 目标用户

- 工业工具代理商
- MRO 服务商
- 自动化集成商
- 工业机器人集成商
- 设备贸易商
- 有工业客户资源的项目合作伙伴

## 5. 合作模式实体

合作模式不应只写在页面正文里，后续应作为可维护数据。

当前合作模式：

- 区域代理
- 行业代理
- 渠道经销商
- 项目合作伙伴

建议字段：

```text
id
program_id
mode_name
slug
target_partner
description
qualification_notes
display_order
status
```

合规边界：

- 不承诺区域独家。
- 不承诺价格政策。
- 不承诺收益或回本周期。
- 合作条件必须以后续真实商务资料为准。

## 6. 渠道赋能实体

八大渠道赋能应作为 Partner Content Model 的可维护模块。

当前模块：

- 产品赋能
- 技术赋能
- 销售赋能
- 市场赋能
- 内容赋能
- 培训赋能
- 售后赋能
- 品牌赋能

建议字段：

```text
id
program_id
module_name
summary
content
display_order
status
```

禁止：

- 用赋能模块承诺收益。
- 用赋能模块暗示保本、稳赚或零风险。
- 编造培训体系、认证体系或总部资源。

## 7. 市场机会实体

市场机会用于表达渠道判断方向，不用于表达市场份额或确定收益。

当前市场机会：

- 工业自动化升级
- 重载搬运需求
- 风电装备市场
- 石油化工维修市场
- 智能制造趋势

建议字段：

```text
id
program_id
opportunity_name
summary
related_industry_ids
related_product_ids
display_order
status
```

禁止：

- 编造市场份额。
- 编造增长率。
- 编造排名。
- 编造客户案例。

## 8. Partner Lead 承接

Partner Lead 字段来源：

```text
docs/LEAD_SCHEMA.md
```

Partner Funnel 来源：

```text
docs/PARTNER_FUNNEL.md
```

Partner 页面不直接决定合作结果。页面只完成：

```text
访问
↓
理解合作价值
↓
提交 Partner Lead
↓
进入 CRM 人工评估
```

## 9. CMS 与后台维护边界

后续后台应允许维护：

- Partner Program 基础信息
- 合作模式
- 渠道赋能模块
- 市场机会
- FAQ
- CTA
- Metadata
- Schema 输出状态
- Lead 来源映射

后台不得允许运营人员填写：

- 收益承诺
- 回本周期
- 区域独家承诺
- 未确认授权范围
- 未确认认证或客户案例

## 10. 批量导出边界

Partner 系统后续应支持导出：

- Partner Lead 数据
- 来源页面
- 合作意向
- 所在地区
- 主营产品
- 客户行业
- 渠道资源
- 销售团队规模
- CRM 状态
- 页面 metadata
- 页面 schema_json
- FAQ

用途：

- 销售跟进
- 渠道复盘
- SEO/GEO 审核
- 内容迁移
- CRM 数据归档

## 11. 阶段边界

当前阶段：

```text
M2 Partner Page v1 + Partner System Hardening
```

已完成：

- `/partner/` 前端页面
- Partner Lead 前端入口
- Partner Funnel
- Lead Schema
- Page System
- Metadata System
- SEO Schema Layer
- Partner Content Model
- Partner SEO Template

暂不执行：

- Partner 协作后台
- 代理商登录
- 线索分配权限
- 成交反馈
- 数据库写入
- CRM 自动化流转

这些能力进入后续 M2.6、M2.7、M2.8 或 M5 CRM 稳定阶段。
