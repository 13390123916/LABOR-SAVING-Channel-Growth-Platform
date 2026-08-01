async function main() {
  if (
    !process.env.DATABASE_URL &&
    process.env.RUNTIME_ENV === "local" &&
    process.env.DATABASE_URL_SOURCE === "local-env"
  ) {
    const { config } = await import("dotenv");
    config({ override: false, quiet: true });
  }

  if (!process.env.DATABASE_URL) {
    console.error("Database health check failed.");
    console.error("DATABASE_URL is required.");
    process.exitCode = 1;
    return;
  }

  const { checkDatabaseHealth } = await import("../lib/database-health");
  const result = await checkDatabaseHealth();

  if (!result.ok) {
    console.error("Database health check failed.");
    console.error(result.error);
    process.exitCode = 1;
    return;
  }

  console.log("Database health check passed.");
}

void main();

export {};
