import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd().endsWith(`${path.sep}website`)
  ? path.dirname(process.cwd())
  : process.cwd();

const files = {
  identity: "website/app/site-identity.ts",
  metadata: "website/app/site-metadata.ts",
  schema: "website/app/site-schema.ts",
  layout: "website/app/layout.tsx",
  home: "website/app/page.tsx",
  about: "website/app/about/page.tsx",
  sitemap: "website/app/sitemap.ts",
  productHeader: "website/app/products/product-header.tsx",
  shell: "website/components/layout/site-shell.tsx",
  footer: "website/components/layout/site-footer.tsx",
  logo: "website/public/assets/labor-saving-logo.png"
};

const expectedLogoHash =
  "4C82FCC552FC57B938B9D7E8746DBE7D6CF30B8E13FDDDBF9F0BBD0CAA6A822B";

function fail(message) {
  console.error(`Company trust entity validation failed: ${message}`);
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

function assertIncludes(content, token, relativePath) {
  if (!content.includes(token)) {
    fail(`${relativePath} missing "${token}"`);
  }
}

const identity = readRequired(files.identity);
const metadata = readRequired(files.metadata);
const schema = readRequired(files.schema);
const layout = readRequired(files.layout);
const home = readRequired(files.home);
const about = readRequired(files.about);
const sitemap = readRequired(files.sitemap);
const productHeader = readRequired(files.productHeader);
const shell = readRequired(files.shell);
const footer = readRequired(files.footer);

for (const fact of [
  "https://laborsaving-arm.cn",
  "雷普赛维助力机械臂、气动机械手",
  "雷普赛维（沈阳）流体动力科技有限公司",
  "LABOR-SAVING",
  "雷普赛维",
  "辽宁省沈阳市浑南区文溯街19-1号",
  "400 971 6668",
  "13390123916@163.com",
  "15840346048@163.com",
  "辽ICP备2026015594号",
  "雷普赛维助力机械臂",
  "雷普赛维LABOR-SAVING",
  "https://www.douyin.com/user/MS4wLjABAAAAtbEU6K_PW5650yMn3P9SefKoOIttY9N5NumAvlGCWrg",
  "/assets/labor-saving-logo.png",
  expectedLogoHash
]) {
  assertIncludes(identity, fact, files.identity);
}

for (const token of [
  "profileUrl: null",
  "approvedSameAs",
  "buildCopyright",
  "siteIdentity.organization.legalName"
]) {
  assertIncludes(identity, token, files.identity);
}

for (const token of [
  'organization: absoluteUrl("/#organization")',
  'website: absoluteUrl("/#website")',
  'brand: absoluteUrl("/#brand")',
  '"@type": "Organization"',
  '"@type": "WebSite"',
  '"@type": "Brand"',
  '"@type": "ContactPoint"',
  "buildContactPointSchemas",
  "buildSiteIdentitySchemas",
  "approvedSameAs",
  "siteIdentity.contacts.public.phoneDisplay",
  "siteIdentity.contacts.partner.email",
  "siteIdentity.contacts.technical.email",
  '"@id": siteSchemaIds.brand',
  "buildAboutPageSchemas"
]) {
  assertIncludes(schema, token, files.schema);
}

for (const token of [
  'siteBaseUrl = "https://laborsaving-arm.cn"',
  "siteIdentity.websiteName",
  "siteIdentity.organization.description",
  'canonical: "/about/"',
  'url: "/about/"'
]) {
  assertIncludes(metadata, token, files.metadata);
}

for (const token of ["buildSiteIdentitySchemas", "SiteShell", "JSON.stringify(schemas)"]) {
  assertIncludes(layout, token, files.layout);
}

for (const token of ["siteIdentity", 'href="/products/"', 'href="/partner/"', 'href="/about/"']) {
  assertIncludes(home, token, files.home);
}
if (home.includes("M1 阶段仅保留官网技术骨架")) {
  fail(`${files.home} still exposes the website skeleton placeholder`);
}

for (const token of [
  "buildPageMetadata(metadataDefinition)",
  "buildAboutPageSchemas",
  "organization.description",
  "organization.profile",
  "brand.relationship",
  "address.display",
  "contacts.public.phoneHref",
  "contacts.partner.email",
  "contacts.technical.email"
]) {
  assertIncludes(about, token, files.about);
}

for (const token of [
  "organization.legalName",
  "address.display",
  "contacts.public.phoneHref",
  "contacts.partner.email",
  "contacts.technical.email",
  "socialProfiles.douyin.profileUrl",
  "socialProfiles.wechat.displayName",
  "buildCopyright()",
  "{icp}"
]) {
  assertIncludes(footer, token, files.footer);
}

assertIncludes(shell, "<SiteFooter />", files.shell);
assertIncludes(sitemap, '"/about/"', files.sitemap);
for (const token of ["siteIdentity.logo.alt", "siteIdentity.logo.src", 'href="/about/"']) {
  assertIncludes(productHeader, token, files.productHeader);
}
if (productHeader.includes("labor-saving-logo.jpg")) {
  fail(`${files.productHeader} still references the legacy logo`);
}

const publicFiles = [identity, metadata, schema, layout, home, about, footer, productHeader];
const forbiddenPublicClaims = [
  "CNAS认证",
  "CNAS 认证",
  "公司通过CNAS认证",
  "国家认证",
  "权威认证",
  "BG-2607018",
  "202607271422311785133351652382310",
  "https://mp.weixin.qq.com/s/GnGcgeNPYa7pS_2nIGmOQA"
];

for (const claim of forbiddenPublicClaims) {
  if (publicFiles.some((content) => content.includes(claim))) {
    fail(`public website files contain forbidden trust claim or evidence "${claim}"`);
  }
}

for (const forbiddenAsset of [
  "website/public/assets/CNAS认证.pdf",
  "website/public/assets/数据存证证书.png"
]) {
  if (existsSync(path.join(root, forbiddenAsset))) {
    fail(`trust evidence must not be published: ${forbiddenAsset}`);
  }
}

const logoPath = path.join(root, files.logo);
if (existsSync(logoPath)) {
  const logoHash = createHash("sha256").update(readFileSync(logoPath)).digest("hex").toUpperCase();
  if (logoHash !== expectedLogoHash) {
    fail(`${files.logo} SHA-256 mismatch: ${logoHash}`);
  }
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("Company trust entity validation passed: identity, schema, footer, about route and logo hash are consistent.");
