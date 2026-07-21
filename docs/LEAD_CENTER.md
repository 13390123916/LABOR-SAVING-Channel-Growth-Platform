# Lead Center

文档职责：冻结 M3.4 Lead Center Architecture 的线索领域模型、线索类型、字段分层、来源归因、生命周期、分配、去重、隐私、导出、CRM 输入、权限、审计和后续 Runtime 边界。架构决策见 `docs/adr/ADR-0011-lead-center.md`。

## 1. 阶段边界

M3.4 Lead Center Architecture 只冻结 Lead Domain，不写表单提交接口、不创建 CRM 后台、不接入 ORM、不创建数据库迁移、不实现通知、不实现导出运行时、不开发 Admin UI。

本阶段目标：

- 确认 Partner Lead 与 Customer Lead 的统一领域模型。
- 确认 Lead 字段、来源、状态、分配、跟进、导出和 CRM 输入边界。
- 确认 Lead 如何复用 Database、Auth、CMS、Media、Partner Funnel、Lead Schema、Audit 和后续 Analytics。
- 确认 M3 Architecture 与 M4 Platform Runtime 的分界。

## 2. 核心原则

- Lead 是业务数据入口，不是普通表单记录。
- Partner Lead 优先级高于 Customer Lead，符合项目商业优先级：加盟合作 -> 终端客户询盘 -> 品牌建设。
- Lead Center 只承接真实提交、运营录入或合规导入，不允许生成虚假线索。
- Lead 字段不得承诺收益、保本、回本周期、区域独家、自动授权、价格政策或未经确认合作条件。
- Lead 必须复用 M3.0 Database 的审计字段、M3.1 Auth 的 RBAC、M3.2 CMS 的 Lead Entry 配置、M3.3 Media 的授权资产引用边界。
- Lead 涉及个人信息和商业信息，默认比普通内容资源更严格。
- M3.4 只冻结架构；数据库、API、RBAC 运行逻辑、后台 UI、通知和导出统一进入 M4 Platform Runtime。

## 3. Lead 类型

首期 Lead 类型：

| Lead Type | 来源 | 目标 |
| --- | --- | --- |
| Partner Lead | `/partner/`、`/distributor/`、`/join/`、招商投放、渠道活动 | 获取代理商、经销商、区域合作伙伴、项目合作伙伴 |
| Customer Lead | 产品页、行业页、询盘入口、SEO/GEO 内容入口 | 获取终端客户产品咨询、选型咨询、工况咨询和报价线索 |
| Manual Lead | 销售或运营录入 | 补录线下展会、电话、微信或商务转介绍线索 |
| Imported Lead | 合规批量导入 | 承接历史线索或活动报名清单，默认进入审核状态 |

优先级：

```text
Partner Lead
-> Customer Lead
-> Manual Lead
-> Imported Lead
```

## 4. Lead Entity

Lead 不作为公开内容 Entity，不生成公开 URL、Metadata、Schema 或 sitemap。Lead 可引用公开 Entity 作为来源对象。

基础字段：

```text
id
lead_no
lead_type
lead_source_type
company_name
contact_name
phone
region
industry
main_products
customer_resources
cooperation_intent
interested_product
application_scenario
project_stage
source_channel
source_page
source_entity_id
source_campaign
utm_source
utm_medium
utm_campaign
utm_content
utm_term
status
priority
assigned_to
assigned_by
assigned_at
contacted_at
qualified_at
closed_at
invalid_reason
consent_status
privacy_status
created_at
updated_at
deleted_at
created_by
updated_by
```

规则：

- `lead_no` 是唯一线索编号，不使用手机号作为业务主键。
- `source_entity_id` 可关联 Product、Partner、Industry、Article、FAQ 或 Download。
- Lead 不默认物理删除；合规删除使用脱敏、归档和审计。
- Lead 不进入公开发布生命周期。

## 5. 字段分层

Lead Center 字段按以下分层维护：

```text
Identity Fields
Contact Fields
Business Fields
Intent Fields
Source Fields
Status Fields
Assignment Fields
Privacy Fields
Audit Fields
```

### 5.1 Identity Fields

```text
lead_no
lead_type
lead_source_type
status
priority
```

### 5.2 Contact Fields

```text
company_name
contact_name
phone
region
```

规则：

- 不收集与线索判断无关的敏感个人信息。
- 电话字段只用于联系和去重，不作为公开展示字段。

### 5.3 Business Fields

```text
industry
main_products
customer_resources
team_size
existing_channels
```

规则：

- Partner Lead 用于判断渠道匹配度。
- Customer Lead 用于判断工况、产品和项目阶段。

### 5.4 Intent Fields

```text
cooperation_intent
interested_product
application_scenario
project_stage
```

规则：

