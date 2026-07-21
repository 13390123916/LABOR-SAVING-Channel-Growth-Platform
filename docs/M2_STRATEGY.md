# M2 Strategy

文档职责：定义 M2 阶段方向，避免直接进入普通网站页面开发。

## 1. 战略判断

LABOR-SAVING 不是普通工业企业官网。

普通工业网站路径：

```text
产品展示
↓
客户询价
↓
成交
```

LABOR-SAVING 的正确路径：

```text
渠道增长平台
↓
代理商增长
↓
终端市场覆盖
↓
品牌资产沉淀
```

因此，网站必须定义为：

```text
工业智能装备渠道增长入口
```

## 2. Website Traffic Weight

| 模块 | 权重 | 目标 |
| --- | --- | --- |
| 加盟合作 Partner | 35% | 获取有效代理商、经销商、区域合作伙伴线索 |
| 产品 Product | 25% | 支撑产品理解、选型咨询和渠道扩品 |
| 行业应用 Industry | 20% | 承接终端工况需求和行业 SEO |
| 知识中心 Content | 10% | 建立 SEO/GEO 内容资产和 AI Search 引用 |
| 品牌 Trust | 10% | 建立企业实体、资质、联系方式和信任背书 |

## 3. M2 路线判断

### 3.1 方案 A：M2 Website Development

路径：

```text
页面开发
↓
产品展示
↓
SEO页面
↓
招商页面
↓
表单
```

优势：快速看到网站。

风险：招商逻辑、表单字段和 CRM 承接可能后补，页面容易变成普通产品展示官网。

### 3.2 方案 B：M2 Channel Growth Foundation

路径：

```text
加盟合作系统设计
↓
Lead Funnel
↓
CRM字段
↓
表单体系
↓
页面开发
```

推荐：方案 B。

原因：

- LABOR-SAVING 的核心不是流量，而是有效代理商线索。
- 先定义 Partner Funnel 和 Lead Schema，后续页面开发才有明确转化逻辑。
- 可避免先做漂亮页面、再补招商转化和 CRM 字段的返工。

## 4. M2 新阶段定义

M2 调整为：

```text
M2 Channel Growth Foundation
```

包含：

- M2.0 Partner Funnel Architecture
- M2.1 Lead Capture Schema
- M2.2 Website Page Development

## 5. M2.0 Partner Funnel Architecture

交付文档：

```text
docs/PARTNER_FUNNEL.md
```

目标：定义代理商从访问加盟页面到区域代理审核的完整路径。

## 6. M2.1 Lead Capture Schema

交付文档：

```text
docs/LEAD_SCHEMA.md
```

目标：定义表单字段、CRM 输入标准和线索分层基础。

## 7. M2.2 Website Page Development

在 M2.0 与 M2.1 完成后，再开发：

- 首页
- Partner
- Product
- Industry
- Knowledge

## 8. 当前风险

### 风险 1：过早开发页面

评级：★★★★

风险：页面漂亮，但没有招商转化逻辑。

应对：先完成 `docs/PARTNER_FUNNEL.md` 与 `docs/LEAD_SCHEMA.md`。

### 风险 2：SEO 内容提前大量生成

评级：★★★

风险：产生低质量 AI 文章。

应对：严格执行 `docs/CONTENT_SYSTEM.md`，先建立 Content Governance。

### 风险 3：产品参数扩散

评级：★★★

风险：页面和内容中出现虚构参数、客户、案例、市场份额或认证。

应对：继续执行“不编造产品参数、案例、收益、授权政策和市场排名”原则。

## 9. M1.5 前置任务

M2 启动前先完成：

1. 升级 `.ai/AI_PROJECT_OPERATING_SYSTEM.md` 到 V1.2。
2. 新增 `docs/M2_STRATEGY.md`。
3. 新增 `docs/PARTNER_FUNNEL.md`。
4. 新增 `docs/LEAD_SCHEMA.md`。

完成后进入：

```text
M2 Channel Growth Foundation
```
