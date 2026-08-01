import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const websiteRoot = path.resolve(scriptDir, "..");
const repositoryRoot = path.resolve(websiteRoot, "..");
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

function requireEvidenceValue(record, name) {
  const value = record[name];
  if (value === undefined || value === null || value === "" || /^<.*>$/.test(String(value))) {
    fail(`authorization evidence field ${name} is required.`);
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

function loadAuthorizationEvidence(mode, runtimeEnvironment, binding) {
  const recordPath = requireValue("RUNTIME_AUTHORIZATION_RECORD");
  const absolutePath = path.resolve(repositoryRoot, recordPath);
  if (!existsSync(absolutePath)) {
    fail("RUNTIME_AUTHORIZATION_RECORD does not identify an existing evidence file.");
  }

  const content = readFileSync(absolutePath, "utf8");
  validateSecretSafety(content, "authorization evidence");

  let record;
  try {
    record = JSON.parse(content);
  } catch {
    fail("authorization evidence must be valid JSON.");
  }

  for (const field of ["execution_scope", "runtime_environment", "target_id", "target_host", "target_port", "target_database", "database_url_source", "operator", "approval_reference", "decision"]) {
    requireEvidenceValue(record, field);
  }

  const expected = {
    runtime_environment: runtimeEnvironment,
    target_id: binding.targetId,
    target_host: binding.targetHost,
    target_port: binding.targetPort,
    target_database: binding.targetDatabase,
    database_url_source: binding.source
  };
  for (const [field, value] of Object.entries(expected)) {
    if (String(record[field]) !== value) {
      fail(`authorization evidence ${field} does not match the approved target binding.`);
    }
  }

  if (mode === "live-validation") {
    if (record.execution_scope !== "live-readonly-validation" && record.execution_scope !== "controlled-migration") {
      fail("live validation requires live-readonly-validation or controlled-migration evidence scope.");
    }
    return;
  }

  if (record.execution_scope !== "controlled-migration") {
    fail("controlled execution requires controlled-migration evidence scope.");
  }
  if (record.decision !== "READY_FOR_CONTROLLED_EXECUTION") {
    fail("controlled execution requires decision READY_FOR_CONTROLLED_EXECUTION.");
  }
  for (const field of ["migration_set", "authorized_release_owner", "backup_artifact_name", "backup_storage_location", "backup_verification", "rollback_authority", "rollback_reference", "validation_evidence", "failure_stop_conditions"]) {
    requireEvidenceValue(record, field);
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

if (mode !== "structural") {
  const runtimeEnvironment = requireValue("RUNTIME_ENV");
  if (!allowedEnvironments.has(runtimeEnvironment)) {
    fail("RUNTIME_ENV must be local, staging, or production.");
  }

  const binding = validateTargetBinding(runtimeEnvironment);
  await loadLocalEnvironment(runtimeEnvironment, binding.source);
  validateDatabaseUrl(binding, runtimeEnvironment);
  loadAuthorizationEvidence(mode, runtimeEnvironment, binding);
}

console.log(`Runtime execution preflight passed for ${mode}.`);
if (commandName) {
  runApprovedCommand(commandName, mode);
}
