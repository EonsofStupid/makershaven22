
export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';
export type ContentStatus = 'draft' | 'published' | 'archived';
export type ContentType = 'page' | 'component' | 'template' | 'workflow';
export type WorkflowStageType = 'APPROVAL' | 'REVIEW' | 'TASK' | 'NOTIFICATION' | 'CONDITIONAL';
export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type PostCategory = 
  | 'Guides'
  | 'Reviews' 
  | 'Blog'
  | 'Site Updates'
  | 'Critical'
  | '3D Printer'
  | '3D Printer Hardware';

/**
 * Type guard to check if a value is a valid UserRole
 */
export function isValidUserRole(value: unknown): value is UserRole {
  return typeof value === 'string' && 
         ['subscriber', 'maker', 'admin', 'super_admin'].includes(value as string);
}