- `cooperation_intent` 沿用区域代理、行业代理、渠道经销商、项目合作伙伴。
- Product 只能引用已存在产品范围：LS40、L60、SQ35、SQ50；LS70 未确认前不得作为正式产品选项。

### 5.5 Source Fields

```text
source_channel
source_page
source_entity_id
source_campaign
utm_source
utm_medium
utm_campaign
utm_content
utm_term
referrer
landing_page
```

规则：

- 来源字段服务 SEO Runtime、GEO Runtime 和 Deployment & Analytics，但 M3.4 不实现统计运行时。
- `source_page` 必须符合 URL 规范。
- `source_entity_id` 优先于页面标题或页面 URL 作为长期关联键。

### 5.6 Status Fields

```text
status
contacted_at
qualified_at
closed_at
invalid_reason
```

### 5.7 Assignment Fields

```text
assigned_to
assigned_by
assigned_at
assignment_reason
assignment_scope
```

### 5.8 Privacy Fields

```text
consent_status
privacy_status
data_retention_until
desensitized_at
desensitized_by
```

### 5.9 Audit Fields

```text
created_at
updated_at
deleted_at
created_by
updated_by
assigned_by
desensitized_by
```

## 6. Lead 生命周期

Lead 生命周期：

```text
New
-> Contacted
-> Qualifying
-> Assigned
-> Won
-> Invalid
```

状态含义：

| Status | 含义 |
| --- | --- |
| New | 新线索，尚未联系 |
| Contacted | 已联系到联系人 |
| Qualifying | 正在判断资质、需求、区域和匹配度 |
| Assigned | 已分配给销售、渠道经理或后续负责人 |
| Won | 已转化为有效合作或有效商机 |
| Invalid | 无效、重复、无法联系、非目标客户或违规来源 |

规则：

- `Won` 不等于收益承诺，不得用于公开宣传。
- `Invalid` 必须记录原因。
- 状态变更必须进入 Audit Log。

## 7. 来源归因

来源归因用于回答：

```text
线索从哪里来
为什么提交
关联哪个内容或实体
后续由谁跟进
最终是否形成有效业务机会
```

来源分类：

| Source Type | 示例 |
| --- | --- |
| Organic Search | 百度、360、搜狗、神马 |
| AI Search | DeepSeek、豆包、腾讯元宝、Kimi、通义千问 |
| Social | 微信搜一搜、公众号、视频号、抖音、小红书 |
| Paid Campaign | 百度信息流、抖音投放、朋友圈广告 |
| Direct | 直接访问、品牌搜索、线下资料二维码 |
| Manual | 销售手工录入、展会、电话 |
| Import | 历史数据、活动报名表 |

归因规则：

- 首期保留首次来源和最近来源字段。
- Campaign 字段不作为业务事实来源，只服务投放和复盘。
- 来源归因不得覆盖用户提交的业务字段。

## 8. 分配策略

M3.4 只冻结分配边界，不实现自动分配。

可用维度：

```text
region
lead_type
cooperation_intent
industry
interested_product
source_channel
priority
assigned_owner
```

初始分配建议：

- Partner Lead 默认进入 Partner Manager 队列。
- Customer Lead 默认进入 Sales 队列。
- 高价值渠道线索可由 Admin 或 Partner Manager 手动分配。
- 重复、垃圾、非目标或授权风险线索进入审核队列。

禁止：

- 按未确认收益潜力自动承诺优先级。
- 仅凭投放来源自动判定高质量线索。
- 自动通过区域代理资格。

## 9. 去重与质量

去重候选字段：

```text
phone
company_name
region
lead_type
source_page
created_at window
```

规则：

- 去重只生成候选提示，不自动删除。
- 同一公司不同地区或不同合作意向可保留多条线索。
- 垃圾线索、重复线索和无效线索必须保留审计，不物理删除。

质量标签：

```text
high_fit
medium_fit
low_fit
duplicate_candidate
spam_candidate
needs_review
```

质量标签服务跟进优先级，不用于公开宣传。

## 10. 隐私与合规

Lead 涉及个人信息和企业信息。

合规规则：

- 表单提交必须明确表达联系目的。
- 不收集身份证号、私人住址、财务信息等无关敏感信息。
- 导出必须受权限控制并进入 Audit Log。
- 删除请求优先采用脱敏和归档，不默认物理删除。
- 未经同意不得把 Lead 用于无关营销触达。

表单反馈文案原则：

```text
已收到申请，将由工作人员评估后联系
```

禁止：

- 自动授权。
- 保证合作。
- 承诺收益。
- 承诺区域独家。
- 承诺回本周期。

## 11. Export Boundary

M3.4 只冻结导出边界，不实现导出运行时。

允许导出：

- Lead review list
- Partner Lead list
- Customer Lead list
- Assigned Lead list
- Campaign source list
- Follow-up status list

导出规则：

