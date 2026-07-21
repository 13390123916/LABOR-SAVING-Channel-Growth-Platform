import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

const requiredDocs = [
  "docs/WEBSITE_ARCHITECTURE.md",
  "docs/WEBSITE_SEO_BLUEPRINT.md",
  "docs/CONTENT_SYSTEM.md",
  "docs/M2_STRATEGY.md",
  "docs/PAGE_SYSTEM.md",
  "docs/METADATA_SCHEMA.md",
  "docs/SEO_SCHEMA_LAYER.md",
  "docs/ENTITY_SYSTEM.md",
  "docs/PRODUCT_SYSTEM.md",
  "docs/PRODUCT_CONTENT_MODEL.md",
  "docs/PRODUCT_SCHEMA.md",
  "docs/PRODUCT_SEO_TEMPLATE.md",
  "docs/PRODUCT_PUBLISHING_CHECKLIST.md",
  "docs/PRODUCT_CONTENT_READINESS.md",
  "docs/MILESTONE_MAPPING.md",
  "docs/PLATFORM_ARCHITECTURE.md",
  "docs/AUTH_SYSTEM.md",
  "docs/CMS_SYSTEM.md",
  "docs/MEDIA_SYSTEM.md",
  "docs/LEAD_CENTER.md",
  "docs/PLATFORM_ASSETS.md",
  "docs/adr/README.md",
  "docs/adr/ADR-0001-m2-freeze-and-m3-platform-foundation.md",
  "docs/adr/ADR-0007-cms-architecture.md",
  "docs/adr/ADR-0008-database-model.md",
  "docs/adr/ADR-0009-authentication-and-authorization.md",
  "docs/adr/ADR-0010-media-management.md",
  "docs/adr/ADR-0011-lead-center.md",
  "docs/adr/ADR-0012-platform-assets.md",
  "docs/PARTNER_FUNNEL.md",
  "docs/PARTNER_CONTENT_MODEL.md",
  "docs/PARTNER_SEO_TEMPLATE.md",
  "docs/LEAD_SCHEMA.md"
];

const requiredUrls = [
  "/partner/",
  "/distributor/",
  "/join/",
  "/products/pneumatic-manipulator-arm/",
  "/products/pneumatic-manipulator-arm/ls40/",
  "/products/pneumatic-manipulator-arm/l60/",
  "/products/pneumatic-manipulator-arm/ls70/",
  "/products/pneumatic-balancer/",
  "/products/pneumatic-balancer/sq35/",
  "/products/pneumatic-balancer/sq50/",
  "/applications/wind-power/",
  "/solutions/hydraulic-torque-wrench/",
  "/partner/distributor/"
];

const seoFields = [
  "Title",
  "Meta Description",
  "H1",
  "H2",
  "关键词",
  "图片 ALT",
  "Schema",
  "内部链接"
];

const geoFields = ["百度", "360搜索", "搜狗", "Google", "AI Search", "JSON-LD Schema", "FAQ"];

const contentTypes = ["产品文章", "行业文章", "案例文章", "技术FAQ", "招商内容", "AI搜索回答内容"];
const strategyTerms = [
  "M2 Channel Growth Foundation",
  "Page Strategy Definition",
  "Metadata System",
  "SEO Schema Layer",
  "Partner Funnel",
  "Lead Capture Schema",
  "Website Traffic Weight",
  "加盟合作 Partner",
  "35%",
  "有效代理商线索"
];
const partnerTerms = [
  "LABOR-SAVING 渠道增长中心",
  "/partner/",
  "区域代理",
  "行业代理",
  "渠道经销商",
  "项目合作伙伴",
  "产品赋能",
  "技术赋能",
  "销售赋能",
  "市场赋能",
  "内容赋能",
  "培训赋能",
  "售后赋能",
  "品牌赋能",
  "申请成为区域合作伙伴"
];

const syncFiles = ["docs/TODO.md", "docs/MEMORY.md", "CHANGELOG.md"];
const productFoundationDocs = [
  "docs/ENTITY_SYSTEM.md",
  "docs/PRODUCT_SYSTEM.md",
  "docs/PRODUCT_CONTENT_MODEL.md",
  "docs/PRODUCT_SCHEMA.md",
  "docs/PRODUCT_SEO_TEMPLATE.md",
  "docs/PRODUCT_PUBLISHING_CHECKLIST.md",
  "docs/PRODUCT_CONTENT_READINESS.md"
];
const governanceEntryFiles = [
  ".ai/AI_PROJECT_OPERATING_SYSTEM.md",
  "PROJECT_STRUCTURE.md",
  "README.md",
  ".github/workflows/ci.yml"
];

