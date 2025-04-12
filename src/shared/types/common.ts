
import { LogCategory, LogLevel } from "./enums";

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  category: LogCategory;
  message: string;
  data?: Record<string, any>;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  meta?: PaginationMeta;
}

export interface Logger {
  log: (message: string, category?: LogCategory, metadata?: Record<string, any>) => void;
  logError: (message: string, error?: Error, category?: LogCategory) => void;
  logWarning: (message: string, category?: LogCategory, metadata?: Record<string, any>) => void;
  logDebug: (message: string, category?: LogCategory, metadata?: Record<string, any>) => void;
}

export interface LogOptions {
  timestamp?: string;
  metadata?: Record<string, any>;
  level?: LogLevel;
  category?: LogCategory;
}
