import { spawnSync } from "node:child_process";

const npmCli = process.env.npm_execpath;

function fail(message) {
  console.error(`Database acceptance failed: ${message}`);
  process.exit(1);
}

function runNpmScript(scriptName) {
  if (!npmCli) {
    fail("npm_execpath is not available. Run this command through npm.");
  }

  console.log(`\n> npm run ${scriptName}`);
  const result = spawnSync(process.execPath, [npmCli, "run", scriptName], {
    stdio: "inherit"
  });

  if (result.error) {
    fail(`${scriptName} failed: ${result.error.message}`);
  }

  if (result.status !== 0) {
    fail(`${scriptName} exited with status ${result.status ?? "unknown"}`);
  }
}

const preflight = process.argv.includes("--preflight");

if (preflight) {
  runNpmScript("db:validate");
  console.log("\nStructural validation PASS does not equal execution authorization.");
  process.exit(0);
}

if (process.env.RUNTIME_PREFLIGHT_PASSED !== "controlled-execution") {
  fail("controlled execution preflight is required before database acceptance.");
}

for (const scriptName of [
  "db:validate",
  "db:migrate",
  "db:migrate:status",
  "db:health",
  "db:tx-smoke"
]) {
  runNpmScript(scriptName);
}

console.log("\nDatabase acceptance passed after controlled execution.");
