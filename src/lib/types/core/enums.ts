/**
 * Core enum types that match database enums
 */

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin' | 'moderator';

export type ThemeMode = 'light' | 'dark' | 'system';

export type ThemeInheritanceStrategy = 'merge' | 'override';

export type ThemeComponentType = 'color' | 'typography' | 'layout' | 'animation' | 'effect';

export type ThemeAvailabilityStatus = 'available' | 'disabled' | 'deprecated';

export type SettingCategory = 'theme' | 'system' | 'user' | 'security' | 'performance';

export type WorkflowStageType = 'APPROVAL' | 'REVIEW' | 'TASK' | 'NOTIFICATION' | 'CONDITIONAL';

export type ContentStatus = 'draft' | 'published' | 'archived';

export type ContentType = 'page' | 'component' | 'template' | 'workflow';

export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';

export type PostCategory = 
  | 'Guides'
  | 'Reviews' 
  | 'Blog'
  | 'Site Updates'
  | 'Critical'
  | '3D Printer'
  | '3D Printer Hardware';

// Re-export all enums
export * from './enums';