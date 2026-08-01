export class DatabaseRuntimeError extends Error {
  readonly operation: string;
  readonly originalError: unknown;
  readonly code?: string;

  constructor(operation: string, message: string, originalError: unknown, code?: string) {
    super(message);
    this.name = "DatabaseRuntimeError";
    this.operation = operation;
    this.originalError = originalError;
    this.code = code;
  }
}

type ErrorLike = {
  message?: string;
  code?: string;
};

export function normalizeDatabaseError(error: unknown, operation: string) {
  if (error instanceof DatabaseRuntimeError) {
    return error;
  }

  const errorLike = error as ErrorLike | undefined;
  const message =
    error instanceof Error
      ? error.message
      : typeof errorLike?.message === "string"
        ? errorLike.message
        : "Unknown database runtime error";

  return new DatabaseRuntimeError(operation, message, error, errorLike?.code);
}
