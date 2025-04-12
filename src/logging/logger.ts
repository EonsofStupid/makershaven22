
import { LogCategory, LogLevel } from '../shared/types/enums';
import type { Logger, LogOptions } from '../shared/types/common';

export class LoggerImpl implements Logger {
  private name: string;
  private defaultCategory: LogCategory;

  constructor(name: string, defaultCategory: LogCategory = 'debug') {
    this.name = name;
    this.defaultCategory = defaultCategory;
  }

  log(message: string, category?: LogCategory, metadata?: Record<string, any>): void {
    this._log('info', message, category || this.defaultCategory, metadata);
  }

  logError(message: string, error?: Error, category?: LogCategory): void {
    this._log('error', message, category || this.defaultCategory, {
      error: error?.message || 'Unknown error',
      stack: error?.stack
    });
  }

  logWarning(message: string, category?: LogCategory, metadata?: Record<string, any>): void {
    this._log('warn', message, category || this.defaultCategory, metadata);
  }

  logDebug(message: string, category?: LogCategory, metadata?: Record<string, any>): void {
    this._log('debug', message, category || this.defaultCategory, metadata);
  }

  // Extended methods to match common logger interfaces
  info(message: string, metadata?: Record<string, any>): void {
    this._log('info', message, this.defaultCategory, metadata);
  }

  warn(message: string, metadata?: Record<string, any>): void {
    this._log('warn', message, this.defaultCategory, metadata);
  }

  error(message: string, error?: Error, metadata?: Record<string, any>): void {
    this._log('error', message, this.defaultCategory, {
      ...(metadata || {}),
      error: error?.message || 'Unknown error',
      stack: error?.stack
    });
  }

  debug(message: string, metadata?: Record<string, any>): void {
    this._log('debug', message, this.defaultCategory, metadata);
  }

  private _log(level: LogLevel, message: string, category: LogCategory, metadata?: Record<string, any>): void {
    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      level,
      category,
      source: this.name,
      message,
      ...(metadata ? { metadata } : {})
    };

    // Log to console
    const prefix = `[${timestamp}] [${level.toUpperCase()}] [${category}] [${this.name}]`;
    switch (level) {
      case 'error':
        console.error(prefix, message, metadata || '');
        break;
      case 'warn':
        console.warn(prefix, message, metadata || '');
        break;
      case 'debug':
        console.debug(prefix, message, metadata || '');
        break;
      case 'info':
      default:
        console.log(prefix, message, metadata || '');
        break;
    }

    // Here you would typically send logs to a service or store them
    // Example: logService.send(logData);
  }
}

export function createLogger(name: string, category?: LogCategory): Logger {
  return new LoggerImpl(name, category);
}
