
/**
 * Type safe string literals for the application
 */

/**
 * Theme mode options
 */
export type ThemeModeType = 'light' | 'dark' | 'system';

/**
 * Glass effect levels
 */
export type GlassEffectLevelType = 'none' | 'low' | 'medium' | 'high';

/**
 * Transition animation types
 */
export type TransitionTypeValue = 'fade' | 'slide' | 'scale' | 'blur';

/**
 * Log level values
 */
export type LogLevelType = 'debug' | 'info' | 'warn' | 'error';

/**
 * Log category values
 */
export type LogCategoryType = 
  | 'app'
  | 'auth'
  | 'chat'
  | 'admin'
  | 'api'
  | 'theme'
  | 'ui'
  | 'performance'
  | 'security';
