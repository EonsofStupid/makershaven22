
export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';
export type ContentStatus = 'draft' | 'published' | 'archived';
export type ContentType = 'page' | 'component' | 'template' | 'workflow' | 'hero' | 'feature' | 'build' | 'guide' | 'part';
export type WorkflowStageType = 'APPROVAL' | 'REVIEW' | 'TASK' | 'NOTIFICATION' | 'CONDITIONAL';
export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';

export type SecurityEventCategory = 
  | 'authentication'
  | 'authorization'
  | 'data_access'
  | 'system'
  | 'user_management';

export type SecurityEventSeverity = 
  | 'info'
  | 'warning'
  | 'error'
  | 'critical';
