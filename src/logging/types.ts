
export enum LogCategory {
  APP = "app",
  AUTH = "auth",
  CHAT = "chat",
  ADMIN = "admin",
  API = "api",
  THEME = "theme",
  UI = "ui",
  PERFORMANCE = "performance",
  SECURITY = "security",
}

export interface Logger {
  debug: (message: string, options?: any) => void;
  info: (message: string, options?: any) => void;
  warn: (message: string, options?: any) => void;
  error: (message: string, options?: any) => void;
}

export interface LogOptions {
  category?: LogCategory;
  details?: Record<string, any>;
  error?: boolean;
}
