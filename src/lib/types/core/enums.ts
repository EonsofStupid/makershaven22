
/**
 * Core enum types for the application
 */

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
 * Build difficulty levels
 */
export type BuildDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

/**
 * Build status values
 */
export type BuildStatus = 'draft' | 'pending_review' | 'approved' | 'rejected' | 'archived';

/**
 * Workflow stage types
 */
export type WorkflowStageType = 'APPROVAL' | 'TASK' | 'REVIEW' | 'NOTIFICATION';

/**
 * Security event severity levels
 */
export type SecurityEventSeverity = 'low' | 'medium' | 'high' | 'critical';

/**
 * Security event categories
 */
export type SecurityEventCategory = 
  | 'authentication'
  | 'authorization'
  | 'data_access'
  | 'system'
  | 'user_management';

/**
 * Settings scope types
 */
export type SettingsScope = 'global' | 'user' | 'theme' | 'security';

/**
 * Type guards for core enums
 */

export function isValidThemeMode(value: unknown): value is ThemeMode {
  return typeof value === 'string' && ['light', 'dark', 'system'].includes(value);
}

export function isValidGlassEffectLevel(value: unknown): value is GlassEffectLevel {
  return typeof value === 'string' && ['none', 'low', 'medium', 'high'].includes(value);
}

export function isValidTransitionType(value: unknown): value is TransitionType {
  return typeof value === 'string' && ['fade', 'slide', 'scale', 'blur'].includes(value);
}

export function isValidUserRole(value: unknown): value is UserRole {
  return typeof value === 'string' && 
         ['subscriber', 'maker', 'admin', 'super_admin', 'moderator'].includes(value);
}

export function isValidContentStatus(value: unknown): value is ContentStatus {
  return typeof value === 'string' && ['draft', 'published', 'archived'].includes(value);
}

export function isValidContentType(value: unknown): value is ContentType {
  const validTypes = [
    'template', 'page', 'build', 'guide', 'part', 
    'component', 'workflow', 'hero', 'feature'
  ];
  return typeof value === 'string' && validTypes.includes(value);
}

export function isValidBuildDifficulty(value: unknown): value is BuildDifficulty {
  return typeof value === 'string' && 
         ['beginner', 'intermediate', 'advanced', 'expert'].includes(value);
}

export function isValidBuildStatus(value: unknown): value is BuildStatus {
  return typeof value === 'string' && 
         ['draft', 'pending_review', 'approved', 'rejected', 'archived'].includes(value);
}

export function isValidWorkflowStageType(value: unknown): value is WorkflowStageType {
  return typeof value === 'string' && 
         ['APPROVAL', 'TASK', 'REVIEW', 'NOTIFICATION'].includes(value);
}

export function isValidSecurityEventSeverity(value: unknown): value is SecurityEventSeverity {
  return typeof value === 'string' && 
         ['low', 'medium', 'high', 'critical'].includes(value);
}

export function isValidSecurityEventCategory(value: unknown): value is SecurityEventCategory {
  return typeof value === 'string' && 
         ['authentication', 'authorization', 'data_access', 'system', 'user_management'].includes(value);
}

export function isValidSettingsScope(value: unknown): value is SettingsScope {
  return typeof value === 'string' && 
         ['global', 'user', 'theme', 'security'].includes(value);
}
