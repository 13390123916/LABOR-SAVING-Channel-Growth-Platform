# Page System

文档职责：定义 LABOR-SAVING 官网页面级开发输入标准。任何页面进入 Next.js 开发前，必须先在本文件或同级页面策略文档中明确页面目标、用户角色、SEO、转化和 Lead 入口。

## 1. 页面开发原则

每个页面都必须服务渠道增长平台，而不是只完成企业官网展示。

开发页面前必须定义：

- 页面目标
- 用户角色
- SEO 关键词
- 转化目标
- CTA
- 内部链接
- Schema
- Lead 入口

禁止：

- 每个页面临时自写 SEO。
- 未定义 Lead 类型就开发表单。
- 把招商页面写成普通品牌宣传页。
- 编造产品参数、客户案例、收益、授权政策、区域独家或市场排名。

## 2. 页面优先级

M2 Website Page Development 不按首页优先，而按商业价值优先。

| 顺序 | URL | 页面 | 原因 |
| --- | --- | --- | --- |
| 1 | `/partner/` | 加盟合作 | 当前最高商业价值入口，获取渠道合作伙伴线索 |
| 2 | `/products/` | 产品中心 | 建立产品实体，支撑选型、扩品和渠道销售 |
| 3 | `/applications/` | 行业应用 | 获取行业搜索与终端工况咨询 |
| 4 | `/knowledge/` | 知识中心 | 沉淀 SEO/GEO 内容资产 |

## 3. 页面输入模板

每个页面进入开发前必须填写：

```text
URL:

页面目标:

用户角色:

SEO关键词:

转化目标:

主要CTA:

次要CTA:

内部链接:

Schema:

Lead入口:

合规边界:
```

## 4. Partner 页面定义

URL：

```text
/partner/
```

页面目标：

```text
获取代理商、经销商、区域合作伙伴和项目合作伙伴线索。
```

页面定位：

```text
LABOR-SAVING 渠道增长中心
```

用户角色：

- 工业工具经销商
- MRO 服务商
- 自动化集成商
- 工业机器人集成商
- 设备贸易商
- 有工业客户资源的项目合作伙伴

SEO 关键词：

- 经销商加盟
- 区域代理
- 行业代理
- 工业工具代理
- 渠道经销商
- 工业装备渠道合作
- LABOR-SAVING 渠道增长中心

转化目标：

```text
引导目标用户提交 Partner Lead，并进入后续 CRM 评估。
```

主要 CTA：

```text
申请成为区域合作伙伴
```

次要 CTA：

```text
了解产品中心
查看行业应用
```

内部链接：

- `/products/`
- `/applications/`
- `/about/contact/`

Schema：

- Organization
- BreadcrumbList
- FAQPage

Lead 入口：

```text
Partner Lead
```

Lead 字段来源：

```text
docs/LEAD_SCHEMA.md
```

页面结构：

1. 首屏价值
2. 市场机会
3. 合作模式
4. 八大渠道赋能
5. Partner Lead 申请入口
6. FAQ

合规边界：

- 不承诺收益。
- 不承诺回本周期。
- 不承诺区域独家。
- 不承诺零风险。
- 不编造客户案例。
- 不编造市场份额、认证、授权范围或价格政策。

## 5. Product 页面定义

URL：

```text
/products/
```

页面目标：

```text
建立产品实体，承接产品理解、选型咨询和渠道扩品需求。
```

用户角色：

- 工业工具代理商
- 自动化集成商
- 终端制造企业设备负责人
- 工厂采购与检修维护负责人

SEO 关键词：

- 气动助力机械臂
- 气动平衡器
- 液压扭矩工具
- LS40 助力机械臂
- L60 助力机械臂
- SQ35 气动平衡器
- SQ50 气动平衡器

转化目标：

```text
引导产品咨询、选型咨询和渠道扩品咨询。
```

CTA：

```text
咨询产品选型
```

内部链接：

- `/partner/`
- `/applications/`
- `/knowledge/faq/`

Schema：

- Product
- BreadcrumbList
- FAQPage

Lead 入口：

```text
Customer Lead 或 Partner Lead
```

合规边界：

- 产品资料不足时不得补写参数。
- 不编造价格、交期、配置、认证或应用案例。

## 6. Applications 页面定义

URL：

```text
/applications/
```

页面目标：

```text
承接行业工况搜索，获取终端项目咨询，并反向支撑渠道合作价值。
```

用户角色：

- 风电、石油化工、装备制造、汽车制造、船舶、重工业等行业用户
- 工业工具经销商
- 自动化集成商

SEO 关键词：

- 工业自动化升级
- 重载搬运需求
- 风电装备维护
- 石油化工检修
- 智能制造装配
- 工业助力设备应用

转化目标：

```text
引导行业工况咨询、产品选型咨询和渠道合作咨询。
```

CTA：

```text
提交工况咨询
```

内部链接：

- `/products/`
- `/partner/`
- `/solutions/`
- `/knowledge/`

Schema：

- Article
- BreadcrumbList
- FAQPage

Lead 入口：

```text
Customer Lead
```

合规边界：

- 不使用未经授权客户名称。
- 不编造项目结果或效率提升比例。

## 7. Knowledge 页面定义

URL：

```text
/knowledge/
```

页面目标：

```text
沉淀 SEO/GEO 内容资产，支撑百度、360、搜狗、微信搜一搜和国内 AI Search 引用。
```

用户角色：

- 终端工业客户
- 工业工具代理商
- MRO 服务商
- 搜索引擎与 AI Search 抓取系统

SEO 关键词：

- 工业助力机械臂 FAQ
- 气动平衡器选型
- 液压扭矩工具应用
- 重载装配知识
- 工业工具渠道合作

转化目标：

```text
从知识内容分流到产品咨询、行业咨询和 Partner Lead。
```

CTA：

```text
查看相关产品
```

内部链接：

- `/products/`
- `/applications/`
- `/partner/`

Schema：

- Article
- FAQPage
- BreadcrumbList

Lead 入口：

```text
Customer Lead 或 Partner Lead
```

合规边界：

- 内容必须事实型、结构化、可引用。
- 不生成低质量 AI 文章。
- 不编造客户、参数、收益或排名。
