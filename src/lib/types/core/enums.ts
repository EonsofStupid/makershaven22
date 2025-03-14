
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
