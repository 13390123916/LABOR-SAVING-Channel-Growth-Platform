import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

const requiredDocs = [
  "docs/WEBSITE_ARCHITECTURE.md",
  "docs/WEBSITE_SEO_BLUEPRINT.md",
  "docs/CONTENT_SYSTEM.md"
];

const requiredUrls = [
  "/partner/",
  "/distributor/",
  "/join/",
  "/products/pneumatic-manipulator-arm/",
  "/products/ls70-pneumatic-arm/",
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

const contentSystem = readRequired("docs/CONTENT_SYSTEM.md");
for (const type of contentTypes) {
  assertIncludes(contentSystem, type, "docs/CONTENT_SYSTEM.md");
}

for (const file of syncFiles) {
  const content = readRequired(file);
  for (const token of ["WEBSITE_ARCHITECTURE.md", "WEBSITE_SEO_BLUEPRINT.md", "CONTENT_SYSTEM.md"]) {
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
