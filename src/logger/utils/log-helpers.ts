
import { LogCategory } from "../../shared/types/enums";

/**
 * Format message for logging
 */
export function formatLogMessage(
  category: LogCategory,
  source: string,
  message: string
): string {
  return `[${category}][${source}] ${message}`;
}

/**
 * Format an error for logging
 */
export function formatErrorForLog(error: unknown): string {
  if (error instanceof Error) {
    return `${error.name}: ${error.message}\n${error.stack || ""}`;
  }
  return String(error);
}

/**
 * Add details to a log message
 */
export function withDetails(details: Record<string, any>): Record<string, any> {
  return { details };
}
