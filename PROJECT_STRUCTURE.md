# LABOR-SAVING Channel Growth Platform

GitHub Repository Structure

Version: V1.1

## 项目定位

雷普赛维渠道增长平台是工业渠道增长平台，不是普通企业官网。

完整系统长期覆盖：

- 官网获客
- 中国 SEO
- GEO / AI 搜索优化
- 线索收集
- CRM 分配
- 代理商协作
- 运营分析
- 内容资产

## 当前工程落点

```text
/
├─ .ai/
├─ .github/
├─ docs/
├─ website/
│  ├─ app/
│  ├─ application/
│  ├─ components/
│  ├─ config/
│  ├─ domain/
│  ├─ features/
│  ├─ infrastructure/
│  ├─ lib/
│  └─ public/
├─ seo/
├─ geo/
├─ crm/
├─ partner/
├─ marketing/
├─ assets/
├─ scripts/
├─ deploy/
└─ archive/
```

## 目录原则

1. 新增目录必须先说明用途
2. 不重复建目录
3. 不重复建模块
4. 不把临时代码塞进页面组件

## 文档维护原则

任何新增功能都必须同步检查：

- `docs/MEMORY.md`
- `docs/ROADMAP.md`
- `docs/CHANGELOG.md`
- `docs/TODO.md`

## 当前策略

第一阶段先完成可上线的官网获客 MVP，再逐步接入 CRM、代理协作和数据分析。
