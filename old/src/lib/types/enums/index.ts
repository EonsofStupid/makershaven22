
export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin' | 'moderator';

export type ContentStatus = 'draft' | 'published' | 'archived';

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

export type WorkflowStageType = 'APPROVAL' | 'TASK' | 'REVIEW' | 'NOTIFICATION';

export type ThemeMode = 'light' | 'dark' | 'system';

// Add theme component types
export type ThemeComponentType = 'color' | 'typography' | 'layout' | 'animation' | 'effect';

// Add inheritance strategy types
export type ThemeInheritanceStrategy = 'merge' | 'override';

// Add theme availability status
export type ThemeAvailabilityStatus = 'enabled' | 'disabled' | 'preview';

// Add setting types
export type SettingType = 'theme' | 'security' | 'site' | 'user';

// Add setting categories
export type SettingCategory = 
  | 'appearance'
  | 'security'
  | 'performance'
  | 'notifications'
  | 'accessibility'
  | 'privacy'
  | 'advanced';

// Add audit categories
export type AuditCategory = 
  | 'security'
  | 'data_access'
  | 'configuration'
  | 'user_activity'
  | 'system';

// Add audit severity
export type AuditSeverity = 
  | 'critical'
  | 'high'
  | 'medium'
  | 'low'
  | 'info';

// Security related types
export type SecurityEventSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';
export type SecurityEventCategory = 'auth' | 'data' | 'admin' | 'system' | 'user';

// Post categories
export type PostCategory = 
  | 'tutorial'
  | 'news'
  | 'guide'
  | 'showcase'
  | 'review';
