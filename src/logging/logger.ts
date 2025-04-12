
import { LogCategory, LogLevel } from '../shared/types/enums';
import type { Logger } from '../shared/types/common';

/**
 * Creates a logger instance for a specific component
 */
export function createLogger(name: string, defaultCategory?: LogCategory): Logger {
  const loggerName = name;
  const category = defaultCategory || 'debug';

  // Base log function
  const log = (message: string, category?: LogCategory, metadata?: Record<string, any>) => {
    console.log(`[${category || 'debug'}][${loggerName}] ${message}`, metadata || '');
  };

  // Specific log levels
  const info = (message: string, metadata?: Record<string, any>) => {
    console.info(`[INFO][${loggerName}] ${message}`, metadata || '');
  };

  const warn = (message: string, metadata?: Record<string, any>) => {
    console.warn(`[WARN][${loggerName}] ${message}`, metadata || '');
  };

  const error = (message: string, err?: Error, metadata?: Record<string, any>) => {
    console.error(`[ERROR][${loggerName}] ${message}`, err, metadata || '');
  };

  const debug = (message: string, metadata?: Record<string, any>) => {
    console.debug(`[DEBUG][${loggerName}] ${message}`, metadata || '');
  };

  // Alias methods for easier use
  const logError = (message: string, err?: Error, category?: LogCategory) => {
    error(message, err, { category });
  };

  const logWarning = (message: string, category?: LogCategory, metadata?: Record<string, any>) => {
    warn(message, { ...metadata, category });
  };

  const logDebug = (message: string, category?: LogCategory, metadata?: Record<string, any>) => {
    debug(message, { ...metadata, category });
  };

  return {
    log,
    info,
    warn,
    error,
    debug,
    logError,
    logWarning,
    logDebug
  };
}
