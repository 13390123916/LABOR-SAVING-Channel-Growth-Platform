# Architecture

## 系统定位

LABOR-SAVING Channel Growth Platform 是工业装备渠道增长平台。官网是获客入口，CRM 是线索分配中心，SEO/GEO 是长期内容资产，Partner 是渠道协作系统，Dashboard 是运营复盘系统。

## 目标架构

```text
Traffic Layer
├─ 百度 / 360 / 搜狗 / 神马
├─ 微信搜一搜 / 公众号
├─ 知乎 / 小红书 / 抖音
└─ DeepSeek / 豆包 / 腾讯元宝 / Kimi / 通义千问

Experience Layer
├─ Website
├─ Landing Pages
├─ Knowledge Base
└─ Partner Portal

Application Layer
├─ Lead Capture
├─ CRM Assignment
├─ Content Management
├─ SEO/GEO Automation
└─ Analytics

Infrastructure Layer
├─ Next.js / Node.js
├─ MySQL
├─ Docker
├─ GitHub Actions
└─ Nginx
```

## 分层原则

- Presentation：页面、组件、布局、表单、SEO 展示。
- Application：业务用例、流程编排、线索分配策略。
- Domain：产品、线索、代理商、区域、内容实体。
- Infrastructure：数据库、通知、日志、部署、第三方 API。
- Shared：配置、验证、SEO/GEO 工具、通用类型。

## 架构约束

- 不把业务规则写死在页面中。
- 不把数据库细节泄漏到业务层。
- 不在没有真实业务数据前过度设计 CRM 自动分配。
- 不用纯视觉内容承载核心 SEO/GEO 信息。
