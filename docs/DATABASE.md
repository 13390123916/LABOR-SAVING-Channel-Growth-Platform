# Database Design

## 数据库原则

数据库优先使用 MySQL。第一阶段只设计核心表结构，不提前建设复杂权限与报表系统。

## 核心实体

### products

存储产品基础信息。

建议字段：

- id
- slug
- name
- category
- status
- seo_title
- seo_description
- created_at
- updated_at

### leads

存储询盘与加盟合作线索。

建议字段：

- id
- customer_type
- name
- phone
- company
- region
- product_interest
- intent
- message
- source_channel
- source_page
- status
- assigned_agent_id
- created_at
- updated_at

### agents

存储代理商或区域合作伙伴。

建议字段：

- id
- name
- company
- phone
- region_scope
- product_scope
- status
- created_at
- updated_at

### articles

存储 SEO/GEO 内容。

建议字段：

- id
- slug
- title
- summary
- content
- content_type
- seo_title
- seo_description
- publish_status
- created_at
- updated_at

## 数据合规

- 手机号、联系人等个人信息不得用于非业务目的。
- 后续上线前必须补充访问权限、日志、备份和数据脱敏策略。
