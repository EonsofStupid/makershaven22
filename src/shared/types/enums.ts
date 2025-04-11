
/**
 * Application-wide enumerations
 */

/**
 * Log level enum
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

/**
 * Log category enum
 */
export enum LogCategory {
  APP = 'app',
  AUTH = 'auth',
  CHAT = 'chat',
  ADMIN = 'admin',
  API = 'api',
  THEME = 'theme',
  UI = 'ui',
  PERFORMANCE = 'performance',
  SECURITY = 'security'
}

/**
 * Chat mode enum
 */
export enum ChatMode {
  ADMIN = 'admin',
  DEV = 'dev',
  THREAD = 'thread',
  AGENT = 'agent',
  ULTRA = 'ultra',
  DEVELOPER = 'developer',
  IMAGE = 'image',
  DEBUG = 'debug',
  PLANNING = 'planning',
  TRAINING = 'training'
}

/**
 * User role enum
 */
export enum UserRole {
  GUEST = 'guest',
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin'
}
