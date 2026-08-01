import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const Ajv = require("ajv");
const scriptPath = fileURLToPath(import.meta.url);
const scriptDir = path.dirname(scriptPath);
const websiteRoot = path.resolve(scriptDir, "..");
const repositoryRoot = path.resolve(websiteRoot, "..");
const authorizationSchemaPath = path.join(repositoryRoot, "docs/runtime/M4.0.5_RUNTIME_AUTHORIZATION_RECORD.schema.json");
const evidencePackageSchemaPath = path.join(repositoryRoot, "docs/runtime/M4.0.5_RUNTIME_EVIDENCE_PACKAGE.schema.json");
const componentSchemaPath = path.join(repositoryRoot, "docs/runtime/M4.0.5_RUNTIME_EVIDENCE_COMPONENT.schema.json");
const allowedModes = new Set(["structural", "live-validation", "controlled-execution"]);
const allowedEnvironments = new Set(["local", "staging", "production"]);
const allowedSources = new Set(["local-env", "process", "secret-store"]);
const loopbackHosts = new Set(["localhost", "127.0.0.1", "::1"]);
const descriptorComponentNames = ["migration_user_provisioning", "backup", "rollback", "live_validation"];
const allowedCommandsByMode = {
  structural: new Set(["db:validate"]),
  "live-validation": new Set(["db:migrate:status", "db:health", "db:tx-smoke"]),
  "controlled-execution": new Set(["db:migrate", "db:acceptance"])
};

export class PreflightValidationError extends Error {}

function fail(message) {
  throw new PreflightValidationError(message);
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

function sha256(content) {
  return createHash("sha256").update(content).digest("hex");
}

function parseTimestamp(value, label) {
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) {
    fail(`${label} must be an ISO-8601 date-time.`);
  }
  return timestamp;
}

function assertSame(actual, expected, label) {
  if (String(actual) !== String(expected)) {
    fail(`${label} does not match its approved binding.`);
  }
}

function assertTargetBinding(actual, expected, label) {
  for (const field of ["runtime_environment", "target_id", "target_host", "target_port", "target_database", "database_url_source", "database_url_fingerprint"]) {
    assertSame(actual[field], expected[field], `${label}.${field}`);
  }
}

function canonicalComponentBindings(components) {
  return descriptorComponentNames
    .filter((name) => components[name])
    .map((name) => {
      const item = components[name];
      return {
        name,
        component_id: item.component_id,
        descriptor_id: item.descriptor_id,
        operation_id: item.operation_id,
        target_id: item.target_id,
        status: item.status,
        reference: item.reference,
        sha256: item.sha256,
        recorded_at: item.recorded_at,
        valid_until: item.valid_until,
        blockers: item.blockers
      };
    });
}

export function calculateComponentSetDigest(components) {
  return sha256(JSON.stringify(canonicalComponentBindings(components)));
}

export function calculateCommandSetDigest(commands) {
  return sha256(JSON.stringify([...commands].sort()));
}

export function calculateTargetBindingDigest(targetBinding) {
  const canonicalTarget = {
    runtime_environment: targetBinding.runtime_environment,
    target_id: targetBinding.target_id,
    target_host: targetBinding.target_host.toLowerCase(),
    target_port: Number(targetBinding.target_port),
    target_database: targetBinding.target_database,
    database_url_source: targetBinding.database_url_source
  };
  return sha256(JSON.stringify(canonicalTarget));
}

function validateManifestConsistency(evidencePackage) {
  const componentIds = Object.values(evidencePackage.components).map((item) => item.component_id);
  if (new Set(componentIds).size !== componentIds.length) {
    fail("evidence package component IDs must be unique.");
  }
  const descriptorIds = descriptorComponentNames
    .map((name) => evidencePackage.components[name]?.descriptor_id)
    .filter(Boolean);
  if (new Set(descriptorIds).size !== descriptorIds.length) {
    fail("evidence package descriptor IDs must be unique.");
  }
  const expectedDigest = calculateComponentSetDigest(evidencePackage.components);
  if (expectedDigest !== evidencePackage.component_set_sha256.toLowerCase()) {
    fail("evidence package component_set_sha256 does not match the immutable component binding set.");
  }
  for (const [name, component] of Object.entries(evidencePackage.components)) {
    assertSame(component.operation_id, evidencePackage.operation_id, `components.${name}.operation_id`);
    assertSame(component.target_id, evidencePackage.target_binding.target_id, `components.${name}.target_id`);
  }
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
  return { recordedAt, validUntil };
}

