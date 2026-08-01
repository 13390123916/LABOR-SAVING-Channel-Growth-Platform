# Analytics

文档职责：冻结 M3.7 Analytics Architecture 的平台衡量能力定位、职责边界、Measurement Objects、Measurement Flow、Business Metrics、Governance Boundary、Runtime Boundary 和引用关系。架构决策见 `docs/adr/ADR-0014-analytics-architecture.md`。

## 1. Position

Analytics 是平台级 Measurement Capability，用于衡量渠道增长平台的业务效果、来源质量、转化路径、渠道覆盖和内容表现。

Analytics 不是 BI。它不负责复杂数据仓库、跨系统建模、自由分析或企业级经营分析。

Analytics 不是 Dashboard。Dashboard 是未来展示层，属于 M4 Platform Runtime 或更后阶段，不在 M3.7 定义界面。

Analytics 不是 Reporting。报表导出、周期报表、筛选器、图表、指标看板均不属于 M3.7。

Analytics 不是 Runtime Event System。埋点代码、事件采集 SDK、日志写入、实时队列、API、存储结构和统计计算都延期到 M4。

M3.7 的定位是冻结平台未来需要被衡量的业务对象、指标分类、依赖关系和治理边界，确保 M4 Platform Runtime 按已冻结业务对象进行采集和分析，不反向修改 Dealer、Lead、CMS、Website 或 SEO / GEO 架构。

## 2. Responsibility

属于 Analytics：

- 定义平台 Measurement Capability 的边界。
- 定义未来需要衡量的 Business Object。
- 定义 Business Metrics 分类。
- 定义 Website -> Lead -> Dealer -> CRM Future -> Analytics 的测量关系。
- 定义 Lead Attribution、Source、UTM、SEO Attribution、Dealer Attribution 和 Conversion Event 的架构边界。
- 定义 CN First Platform 下中国 SEO、国内 GEO、渠道招商和线索质量的衡量方向。
- 声明 Analytics 只能消费已审核、已发布、已授权或已归属的数据，不替代事实来源。

不属于 Analytics：

- 不负责 Dashboard、BI、Reporting、Chart 或可视化。
- 不负责 Runtime Event System。
- 不负责埋点代码、API、Database、ORM、Migration、事件字段、计算公式或数据模型。
- 不负责修改 Website、CMS、Lead、Dealer、Platform Assets 的业务事实。
- 不负责 CRM 跟进动作。
- 不负责用户身份、权限实现或审计写入实现。
- 不负责采集未经授权的个人敏感信息。

模块区分：

| Module | 边界 |
| --- | --- |
| Dealer Center | 定义 Dealer 作为渠道核心 Business Object；Analytics 未来消费 Dealer 生命周期、区域关系、Lead 承接和渠道转化，不修改 Dealer 状态 |
| Lead Center | 定义 Lead 类型、来源、状态、分配、去重和 CRM 输入；Analytics 衡量 Lead 来源质量和转化路径，不替代 Lead 管理 |
| CMS | 维护内容、Metadata、Schema 和发布流程；Analytics 衡量内容表现，不改变内容事实、审核状态或发布状态 |
| Website | 公开触点和转化入口；Analytics 衡量访问、咨询、内容路径和入口表现，不定义页面结构 |
| Platform Assets | 提供公司、品牌、下载、联系方式和社媒等公共事实；Analytics 可衡量资产使用表现，不维护资产内容 |
| Authentication | 提供后台用户身份；Analytics 不创建用户体系 |
| RBAC | 控制 Analytics 相关资源未来谁可查看、导出或管理；M3.7 只声明权限边界，不实现权限 |
| Audit | 记录高风险操作；Analytics 不替代 Audit，不修改审计事实 |
| CRM Future | 未来记录销售跟进、商机、拜访、任务和结果；Analytics 可消费 CRM 阶段结果，但不定义 CRM 流程 |

## 3. Measurement Objects

M3.7 冻结以下未来 Measurement Objects：

| Object | 衡量方向 |
| --- | --- |
| Website | 公开站点触点、页面入口、内容路径和咨询入口 |
| Lead | Partner Lead、Customer Lead、Manual Lead、Imported Lead 的质量、来源和转化 |
| Dealer | 渠道对象、区域覆盖、合作阶段、Lead 承接和渠道贡献 |
| Product | 产品内容曝光、咨询关联和 Topic Cluster 表现 |
| Solution | 解决方案内容、行业应用路径和咨询关联 |
| Region | 区域来源、区域覆盖、渠道空白和合作分布 |
| Channel | 自然搜索、国内 AI 搜索、社媒、线下活动、渠道推荐、直接访问等来源分类 |
| Content | CMS 内容、FAQ、下载资料、招商内容和 SEO / GEO 内容单元 |
| Platform Assets | 下载资料、联系方式、社媒入口、品牌资料等公共资产触点 |
| CRM Future | 未来销售阶段、跟进结果、商机质量和成交状态 |

本阶段只定义对象，不设计数据库、事件字段、事件名称、采集方式或计算公式。

## 4. Measurement Flow

核心 Measurement Flow：

```text
Website
-> Lead
-> Dealer
-> CRM Future
-> Analytics
```