function fail(message) {
  console.error(`Website governance check failed: ${message}`);
  process.exitCode = 1;
}

function readRequired(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!existsSync(absolutePath)) {
    fail(`missing ${relativePath}`);
    return "";
  }

  return readFileSync(absolutePath, "utf8");
}

function assertIncludes(content, token, file) {
  if (!content.includes(token)) {
    fail(`${file} missing "${token}"`);
  }
}

for (const doc of requiredDocs) {
  const content = readRequired(doc);
  if (!content.startsWith("# ")) {
    fail(`${doc} must start with a Markdown H1`);
  }
  if (/\t/.test(content)) {
    fail(`${doc} contains tabs`);
  }
  if (/[ \t]$/m.test(content)) {
    fail(`${doc} contains trailing whitespace`);
  }
}

const architecture = readRequired("docs/WEBSITE_ARCHITECTURE.md");
for (const token of ["首页", "加盟合作", "产品中心", "行业应用", "解决方案", "知识中心", "关于 LABOR-SAVING"]) {
  assertIncludes(architecture, token, "docs/WEBSITE_ARCHITECTURE.md");
}
for (const token of partnerTerms) {
  assertIncludes(architecture, token, "docs/WEBSITE_ARCHITECTURE.md");
}

const seoBlueprint = readRequired("docs/WEBSITE_SEO_BLUEPRINT.md");
for (const url of requiredUrls) {
  assertIncludes(seoBlueprint, url, "docs/WEBSITE_SEO_BLUEPRINT.md");
  if (!/^\/[a-z0-9/-]*\/$/.test(url)) {
    fail(`invalid URL format in expected URL list: ${url}`);
  }
}
for (const field of seoFields) {
  assertIncludes(seoBlueprint, field, "docs/WEBSITE_SEO_BLUEPRINT.md");
}
for (const field of geoFields) {
  assertIncludes(seoBlueprint, field, "docs/WEBSITE_SEO_BLUEPRINT.md");
}
for (const token of partnerTerms) {
  assertIncludes(seoBlueprint, token, "docs/WEBSITE_SEO_BLUEPRINT.md");
}
for (const legacyUrl of [
  "/products/ls40-pneumatic-arm/",
  "/products/ls60-pneumatic-arm/",
  "/products/ls70-pneumatic-arm/"
]) {
  if (seoBlueprint.includes(legacyUrl)) {
    fail(`docs/WEBSITE_SEO_BLUEPRINT.md contains legacy product URL "${legacyUrl}"`);
  }
}

for (const file of governanceEntryFiles) {
  const content = readRequired(file);
  for (const doc of productFoundationDocs) {
    assertIncludes(content, doc, file);
  }
}

const contentSystem = readRequired("docs/CONTENT_SYSTEM.md");
for (const type of contentTypes) {
  assertIncludes(contentSystem, type, "docs/CONTENT_SYSTEM.md");
}

const m2Strategy = readRequired("docs/M2_STRATEGY.md");
for (const token of strategyTerms) {
  assertIncludes(m2Strategy, token, "docs/M2_STRATEGY.md");
}

const partnerFunnel = readRequired("docs/PARTNER_FUNNEL.md");
for (const token of ["访问加盟页面", "了解市场机会", "了解合作模式", "提交资料", "CRM进入", "销售跟进", "区域代理审核"]) {
  assertIncludes(partnerFunnel, token, "docs/PARTNER_FUNNEL.md");
}

const partnerSystem = readRequired("docs/PARTNER.md");
for (const token of ["Partner Program Entity", "Partner Program Database", "Partner Content Model", "Partner SEO Template", "Partner Lead / CRM / CMS / Export"]) {
  assertIncludes(partnerSystem, token, "docs/PARTNER.md");
}

const partnerContentModel = readRequired("docs/PARTNER_CONTENT_MODEL.md");
for (const token of ["PartnerTemplate", "Hero", "Market Opportunity", "Cooperation Models", "Channel Enablement", "Lead Entry", "FAQ"]) {
  assertIncludes(partnerContentModel, token, "docs/PARTNER_CONTENT_MODEL.md");
}

const partnerSeoTemplate = readRequired("docs/PARTNER_SEO_TEMPLATE.md");
for (const token of ["/partner/", "Organization", "WebPage", "ContactPoint", "FAQPage", "Topic Cluster", "Partner Lead"]) {
  assertIncludes(partnerSeoTemplate, token, "docs/PARTNER_SEO_TEMPLATE.md");
}

