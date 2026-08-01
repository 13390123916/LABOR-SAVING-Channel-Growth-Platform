import { Prisma } from "../generated/prisma/client";
import { getDatabaseClient } from "./database";

export type DatabaseHealthResult = {
  ok: boolean;
  checkedAt: string;
  error?: string;
};

export async function checkDatabaseHealth(): Promise<DatabaseHealthResult> {
  const checkedAt = new Date().toISOString();
  const client = getDatabaseClient();

  try {
    await client.$connect();
    await client.$queryRaw(Prisma.sql`SELECT 1`);

    return {
      ok: true,
      checkedAt
    };
  } catch (error) {
    const normalizedError = error instanceof Error ? error.message : "Unknown database health check error";
    return {
      ok: false,
      checkedAt,
      error: normalizedError
    };
  } finally {
    await client.$disconnect();
  }
}
