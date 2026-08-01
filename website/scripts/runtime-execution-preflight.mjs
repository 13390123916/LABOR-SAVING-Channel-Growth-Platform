import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const Ajv = require("ajv");
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const websiteRoot = path.resolve(scriptDir, "..");
const repositoryRoot = path.resolve(websiteRoot, "..");
const authorizationSchemaPath = path.join(repositoryRoot, "docs/runtime/M4.0.5_RUNTIME_AUTHORIZATION_RECORD.schema.json");
const evidencePackageSchemaPath = path.join(repositoryRoot, "docs/runtime/M4.0.5_RUNTIME_EVIDENCE_PACKAGE.schema.json");
const allowedModes = new Set(["structural", "live-validation", "controlled-execution"]);
const allowedEnvironments = new Set(["local", "staging", "production"]);
const allowedSources = new Set(["local-env", "process", "secret-store"]);
const loopbackHosts = new Set(["localhost", "127.0.0.1", "::1"]);
const allowedCommandsByMode = {
  structural: new Set(["db:validate"]),
  "live-validation": new Set(["db:migrate:status", "db:health", "db:tx-smoke"]),
  "controlled-execution": new Set(["db:migrate", "db:acceptance"])
};

function fail(message) {
  console.error(`Runtime execution preflight failed: ${message}`);
  process.exit(1);
}

function getArgument(name) {
  const prefix = `--${name}=`;
  return process.argv.find((argument) => argument.startsWith(prefix))?.slice(prefix.length);
}

function requireValue(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    fail(`${name} is required.`);
  }
  return value;
}