const entitySystem = readRequired("docs/ENTITY_SYSTEM.md");
for (const token of ["Entity System", "Entity ID 规范", "Entity Version 字段", "entity_id", "version", "status", "published_at", "updated_at", "dateModified", "PRT-0001", "PRD-0001", "IND-0001", "CAS-0001", "ART-0001", "VID-0001", "DLD-0001", "FAQ-0001", "Content Model", "Metadata", "Schema", "SEO Template", "CMS", "CRM", "Analytics", "Database", "Frontend", "Rendering Layer", "SEO", "GEO", "Partner", "Product", "Industry", "Case", "Article", "Video", "Download", "FAQ"]) {
  assertIncludes(entitySystem, token, "docs/ENTITY_SYSTEM.md");
}

const productSystem = readRequired("docs/PRODUCT_SYSTEM.md");
for (const token of ["Product System", "Product System Foundation", "Product Entity", "Product Content Model", "Product Metadata", "Product Schema", "Product CMS Model", "Product Rendering Layer", "Product Listing", "Product Category", "Product Detail", "Related Product", "PRD-0001", "PRD-0002", "PRD-0003", "PRD-0004", "LS40", "L60", "SQ35", "SQ50", "Canonical", "Open Graph", "Entity Count = 4", "Category Routes = 2", "不以页面数量为目标", "不进入 sitemap"]) {
  assertIncludes(productSystem, token, "docs/PRODUCT_SYSTEM.md");
}

const productContentModel = readRequired("docs/PRODUCT_CONTENT_MODEL.md");
for (const token of ["Product Content Model", "ProductTemplate", "Hero", "Product Overview", "Features", "Applications", "Related Resources", "FAQ", "Lead Entry", "Partner Entry"]) {
  assertIncludes(productContentModel, token, "docs/PRODUCT_CONTENT_MODEL.md");
}

const productSchema = readRequired("docs/PRODUCT_SCHEMA.md");
for (const token of ["Product Schema", "Product", "CollectionPage", "BreadcrumbList", "FAQPage", "LS40", "L60", "SQ35", "SQ50"]) {
  assertIncludes(productSchema, token, "docs/PRODUCT_SCHEMA.md");
}

const productSeoTemplate = readRequired("docs/PRODUCT_SEO_TEMPLATE.md");
for (const token of ["Product SEO Template", "/products/", "Product Rendering Layer", "Product Listing", "Product Category", "Product Detail", "Related Product", "Topic Cluster", "GEO", "Product", "FAQPage", "Canonical", "Open Graph", "PRD-0001", "PRD-0002", "PRD-0003", "PRD-0004", "不以页面数量为目标", "不进入 sitemap", "/partner/"]) {
  assertIncludes(productSeoTemplate, token, "docs/PRODUCT_SEO_TEMPLATE.md");
}

const productPublishingChecklist = readRequired("docs/PRODUCT_PUBLISHING_CHECKLIST.md");
for (const token of ["First Published Product Validation", "Product Schema", "Images", "Sitemap", "Robots", "Search Console", "Draft", "Internal Review", "Content Approved", "SEO Approved", "Published", "Indexed", "Archived"]) {
  assertIncludes(productPublishingChecklist, token, "docs/PRODUCT_PUBLISHING_CHECKLIST.md");
}

const productContentReadiness = readRequired("docs/PRODUCT_CONTENT_READINESS.md");
for (const token of ["Product Content Readiness", "PRD-0002", "L60", "Internal Review", "Content Approved", "Product Publishing Checklist", "图片", "Open Graph", "JSON-LD", "Search Console"]) {
  assertIncludes(productContentReadiness, token, "docs/PRODUCT_CONTENT_READINESS.md");
}

const milestoneMapping = readRequired("docs/MILESTONE_MAPPING.md");
for (const token of ["M2 Channel Growth Foundation", "Frozen v1.0", "M2.6", "M2.7", "M2.8", "M3 Website Platform Foundation", "M3.0 Database Architecture", "M3.2 CMS Architecture", "M3.3 Media Management", "M3.4 Lead Center Architecture", "M3.5 Platform Assets Architecture", "M3 Governance Enhancement", "M3.6 Dealer Center Architecture", "M3.7 Analytics Architecture", "M3.8 Security / Permission Architecture", "M3.9 Platform Freeze Review", "M4 Platform Runtime"]) {
  assertIncludes(milestoneMapping, token, "docs/MILESTONE_MAPPING.md");
}