含义：

- Website 产生公开触点和咨询入口。
- Lead Center 接收并治理线索。
- Dealer Center 承接符合条件的渠道对象、区域关系和渠道生命周期。
- CRM Future 记录后续跟进、商机和结果。
- Analytics 消费前面模块的已冻结事实，用于衡量来源质量、渠道成长和转化表现。

扩展 Flow：

```text
CMS / Platform Assets / Product / Solution
-> Website
-> Lead
-> Analytics
```

CMS、Platform Assets、Product 和 Solution 提供可发布内容和可引用事实。Website 承载公开输出。Lead 形成咨询或合作入口。Analytics 衡量内容和资产对 Lead 的贡献。

依赖方向原则：

- Analytics 消费事实，不创造事实。
- Analytics 不反向修改 Website、CMS、Lead、Dealer、Platform Assets 或 CRM。
- Analytics 不绕过 RBAC 和 Audit。
- Analytics 不采集未经授权的敏感个人信息。
- Analytics Runtime 必须延期到 M4 Platform Runtime。

## 5. Business Metrics

M3.7 只冻结指标分类，不定义计算公式。

| Metric Category | 衡量方向 |
| --- | --- |
| Acquisition | 访问、来源、入口、渠道触达和自然流量表现 |
| Conversion | 从 Website 访问到 Lead，再到 Dealer 或 CRM Future 的转化路径 |
| Dealer Growth | Dealer 增长、状态推进、活跃合作对象和渠道生命周期质量 |
| Channel Coverage | 区域覆盖、行业覆盖、渠道类型覆盖和空白区域 |
| Lead Quality | 线索有效性、匹配度、重复情况、分配结果和后续可转化程度 |
| Content Performance | CMS 内容、产品内容、解决方案内容、FAQ、下载资料和招商内容对咨询与合作的贡献 |
| SEO / GEO | 中国 SEO 与国内 AI 搜索相关的可抓取、可引用、可总结和内容触达表现 |
| Platform Assets Usage | 联系方式、下载资料、社媒入口、品牌资料等公共资产的使用表现 |
| CRM Future Outcome | 未来跟进结果、商机阶段、成交或无效原因 |

CRM Future Outcome 只作为未来衡量分类保留，不在 M3.7 定义 CRM 细节。

## 6. Governance Boundary

属于 M3.7：

- Analytics 平台定位冻结。
- Analytics 与 BI、Dashboard、Reporting、Chart、Runtime Event System 的概念边界冻结。
- Analytics 与 Dealer Center、Lead Center、CMS、Website、Platform Assets、Authentication、RBAC、Audit、CRM Future 的职责边界冻结。
- Measurement Objects 冻结。
- Measurement Flow 冻结。
- Business Metrics 分类冻结。
- Analytics Runtime Boundary 冻结。
- ADR-0014 Analytics Architecture Freeze。

不属于 M3.7：

- Dashboard。
- BI。
- Reporting。
- Chart。
- Runtime Event System。
- Event Schema。
- API。
- ORM。
- Database Migration。
- 数据采集、清洗、聚合、计算。
- CRM 实际集成。
- 权限代码。
- 审计写入代码。

## 7. Runtime Boundary

真正运行时代码统一进入 M4 Platform Runtime：

```text
Prisma
-> Migration
-> Database
-> RBAC
-> CMS
-> Media
-> Lead
-> Platform Assets
-> Dealer
-> Analytics
-> SEO Runtime
-> API
-> Admin UI
```

M4 前不得创建：

- Website analytics runtime。
- Lead attribution runtime。
- Dealer attribution runtime。
- Conversion event runtime。
- UTM parser runtime。
- SEO / GEO measurement runtime。
- Dashboard / reporting runtime。
- Analytics export runtime。
- Analytics API、ORM、Migration、Admin UI 或 Runtime Code。

M4 实现必须跟随 M3.7 已冻结边界，不得为了埋点、报表、图表、Dashboard 或 BI 需求反向修改 M3.7 Analytics Architecture。

## 8. References

- `docs/PLATFORM_ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/DEALER_CENTER.md`
- `docs/LEAD_CENTER.md`
- `docs/CMS_SYSTEM.md`
- `docs/PLATFORM_ASSETS.md`
- `docs/AUTH_SYSTEM.md`
- `docs/adr/ADR-0014-analytics-architecture.md`

## 9. M3.7 验收标准

- Architecture Review 已通过，当前 Draft 不再进行非必要调整。
- ADR-0014 Analytics Architecture 已 Accepted。
- `docs/ANALYTICS.md` 已覆盖 Position、Responsibility、Measurement Objects、Measurement Flow、Business Metrics、Governance Boundary、Runtime Boundary 和 References。
- `docs/PLATFORM_ARCHITECTURE.md` 已将 M3.7 标记为 Analytics Architecture Freeze。
- `docs/ROADMAP.md`、`docs/TODO.md`、`CHANGELOG.md` 和治理校验清单已同步。
- 未新增 API、ORM、Migration、Database、Runtime Event、Dashboard、BI、Reporting、Chart、Admin UI、Analytics Runtime 或 Runtime Code。
