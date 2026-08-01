import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../prisma";
import { normalizeDatabaseError } from "./errors";

export type DatabaseClient = typeof prisma;
export type DatabaseTransactionClient = Prisma.TransactionClient;

export async function withDatabaseConnection<T>(
  operation: (client: DatabaseClient) => Promise<T>,
  operationName = "database connection"
): Promise<T> {
  try {
    return await operation(prisma);
  } catch (error) {
    throw normalizeDatabaseError(error, operationName);
  }
}

export async function withDatabaseTransaction<T>(
  operation: (client: DatabaseTransactionClient) => Promise<T>,
  operationName = "database transaction"
): Promise<T> {
  try {
    return await prisma.$transaction((transactionClient) => operation(transactionClient));
  } catch (error) {
    throw normalizeDatabaseError(error, operationName);
  }
}

export function getDatabaseClient() {
  return prisma;
}