- Export 是高风险动作，必须单独授权。
- 导出必须记录 actor、role、filters、field set、row count 和时间。
- Sales 默认只导出自己分配范围内的受限字段。
- 全量导出、历史归档和备份进入 M3.7 Audit Center 与 M3.8 Backup & Restore。

## 12. CRM 输入边界

Lead Center 是 CRM 输入，不是完整 CRM。

进入 CRM 的最小字段：

```text
lead_no
lead_type
company_name
contact_name
phone
region
industry
cooperation_intent
interested_product
application_scenario
source_channel
source_page
source_entity_id
status
assigned_to
created_at
updated_at
```

CRM 后续能力：

- 跟进记录。
- 商机阶段。
- 报价与方案。
- 客户账号。
- Partner Portal。
- 销售复盘。

这些不在 M3.4 实现，统一进入 M4 Platform Runtime 或后续 CRM Milestone。

## 13. Permission Integration

Lead 权限引用 `docs/AUTH_SYSTEM.md`。

关键动作：

| Lead Action | Required Permission |
| --- | --- |
| 查看线索 | Lead:read |
| 创建或录入线索 | Lead:create |
| 更新状态 | Lead:update |
| 分配负责人 | Lead:assign |
| 导出线索 | Lead:export |
| 标记无效 | Lead:update |
| 脱敏或归档 | Lead:delete |
| 批量导入 | Lead:import |
| 管理分配规则 | Lead:manage |

角色边界：

- Sales 可查看和更新分配给自己的 Customer Lead。
- Partner Manager 可查看、更新、分配 Partner Lead。
- SEO 只查看必要来源字段，用于搜索质量分析，不查看完整敏感联系方式。
- Editor 不默认访问 Lead。
- Admin 可管理常规 Lead，但全量导出和脱敏策略必须更严格。
- Super Admin 负责权限、归档和紧急治理。

## 14. Audit Integration

Lead 必须写入 Audit Log：

- create
- update
- status change
- assign
- export
- import
- invalid mark
- duplicate merge decision
- desensitize
- archive
- permission change

Audit Log 至少记录：

```text
actor_id
actor_role_ids
action
resource
resource_id
lead_no
before_json
after_json
ip_address
user_agent
request_id
created_at
```

## 15. Admin UI Boundary

M3.4 不设计具体 UI，也不创建页面代码。

后续实现必须遵循：

- Lead 列表、详情、分配、导出、脱敏和归档动作分区展示。
- Assign、Export、Import、Desensitize、Archive 不与普通 Save 混在一起。
- 页面必须显示 source、status、assignment、privacy 和 audit 信息。
- 联系方式字段必须支持权限遮蔽。
- 批量操作必须二次确认并进入 Audit Log。

## 16. 与 SEO / GEO / Analytics 的关系

Lead Center 向后续 Runtime 提供转化数据，但不直接实现 Runtime。

依赖关系：

```text
CMS
-> Media
-> Lead Center
-> SEO Runtime
-> GEO Runtime
-> Deployment & Analytics
```

规则：

- SEO Runtime 可消费 Lead 来源与转化状态的聚合数据，不读取敏感个人信息。
- GEO Runtime 可消费匿名化的问答、实体和转化趋势，不读取联系方式。
- Deployment & Analytics 负责渠道、活动、页面和转化复盘。
- 公开内容不得展示未经授权的 Lead、客户名称、成交信息或案例。

## 17. M4 Platform Runtime 边界

M3.4 之后不进入 Lead Runtime。M3.5、M3.6、M3.7、M3.8、M3.9 继续保持 Architecture Freeze。

真正运行时代码统一进入 M4 Platform Runtime：

```text
Prisma
-> Migration
-> Database
-> RBAC
-> CMS
-> Media
-> Lead
-> SEO Runtime
-> API
-> Admin UI
```

M4 前不得创建数据库迁移、ORM、API、后台 UI、表单提交接口、通知、导出或搜索运行时代码。

## 18. M3.4 验收标准

- ADR-0011 Lead Center 已 Accepted。
- `docs/LEAD_CENTER.md` 已覆盖 Lead Entity、Lead Type、Field Group、Source Attribution、Lifecycle、Assignment、Duplicate Handling、Privacy、Export Boundary、CRM Input、Permission Integration、Audit Integration 和 M4 Runtime Boundary。
- `docs/PLATFORM_ARCHITECTURE.md` 已将 M3.4 标记为架构冻结，并明确 M4 Platform Runtime 统一实现运行时代码。
- `README.md`、`docs/PROJECT_PRD.md`、`docs/ROADMAP.md`、`docs/TODO.md`、`docs/MEMORY.md`、`CHANGELOG.md` 已同步。
- `scripts/validate-website-governance.mjs` 已纳入 Lead Center 与 ADR-0011。
- 未创建表单提交接口、CRM 后台、ORM、迁移、通知、导出运行时、API 或 Admin UI。
