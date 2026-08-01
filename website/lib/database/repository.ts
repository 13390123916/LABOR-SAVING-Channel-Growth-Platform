import type { DatabaseClient, DatabaseTransactionClient } from "./access";
import { getDatabaseClient, withDatabaseConnection, withDatabaseTransaction } from "./access";
import { normalizeDatabaseError } from "./errors";

export abstract class DatabaseRepository {
  protected readonly client: DatabaseClient = getDatabaseClient();

  protected async query<T>(
    operation: (client: DatabaseClient) => Promise<T>,
    operationName = "database query"
  ): Promise<T> {
    return withDatabaseConnection(operation, operationName);
  }

  protected async transaction<T>(
    operation: (client: DatabaseTransactionClient) => Promise<T>,
    operationName = "database transaction"
  ): Promise<T> {
    return withDatabaseTransaction(operation, operationName);
  }

  protected wrapError(error: unknown, operationName: string): never {
    throw normalizeDatabaseError(error, operationName);
  }
}
