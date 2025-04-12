
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
  | 'chat'; // Added chat category

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
  | 'normal'; // Added normal mode

export type ChatBridgeChannel =
  | 'system'
  | 'user'
  | 'assistant'
  | 'message'; // Adding message channel
