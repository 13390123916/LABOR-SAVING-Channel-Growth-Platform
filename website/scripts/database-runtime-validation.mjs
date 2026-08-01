import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const websiteRoot = path.resolve(scriptDir, "..");

const requiredFiles = [
  "../docker-compose.yml",
  "../docs/DEVELOPMENT_ENVIRONMENT.md",
  ".env.example",
  "package.json",
  "prisma.config.ts",
  "prisma/schema.prisma",
  "prisma/migrations/0001_database_runtime_bootstrap/migration.sql",
  "prisma/migrations/0002_database_core_materialization/migration.sql",
  "prisma/migrations/0003_auth_persistence_materialization/migration.sql",
  "lib/prisma.ts",
  "lib/database-health.ts",
  "lib/database/index.ts",
  "lib/database/access.ts",
  "lib/database/errors.ts",
  "lib/database/repository.ts",
  "scripts/database-acceptance.mjs",
  "scripts/runtime-execution-preflight.mjs",
  "scripts/database-health-check.ts",
  "scripts/database-transaction-smoke-test.ts"
];

function fail(message) {
  console.error(`Database runtime validation failed: ${message}`);
  process.exitCode = 1;
}

function readRequired(relativePath) {
  const absolutePath = path.join(websiteRoot, relativePath);

  if (!existsSync(absolutePath)) {
    fail(`missing ${relativePath}`);
    return "";
  }

  return readFileSync(absolutePath, "utf8");
}

function runPrismaDiff(args, label) {
  const npmCli = process.env.npm_execpath;

  if (!npmCli) {
    fail(`${label} failed: npm_execpath is not available`);
    return "";
  }

  const result = spawnSync(
    process.execPath,
    [npmCli, "exec", "--", "prisma", "migrate", "diff", ...args],
    {
      cwd: websiteRoot,
      encoding: "utf8"
    }
  );

  if (result.error) {
    fail(`${label} failed: ${result.error.message}`);
  }

  if (result.status !== 0) {
    fail(`${label} failed: ${result.stderr || result.stdout || "unknown error"}`);
  }

  return (result.stdout || "").trim();
}

function assertIncludes(content, tokens, label) {
  for (const token of tokens) {
    if (!content.includes(token)) {
      fail(`${label} missing ${token}`);
    }
  }
}

for (const file of requiredFiles) {
  readRequired(file);
}

const dockerCompose = readRequired("../docker-compose.yml");
for (const token of [
  "mysql:8.4",
  "MYSQL_DATABASE",
  "MYSQL_USER",
  "MYSQL_PASSWORD",
  "MYSQL_ROOT_PASSWORD",
  "mysqladmin ping",
  "mysql_data"
]) {
  if (!dockerCompose.includes(token)) {
    fail(`docker-compose.yml missing ${token}`);
  }
}

const envExample = readRequired(".env.example");
for (const token of [
  "NEXT_PUBLIC_SITE_URL",
  "MYSQL_PORT=3306",
  "MYSQL_DATABASE=labor_saving_channel_growth",
  "MYSQL_USER=labor_saving",
  "DATABASE_URL=mysql://labor_saving:"
]) {
  if (!envExample.includes(token)) {
    fail(`.env.example missing ${token}`);
  }
}

const packageJson = readRequired("package.json");
for (const token of [
  "db:acceptance",
  "scripts/runtime-execution-preflight.mjs",
  "--mode=controlled-execution",
  "--mode=live-validation",
  "--mode=structural"
]) {
  if (!packageJson.includes(token)) {
    fail(`package.json missing ${token}`);
  }
}

const schema = readRequired("prisma/schema.prisma");
assertIncludes(schema, [
  "provider = \"prisma-client\"",
  "output   = \"../generated/prisma\"",
  "provider = \"mysql\"",
], "prisma/schema.prisma");

const expectedModels = [
  "Entity",
  "Category",
  "Product",
  "Industry",
  "Partner",
  "Lead",
  "Media",
  "Article",
  "Faq",
  "Download",
  "Navigation",
  "SeoMetadata",
  "SchemaMetadata",
  "Tag",
  "Redirect",
  "EntityRelation",
  "EntityMedia",
  "EntityFaq",
  "EntityTag",
  "ProductIndustry",
  "ArticleTag",
  "User",
  "Role",
  "Permission",
  "Resource",
  "UserRole",
  "RolePermission",
  "Session",
  "LoginEvent",
  "AuditLog"
];

