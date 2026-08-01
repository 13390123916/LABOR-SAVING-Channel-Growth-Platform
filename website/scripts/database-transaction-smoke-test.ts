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
    console.error("Database transaction smoke test failed.");
    console.error("DATABASE_URL is required.");
    process.exitCode = 1;
    return;
  }

  const { Prisma } = await import("../generated/prisma/client");
  const { withDatabaseTransaction } = await import("../lib/database");

  try {
    await withDatabaseTransaction(async (client) => {
      await client.$queryRaw(Prisma.sql`SELECT 1`);
    }, "database transaction smoke test");

    console.log("Database transaction smoke test passed.");
  } catch (error) {
    console.error("Database transaction smoke test failed.");
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}

void main();

export {};