function readDigestBoundJson(reference, expectedDigest, label) {
  const absolutePath = requireExternalAbsolutePath(reference, `${label} reference`);
  const file = readJsonFile(absolutePath, label);
  if (sha256(file.content) !== expectedDigest.toLowerCase()) {
    fail(`${label} SHA-256 does not match the package binding.`);
  }
  return file.value;
}

function validateDescriptor(componentName, component, evidencePackage, componentValidator, packageTimes, now) {
  const descriptor = readDigestBoundJson(component.reference, component.sha256, `${componentName} descriptor`);
  validateSchema(componentValidator, descriptor, `${componentName} descriptor`);

  assertSame(descriptor.descriptor_id, component.descriptor_id, `${componentName}.descriptor_id`);
  assertSame(descriptor.package_id, evidencePackage.package_id, `${componentName}.package_id`);
  assertSame(descriptor.operation_id, evidencePackage.operation_id, `${componentName}.operation_id`);
  assertSame(descriptor.component_id, component.component_id, `${componentName}.component_id`);
  assertSame(descriptor.component_type, component.component_type, `${componentName}.component_type`);
  assertSame(descriptor.gate_id, component.gate_id, `${componentName}.gate_id`);
  assertSame(descriptor.status, component.status, `${componentName}.status`);
  assertSame(descriptor.recorded_at, component.recorded_at, `${componentName}.recorded_at`);
  assertSame(descriptor.valid_until, component.valid_until, `${componentName}.valid_until`);
  assertTargetBinding(descriptor.target_binding, evidencePackage.target_binding, `${componentName}.target_binding`);

  const recordedAt = parseTimestamp(descriptor.recorded_at, `${componentName}.recorded_at`);
  const transitionedAt = parseTimestamp(descriptor.transition.transitioned_at, `${componentName}.transition.transitioned_at`);
  const validUntil = parseTimestamp(descriptor.valid_until, `${componentName}.valid_until`);
  if (descriptor.transition.from_status !== "BLOCKED" || descriptor.transition.to_status !== descriptor.status) {
    fail(`${componentName} descriptor transition must move from BLOCKED to its current status.`);
  }
  if (recordedAt > transitionedAt || transitionedAt > packageTimes.createdAt || validUntil <= now) {
    fail(`${componentName} descriptor chronology is invalid or expired.`);
  }

  if (componentName === "migration_user_provisioning") {
    assertSame(descriptor.evidence.privilege_manifest.target_database, evidencePackage.target_binding.target_database, "migration-user privilege target_database");
    assertSame(descriptor.evidence.secret_readiness.source, evidencePackage.target_binding.database_url_source, "migration-user secret source");
  }
  if (componentName === "live_validation") {
    assertSame(
      descriptor.evidence.migration_user_component_id,
      evidencePackage.components.migration_user_provisioning.component_id,
      "live-validation migration-user component"
    );
    const expectedScope = evidencePackage.purpose === "live-readonly-validation"
      ? "entry-conditions"
      : "controlled-migration-prerequisite";
    assertSame(descriptor.evidence.validation_scope, expectedScope, "live-validation scope");
  }
  return descriptor;
}

function validateDigestReferences(authorization, evidencePackage, requiredNames) {
  for (const name of requiredNames) {
    const component = evidencePackage.components[name];
    const binding = authorization.component_digest_references[name];
    if (!binding) {
      fail(`authorization component digest reference ${name} is missing.`);
    }
    assertSame(binding.component_id, component.component_id, `authorization ${name}.component_id`);
    assertSame(binding.descriptor_id, component.descriptor_id, `authorization ${name}.descriptor_id`);
    assertSame(binding.sha256.toLowerCase(), component.sha256.toLowerCase(), `authorization ${name}.sha256`);
  }
}

