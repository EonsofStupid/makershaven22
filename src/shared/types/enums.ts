
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
  | 'debug';

export type LogLevel = 
  | 'info'
  | 'warn'
  | 'error'
  | 'debug';
