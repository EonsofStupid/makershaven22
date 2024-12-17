export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';
export type ContentStatus = 'draft' | 'published' | 'archived';
export type ContentType = 'page' | 'component' | 'template' | 'workflow';
export type WorkflowStageType = 'APPROVAL' | 'REVIEW' | 'TASK' | 'NOTIFICATION' | 'CONDITIONAL';
export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type ComponentType = 'heading' | 'text' | 'image' | 'button';
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

export const isThemeMode = (value: unknown): value is ThemeMode => {
  return typeof value === 'string' && ['light', 'dark', 'system'].includes(value);
};

export const isTransitionType = (value: unknown): value is TransitionType => {
  return typeof value === 'string' && ['fade', 'slide', 'scale', 'blur'].includes(value);
};

export const isComponentType = (value: unknown): value is ComponentType => {
  return typeof value === 'string' && ['heading', 'text', 'image', 'button'].includes(value);
};

export const isPostCategory = (value: unknown): value is PostCategory => {
  return typeof value === 'string' && [
    'Guides',
    'Reviews',
    'Blog',
    'Site Updates',
    'Critical',
    '3D Printer',
    '3D Printer Hardware'
  ].includes(value);
};