function validateSupersededPackage(reference, evidencePackage, packageValidator, transitionTime) {
  const superseded = readDigestBoundJson(reference.reference, reference.sha256, "superseded package");
  validateSchema(packageValidator, superseded, "superseded package");
  validateManifestConsistency(superseded);
  assertSame(superseded.package_id, reference.package_id, "superseded package_id");
  if (superseded.package_id === evidencePackage.package_id) {
    fail("a package cannot supersede itself.");
  }
  if (superseded.package_decision !== "BLOCKED") {
    fail("superseded package must have decision BLOCKED.");
  }
  assertSame(superseded.operation_id, evidencePackage.operation_id, "superseded operation_id");
  assertSame(superseded.purpose, evidencePackage.purpose, "superseded purpose");
  assertTargetBinding(superseded.target_binding, evidencePackage.target_binding, "superseded target_binding");
  if (parseTimestamp(superseded.decision_timestamp, "superseded decision_timestamp") > transitionTime) {
    fail("superseded package decision must precede the authorization transition.");
  }
}

export function validateEvidencePackage({ packagePath, mode, commandName, runtimeEnvironment, binding, now = Date.now() }) {
  const packageValidator = compileSchema(evidencePackageSchemaPath, "evidence package");
  const authorizationValidator = compileSchema(authorizationSchemaPath, "authorization record");
  const componentValidator = compileSchema(componentSchemaPath, "evidence component descriptor");
  const absolutePackagePath = requireExternalAbsolutePath(packagePath, "RUNTIME_EVIDENCE_PACKAGE");
  const evidencePackage = readJsonFile(absolutePackagePath, "evidence package").value;
  validateSchema(packageValidator, evidencePackage, "evidence package");
  validateManifestConsistency(evidencePackage);

  const expectedPurpose = mode === "live-validation" ? "live-readonly-validation" : "controlled-migration";
  const expectedDecision = mode === "live-validation" ? "READY_FOR_LIVE_VALIDATION" : "READY_FOR_CONTROLLED_EXECUTION";
  if (evidencePackage.purpose !== expectedPurpose || evidencePackage.package_decision !== expectedDecision) {
    fail(`evidence package must be ${expectedPurpose} with decision ${expectedDecision}.`);
  }

  const createdAt = parseTimestamp(evidencePackage.created_at, "evidence package created_at");
  const packageDecisionAt = parseTimestamp(evidencePackage.decision_timestamp, "evidence package decision_timestamp");
  if (createdAt > packageDecisionAt || packageDecisionAt > now) {
    fail("evidence package timestamps are not chronologically valid.");
  }
  const packageTimes = { createdAt, packageDecisionAt };

  const expectedTarget = {
    runtime_environment: runtimeEnvironment,
    target_id: binding.targetId,
    target_host: binding.targetHost,
    target_port: binding.targetPort,
    target_database: binding.targetDatabase,
    database_url_source: binding.source
  };
  expectedTarget.database_url_fingerprint = calculateTargetBindingDigest(expectedTarget);
  assertTargetBinding(evidencePackage.target_binding, expectedTarget, "evidence package target_binding");

  const components = evidencePackage.components;
  requireFreshComponent(components.authorization, "AUTHORIZED", "authorization", now);
  requireFreshComponent(components.migration_user_provisioning, "COMPLETED", "migration-user provisioning", now);
  requireFreshComponent(components.live_validation, "PASS", "live validation", now);
  const requiredDescriptorNames = ["migration_user_provisioning", "live_validation"];
  if (mode === "controlled-execution") {
    requireFreshComponent(components.backup, "VERIFIED", "backup", now);
    requireFreshComponent(components.rollback, "VERIFIED", "rollback", now);
    requiredDescriptorNames.splice(1, 0, "backup", "rollback");
  }
  for (const name of requiredDescriptorNames) {
    validateDescriptor(name, components[name], evidencePackage, componentValidator, packageTimes, now);
  }

  const authorization = readDigestBoundJson(components.authorization.reference, components.authorization.sha256, "authorization record");
  validateSchema(authorizationValidator, authorization, "authorization record");
  assertSame(authorization.record_id, components.authorization.record_id, "authorization record_id");
  assertSame(authorization.evidence_package_id, evidencePackage.package_id, "authorization evidence_package_id");
  assertSame(authorization.operation_id, evidencePackage.operation_id, "authorization operation_id");
  assertSame(authorization.execution_scope, expectedPurpose, "authorization execution_scope");
  assertSame(components.authorization.operation_id, evidencePackage.operation_id, "authorization component operation_id");
  assertSame(components.authorization.target_id, evidencePackage.target_binding.target_id, "authorization component target_id");
  assertTargetBinding(authorization, evidencePackage.target_binding, "authorization target_binding");

  if (!authorization.approved_commands.includes(commandName)) {
    fail(`authorization record does not approve command ${commandName}.`);
  }
  assertSame(authorization.approved_command_binding.mode, mode, "authorization command mode");
  assertSame(
    authorization.approved_command_binding.command_set_sha256.toLowerCase(),
    calculateCommandSetDigest(authorization.approved_commands),
    "authorization command_set_sha256"
  );

  const expectedAuthorizationDecision = mode === "live-validation"
    ? "READY_FOR_LIVE_VALIDATION"
    : "READY_FOR_CONTROLLED_EXECUTION";
  assertSame(authorization.decision, expectedAuthorizationDecision, "authorization decision");
  assertSame(authorization.transition_reference.from_decision, "BLOCKED", "authorization transition from_decision");
  assertSame(authorization.transition_reference.to_decision, expectedAuthorizationDecision, "authorization transition to_decision");
  if (authorization.transition_reference.approver !== authorization.approver) {
    fail("authorization transition approver must match the authorization approver.");
  }
  assertSame(authorization.component_set_sha256.toLowerCase(), evidencePackage.component_set_sha256.toLowerCase(), "authorization component_set_sha256");
  validateDigestReferences(authorization, evidencePackage, requiredDescriptorNames);

  const approvalTimestamp = parseTimestamp(authorization.approval_timestamp, "authorization approval_timestamp");
  const approvalExpiry = parseTimestamp(authorization.approval_expiry, "authorization approval_expiry");
  const transitionTime = parseTimestamp(authorization.transition_reference.transitioned_at, "authorization transition_reference.transitioned_at");
  const decisionTimestamp = parseTimestamp(authorization.decision_timestamp, "authorization decision_timestamp");
  const windowStart = parseTimestamp(authorization.maintenance_window.starts_at, "maintenance_window.starts_at");
  const windowEnd = parseTimestamp(authorization.maintenance_window.ends_at, "maintenance_window.ends_at");
  if (
    approvalTimestamp > transitionTime ||
    transitionTime > decisionTimestamp ||
    decisionTimestamp > createdAt ||
    approvalExpiry <= now ||
    approvalExpiry <= approvalTimestamp ||
    decisionTimestamp > now
  ) {
    fail("authorization approval, transition, decision, package, or expiry chronology is invalid.");
  }
  if (windowStart >= windowEnd || now < windowStart || now > windowEnd) {
    fail("current time is outside the approved maintenance window.");
  }
  assertSame(components.authorization.recorded_at, authorization.decision_timestamp, "authorization component recorded_at");
  assertSame(components.authorization.valid_until, authorization.approval_expiry, "authorization component valid_until");

  if (
    authorization.migration_user_provisioning_component_id !== components.migration_user_provisioning.component_id ||
    authorization.live_validation_component_id !== components.live_validation.component_id
  ) {
    fail("authorization prerequisite component IDs do not match the Evidence Package.");
  }
  if (mode === "controlled-execution" && (
    authorization.backup_component_id !== components.backup.component_id ||
    authorization.rollback_component_id !== components.rollback.component_id
  )) {
    fail("authorization backup or rollback component ID does not match the Evidence Package.");
  }
  validateSupersededPackage(authorization.superseded_package_reference, evidencePackage, packageValidator, transitionTime);
  return evidencePackage;
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
    fail(`approved command exited with status ${result.status ?? 1}.`);
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
    run(process.execPath, [path.join(scriptDir, "database-acceptance.mjs")], { RUNTIME_PREFLIGHT_PASSED: mode });
    return;
  }
  const args = commands[commandName];
  if (!args) {
    fail(`unsupported approved command ${commandName}.`);
  }
  run(process.execPath, [npmCli, ...args]);
}

async function main() {
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
    validateEvidencePackage({
      packagePath: requireValue("RUNTIME_EVIDENCE_PACKAGE"),
      mode,
      commandName,
      runtimeEnvironment,
      binding
    });
    await loadLocalEnvironment(runtimeEnvironment, binding.source);
    validateDatabaseUrl(binding, runtimeEnvironment);
  }
  console.log(`Runtime execution preflight passed for ${mode}.`);
  if (commandName) {
    runApprovedCommand(commandName, mode);
  }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]).toLowerCase() === path.resolve(scriptPath).toLowerCase();
if (isMain) {
  main().catch((error) => {
    console.error(`Runtime execution preflight failed: ${error.message}`);
    process.exitCode = 1;
  });
}
