
/**
 * Theme mode options
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Glass effect level options for UI components
 */
export type GlassEffectLevel = 'none' | 'low' | 'medium' | 'high';

/**
 * Transition types for animations
 */
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';

/**
 * User roles in the system
 */
export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin' | 'moderator';

/**
 * Content status types
 */
export type ContentStatus = 'draft' | 'published' | 'archived';

/**
 * Content types in the CMS
 */
export type ContentType = 
  | 'template' 
  | 'page' 
  | 'build' 
  | 'guide' 
  | 'part' 
  | 'component'
  | 'workflow'
  | 'hero'
  | 'feature';

/**
 * Workflow stage types
 */
export type WorkflowStageType = 'APPROVAL' | 'TASK' | 'REVIEW' | 'NOTIFICATION';

/**
 * Type guard to check if a value is a valid ThemeMode
 */
export function isValidThemeMode(value: unknown): value is ThemeMode {
  return typeof value === 'string' && 
         ['light', 'dark', 'system'].includes(value as string);
}

/**
 * Type guard to check if a value is a valid GlassEffectLevel
 */
export function isValidGlassEffectLevel(value: unknown): value is GlassEffectLevel {
  return typeof value === 'string' && 
         ['none', 'low', 'medium', 'high'].includes(value as string);
}

/**
 * Type guard to check if a value is a valid TransitionType
 */
export function isValidTransitionType(value: unknown): value is TransitionType {
  return typeof value === 'string' && 
         ['fade', 'slide', 'scale', 'blur'].includes(value as string);
}

/**
 * Type guard to check if a value is a valid UserRole
 */
export function isValidUserRole(value: unknown): value is UserRole {
  return typeof value === 'string' && 
         ['subscriber', 'maker', 'admin', 'super_admin', 'moderator'].includes(value as string);
}
