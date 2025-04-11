
import { Logger, LogOptions } from '../shared/types/common';
import { LogCategory, LogLevel } from '../shared/types/enums';

// Export the log category and level enums
export { LogCategory, LogLevel };

// Export the logger interface
export type { Logger, LogOptions };

/**
 * Get a logger instance for a specific component or module
 */
export function getLogger(source: string, category: LogCategory = LogCategory.APP): Logger {
  return {
    debug: (message: string, options?: any) => {
      console.debug(`[${category}][${source}] ${message}`, options || '');
    },
    info: (message: string, options?: any) => {
      console.info(`[${category}][${source}] ${message}`, options || '');
    },
    warn: (message: string, options?: any) => {
      console.warn(`[${category}][${source}] ${message}`, options || '');
    },
    error: (message: string, options?: any) => {
      console.error(`[${category}][${source}] ${message}`, options || '');
    }
  };
}

/**
 * Hook for using logger in components
 */
export function useLogger(source: string, category: LogCategory = LogCategory.APP): Logger {
  return getLogger(source, category);
}
