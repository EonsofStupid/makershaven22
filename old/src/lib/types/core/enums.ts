
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
export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin' | 'moderator';

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
export type WorkflowStageType = 'APPROVAL' | 'TASK' | 'REVIEW' | 'NOTIFICATION' | 'CONDITIONAL';

/**
 * Build difficulty levels
 */
export type BuildDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

/**
 * Build status values
 */
export type BuildStatus = 'draft' | 'submitted' | 'approved' | 'rejected' | 'published';

/**
 * Post category types
 */
export type PostCategory = 'tutorial' | 'news' | 'guide' | 'showcase' | 'review';

/**
 * Theme availability status
 */
export type ThemeAvailabilityStatus = 'enabled' | 'disabled' | 'preview';

/**
 * Type guards for enums
 */
export function isValidThemeMode(value: unknown): value is ThemeMode {
  return typeof value === 'string' && ['light', 'dark', 'system'].includes(value);
}

export function isValidTransitionType(value: unknown): value is TransitionType {
  return typeof value === 'string' && ['fade', 'slide', 'scale', 'blur'].includes(value);
}

export function isValidGlassEffectLevel(value: unknown): value is GlassEffectLevel {
  return typeof value === 'string' && ['none', 'light', 'medium', 'heavy'].includes(value);
}

export function isValidUserRole(value: unknown): value is UserRole {
  return typeof value === 'string' && ['subscriber', 'maker', 'admin', 'super_admin', 'moderator'].includes(value);
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
  return typeof value === 'string' && ['APPROVAL', 'TASK', 'REVIEW', 'NOTIFICATION', 'CONDITIONAL'].includes(value);
}

export function isValidBuildDifficulty(value: unknown): value is BuildDifficulty {
  return typeof value === 'string' && ['beginner', 'intermediate', 'advanced', 'expert'].includes(value);
}

export function isValidBuildStatus(value: unknown): value is BuildStatus {
  return typeof value === 'string' && ['draft', 'submitted', 'approved', 'rejected', 'published'].includes(value);
}

export function isValidPostCategory(value: unknown): value is PostCategory {
  return typeof value === 'string' && ['tutorial', 'news', 'guide', 'showcase', 'review'].includes(value);
}

export function isValidThemeAvailabilityStatus(value: unknown): value is ThemeAvailabilityStatus {
  return typeof value === 'string' && ['enabled', 'disabled', 'preview'].includes(value);
}
