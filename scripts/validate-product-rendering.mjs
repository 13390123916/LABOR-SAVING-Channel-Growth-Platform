import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd().endsWith(`${path.sep}website`)
  ? path.dirname(process.cwd())
  : process.cwd();

const entityFile = "website/app/products/product-entities.json";
const listingPageFile = "website/app/products/page.tsx";
const categoryPageFile = "website/app/products/[categorySlug]/page.tsx";
const detailPageFile = "website/app/products/[categorySlug]/[productSlug]/page.tsx";
const cardFile = "website/app/products/product-card.tsx";
const detailRendererFile = "website/app/products/product-detail-renderer.tsx";
const contentFile = "website/app/products/product-content.ts";
const metadataFile = "website/app/site-metadata.ts";
const schemaFile = "website/app/site-schema.ts";
const robotsFile = "website/app/robots.ts";
const sitemapFile = "website/app/sitemap.ts";
const notFoundFile = "website/app/not-found.tsx";
const partnerPageFile = "website/app/partner/page.tsx";

function fail(message) {
  console.error(`Product rendering validation failed: ${message}`);
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

const entities = JSON.parse(readRequired(entityFile));
const entityIds = new Set();
const productPaths = new Set();
const categoryCounts = new Map();

if (!Array.isArray(entities) || entities.length === 0) {
  fail(`${entityFile} must contain at least one Product Entity`);
}

for (const entity of entities) {
  if (!/^PRD-\d{4}$/.test(entity.entityId)) {
    fail(`invalid Entity ID: ${entity.entityId}`);
  }
  if (entityIds.has(entity.entityId)) {
    fail(`duplicate Entity ID: ${entity.entityId}`);
  }
  entityIds.add(entity.entityId);

  for (const [label, slug] of [
    ["category", entity.category?.slug],
    ["product", entity.slug]
  ]) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug ?? "")) {
      fail(`invalid ${label} slug for ${entity.entityId}`);
    }
  }

  const productPath = `/products/${entity.category.slug}/${entity.slug}/`;
  if (productPaths.has(productPath)) {
    fail(`duplicate product path: ${productPath}`);
  }
  productPaths.add(productPath);

  categoryCounts.set(
    entity.category.slug,
    (categoryCounts.get(entity.category.slug) ?? 0) + 1
  );

  if (entity.schemaEligible && entity.detailStatus !== "published") {
    fail(`${entity.entityId} cannot be schema eligible before its detail page is published`);
  }

  if (typeof entity.contentValidated !== "boolean") {
    fail(`${entity.entityId} contentValidated must be a boolean`);
  }

  if (typeof entity.releaseApproved !== "boolean") {
    fail(`${entity.entityId} releaseApproved must be a boolean`);
  }

  if (!Array.isArray(entity.relatedEntityIds)) {
    fail(`${entity.entityId} relatedEntityIds must be an array`);
  }
}

const entityCount = entities.length;
const listingCount = entities.length;
const categoryTotal = Array.from(categoryCounts.values()).reduce(
  (total, count) => total + count,
  0
);
const publishedDetailCount = entities.filter(
  (entity) =>
    entity.detailStatus === "published" &&
    entity.schemaEligible &&
    entity.contentValidated &&
    entity.releaseApproved
).length;

if (entityCount !== listingCount || entityCount !== categoryTotal) {
  fail(
    `count mismatch: Entity=${entityCount}, Listing=${listingCount}, CategoryTotal=${categoryTotal}`
  );
}

const listingPage = readRequired(listingPageFile);
const categoryPage = readRequired(categoryPageFile);
const detailPage = readRequired(detailPageFile);
const card = readRequired(cardFile);
const detailRenderer = readRequired(detailRendererFile);
const content = readRequired(contentFile);
const metadata = readRequired(metadataFile);
const schema = readRequired(schemaFile);
const robots = readRequired(robotsFile);
const sitemap = readRequired(sitemapFile);
const notFound = readRequired(notFoundFile);
const partnerPage = readRequired(partnerPageFile);

for (const token of [
  "productEntities",
  "groupProductsByCategory(productEntities)",
  "group.entities.map",
  "buildProductCategoryUrl(group)",
  "buildProductListingSchemas",
  "metadataDefinition.breadcrumb"
]) {
  assertIncludes(listingPage, token, listingPageFile);
}

