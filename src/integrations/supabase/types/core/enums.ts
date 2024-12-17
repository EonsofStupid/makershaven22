// User roles and permissions
export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

// Content types and statuses
export type ContentStatus = 'draft' | 'published' | 'archived';
export type ContentType = 'page' | 'component' | 'template' | 'workflow';

// Workflow specific
export type WorkflowStageType = 'APPROVAL' | 'REVIEW' | 'TASK' | 'NOTIFICATION' | 'CONDITIONAL';

// Theme and UI
export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type MenuAnimationType = 'fade' | 'slide-down' | 'scale' | 'blur';

// Blog/Content categories
export type PostCategory = 
  | 'Guides'
  | 'Reviews' 
  | 'Blog'
  | 'Site Updates'
  | 'Critical'
  | '3D Printer'
  | '3D Printer Hardware';

// Type guards
export const isUserRole = (value: unknown): value is UserRole => {
  return typeof value === 'string' && ['subscriber', 'maker', 'admin', 'super_admin'].includes(value);
};

export const isContentStatus = (value: unknown): value is ContentStatus => {
  return typeof value === 'string' && ['draft', 'published', 'archived'].includes(value);
};

export const isContentType = (value: unknown): value is ContentType => {
  return typeof value === 'string' && ['page', 'component', 'template', 'workflow'].includes(value);
};

export const isWorkflowStageType = (value: unknown): value is WorkflowStageType => {
  return typeof value === 'string' && ['APPROVAL', 'REVIEW', 'TASK', 'NOTIFICATION', 'CONDITIONAL'].includes(value);
};