const adrIndex = readRequired("docs/adr/README.md");
for (const token of ["ADR-0001", "ADR-0007", "ADR-0008", "ADR-0009", "ADR-0010", "ADR-0011", "ADR-0012", "M3 Website Platform Foundation", "Media Management Architecture", "Lead Center Architecture", "Platform Assets Architecture", "重大平台方向决策"]) {
  assertIncludes(adrIndex, token, "docs/adr/README.md");
}

const platformArchitecture = readRequired("docs/PLATFORM_ARCHITECTURE.md");
for (const token of ["Platform Architecture", "Single Source of Truth", "Platform Module Intake Gate", "Platform Capability", "Platform Module 归属", "PLATFORM_ARCHITECTURE.md 统一管理", "Governance Note", "不属于新的 Platform Capability", "不允许重新排列 Milestone", "Website", "Content", "SEO / GEO", "Dealer Center", "Analytics", "Security / Permission", "Platform Freeze Review", "Platform Runtime", "Database", "Authentication", "CMS", "Media", "Lead Center", "Platform Assets", "模块职责", "模块依赖", "平台生命周期", "M3 阶段边界", "ADR 治理规则", "Media Management Architecture", "Lead Center Architecture", "Platform Assets Architecture", "Dealer 是渠道增长核心对象", "Analytics 是归因与转化复盘层", "Organization Schema", "Brand Entity", "ContactPoint", "Download Resource", "M4 Platform Runtime", "README.md", "docs/ROADMAP.md", "docs/adr/README.md"]) {
  assertIncludes(platformArchitecture, token, "docs/PLATFORM_ARCHITECTURE.md");
}

const cmsSystem = readRequired("docs/CMS_SYSTEM.md");
for (const token of ["CMS System", "CMS Resource", "Content Type", "Field Group", "Workflow", "Permission Integration", "Audit Integration", "Import / Export", "Future Platform Split", "Product", "Industry", "Article", "Partner", "FAQ", "Download", "Navigation", "SEO Metadata", "Schema Metadata", "Redirect", "Setting", "Draft", "Internal Review", "Content Approved", "SEO Approved", "Release Approved", "Published", "Indexed", "Archived", "Media Management", "Lead Center", "SEO Runtime", "GEO Runtime", "Audit Center", "Backup & Restore"]) {
  assertIncludes(cmsSystem, token, "docs/CMS_SYSTEM.md");
}

const mediaSystem = readRequired("docs/MEDIA_SYSTEM.md");
for (const token of ["Media System", "Media Entity", "Media Metadata", "Asset 生命周期", "图片版本", "ALT 来源", "WebP", "AVIF", "Thumbnail Strategy", "Storage Adapter", "CDN Boundary", "Watermark Strategy", "引用关系", "Product", "Industry", "Article", "Partner", "Case", "Download", "FAQ", "SEO Metadata", "Schema Metadata", "GEO Runtime", "Uploaded", "Reviewing", "Approved", "Published", "Archived", "M4 Platform Runtime"]) {
  assertIncludes(mediaSystem, token, "docs/MEDIA_SYSTEM.md");
}

const leadCenter = readRequired("docs/LEAD_CENTER.md");
for (const token of ["Lead Center", "Lead Entity", "Lead Type", "字段分层", "来源归因", "生命周期", "分配策略", "去重", "隐私", "Export Boundary", "CRM 输入", "Permission Integration", "Audit Integration", "M4 Platform Runtime", "Partner Lead", "Customer Lead", "Manual Lead", "Imported Lead", "New", "Contacted", "Qualifying", "Assigned", "Won", "Invalid"]) {
  assertIncludes(leadCenter, token, "docs/LEAD_CENTER.md");
}

const platformAssets = readRequired("docs/PLATFORM_ASSETS.md");
for (const token of ["Platform Assets", "Platform Layer", "CMS Content", "Lead Data", "Dealer Data", "Runtime", "CN First Platform", "Company Profile", "Company Information", "Brand Information", "Contact Information", "Office Information", "Corporate Description", "Certificates", "ICP", "Copyright", "Brand Assets", "Logo", "Brand Color", "Typography", "Icon", "Marketing Assets", "Social Media Hub", "微信公众号", "视频号", "抖音", "小红书", "知乎", "Bilibili", "Download Center", "Product Catalog", "Datasheet", "Manual", "CAD", "Certification", "Whitepaper", "Marketing Material", "Friend Links", "Industry", "Partner", "Government", "Media", "Contact Center", "Phone", "Email", "Address", "Map", "Working Hours", "QR Code", "Contact Form", "System Settings", "Website Name", "Footer", "Announcement", "Default SEO", "Analytics Code", "Sitemap Reference", "M4 Platform Runtime"]) {
  assertIncludes(platformAssets, token, "docs/PLATFORM_ASSETS.md");
}

