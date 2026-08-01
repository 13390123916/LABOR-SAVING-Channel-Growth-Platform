import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const governancePath = "docs/runtime/M4.0.5_RUNTIME_ENVIRONMENT_GOVERNANCE.md";
const recordPath = "docs/runtime/M4.0.5_RUNTIME_AUTHORIZATION_RECORD_TEMPLATE.md";
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

const governance = readRequired(governancePath);
const record = readRequired(recordPath);

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
  record,
  [
    "execution_scope",
    "runtime_environment",
    "target_id",
    "operator",
    "approval_reference",
    "backup_artifact_name",
    "rollback_authority",
    "validation_evidence",
    "decision",
    "BLOCKED",
    "READY_FOR_CONTROLLED_EXECUTION",
    "EXECUTED"
  ],
  recordPath
);

if (!record.includes("<local | staging | production>")) {
  fail(`${recordPath} must declare local, staging, and production as allowed environments`);
}

const secretPatterns = [
  /mysql:\/\/[^\s<:]+:[^\s<@]+@/i,
  /(?:MYSQL_PASSWORD|MYSQL_ROOT_PASSWORD)\s*=\s*(?!<|redacted|REDACTED)[^\s`]+/i,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i,
  /(?:api[_-]?key|access[_-]?token|secret)\s*[:=]\s*(?!<|redacted|REDACTED)[^\s`]+/i
];

for (const [label, content] of [[governancePath, governance], [recordPath, record]]) {
  for (const pattern of secretPatterns) {
    if (pattern.test(content)) {
      fail(`${label} contains a possible raw secret`);
    }
  }
}

if (failed) {
  process.exitCode = 1;
} else {
  console.log("Runtime governance validation passed.");
}
