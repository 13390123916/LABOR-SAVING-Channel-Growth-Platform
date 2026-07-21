import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd().endsWith(`${path.sep}website`)
  ? path.dirname(process.cwd())
  : process.cwd();

const entityFile = "website/app/products/product-entities.json";
const pageFile = "website/app/products/page.tsx";
const cardFile = "website/app/products/product-card.tsx";
const metadataFile = "website/app/site-metadata.ts";
const schemaFile = "website/app/site-schema.ts";

function fail(message) {
  console.error(`Product listing validation failed: ${message}`);
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

  if (entity.schemaEligible && entity.detailStatus !== "published") {
    fail(`${entity.entityId} cannot be schema eligible before its detail page is published`);
  }

  if (!Array.isArray(entity.relatedEntityIds)) {
    fail(`${entity.entityId} relatedEntityIds must be an array`);
  }
}

const page = readRequired(pageFile);
const card = readRequired(cardFile);
const metadata = readRequired(metadataFile);
const schema = readRequired(schemaFile);

for (const token of [
  "productEntities",
  "groupProductsByCategory(productEntities)",
  "group.entities.map",
  "buildProductListingSchemas",
  "metadataDefinition.breadcrumb"
]) {
  assertIncludes(page, token, pageFile);
}

for (const forbiddenProductName of entities.map((entity) => entity.name)) {
  if (page.includes(forbiddenProductName)) {
    fail(`${pageFile} hardcodes Product Entity "${forbiddenProductName}"`);
  }
}

for (const token of ["buildProductUrl(entity)", "data-entity-id", "detailStatus"]) {
  assertIncludes(card, token, cardFile);
}

for (const token of ["products:", "canonical: \"/products/\"", "openGraph:"]) {
  assertIncludes(metadata, token, metadataFile);
}
if (metadata.includes("https://example.com")) {
  fail(`${metadataFile} must not use example.com as the canonical base URL`);
}

for (const token of [
  "buildProductListingSchemas",
  "buildProductListingSchema",
  "getSchemaEligibleProducts",
  "buildBreadcrumbSchema(pageMetadata.products.breadcrumb)",
  "buildFaqSchema(faqs)"
]) {
  assertIncludes(schema, token, schemaFile);
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`Product listing validation passed for ${entities.length} Product Entities.`);
