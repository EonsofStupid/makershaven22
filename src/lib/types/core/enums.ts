// Core enum types that match database enums
export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin' | 'moderator';
export type ContentStatus = 'draft' | 'published' | 'archived' | 'scheduled' | 'pending_review';
export type ContentType = 'page' | 'component' | 'template' | 'workflow' | 'build' | 'guide' | 'part';
export type ThemeMode = 'light' | 'dark' | 'system';
export type SettingType = 'theme' | 'system' | 'user' | 'security' | 'performance';
export type WorkflowStageType = 'APPROVAL' | 'REVIEW' | 'TASK' | 'NOTIFICATION' | 'CONDITIONAL';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type PostCategory = 
  | 'Guides'
  | 'Reviews' 
  | 'Blog'
  | 'Site Updates'
  | 'Critical'
  | '3D Printer'
  | '3D Printer Hardware';