function validateSecretSafety(content, label) {
  const patterns = [
    /mysql:\/\/[^\s<:]+:[^\s<@]+@/i,
    /(?:MYSQL_PASSWORD|MYSQL_ROOT_PASSWORD)\s*=\s*(?!<|redacted|REDACTED)[^\s"'}]+/i,
    /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i,
    /(?:api[_-]?key|access[_-]?token|secret)\s*[:=]\s*(?!<|redacted|REDACTED)[^\s"'}]+/i
  ];

  for (const pattern of patterns) {
    if (pattern.test(content)) {
      fail(`${label} contains a possible raw secret.`);
    }
  }
}

function isInsideRepository(absolutePath) {
  const relativePath = path.relative(repositoryRoot, absolutePath);
  return relativePath === "" || (!relativePath.startsWith(`..${path.sep}`) && !path.isAbsolute(relativePath));
}

function requireExternalAbsolutePath(value, label) {
  if (!path.isAbsolute(value)) {
    fail(`${label} must be an absolute repository-external path.`);
  }
  const absolutePath = path.resolve(value);
  if (isInsideRepository(absolutePath)) {
    fail(`${label} must remain outside the repository.`);
  }
  if (!existsSync(absolutePath)) {
    fail(`${label} does not identify an existing file.`);
  }
  return absolutePath;
}

function readJsonFile(absolutePath, label) {
  const content = readFileSync(absolutePath, "utf8");
  validateSecretSafety(content, label);
  try {
    return { content, value: JSON.parse(content) };
  } catch {
    fail(`${label} must be valid JSON.`);
  }
}

function compileSchema(schemaPath, label) {
  if (!existsSync(schemaPath)) {
    fail(`${label} schema is missing.`);
  }
  let schema;
  try {
    schema = JSON.parse(readFileSync(schemaPath, "utf8"));
  } catch {
    fail(`${label} schema must be valid JSON.`);
  }
  try {
    return new Ajv({ allErrors: true, jsonPointers: true }).compile(schema);
  } catch (error) {
    fail(`${label} schema compilation failed: ${error.message}`);
  }
}

function validateSchema(validator, value, label) {
  if (!validator(value)) {
    const details = validator.errors
      .map((error) => `${error.dataPath || "/"} ${error.message}`)
      .join("; ");
    fail(`${label} failed JSON Schema validation: ${details}`);
  }
}

function parseTimestamp(value, label) {
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) {
    fail(`${label} must be an ISO-8601 date-time.`);
  }
  return timestamp;
}

function requireFreshComponent(component, expectedStatus, label, now) {
  if (!component) {
    fail(`${label} prerequisite is missing.`);
  }
  if (component.status !== expectedStatus) {
    fail(`${label} prerequisite must be ${expectedStatus}; received ${component.status}.`);
  }
  const recordedAt = parseTimestamp(component.recorded_at, `${label}.recorded_at`);
  const validUntil = parseTimestamp(component.valid_until, `${label}.valid_until`);
  if (recordedAt > now) {
    fail(`${label} prerequisite recording time must not be in the future.`);
  }
  if (validUntil <= now || validUntil <= recordedAt) {
    fail(`${label} prerequisite is expired or has an invalid validity interval.`);
  }
}

async function loadLocalEnvironment(runtimeEnvironment, source) {
  if (process.env.DATABASE_URL) {
    return;
  }

  if (runtimeEnvironment !== "local" || source !== "local-env") {
    fail("staging and production require an explicit process-level DATABASE_URL.");
  }

  const { config } = await import("dotenv");
  config({ path: path.join(websiteRoot, ".env"), override: false, quiet: true });

  if (!process.env.DATABASE_URL) {
    fail("local DATABASE_URL is missing from the process and website/.env.");
  }
}

function validateTargetBinding(runtimeEnvironment) {
  const targetId = requireValue("TARGET_ID");
  const targetHost = requireValue("TARGET_HOST");
  const targetPort = requireValue("TARGET_PORT");
  const targetDatabase = requireValue("TARGET_DATABASE");
  const source = requireValue("DATABASE_URL_SOURCE");

  if (!allowedSources.has(source)) {
    fail("DATABASE_URL_SOURCE must be local-env, process, or secret-store.");
  }
  if (runtimeEnvironment !== "local" && source === "local-env") {
    fail("local-env is allowed only when RUNTIME_ENV=local.");
  }
  if (runtimeEnvironment !== "local" && loopbackHosts.has(targetHost.toLowerCase())) {
    fail("staging and production target bindings must not use localhost or loopback addresses.");
  }

  return { targetId, targetHost, targetPort, targetDatabase, source };
}

function validateDatabaseUrl(binding, runtimeEnvironment) {
  let parsedUrl;
  try {
    parsedUrl = new URL(process.env.DATABASE_URL);
  } catch {
    fail("DATABASE_URL must be a valid URL.");
  }

  const actualPort = parsedUrl.port || "3306";
  const actualDatabase = parsedUrl.pathname.replace(/^\//, "");
  if (
    parsedUrl.hostname.toLowerCase() !== binding.targetHost.toLowerCase() ||
    actualPort !== binding.targetPort ||
    actualDatabase !== binding.targetDatabase
  ) {
    fail("DATABASE_URL does not match the approved target binding.");
  }
  if (runtimeEnvironment !== "local" && loopbackHosts.has(parsedUrl.hostname.toLowerCase())) {
    fail("staging and production DATABASE_URL values must not use localhost or loopback addresses.");
  }
}

function validateEvidencePackage(mode, commandName, runtimeEnvironment, binding) {
  const packageValidator = compileSchema(evidencePackageSchemaPath, "evidence package");
  const authorizationValidator = compileSchema(authorizationSchemaPath, "authorization record");
  const packagePath = requireExternalAbsolutePath(requireValue("RUNTIME_EVIDENCE_PACKAGE"), "RUNTIME_EVIDENCE_PACKAGE");
  const evidencePackage = readJsonFile(packagePath, "evidence package").value;
  validateSchema(packageValidator, evidencePackage, "evidence package");

  const expectedPurpose = mode === "live-validation" ? "live-readonly-validation" : "controlled-migration";
  const expectedDecision = mode === "live-validation" ? "READY_FOR_LIVE_VALIDATION" : "READY_FOR_CONTROLLED_EXECUTION";
  if (evidencePackage.purpose !== expectedPurpose || evidencePackage.package_decision !== expectedDecision) {
    fail(`evidence package must be ${expectedPurpose} with decision ${expectedDecision}.`);
  }

  const now = Date.now();
  const packageCreatedAt = parseTimestamp(evidencePackage.created_at, "evidence package created_at");
  const packageDecisionAt = parseTimestamp(evidencePackage.decision_timestamp, "evidence package decision_timestamp");
  if (packageCreatedAt > packageDecisionAt || packageDecisionAt > now) {
    fail("evidence package timestamps are not chronologically valid.");
  }

  const expectedTarget = {
    runtime_environment: runtimeEnvironment,
    target_id: binding.targetId,
    target_host: binding.targetHost,
    target_port: binding.targetPort,
    target_database: binding.targetDatabase,
    database_url_source: binding.source
  };
  for (const [field, value] of Object.entries(expectedTarget)) {
    if (String(evidencePackage.target_binding[field]) !== value) {
      fail(`evidence package target_binding.${field} does not match the approved target binding.`);
    }
  }

  const components = evidencePackage.components;
  requireFreshComponent(components.authorization, "AUTHORIZED", "authorization", now);
  requireFreshComponent(components.migration_user_provisioning, "COMPLETED", "migration-user provisioning", now);
  requireFreshComponent(components.live_validation, "PASS", "live validation", now);
  if (mode === "controlled-execution") {
    requireFreshComponent(components.backup, "VERIFIED", "backup", now);
    requireFreshComponent(components.rollback, "VERIFIED", "rollback", now);
  }

  const authorizationPath = requireExternalAbsolutePath(components.authorization.reference, "authorization component reference");
  const authorizationFile = readJsonFile(authorizationPath, "authorization record");
  const actualDigest = createHash("sha256").update(authorizationFile.content).digest("hex");
  if (actualDigest.toLowerCase() !== components.authorization.sha256.toLowerCase()) {
    fail("authorization record digest does not match the Evidence Package reference.");
  }

  const authorization = authorizationFile.value;
  validateSchema(authorizationValidator, authorization, "authorization record");
  if (
    authorization.evidence_package_id !== evidencePackage.package_id ||
    authorization.operation_id !== evidencePackage.operation_id ||
    authorization.execution_scope !== expectedPurpose
  ) {
    fail("authorization record does not match the Evidence Package identity or purpose.");
  }
  if (!authorization.approved_commands.includes(commandName)) {
    fail(`authorization record does not approve command ${commandName}.`);
  }

  const expectedAuthorizationDecision = mode === "live-validation"
    ? "READY_FOR_LIVE_VALIDATION"
    : "READY_FOR_CONTROLLED_EXECUTION";
  if (authorization.decision !== expectedAuthorizationDecision) {
    fail(`authorization record must have decision ${expectedAuthorizationDecision}.`);
  }

  const approvalTimestamp = parseTimestamp(authorization.approval_timestamp, "authorization approval_timestamp");
  const approvalExpiry = parseTimestamp(authorization.approval_expiry, "authorization approval_expiry");
  const decisionTimestamp = parseTimestamp(authorization.decision_timestamp, "authorization decision_timestamp");
  const windowStart = parseTimestamp(authorization.maintenance_window.starts_at, "maintenance_window.starts_at");
  const windowEnd = parseTimestamp(authorization.maintenance_window.ends_at, "maintenance_window.ends_at");
  if (approvalTimestamp > decisionTimestamp || approvalExpiry <= now || approvalExpiry <= approvalTimestamp) {
    fail("authorization approval is expired or chronologically invalid.");
  }
  if (windowStart >= windowEnd || now < windowStart || now > windowEnd) {
    fail("current time is outside the approved maintenance window.");
  }

  for (const [field, value] of Object.entries(evidencePackage.target_binding)) {
    if (String(authorization[field]) !== String(value)) {
      fail(`authorization record ${field} does not match the Evidence Package target binding.`);
    }
  }
  if (
    authorization.migration_user_provisioning_component_id !== components.migration_user_provisioning.component_id ||
    authorization.live_validation_component_id !== components.live_validation.component_id
  ) {
    fail("authorization record prerequisite component IDs do not match the Evidence Package.");
  }
  if (mode === "controlled-execution" && (
    authorization.backup_component_id !== components.backup.component_id ||
    authorization.rollback_component_id !== components.rollback.component_id
  )) {
    fail("authorization record backup or rollback component ID does not match the Evidence Package.");
  }
}

function run(command, args, extraEnvironment = {}) {
  const result = spawnSync(command, args, {
    cwd: websiteRoot,
    env: { ...process.env, ...extraEnvironment },
    stdio: "inherit"
  });

  if (result.error) {
    fail(`approved command failed to start: ${result.error.message}`);
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function runApprovedCommand(commandName, mode) {
  if (!allowedCommandsByMode[mode].has(commandName)) {
    fail(`command ${commandName} is not allowed in ${mode} mode.`);
  }

  const npmCli = process.env.npm_execpath;
  if (!npmCli) {
    fail("npm_execpath is required. Run database commands through npm.");
  }

  const commands = {
    "db:validate": ["run", "db:validate"],
    "db:migrate": ["exec", "--", "prisma", "migrate", "deploy"],
    "db:migrate:status": ["exec", "--", "prisma", "migrate", "status"],
    "db:health": ["exec", "--", "tsx", "scripts/database-health-check.ts"],
    "db:tx-smoke": ["exec", "--", "tsx", "scripts/database-transaction-smoke-test.ts"]
  };

  if (commandName === "db:acceptance") {
    run(process.execPath, [path.join(scriptDir, "database-acceptance.mjs")], {
      RUNTIME_PREFLIGHT_PASSED: mode
    });
    return;
  }

  const args = commands[commandName];
  if (!args) {
    fail(`unsupported approved command ${commandName}.`);
  }
  run(process.execPath, [npmCli, ...args]);
}

const mode = getArgument("mode");
const commandName = getArgument("command");
if (!allowedModes.has(mode)) {
  fail("--mode must be structural, live-validation, or controlled-execution.");
}
if (commandName && !allowedCommandsByMode[mode].has(commandName)) {
  fail(`command ${commandName} is not allowed in ${mode} mode.`);
}

if (mode !== "structural") {
  if (!commandName) {
    fail("live validation and controlled execution require an exact command.");
  }
  const runtimeEnvironment = requireValue("RUNTIME_ENV");
  if (!allowedEnvironments.has(runtimeEnvironment)) {
    fail("RUNTIME_ENV must be local, staging, or production.");
  }

  const binding = validateTargetBinding(runtimeEnvironment);
  validateEvidencePackage(mode, commandName, runtimeEnvironment, binding);
  await loadLocalEnvironment(runtimeEnvironment, binding.source);
  validateDatabaseUrl(binding, runtimeEnvironment);
}

console.log(`Runtime execution preflight passed for ${mode}.`);
if (commandName) {
  runApprovedCommand(commandName, mode);
}
