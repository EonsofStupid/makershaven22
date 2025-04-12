
import { LogCategory, LogLevel } from "../shared/types/enums";
import type { Logger, LogOptions } from "../shared/types/common";

// Re-export types for convenience
export type { Logger, LogOptions };
export { LogCategory, LogLevel };

// Create a default logger implementation
export const createLogger = (): Logger => {
  return {
    log: (message: string, category: LogCategory = 'debug', metadata?: Record<string, any>) => {
      console.log(`[${category.toUpperCase()}]: ${message}`, metadata || '');
    },
    
    logError: (message: string, error?: Error, category: LogCategory = 'debug') => {
      console.error(`[${category.toUpperCase()}][ERROR]: ${message}`, error || '');
    },
    
    logWarning: (message: string, category: LogCategory = 'debug', metadata?: Record<string, any>) => {
      console.warn(`[${category.toUpperCase()}][WARNING]: ${message}`, metadata || '');
    },
    
    logDebug: (message: string, category: LogCategory = 'debug', metadata?: Record<string, any>) => {
      console.debug(`[${category.toUpperCase()}][DEBUG]: ${message}`, metadata || '');
    },
    
    // Add convenience methods for common log levels
    info: (message: string, category: LogCategory = 'debug', metadata?: Record<string, any>) => {
      console.info(`[${category.toUpperCase()}][INFO]: ${message}`, metadata || '');
    },
    
    warn: (message: string, category: LogCategory = 'debug', metadata?: Record<string, any>) => {
      console.warn(`[${category.toUpperCase()}][WARN]: ${message}`, metadata || '');
    },
    
    error: (message: string, error?: Error, category: LogCategory = 'debug') => {
      console.error(`[${category.toUpperCase()}][ERROR]: ${message}`, error || '');
    }
  };
};

// Export a default logger instance
export const logger = createLogger();
