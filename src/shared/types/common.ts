
import { LogCategory } from './enums';

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
