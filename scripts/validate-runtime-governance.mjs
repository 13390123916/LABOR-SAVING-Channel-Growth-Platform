import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const root = process.cwd();
const require = createRequire(path.join(root, "website/package.json"));
const Ajv = require("ajv");
const governancePath = "docs/runtime/M4.0.5_RUNTIME_ENVIRONMENT_GOVERNANCE.md";
const boundaryPath = "docs/runtime/M4.0.5_RUNTIME_EVIDENCE_PACKAGE.md";
const recordPath = "docs/runtime/M4.0.5_RUNTIME_AUTHORIZATION_RECORD_TEMPLATE.md";
const authorizationSchemaPath = "docs/runtime/M4.0.5_RUNTIME_AUTHORIZATION_RECORD.schema.json";
const evidencePackageSchemaPath = "docs/runtime/M4.0.5_RUNTIME_EVIDENCE_PACKAGE.schema.json";
const preflightPath = "website/scripts/runtime-execution-preflight.mjs";
const packagePath = "website/package.json";
const localBoundaryPaths = [
  "website/scripts/database-health-check.ts",
  "website/scripts/database-transaction-smoke-test.ts",
  "website/lib/prisma.ts"
];
let failed = false;

function fail(message) {
  console.error(`Runtime governance validation failed: ${message}`);
  failed = true;
}

function readRequired(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!existsSync(absolutePath)) {
    fail(`missing ${relativePath}`);
    return "";
  }

  return readFileSync(absolutePath, "utf8");
}

function requireTokens(content, tokens, label) {
  for (const token of tokens) {
    if (!content.includes(token)) {
      fail(`${label} missing "${token}"`);
    }
  }
}

function parseSchema(content, label) {
  try {
    return JSON.parse(content);
  } catch (error) {
    fail(`${label} must be valid JSON: ${error.message}`);
    return null;
  }
}

