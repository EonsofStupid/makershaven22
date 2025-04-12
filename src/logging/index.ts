
import { LogCategory, LogLevel } from '../shared/types/enums';
import type { Logger } from '../shared/types/common';
import { createLogger } from './logger';

// Re-export types
export type { Logger };
export type { LogCategory, LogLevel };

// Global logger instance for convenience
const globalLogger = createLogger('global');

// Factory function to create loggers
export function getLogger(name: string, category?: LogCategory): Logger {
  return createLogger(name, category);
}

// Shorthand for quick logging without creating a logger instance
export const log = (message: string, category?: LogCategory, metadata?: Record<string, any>) => {
  globalLogger.log(message, category, metadata);
};

export const logError = (message: string, error?: Error, category?: LogCategory) => {
  globalLogger.logError(message, error, category);
};

export const logWarning = (message: string, category?: LogCategory, metadata?: Record<string, any>) => {
  globalLogger.logWarning(message, category, metadata);
};

export const logDebug = (message: string, category?: LogCategory, metadata?: Record<string, any>) => {
  globalLogger.logDebug(message, category, metadata);
};

// Hook to access logger in components
export function useLogger(name: string, category?: LogCategory): Logger {
  return createLogger(name, category);
}
