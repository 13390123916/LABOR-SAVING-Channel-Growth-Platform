# Project PRD

项目名称：LABOR-SAVING Channel Growth Platform（雷普赛维渠道增长平台）

文档职责：项目长期需求主文档

当前阶段：M1.5 Channel Growth Strategy Layer 已完成，下一阶段为 M2 Channel Growth Foundation

## 1. 项目定位

本项目是工业装备渠道增长平台，不是普通企业官网。

网站只是整个增长系统的一部分。长期系统将包括：

- Website 官网
- SEO 中国搜索引擎优化
- GEO 国内 AI 搜索优化
- CRM 询盘管理
- Partner 加盟合作与代理协作
- Marketing 内容营销
- Knowledge Base AI 知识库
- Dashboard 运营后台

## 2. 商业目标

### Priority 1：加盟合作

面向 B 端经销商、代理商、MRO、自动化集成商、工业机器人集成商和设备贸易商，获取渠道合作线索。

### Priority 2：终端客户询盘

面向终端制造企业，获取产品咨询、选型咨询、工况咨询和报价线索。

### Priority 3：品牌建设

通过中国 SEO、国内 AI 搜索优化和内容营销建立品牌搜索资产。

## 3. 目标客户

重点客户：

- 液压扭矩扳手代理商
- 液压拉伸器代理商
- 工业工具代理商
- 自动化集成商
- 工业机器人集成商
- MRO
- 设备贸易商

其次客户：

- 终端制造企业
- 工厂设备负责人
- 检修维护负责人
- 采购负责人

## 4. 当前产品范围

- LS40 助力机械臂
- L60 助力机械臂
- SQ35 气动平衡器
- SQ50 气动平衡器

产品资料不足时，不得编造参数、案例、收益、授权范围和市场排名。

## 5. SEO 原则

只按中国搜索环境设计，重点考虑：

- 百度
- 360
- 搜狗
- 神马
- 微信搜一搜
- 知乎
- 抖音
- 小红书

不以 Google SEO 作为默认设计依据。

## 6. GEO 原则

重点面向：

- DeepSeek
- 豆包
- 腾讯元宝
- Kimi
- 通义千问

内容必须结构化、事实型、可引用、可总结。

## 7. 技术栈方向

- Next.js
- TypeScript
- TailwindCSS
- Node.js
- MySQL
- Docker
- GitHub Actions

## 8. M1 阶段范围

M1 建立网站技术底座，而不是直接制作完整业务页面。

纳入：

- Next.js App Router
- TypeScript 严格模式
- TailwindCSS
- 官网信息架构：`docs/WEBSITE_ARCHITECTURE.md`
- SEO/GEO 网站蓝图：`docs/WEBSITE_SEO_BLUEPRINT.md`
- 内容系统：`docs/CONTENT_SYSTEM.md`
- Website 技术骨架：`app/`、`components/`、`public/`、`styles/`
- CMS、内容结构与组件系统文档规划
- Website CI 校验
- Website Governance CI 校验

不纳入：

- 产品详情页
- 行业方案页
- 招商合作页
- SEO/GEO 业务路由实现
- CRM 表单提交
- 数据库实现
- 未经确认的产品参数、客户案例、收益结果、授权政策或市场排名

## 9. 加盟合作定位

加盟合作不作为普通“招商页面”，而定义为 `LABOR-SAVING 渠道增长中心`。

主 URL：`/partner/`

页面目标：

- 3 秒内说明加入价值。
- 展示工业自动化升级、重载搬运需求、风电装备市场、石油化工维修市场和智能制造趋势。
- 说明区域代理、行业代理、渠道经销商和项目合作伙伴四类模式。
- 建立产品赋能、技术赋能、销售赋能、市场赋能、内容赋能、培训赋能、售后赋能、品牌赋能八大渠道赋能。
- 引导“申请成为区域合作伙伴”，后续进入 CRM 留资。

## 10. M1.5 Channel Growth Strategy

网站定义：

```text
工业智能装备渠道增长入口
```

Website Traffic Weight：

| 模块 | 权重 |
| --- | --- |
| 加盟合作 Partner | 35% |
| 产品 Product | 25% |
| 行业应用 Industry | 20% |
| 知识中心 Content | 10% |
| 品牌 Trust | 10% |

M2 不直接进入普通页面开发，而进入：

```text
M2 Channel Growth Foundation
```

M2 顺序：

1. M2.0 Page Strategy Definition：建立 `docs/PAGE_SYSTEM.md`
2. M2.1 Metadata System：建立 `docs/METADATA_SCHEMA.md`
3. M2.2 SEO Schema Layer：建立 `docs/SEO_SCHEMA_LAYER.md`
4. M2.3 Partner Page Development & Partner System Hardening：优先开发 `/partner/`，并补齐 Partner Program Entity、Partner Content Model、Partner SEO Template 与 Partner Lead / CRM / CMS / Export 内容说明
5. M2.4 Product Page Development：开发 `/products/`
6. M2.5 Industry Page Development：开发 `/applications/`
7. M2.6 Lead Capture Integration：接入线索提交、来源追踪和 CRM 字段映射
8. M2.7 Admin Maintainability：后台维护页面、Metadata、Schema、FAQ 与 Lead 配置
9. M2.8 Batch Export：批量导出 Lead、SEO/GEO 资产和 Schema JSON

M1.5 已完成 `docs/PARTNER_FUNNEL.md` 与 `docs/LEAD_SCHEMA.md`，M2 页面与表单必须继续沿用。