function compileSchema(schema, label) {
  if (!schema) {
    return null;
  }
  try {
    return new Ajv({ allErrors: true, jsonPointers: true }).compile(schema);
  } catch (error) {
    fail(`${label} compilation failed: ${error.message}`);
    return null;
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function validateSyntheticEvidence(authorizationValidator, packageValidator) {
  if (!authorizationValidator || !packageValidator) {
    return;
  }

  const now = Date.now();
  const past = new Date(now - 60 * 60 * 1000).toISOString();
  const future = new Date(now + 60 * 60 * 1000).toISOString();
  const hash = "a".repeat(64);
  const target = {
    runtime_environment: "staging",
    target_id: "synthetic-target",
    target_host: "db.internal.example",
    target_port: 3306,
    target_database: "synthetic_database",
    database_url_source: "secret-store",
    database_url_fingerprint: "sha256:synthetic-target"
  };
  const component = (componentId, componentType, gateId, status) => ({
    component_id: componentId,
    component_type: componentType,
    gate_id: gateId,
    status,
    reference: `external://${componentId}`,
    sha256: hash,
    recorded_at: past,
    valid_until: future
  });

  const syntheticAuthorization = {
    record_id: "synthetic-authorization",
    evidence_package_id: "synthetic-package",
    operation_id: "synthetic-operation",
    milestone: "M4.0.5",
    execution_scope: "controlled-migration",
    approved_commands: ["db:migrate"],
    ...target,
    migration_set: ["synthetic-migration"],
    operator: "Synthetic Operator",
    approver: "Synthetic Approver",
    approval_reference: "external://synthetic-approval",
    authorized_release_owner: "Synthetic Release Owner",
    approval_timestamp: past,
    approval_expiry: future,
    maintenance_window: { starts_at: past, ends_at: future },
    migration_user_provisioning_component_id: "provisioning",
    backup_component_id: "backup",
    rollback_component_id: "rollback",
    live_validation_component_id: "live-validation",
    failure_stop_conditions: ["stop on any mismatch"],
    decision: "READY_FOR_CONTROLLED_EXECUTION",
    decision_timestamp: past
  };
  const syntheticPassPackage = {
    package_id: "synthetic-package",
    package_version: 1,
    operation_id: "synthetic-operation",
    milestone: "M4.0.5.6",
    purpose: "controlled-migration",
    created_at: past,
    target_binding: target,
    components: {
      authorization: component("authorization", "authorization", "M4.0.5", "AUTHORIZED"),
      migration_user_provisioning: component("provisioning", "migration-user-provisioning", "M4.0.4.4.6.10", "COMPLETED"),
      backup: component("backup", "backup", "synthetic-backup-gate", "VERIFIED"),
      rollback: component("rollback", "rollback", "synthetic-rollback-gate", "VERIFIED"),
      live_validation: component("live-validation", "live-validation", "synthetic-live-gate", "PASS")
    },
    package_decision: "READY_FOR_CONTROLLED_EXECUTION",
    decision_timestamp: past
  };

  if (!authorizationValidator(syntheticAuthorization)) {
    fail(`synthetic PASS authorization must satisfy schema: ${JSON.stringify(authorizationValidator.errors)}`);
  }
  if (!packageValidator(syntheticPassPackage)) {
    fail(`synthetic PASS package must satisfy schema: ${JSON.stringify(packageValidator.errors)}`);
  }

  const expectedStatuses = {
    authorization: "AUTHORIZED",
    migration_user_provisioning: "COMPLETED",
    backup: "VERIFIED",
    rollback: "VERIFIED",
    live_validation: "PASS"
  };
  const isReady = (evidencePackage) => evidencePackage.package_decision === "READY_FOR_CONTROLLED_EXECUTION"
    && Object.entries(expectedStatuses).every(([name, status]) => {
      const item = evidencePackage.components[name];
      return item?.status === status && Date.parse(item.recorded_at) <= now && Date.parse(item.valid_until) > now;
    });

  if (!isReady(syntheticPassPackage)) {
    fail("synthetic PASS package must pass readiness evaluation");
  }

  const syntheticBlockedPackage = clone(syntheticPassPackage);
  syntheticBlockedPackage.package_decision = "BLOCKED";
  syntheticBlockedPackage.components.migration_user_provisioning = {
    component_id: "provisioning",
    component_type: "migration-user-provisioning",
    gate_id: "M4.0.4.4.6.10",
    status: "BLOCKED",
    blockers: ["synthetic missing authorization"]
  };
  if (!packageValidator(syntheticBlockedPackage)) {
    fail(`synthetic BLOCKED package must remain structurally valid: ${JSON.stringify(packageValidator.errors)}`);
  }
  if (isReady(syntheticBlockedPackage)) {
    fail("synthetic BLOCKED package must fail readiness evaluation");
  }

  const syntheticExpiredPackage = clone(syntheticPassPackage);
  syntheticExpiredPackage.components.backup.valid_until = past;
  if (!packageValidator(syntheticExpiredPackage)) {
    fail(`synthetic expired package must remain structurally valid: ${JSON.stringify(packageValidator.errors)}`);
  }
  if (isReady(syntheticExpiredPackage)) {
    fail("synthetic expired package must fail readiness evaluation");
  }

  const syntheticMissingPackage = clone(syntheticPassPackage);
  delete syntheticMissingPackage.components.rollback;
  if (packageValidator(syntheticMissingPackage)) {
    fail("synthetic package with a missing controlled prerequisite must fail schema validation");
  }
}

const governance = readRequired(governancePath);
const boundary = readRequired(boundaryPath);
const record = readRequired(recordPath);
const authorizationSchemaContent = readRequired(authorizationSchemaPath);
const evidencePackageSchemaContent = readRequired(evidencePackageSchemaPath);
const preflight = readRequired(preflightPath);
const packageJson = readRequired(packagePath);

requireTokens(
  governance,
  [
    "RUNTIME_ENV",
    "target_id",
    "target_host",
    "target_port",
    "target_database",
    "DATABASE_URL_SOURCE",
    "local",
    "staging",
    "production",
    "localhost",
    "127.0.0.1",
    "process-level `DATABASE_URL`",
    "Structural validation PASS is not execution authorization"
  ],
  governancePath
);

requireTokens(
  boundary,
  [
    "RUNTIME_EVIDENCE_PACKAGE",
    "repository-external",
    "M4.0.4.4.6.10",
    "migration_user_provisioning",
    "backup",
    "rollback",
    "live_validation",
    "BLOCKED / NOT AUTHORIZED",
    "No real package or authorization instance"
  ],
  boundaryPath
);

requireTokens(
  authorizationSchemaContent,
  [
    '"$schema": "http://json-schema.org/draft-07/schema#"',
    '"evidence_package_id"',
    '"operation_id"',
    '"approved_commands"',
    '"approver"',
    '"maintenance_window"',
    '"migration_user_provisioning_component_id"',
    "READY_FOR_LIVE_VALIDATION",
    "READY_FOR_CONTROLLED_EXECUTION"
  ],
  authorizationSchemaPath
);

requireTokens(
  evidencePackageSchemaContent,
  [
    '"package_id"',
    '"package_version"',
    '"authorization"',
    '"migration_user_provisioning"',
    '"backup"',
    '"rollback"',
    '"live_validation"',
    '"valid_until"',
    '"M4.0.4.4.6.10"'
  ],
  evidencePackageSchemaPath
);

requireTokens(
  preflight,
  [
    "structural",
    "live-validation",
    "controlled-execution",
    "RUNTIME_ENV",
    "TARGET_ID",
    "TARGET_HOST",
    "TARGET_PORT",
    "TARGET_DATABASE",
    "DATABASE_URL_SOURCE",
    "RUNTIME_EVIDENCE_PACKAGE",
    "compileSchema",
    "requireFreshComponent",
    "READY_FOR_LIVE_VALIDATION",
    "READY_FOR_CONTROLLED_EXECUTION",
    "override: false",
    "allowedCommandsByMode"
  ],
  preflightPath
);

for (const command of ["db:migrate", "db:migrate:status", "db:health", "db:tx-smoke", "db:acceptance"]) {
  const routePattern = new RegExp(`"${command.replaceAll(":", "\\:")}"\\s*:\\s*"[^"]*runtime-execution-preflight\\.mjs`);
  if (!routePattern.test(packageJson)) {
    fail(`${packagePath} command ${command} must route through runtime-execution-preflight.mjs`);
  }
}

for (const relativePath of localBoundaryPaths) {
  const content = readRequired(relativePath);
  if (content.includes('import "dotenv/config"')) {
    fail(`${relativePath} must not load dotenv/config unconditionally`);
  }
}

for (const relativePath of localBoundaryPaths.slice(0, 2)) {
  const content = readRequired(relativePath);
  requireTokens(content, ["RUNTIME_ENV", "DATABASE_URL_SOURCE", "local-env", "override: false"], relativePath);
}

requireTokens(
  record,
  [
    "evidence_package_id",
    "operation_id",
    "approved_commands",
    "approver",
    "maintenance_window",
    "migration_user_provisioning_component_id",
    "backup_component_id",
    "rollback_component_id",
    "live_validation_component_id",
    "BLOCKED",
    "READY_FOR_LIVE_VALIDATION",
    "READY_FOR_CONTROLLED_EXECUTION",
    "EXECUTED"
  ],
  recordPath
);

const authorizationSchema = parseSchema(authorizationSchemaContent, authorizationSchemaPath);
const evidencePackageSchema = parseSchema(evidencePackageSchemaContent, evidencePackageSchemaPath);
const authorizationValidator = compileSchema(authorizationSchema, authorizationSchemaPath);
const packageValidator = compileSchema(evidencePackageSchema, evidencePackageSchemaPath);
validateSyntheticEvidence(authorizationValidator, packageValidator);

const secretPatterns = [
  /mysql:\/\/[^\s<:]+:[^\s<@]+@/i,
  /(?:MYSQL_PASSWORD|MYSQL_ROOT_PASSWORD)\s*=\s*(?!<|redacted|REDACTED)[^\s`]+/i,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i,
  /(?:api[_-]?key|access[_-]?token|secret)\s*[:=]\s*(?!<|redacted|REDACTED)[^\s`]+/i
];

for (const [label, content] of [[governancePath, governance], [boundaryPath, boundary], [recordPath, record]]) {
  for (const pattern of secretPatterns) {
    if (pattern.test(content)) {
      fail(`${label} contains a possible raw secret`);
    }
  }
}

if (failed) {
  process.exitCode = 1;
} else {
  console.log("Runtime governance validation passed with synthetic PASS/BLOCKED/expired/missing-prerequisite evidence.");
}
