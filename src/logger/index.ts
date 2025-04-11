
import { Logger, LogOptions } from '../shared/types/common';
import { LogCategory, LogLevel } from '../shared/types/enums';

// Re-export the log category and level enums for easier access
export { LogCategory, LogLevel };

// Re-export the logger interface
export type { Logger, LogOptions };

/**
 * Get a logger instance for a specific component or module
 */
export function getLogger(source: string, defaultCategory: LogCategory = LogCategory.APP): Logger {
  const logger: Logger = {
    debug: (message: string, options?: any) => {
      const category = options?.category || defaultCategory;
      console.debug(`[${category}][${source}] ${message}`, options || '');
    },
    
    info: (message: string, options?: any) => {
      const category = options?.category || defaultCategory;
      console.info(`[${category}][${source}] ${message}`, options || '');
    },
    
    warn: (message: string, options?: any) => {
      const category = options?.category || defaultCategory;
      console.warn(`[${category}][${source}] ${message}`, options || '');
    },
    
    error: (message: string, options?: any) => {
      const category = options?.category || defaultCategory;
      console.error(`[${category}][${source}] ${message}`, options || '');
    }
  };
  
  return logger;
}
