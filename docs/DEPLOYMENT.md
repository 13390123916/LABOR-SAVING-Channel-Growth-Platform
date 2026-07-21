# Deployment

## 部署原则

第一阶段以可维护、可回滚、可迁移为目标。

## 推荐环境

- Linux Server
- Docker
- Nginx
- Node.js LTS
- MySQL
- GitHub Actions

## 部署流程

1. GitHub Actions 执行 CI。
2. 构建应用镜像。
3. 推送到服务器或镜像仓库。
4. Nginx 反向代理。
5. 站点地图与 robots 文件可访问。
6. 接入监控与日志。

## 上线前检查

- 环境变量完整
- 数据库迁移完成
- sitemap 可访问
- robots 可访问
- llms.txt 可访问
- 表单风控启用
- 备份策略启用
