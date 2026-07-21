# API Design

## API 原则

- API 必须有输入校验。
- API 不直接暴露数据库实现。
- API 返回结构必须稳定。
- 与 CRM、飞书、企业微信的集成必须封装在 Infrastructure 层。

## 初始 API 规划

### POST /api/leads

用途：提交加盟合作或产品询盘线索。

请求字段：

- customerType
- name
- phone
- company
- region
- product
- intent
- message
- sourceChannel
- sourcePage

返回字段：

- ok
- leadId
- status

## 后续 API

- GET /api/admin/leads
- GET /api/admin/leads/:id
- PATCH /api/admin/leads/:id/status
- POST /api/admin/leads/:id/assign
- POST /api/notifications/feishu
- POST /api/notifications/wecom
