
import { LogCategory, LogLevel } from "../shared/types/enums";

export interface LoggerOptions {
  category?: LogCategory;
  level?: LogLevel;
  metadata?: Record<string, any>;
}

// Basic logger implementation
export const logger = {
  log: (message: string, options?: LoggerOptions) => {
    console.log(`[${options?.level || 'info'}][${options?.category || 'general'}] ${message}`, options?.metadata || '');
  },
  
  info: (message: string, category?: LogCategory, metadata?: Record<string, any>) => {
    logger.log(message, { level: 'info', category, metadata });
  },
  
  warn: (message: string, category?: LogCategory, metadata?: Record<string, any>) => {
    logger.log(message, { level: 'warn', category, metadata });
  },
  
  error: (message: string, category?: LogCategory, metadata?: Record<string, any>) => {
    logger.log(message, { level: 'error', category, metadata });
  },
  
  debug: (message: string, category?: LogCategory, metadata?: Record<string, any>) => {
    logger.log(message, { level: 'debug', category, metadata });
  }
};

export default logger;