for (const token of [
  "generateStaticParams",
  "groupProductsByCategory(productEntities)",
  "getProductCategoryBySlug(categorySlug)",
  "category.entities.map",
  "buildProductCategoryMetadata(category)",
  "buildProductCategorySchemas(category, faqs)",
  "ProductBreadcrumbs"
]) {
  assertIncludes(categoryPage, token, categoryPageFile);
}

for (const token of [
  "dynamicParams = false",
  "getPublishedProductDetailStaticParams",
  "getPublishedProductDetailBySlugs(categorySlug, productSlug)",
  "buildProductDetailMetadata(entity)",
  "buildProductDetailSchemas(entity, faqs)",
  "ProductDetailRenderer"
]) {
  assertIncludes(detailPage, token, detailPageFile);
}

for (const forbiddenProductName of entities.map((entity) => entity.name)) {
  if (listingPage.includes(forbiddenProductName)) {
    fail(`${listingPageFile} hardcodes Product Entity "${forbiddenProductName}"`);
  }
  if (categoryPage.includes(forbiddenProductName)) {
    fail(`${categoryPageFile} hardcodes Product Entity "${forbiddenProductName}"`);
  }
}

for (const token of [
  "buildProductUrl(entity)",
  "data-entity-id",
  "isProductDetailPublishable(entity)"
]) {
  assertIncludes(card, token, cardFile);
}
if (card.includes('entity.detailStatus === "published"')) {
  fail(`${cardFile} must reuse the complete Product detail publication gate`);
}

for (const token of [
  "productListingFaqs",
  "buildProductCategoryFaqs",
  "buildProductDetailContent",
  "buildProductDetailFaqs"
]) {
  assertIncludes(content, token, contentFile);
}

for (const token of [
  "ProductDetailRenderer",
  "buildProductDetailContent(entity)",
  "buildProductDetailFaqs(entity)",
  "ProductBreadcrumbs",
  "buildProductCategoryUrl(entity.category)",
  "href=\"/partner/\""
]) {
  assertIncludes(detailRenderer, token, detailRendererFile);
}

for (const token of [
  "products:",
  "canonical: \"/products/\"",
  "openGraph:",
  "buildProductCategoryMetadata",
  "buildProductCategoryUrl(category)",
  "buildProductDetailMetadata",
  "buildProductUrl(entity)"
]) {
  assertIncludes(metadata, token, metadataFile);
}
assertIncludes(metadata, 'siteBaseUrl = "https://laborsaving-arm.cn"', metadataFile);
for (const forbiddenOrigin of ["https://example.com", "https://www.labor-saving.cn"]) {
  if (metadata.includes(forbiddenOrigin)) {
    fail(`${metadataFile} must not use ${forbiddenOrigin} as the canonical base URL`);
  }
}

for (const token of [
  "buildProductListingSchemas",
  "buildProductListingSchema",
  "buildProductCategorySchemas",
  "buildProductCategorySchema",
  "buildProductDetailSchemas",
  "buildProductDetailSchema",
  "getSchemaEligibleProducts",
  "buildBreadcrumbSchema(metadata.breadcrumb)",
  "buildFaqSchema(faqs)"
]) {
  assertIncludes(schema, token, schemaFile);
}

for (const token of ["MetadataRoute.Robots", "siteBaseUrl", 'disallow: "/api/"', '"/sitemap.xml"']) {
  assertIncludes(robots, token, robotsFile);
}

for (const token of [
  "MetadataRoute.Sitemap",
  "publicRouteAllowlist",
  '"/partner/"',
  '"/products/pneumatic-manipulator-arm/"',
  '"/products/pneumatic-balancer/"',
  ".filter(isProductDetailPublishable)",
  ".map(buildProductUrl)",
  "siteBaseUrl"
]) {
  assertIncludes(sitemap, token, sitemapFile);
}
for (const invalidRoute of ["/applications/", "/about/contact/", "/solutions/"]) {
  if (sitemap.includes(invalidRoute)) {
    fail(`${sitemapFile} must not include unavailable route ${invalidRoute}`);
  }
}

for (const token of ["页面未找到", "index: false", "follow: false", 'href="/products/"']) {
  assertIncludes(notFound, token, notFoundFile);
}

for (const invalidLink of ['href="/applications/"', 'href="/about/contact/"']) {
  if (partnerPage.includes(invalidLink)) {
    fail(`${partnerPageFile} contains unavailable internal link ${invalidLink}`);
  }
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(
  `Product rendering validation passed: Entity Count=${entityCount}, Listing Count=${listingCount}, Category Total=${categoryTotal}, Category Routes=${categoryCounts.size}, Published Detail Routes=${publishedDetailCount}.`
);
