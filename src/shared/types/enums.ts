
// Define common enums here
export type UserRole = 'admin' | 'subscriber' | 'maker' | 'super_admin' | 'user' | string;

export type ContentType = 
  | 'page'
  | 'component'
  | 'template'
  | 'workflow'
  | 'build'
  | 'guide'
  | 'part'
  | 'hero'
  | 'feature';

export type LogCategory = 
  | 'auth'
  | 'api'
  | 'ui'
  | 'database'
  | 'performance'
  | 'security'
  | 'debug'
  | 'chat'; 

export type LogLevel = 
  | 'info'
  | 'warn'
  | 'error'
  | 'debug';

export type ChatMode =
  | 'admin'
  | 'dev'
  | 'thread'
  | 'agent'
  | 'ultra'
  | 'developer'
  | 'image'
  | 'debug'
  | 'planning'
  | 'training'
  | 'learn'
  | 'chat'
  | 'normal';

// Re-export for modules that need to use them as constants
export const LogCategories = {
  AUTH: 'auth' as LogCategory,
  API: 'api' as LogCategory,
  UI: 'ui' as LogCategory,
  DATABASE: 'database' as LogCategory,
  PERFORMANCE: 'performance' as LogCategory,
  SECURITY: 'security' as LogCategory,
  DEBUG: 'debug' as LogCategory,
  CHAT: 'chat' as LogCategory
};

export const LogLevels = {
  INFO: 'info' as LogLevel,
  WARN: 'warn' as LogLevel,
  ERROR: 'error' as LogLevel,
  DEBUG: 'debug' as LogLevel
};
