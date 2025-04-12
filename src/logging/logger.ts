
import { LogCategory } from '../shared/types/enums';

export interface Logger {
  log: (message: string, category?: LogCategory, metadata?: Record<string, any>) => void;
  info: (message: string, metadata?: Record<string, any>) => void;
  warn: (message: string, metadata?: Record<string, any>) => void;
  error: (message: string, error?: Error, metadata?: Record<string, any>) => void;
  debug: (message: string, metadata?: Record<string, any>) => void;
  logError: (message: string, error?: Error, category?: LogCategory) => void;
  logWarning: (message: string, category?: LogCategory, metadata?: Record<string, any>) => void;
  logDebug: (message: string, category?: LogCategory, metadata?: Record<string, any>) => void;
}

export function createLogger(name: string, defaultCategory?: LogCategory): Logger {
  const loggerName = name;
  const category = defaultCategory || 'debug';

  const logger: Logger = {
    log: (message: string, msgCategory?: LogCategory, metadata?: Record<string, any>) => {
      const cat = msgCategory || category;
      console.log(`[${cat}][${loggerName}] ${message}`, metadata || '');
    },

    info: (message: string, metadata?: Record<string, any>) => {
      console.log(`[INFO][${category}][${loggerName}] ${message}`, metadata || '');
    },

    warn: (message: string, metadata?: Record<string, any>) => {
      console.warn(`[WARN][${category}][${loggerName}] ${message}`, metadata || '');
    },

    error: (message: string, error?: Error, metadata?: Record<string, any>) => {
      console.error(
        `[ERROR][${category}][${loggerName}] ${message}`,
        error ? `\n${error.stack || error.message}` : '',
        metadata || ''
      );
    },

    debug: (message: string, metadata?: Record<string, any>) => {
      console.debug(`[DEBUG][${category}][${loggerName}] ${message}`, metadata || '');
    },

    logError: (message: string, error?: Error, msgCategory?: LogCategory) => {
      const cat = msgCategory || category;
      console.error(
        `[ERROR][${cat}][${loggerName}] ${message}`,
        error ? `\n${error.stack || error.message}` : ''
      );
    },

    logWarning: (message: string, msgCategory?: LogCategory, metadata?: Record<string, any>) => {
      const cat = msgCategory || category;
      console.warn(`[WARN][${cat}][${loggerName}] ${message}`, metadata || '');
    },

    logDebug: (message: string, msgCategory?: LogCategory, metadata?: Record<string, any>) => {
      const cat = msgCategory || category;
      console.debug(`[DEBUG][${cat}][${loggerName}] ${message}`, metadata || '');
    }
  };

  return logger;
}
