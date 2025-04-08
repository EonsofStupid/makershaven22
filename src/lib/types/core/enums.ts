
/**
 * Theme mode options
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Glass effect intensity levels
 */
export type GlassEffectLevel = 'none' | 'light' | 'medium' | 'heavy';

/**
 * Transition animation types
 */
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';

/**
 * User role types
 */
export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

/**
 * Content status types
 */
export type ContentStatus = 'draft' | 'published' | 'archived';

/**
 * Content type categories
 */
export type ContentType = 
  | 'page'
  | 'component'
  | 'template'
  | 'build'
  | 'guide'
  | 'part'
  | 'workflow'
  | 'hero'
  | 'feature';

/**
 * Workflow stage types
 */
export type WorkflowStageType = 'approval' | 'review' | 'edit' | 'publish';

/**
 * Security event severity
 */
export type SecurityEventSeverity = 'low' | 'medium' | 'high';

/**
 * Security event category
 */
export type SecurityEventCategory = 'auth' | 'data_access' | 'admin' | 'system';

/**
 * Type guards for enums
 */
export function isValidThemeMode(value: unknown): value is ThemeMode {
  return typeof value === 'string' && ['light', 'dark', 'system'].includes(value);
}

export function isValidGlassEffectLevel(value: unknown): value is GlassEffectLevel {
  return typeof value === 'string' && ['none', 'light', 'medium', 'heavy'].includes(value);
}

export function isValidTransitionType(value: unknown): value is TransitionType {
  return typeof value === 'string' && ['fade', 'slide', 'scale', 'blur'].includes(value);
}

export function isValidUserRole(value: unknown): value is UserRole {
  return typeof value === 'string' && ['subscriber', 'maker', 'admin', 'super_admin'].includes(value);
}

export function isValidContentStatus(value: unknown): value is ContentStatus {
  return typeof value === 'string' && ['draft', 'published', 'archived'].includes(value);
}

export function isValidContentType(value: unknown): value is ContentType {
  return typeof value === 'string' && [
    'page', 'component', 'template', 'build', 'guide', 'part', 'workflow', 'hero', 'feature'
  ].includes(value);
}

export function isValidWorkflowStageType(value: unknown): value is WorkflowStageType {
  return typeof value === 'string' && ['approval', 'review', 'edit', 'publish'].includes(value);
}
