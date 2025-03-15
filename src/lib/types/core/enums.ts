
/**
 * Core enum types used throughout the application
 */

// Theme modes (light, dark, system)
export type ThemeMode = 'light' | 'dark' | 'system';

// Content status values
export type ContentStatus = 'draft' | 'published' | 'archived';

// Content type values
export type ContentType = 'page' | 'component' | 'template' | 'workflow' | 'hero' | 'feature' | 'build' | 'guide' | 'part';

// User roles within the application
export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

// Workflow stage types 
export type WorkflowStageType = 'APPROVAL' | 'REVIEW' | 'TASK' | 'NOTIFICATION' | 'CONDITIONAL';

// Transition types for animations
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';

// Glass effect levels for UI components
export type GlassEffectLevel = 'none' | 'light' | 'medium' | 'heavy';

// Post categories
export type PostCategory = 
  | 'Guides'
  | 'Reviews' 
  | 'Blog'
  | 'Site Updates'
  | 'Critical'
  | '3D Printer'
  | '3D Printer Hardware';

// Setting types 
export type SettingType = 'theme' | 'security' | 'site' | 'user';

// Theme inheritance strategies
export type ThemeInheritanceStrategy = 'merge' | 'override' | 'selective';

/**
 * Enum guards - type validation functions
 */

// Validate TransitionType
export function isValidTransitionType(value: string): value is TransitionType {
  return ['fade', 'slide', 'scale', 'blur'].includes(value);
}

// Validate ThemeMode
export function isValidThemeMode(value: string): value is ThemeMode {
  return ['light', 'dark', 'system'].includes(value);
}

// Validate GlassEffectLevel
export function isValidGlassEffectLevel(value: string): value is GlassEffectLevel {
  return ['none', 'light', 'medium', 'heavy'].includes(value);
}

// Validate SettingType
export function isValidSettingType(value: string): value is SettingType {
  return ['theme', 'security', 'site', 'user'].includes(value);
}

// Validate ThemeInheritanceStrategy
export function isValidThemeInheritanceStrategy(value: string): value is ThemeInheritanceStrategy {
  return ['merge', 'override', 'selective'].includes(value);
}