const authSystem = readRequired("docs/AUTH_SYSTEM.md");
for (const token of ["Authentication", "Authorization", "RBAC", "Permission", "Role", "Resource", "Audit", "Login Flow", "Session", "Future SSO", "Super Admin", "Admin", "Editor", "SEO", "Sales", "Partner Manager", "Product", "Industry", "Article", "Partner", "Lead", "Media", "Download", "FAQ", "Navigation", "Setting", "User", "RolePermission", "UserRole", "created_by", "updated_by", "deleted_by", "published_by", "approved_by"]) {
  assertIncludes(authSystem, token, "docs/AUTH_SYSTEM.md");
}

const leadSchema = readRequired("docs/LEAD_SCHEMA.md");
for (const token of ["companyName", "contactName", "region", "mainProducts", "customerResources", "sellsIndustrialTools", "sellsHydraulicTools", "hasWindPowerCustomers"]) {
  assertIncludes(leadSchema, token, "docs/LEAD_SCHEMA.md");
}

const pageSystem = readRequired("docs/PAGE_SYSTEM.md");
for (const token of ["页面目标", "用户角色", "SEO关键词", "转化目标", "CTA", "内部链接", "Schema", "Lead入口", "/partner/", "Partner Lead"]) {
  assertIncludes(pageSystem, token, "docs/PAGE_SYSTEM.md");
}

const metadataSchema = readRequired("docs/METADATA_SCHEMA.md");
for (const token of ["title", "description", "keywords", "canonical", "og", "schema", "breadcrumb", "LABOR-SAVING 渠道增长中心"]) {
  assertIncludes(metadataSchema, token, "docs/METADATA_SCHEMA.md");
}

const seoSchemaLayer = readRequired("docs/SEO_SCHEMA_LAYER.md");
for (const token of ["Organization", "Product", "Article", "FAQPage", "BreadcrumbList", "WebPage", "ContactPoint", "后台维护", "数据库字段预留", "批量导出", "Partner Lead"]) {
  assertIncludes(seoSchemaLayer, token, "docs/SEO_SCHEMA_LAYER.md");
}

for (const file of syncFiles) {
  const content = readRequired(file);
  for (const token of ["WEBSITE_ARCHITECTURE.md", "WEBSITE_SEO_BLUEPRINT.md", "CONTENT_SYSTEM.md", "M2_STRATEGY.md", "PAGE_SYSTEM.md", "METADATA_SCHEMA.md", "SEO_SCHEMA_LAYER.md", "ENTITY_SYSTEM.md", "PRODUCT_SYSTEM.md", "PRODUCT_CONTENT_MODEL.md", "PRODUCT_SCHEMA.md", "PRODUCT_SEO_TEMPLATE.md", "PRODUCT_PUBLISHING_CHECKLIST.md", "PRODUCT_CONTENT_READINESS.md", "MILESTONE_MAPPING.md", "PLATFORM_ARCHITECTURE.md", "Platform Module Intake Gate", "Governance Note", "不允许重新排列 Milestone", "Dealer Center", "Analytics", "Security / Permission", "Platform Freeze Review", "Platform Runtime", "AUTH_SYSTEM.md", "CMS_SYSTEM.md", "MEDIA_SYSTEM.md", "LEAD_CENTER.md", "PLATFORM_ASSETS.md", "adr/README.md", "ADR-0007", "ADR-0009", "ADR-0010", "ADR-0011", "ADR-0012", "PARTNER_FUNNEL.md", "PARTNER_CONTENT_MODEL.md", "PARTNER_SEO_TEMPLATE.md", "LEAD_SCHEMA.md"]) {
    assertIncludes(content, token, file);
  }
}

const publicDir = path.join(root, "website", "public");
const imagePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*\.(?:png|jpg|jpeg|webp|svg|ico)$/;

function checkImages(dir) {
  if (!existsSync(dir)) {
    return;
  }

  for (const entry of readdirSync(dir)) {
    const entryPath = path.join(dir, entry);
    const stats = statSync(entryPath);
    if (stats.isDirectory()) {
      checkImages(entryPath);
      continue;
    }

    if (/\.(png|jpg|jpeg|webp|svg|ico)$/i.test(entry) && !imagePattern.test(entry)) {
      fail(`image file name must use lowercase kebab-case: ${path.relative(root, entryPath)}`);
    }
  }
}

checkImages(publicDir);

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("Website governance check passed.");
