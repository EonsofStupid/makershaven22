
import { LogCategory, LogLevel } from './enums';

export interface Logger {
  log: (message: string, category?: LogCategory, metadata?: Record<string, any>) => void;
  info: (message: string, metadata?: Record<string, any>) => void;
  warn: (message: string, metadata?: Record<string, any>) => void;
  error: (message: string, err?: Error, metadata?: Record<string, any>) => void;
  debug: (message: string, metadata?: Record<string, any>) => void;
  logError: (message: string, err?: Error, category?: LogCategory) => void;
  logWarning: (message: string, category?: LogCategory, metadata?: Record<string, any>) => void;
  logDebug: (message: string, category?: LogCategory, metadata?: Record<string, any>) => void;
}

export interface LogEvent {
  timestamp: string;
  level: LogLevel;
  category: LogCategory;
  message: string;
  metadata?: Record<string, any>;
  error?: Error | null;
}
