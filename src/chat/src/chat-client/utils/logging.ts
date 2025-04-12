
import { LogLevelType, LogCategoryType } from "../types";

interface LogOptions {
  level?: LogLevelType;
  category?: LogCategoryType;
  metadata?: Record<string, any>;
}

export class Logger {
  private name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  info(message: string, options?: Omit<LogOptions, 'level'>) {
    this.log(message, { ...options, level: 'info' });
  }
  
  warn(message: string, options?: Omit<LogOptions, 'level'>) {
    this.log(message, { ...options, level: 'warn' });
  }
  
  error(message: string, error?: Error, options?: Omit<LogOptions, 'level'>) {
    this.log(message, { 
      ...options, 
      level: 'error', 
      metadata: { 
        ...options?.metadata,
        error: error?.message,
        stack: error?.stack
      } 
    });
  }
  
  debug(message: string, options?: Omit<LogOptions, 'level'>) {
    this.log(message, { ...options, level: 'debug' });
  }
  
  private log(message: string, options: LogOptions = {}) {
    const { level = 'info', category = 'chat', metadata = {} } = options;
    
    const logData = {
      timestamp: new Date().toISOString(),
      level,
      category,
      component: this.name,
      message,
      ...metadata
    };
    
    switch (level) {
      case 'error':
        console.error(`[${category.toUpperCase()}][${this.name}] ${message}`, metadata);
        break;
      case 'warn':
        console.warn(`[${category.toUpperCase()}][${this.name}] ${message}`, metadata);
        break;
      case 'debug':
        console.debug(`[${category.toUpperCase()}][${this.name}] ${message}`, metadata);
        break;
      case 'info':
      default:
        console.log(`[${category.toUpperCase()}][${this.name}] ${message}`, metadata);
    }
    
    // In the future, we might want to send logs to a remote service
    this.sendToAnalytics(logData);
  }
  
  private sendToAnalytics(logData: any) {
    // Placeholder for sending logs to analytics or monitoring service
    // Implementation will depend on the analytics service used
  }
}

// Singleton logger factory
export const logger = (name: string): Logger => {
  return new Logger(name);
};
