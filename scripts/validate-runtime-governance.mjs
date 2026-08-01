import { mkdtempSync, rmSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { createRequire } from "node:module";
import path from "node:path";
import {
  calculateCommandSetDigest,
  calculateComponentSetDigest,
  calculateTargetBindingDigest,
  PreflightValidationError,
  validateEvidencePackage
} from "../website/scripts/runtime-execution-preflight.mjs";

const root = process.cwd();
const require = createRequire(path.join(root, "website/package.json"));
const Ajv = require("ajv");
const governancePath = "docs/runtime/M4.0.5_RUNTIME_ENVIRONMENT_GOVERNANCE.md";
const boundaryPath = "docs/runtime/M4.0.5_RUNTIME_EVIDENCE_PACKAGE.md";
const recordPath = "docs/runtime/M4.0.5_RUNTIME_AUTHORIZATION_RECORD_TEMPLATE.md";
const authorizationSchemaPath = "docs/runtime/M4.0.5_RUNTIME_AUTHORIZATION_RECORD.schema.json";
const evidencePackageSchemaPath = "docs/runtime/M4.0.5_RUNTIME_EVIDENCE_PACKAGE.schema.json";
const componentSchemaPath = "docs/runtime/M4.0.5_RUNTIME_EVIDENCE_COMPONENT.schema.json";
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

function writeJson(filePath, value) {
  const content = `${JSON.stringify(value, null, 2)}\n`;
  writeFileSync(filePath, content, "utf8");
  return content;
}

function sha256(content) {
  const { createHash } = require("node:crypto");
  return createHash("sha256").update(content).digest("hex");
}

function createSyntheticFixture(basePath, suffix, mutate = {}) {
  const now = Date.now();
  const timestamp = (offsetMinutes) => new Date(now + offsetMinutes * 60 * 1000).toISOString();
  const packageId = `synthetic-package-${suffix}`;
  const blockedPackageId = `synthetic-blocked-package-${suffix}`;
  const operationId = `synthetic-operation-${suffix}`;
  const target = {
    runtime_environment: "staging",
    target_id: `synthetic-target-${suffix}`,
    target_host: "db.internal.example",
    target_port: 3306,
    target_database: "synthetic_database",
    database_url_source: "secret-store"
  };
  target.database_url_fingerprint = calculateTargetBindingDigest(target);
  const recordedAt = timestamp(-180);
  const transitionedAt = timestamp(-120);
  const authorizationDecisionAt = timestamp(-90);
  const packageCreatedAt = timestamp(-60);
  const packageDecisionAt = timestamp(-30);
  const validUntil = timestamp(120);

  const descriptorEvidence = {
    migration_user_provisioning: {
      identity: { username: "synthetic_migration_user", purpose: "migration" },
      host_authorization: {
        approved_account_rows: ["synthetic_migration_user@127.0.0.1"],
        approval_reference: "external://synthetic-host-approval"
      },
      plugin_compatibility: {
        plugin: "caching_sha2_password",
        status: "VERIFIED",
        reference: "external://synthetic-plugin-verification"
      },
      privilege_manifest: {
        target_database: target.target_database,
        privileges: ["SYNTHETIC_MIGRATION_PRIVILEGE"],
        approval_reference: "external://synthetic-privilege-approval"
      },
      secret_readiness: {
        status: "READY",
        source: target.database_url_source,
        reference: "external://synthetic-secret-readiness"
      },
      approver: "Synthetic Provisioning Approver",
      post_validation_reference: "external://synthetic-post-validation"
    },
    backup: {
      artifact_id: "synthetic-backup",
      storage_reference: "external://synthetic-backup-storage",
      retention_reference: "external://synthetic-retention",
      artifact_size_bytes: 1,
      artifact_sha256: "b".repeat(64),
      verified_at: recordedAt,
      owner: "Synthetic Backup Owner"
    },
    rollback: {
      authority: "Synthetic Rollback Authority",
      runbook_reference: "external://synthetic-runbook",
      partial_failure_reference: "external://synthetic-partial-failure",
      restore_validation_reference: "external://synthetic-restore-validation",
      stop_conditions: ["synthetic stop condition"],
      owner: "Synthetic Rollback Owner"
    },
    live_validation: {
      validation_scope: "controlled-migration-prerequisite",
      migration_user_component_id: "provisioning",
      checks: [{ check: "synthetic precondition", status: "PASS", reference: "external://synthetic-check" }],
      result_reference: "external://synthetic-live-result"
    }
  };
  const descriptorConfig = {
    migration_user_provisioning: ["provisioning", "migration-user-provisioning", "M4.0.4.4.6.10", "COMPLETED"],
    backup: ["backup", "backup", "synthetic-backup-gate", "VERIFIED"],
    rollback: ["rollback", "rollback", "synthetic-rollback-gate", "VERIFIED"],
    live_validation: ["live-validation", "live-validation", "synthetic-live-gate", "PASS"]
  };
  const components = {};

  for (const [name, [componentId, componentType, gateId, status]] of Object.entries(descriptorConfig)) {
    const descriptor = {
      descriptor_id: `${componentId}-descriptor-${suffix}`,
      descriptor_version: 1,
      package_id: packageId,
      operation_id: operationId,
      component_id: componentId,
      component_type: componentType,
      gate_id: gateId,
      status,
      target_binding: clone(target),
      recorded_at: recordedAt,
      valid_until: validUntil,
      transition: {
        from_status: "BLOCKED",
        to_status: status,
        transitioned_at: transitionedAt,
        approver: `Synthetic ${componentId} Approver`,
        reference: `external://synthetic-${componentId}-transition`
      },
      evidence: clone(descriptorEvidence[name])
    };
    mutate.descriptor?.(name, descriptor, { packageCreatedAt, packageDecisionAt });
    const descriptorPath = path.join(basePath, `${suffix}-${name}.json`);
    const descriptorContent = writeJson(descriptorPath, descriptor);
    components[name] = {
      component_id: componentId,
      component_type: componentType,
      gate_id: gateId,
      status,
      operation_id: operationId,
      target_id: target.target_id,
      descriptor_id: descriptor.descriptor_id,
      reference: descriptorPath,
      sha256: sha256(descriptorContent),
      recorded_at: descriptor.recorded_at,
      valid_until: descriptor.valid_until
    };
  }
  mutate.component?.(components);

  const blockedComponent = (componentId, componentType, gateId) => ({
    component_id: componentId,
    component_type: componentType,
    gate_id: gateId,
    status: "BLOCKED",
    operation_id: operationId,
    target_id: target.target_id,
    blockers: ["synthetic blocked prerequisite"]
  });
  const blockedPackage = {
    package_id: blockedPackageId,
    package_version: 2,
    operation_id: operationId,
    milestone: "M4.0.5.7",
    purpose: "controlled-migration",
    created_at: timestamp(-300),
    target_binding: clone(target),
    components: {
      authorization: blockedComponent("authorization", "authorization", "M4.0.5"),
      migration_user_provisioning: blockedComponent("provisioning", "migration-user-provisioning", "M4.0.4.4.6.10"),
      backup: blockedComponent("backup", "backup", "synthetic-backup-gate"),
      rollback: blockedComponent("rollback", "rollback", "synthetic-rollback-gate"),
      live_validation: blockedComponent("live-validation", "live-validation", "synthetic-live-gate")
    },
    component_set_sha256: "",
    package_decision: "BLOCKED",
    decision_timestamp: timestamp(-240)
  };
  blockedPackage.component_set_sha256 = calculateComponentSetDigest(blockedPackage.components);
  mutate.supersededPackage?.(blockedPackage);
  const blockedPackagePath = path.join(basePath, `${suffix}-blocked-package.json`);
  const blockedPackageContent = writeJson(blockedPackagePath, blockedPackage);

  const componentDigestReferences = Object.fromEntries(
    Object.entries(components).map(([name, item]) => [name, {
      component_id: item.component_id,
      descriptor_id: item.descriptor_id,
      sha256: item.sha256
    }])
  );
  const componentSetDigest = calculateComponentSetDigest(components);
  const authorization = {
    record_id: `synthetic-authorization-${suffix}`,
    record_version: 2,
    evidence_package_id: packageId,
    operation_id: operationId,
    milestone: "M4.0.5",
    execution_scope: "controlled-migration",
    approved_commands: ["db:migrate"],
    approved_command_binding: {
      mode: "controlled-execution",
      command_set_sha256: calculateCommandSetDigest(["db:migrate"]),
      reference: "external://synthetic-command-approval"
    },
    ...clone(target),
    migration_set: ["synthetic-migration"],
    operator: "Synthetic Operator",
    approver: "Synthetic Authorization Approver",
    approval_reference: "external://synthetic-approval",
    authorized_release_owner: "Synthetic Release Owner",
    approval_timestamp: timestamp(-150),
    approval_expiry: validUntil,
    maintenance_window: { starts_at: timestamp(-120), ends_at: validUntil },
    migration_user_provisioning_component_id: "provisioning",
    backup_component_id: "backup",
    rollback_component_id: "rollback",
    live_validation_component_id: "live-validation",
    component_set_sha256: componentSetDigest,
    component_digest_references: componentDigestReferences,
    transition_reference: {
      from_decision: "BLOCKED",
      to_decision: "READY_FOR_CONTROLLED_EXECUTION",
      transitioned_at: transitionedAt,
      approver: "Synthetic Authorization Approver",
      reference: "external://synthetic-authorization-transition"
    },
    superseded_package_reference: {
      package_id: blockedPackageId,
      reference: blockedPackagePath,
      sha256: sha256(blockedPackageContent)
    },
    failure_stop_conditions: ["stop on any synthetic mismatch"],
    decision: "READY_FOR_CONTROLLED_EXECUTION",
    decision_timestamp: authorizationDecisionAt
  };
  mutate.authorization?.(authorization, { packageCreatedAt, packageDecisionAt });
  const authorizationPath = path.join(basePath, `${suffix}-authorization.json`);
  const authorizationContent = writeJson(authorizationPath, authorization);
  const authorizationComponent = {
    component_id: "authorization",
    component_type: "authorization",
    gate_id: "M4.0.5",
    status: "AUTHORIZED",
    operation_id: operationId,
    target_id: target.target_id,
    record_id: authorization.record_id,
    reference: authorizationPath,
    sha256: sha256(authorizationContent),
    recorded_at: authorization.decision_timestamp,
    valid_until: authorization.approval_expiry
  };
  mutate.authorizationComponent?.(authorizationComponent);

  const evidencePackage = {
    package_id: packageId,
    package_version: 2,
    operation_id: operationId,
    milestone: "M4.0.5.7",
    purpose: "controlled-migration",
    created_at: packageCreatedAt,
    target_binding: clone(target),
    components: { authorization: authorizationComponent, ...components },
    component_set_sha256: componentSetDigest,
    package_decision: "READY_FOR_CONTROLLED_EXECUTION",
    decision_timestamp: packageDecisionAt
  };
  mutate.package?.(evidencePackage);
  const packageFilePath = path.join(basePath, `${suffix}-package.json`);
  writeJson(packageFilePath, evidencePackage);
  return {
    packagePath: packageFilePath,
    blockedPackagePath,
    now,
    runtimeEnvironment: target.runtime_environment,
    binding: {
      targetId: target.target_id,
      targetHost: target.target_host,
      targetPort: String(target.target_port),
      targetDatabase: target.target_database,
      source: target.database_url_source
    }
  };
}

function validateSyntheticEvidence(authorizationValidator, packageValidator, componentValidator) {
  if (!authorizationValidator || !packageValidator || !componentValidator) {
    return;
  }
  const temporaryRoot = mkdtempSync(path.join(tmpdir(), "m4057-evidence-"));
  const run = (fixture, commandName = "db:migrate") => validateEvidencePackage({
    packagePath: fixture.packagePath,
    mode: "controlled-execution",
    commandName,
    runtimeEnvironment: fixture.runtimeEnvironment,
    binding: fixture.binding,
    now: fixture.now
  });
  const expectFailure = (label, fixture, commandName) => {
    try {
      run(fixture, commandName);
      fail(`synthetic FAIL case ${label} unexpectedly passed`);
    } catch (error) {
      if (!(error instanceof PreflightValidationError)) {
        throw error;
      }
    }
  };

  try {
    const passFixture = createSyntheticFixture(temporaryRoot, "pass");
    run(passFixture);

    expectFailure("BLOCKED package", {
      ...passFixture,
      packagePath: passFixture.blockedPackagePath
    });
    expectFailure("component digest mismatch", createSyntheticFixture(temporaryRoot, "digest", {
      component: (components) => { components.backup.sha256 = "c".repeat(64); }
    }));
    expectFailure("descriptor target mismatch", createSyntheticFixture(temporaryRoot, "target", {
      descriptor: (name, descriptor) => {
        if (name === "backup") descriptor.target_binding.target_id = "wrong-target";
      }
    }));
    expectFailure("component operation mismatch", createSyntheticFixture(temporaryRoot, "operation", {
      component: (components) => { components.rollback.operation_id = "wrong-operation"; }
    }));
    expectFailure("authorization record identity mismatch", createSyntheticFixture(temporaryRoot, "record", {
      authorizationComponent: (component) => { component.record_id = "wrong-record"; }
    }));
    expectFailure("descriptor chronology", createSyntheticFixture(temporaryRoot, "chronology", {
      descriptor: (name, descriptor, times) => {
        if (name === "backup") descriptor.transition.transitioned_at = times.packageDecisionAt;
      }
    }));
    expectFailure("descriptor transition", createSyntheticFixture(temporaryRoot, "transition", {
      descriptor: (name, descriptor) => {
        if (name === "rollback") descriptor.transition.from_status = "VERIFIED";
      }
    }));
    expectFailure("repository-internal descriptor reference", createSyntheticFixture(temporaryRoot, "internal", {
      component: (components) => {
        components.backup.reference = path.join(root, componentSchemaPath);
      }
    }));
    expectFailure("missing descriptor reference", createSyntheticFixture(temporaryRoot, "missing", {
      component: (components) => {
        components.backup.reference = path.join(temporaryRoot, "missing-descriptor.json");
      }
    }));
    expectFailure("incomplete provisioning descriptor", createSyntheticFixture(temporaryRoot, "provisioning", {
      descriptor: (name, descriptor) => {
        if (name === "migration_user_provisioning") delete descriptor.evidence.post_validation_reference;
      }
    }));
    expectFailure("invalid superseded package transition", createSyntheticFixture(temporaryRoot, "superseded", {
      supersededPackage: (evidencePackage) => { evidencePackage.package_decision = "READY_FOR_CONTROLLED_EXECUTION"; }
    }));
    expectFailure("future authorization decision", createSyntheticFixture(temporaryRoot, "future", {
      authorization: (authorization) => { authorization.decision_timestamp = new Date(Date.now() + 60 * 60 * 1000).toISOString(); }
    }));
    expectFailure("command mismatch", passFixture, "db:acceptance");

    const passPackage = JSON.parse(readFileSync(passFixture.packagePath, "utf8"));
    const passAuthorization = JSON.parse(readFileSync(passPackage.components.authorization.reference, "utf8"));
    const passDescriptor = JSON.parse(readFileSync(passPackage.components.backup.reference, "utf8"));
    if (!packageValidator(passPackage) || !authorizationValidator(passAuthorization) || !componentValidator(passDescriptor)) {
      fail("synthetic PASS artifacts must independently satisfy all schemas");
    }
  } finally {
    rmSync(temporaryRoot, { recursive: true, force: true });
  }
}

const governance = readRequired(governancePath);
const boundary = readRequired(boundaryPath);
const record = readRequired(recordPath);
const authorizationSchemaContent = readRequired(authorizationSchemaPath);
const evidencePackageSchemaContent = readRequired(evidencePackageSchemaPath);
const componentSchemaContent = readRequired(componentSchemaPath);
const preflight = readRequired(preflightPath);
const packageJson = readRequired(packagePath);

requireTokens(governance, [
  "RUNTIME_ENV", "target_id", "target_host", "target_port", "target_database", "DATABASE_URL_SOURCE",
  "local", "staging", "production", "localhost", "127.0.0.1", "process-level `DATABASE_URL`",
  "Structural validation PASS is not execution authorization"
], governancePath);

requireTokens(boundary, [
  "RUNTIME_EVIDENCE_PACKAGE", "repository-external", "M4.0.4.4.6.10", "migration_user_provisioning",
  "backup", "rollback", "live_validation", "BLOCKED / NOT AUTHORIZED", "No real package or authorization instance"
], boundaryPath);

requireTokens(authorizationSchemaContent, [
  '"record_version"', '"const": 2', '"approved_command_binding"', '"component_set_sha256"', '"component_digest_references"',
  '"transition_reference"', '"superseded_package_reference"', "READY_FOR_CONTROLLED_EXECUTION"
], authorizationSchemaPath);

requireTokens(evidencePackageSchemaContent, [
  '"package_id"', '"package_version"', '"const": 2', '"component_set_sha256"', '"descriptor_id"', '"operation_id"', '"target_id"',
  '"migration_user_provisioning"', '"backup"', '"rollback"', '"live_validation"'
], evidencePackageSchemaPath);

requireTokens(componentSchemaContent, [
  '"descriptor_id"', '"target_binding"', '"transition"', '"identity"', '"host_authorization"',
  '"plugin_compatibility"', '"privilege_manifest"', '"secret_readiness"', '"post_validation_reference"'
], componentSchemaPath);

requireTokens(preflight, [
  "componentSchemaPath", "validateEvidencePackage", "readDigestBoundJson", "validateDescriptor",
  "calculateComponentSetDigest", "calculateCommandSetDigest", "validateSupersededPackage",
  "RUNTIME_EVIDENCE_PACKAGE", "calculateTargetBindingDigest", "allowedCommandsByMode"
], preflightPath);

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

requireTokens(record, [
  "approved_command_binding", "component_set_sha256", "component_digest_references", "transition_reference",
  "superseded_package_reference", "migration_user_provisioning_component_id", "BLOCKED",
  "READY_FOR_LIVE_VALIDATION", "READY_FOR_CONTROLLED_EXECUTION"
], recordPath);

const authorizationValidator = compileSchema(parseSchema(authorizationSchemaContent, authorizationSchemaPath), authorizationSchemaPath);
const packageValidator = compileSchema(parseSchema(evidencePackageSchemaContent, evidencePackageSchemaPath), evidencePackageSchemaPath);
const componentValidator = compileSchema(parseSchema(componentSchemaContent, componentSchemaPath), componentSchemaPath);
validateSyntheticEvidence(authorizationValidator, packageValidator, componentValidator);

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
  console.log("Runtime governance validation passed with synthetic evidence closure coverage.");
}