const schemaModels = [...schema.matchAll(/^model\s+(\w+)\s+\{/gm)].map((match) => match[1]);
for (const model of expectedModels) {
  if (!schemaModels.includes(model)) {
    fail(`M4.0.4 schema materialization missing ${model}`);
  }
}

const unexpectedModels = schemaModels.filter((model) => !expectedModels.includes(model));
if (unexpectedModels.length > 0) {
  fail(`M4.0.4 schema materialization contains unapproved models: ${unexpectedModels.join(", ")}`);
}

const prismaConfig = readRequired("prisma.config.ts");
assertIncludes(prismaConfig, ["process.env.DATABASE_URL"], "prisma.config.ts");
for (const token of ["fallbackDatabaseUrl", "dotenv/config", "localhost:3306/labor_saving_channel_growth"]) {
  if (prismaConfig.includes(token)) {
    fail(`prisma.config.ts must not contain fallback DATABASE_URL token ${token}`);
  }
}

const bootstrapMigration = readRequired(
  "prisma/migrations/0001_database_runtime_bootstrap/migration.sql"
);
if (/create\s+table/i.test(bootstrapMigration)) {
  fail("M4.0.1 bootstrap migration must not create business tables");
}

const coreMigration = readRequired("prisma/migrations/0002_database_core_materialization/migration.sql");
assertIncludes(coreMigration, [
  "CREATE TABLE `entities`",
  "CREATE TABLE `products`",
  "CREATE TABLE `leads`",
  "CREATE TABLE `seo_metadata`",
  "CREATE TABLE `entity_relations`"
], "0002 database core migration");

const authMigration = readRequired("prisma/migrations/0003_auth_persistence_materialization/migration.sql");
assertIncludes(authMigration, [
  "CREATE TABLE `users`",
  "CREATE TABLE `roles`",
  "CREATE TABLE `permissions`",
  "CREATE TABLE `sessions`",
  "CREATE TABLE `audit_logs`"
], "0003 auth persistence migration");

runPrismaDiff(
  ["--from-empty", "--to-schema=prisma/schema.prisma"],
  "forward migration diff"
);

runPrismaDiff(
  ["--from-schema=prisma/schema.prisma", "--to-empty"],
  "rollback diff"
);

const prismaClient = readRequired("lib/prisma.ts");
for (const token of [
  "../generated/prisma/client",
  "PrismaMariaDb",
  "globalForPrisma",
  "NODE_ENV"
]) {
  if (!prismaClient.includes(token)) {
    fail(`lib/prisma.ts missing ${token}`);
  }
}

const databaseAccess = readRequired("lib/database/access.ts");
for (const token of [
  "withDatabaseConnection",
  "withDatabaseTransaction",
  "DatabaseTransactionClient",
  "getDatabaseClient"
]) {
  if (!databaseAccess.includes(token)) {
    fail(`lib/database/access.ts missing ${token}`);
  }
}

const databaseErrors = readRequired("lib/database/errors.ts");
for (const token of [
  "DatabaseRuntimeError",
  "normalizeDatabaseError",
  "originalError",
  "operation"
]) {
  if (!databaseErrors.includes(token)) {
    fail(`lib/database/errors.ts missing ${token}`);
  }
}

const databaseRepository = readRequired("lib/database/repository.ts");
for (const token of [
  "DatabaseRepository",
  "query<T>",
  "transaction<T>",
  "wrapError"
]) {
  if (!databaseRepository.includes(token)) {
    fail(`lib/database/repository.ts missing ${token}`);
  }
}

const health = readRequired("lib/database-health.ts");
for (const token of [
  "checkDatabaseHealth",
  "$connect",
  "$queryRaw",
  "$disconnect",
  "getDatabaseClient",
  "../generated/prisma/client"
]) {
  if (!health.includes(token)) {
    fail(`lib/database-health.ts missing ${token}`);
  }
}

const databaseHealthScript = readRequired("scripts/database-health-check.ts");
for (const token of ["checkDatabaseHealth", "Database health check passed.", "Database health check failed."]) {
  if (!databaseHealthScript.includes(token)) {
    fail(`scripts/database-health-check.ts missing ${token}`);
  }
}

const transactionSmokeScript = readRequired("scripts/database-transaction-smoke-test.ts");
for (const token of [
  "database transaction smoke test",
  "Database transaction smoke test passed.",
  "Database transaction smoke test failed."
]) {
  if (!transactionSmokeScript.includes(token)) {
    fail(`scripts/database-transaction-smoke-test.ts missing ${token}`);
  }
}

const acceptanceScript = readRequired("scripts/database-acceptance.mjs");
for (const token of [
  "controlled execution preflight is required",
  "--preflight",
  "Structural validation PASS does not equal execution authorization.",
  "db:validate",
  "db:migrate",
  "db:migrate:status",
  "db:health",
  "db:tx-smoke",
  "Database acceptance passed after controlled execution."
]) {
  if (!acceptanceScript.includes(token)) {
    fail(`scripts/database-acceptance.mjs missing ${token}`);
  }
}

const runtimePreflight = readRequired("scripts/runtime-execution-preflight.mjs");
for (const token of [
  "RUNTIME_ENV",
  "TARGET_ID",
  "TARGET_HOST",
  "TARGET_PORT",
  "TARGET_DATABASE",
  "DATABASE_URL_SOURCE",
  "RUNTIME_AUTHORIZATION_RECORD",
  "READY_FOR_CONTROLLED_EXECUTION",
  "override: false",
  "live-validation",
  "controlled-execution"
]) {
  if (!runtimePreflight.includes(token)) {
    fail(`scripts/runtime-execution-preflight.mjs missing ${token}`);
  }
}

for (const scriptPath of [
  "scripts/database-health-check.ts",
  "scripts/database-transaction-smoke-test.ts"
]) {
  const script = readRequired(scriptPath);
  if (script.includes('import "dotenv/config"')) {
    fail(`${scriptPath} must not load dotenv/config unconditionally`);
  }
  assertIncludes(script, ["RUNTIME_ENV", "DATABASE_URL_SOURCE", "override: false"], scriptPath);
}

if (prismaClient.includes('import "dotenv/config"')) {
  fail("lib/prisma.ts must not load dotenv/config unconditionally");
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("Database runtime structural validation passed.");
console.log("Structural validation PASS does not equal execution authorization.");
