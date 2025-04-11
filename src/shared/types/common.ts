
import { LogCategory } from './enums';

/**
 * Shared interface for logger functionality
 */
export interface Logger {
  debug: (message: string, options?: any) => void;
  info: (message: string, options?: any) => void;
  warn: (message: string, options?: any) => void;
  error: (message: string, options?: any) => void;
}

/**
 * Shared log options
 */
export interface LogOptions {
  category?: LogCategory;
  details?: Record<string, any>;
  error?: boolean;
}

/**
 * Base entity interface for database models
 */
export interface BaseEntity {
  id: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}
