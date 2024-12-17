export type ContentStatus = 'draft' | 'published' | 'archived';
export type ContentType = 'page' | 'component' | 'template' | 'workflow';
export type PostCategory = 
  | 'Guides'
  | 'Reviews' 
  | 'Blog'
  | 'Site Updates'
  | 'Critical'
  | '3D Printer'
  | '3D Printer Hardware';

export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';

export type WorkflowStageType = 
  | 'APPROVAL'
  | 'REVIEW'
  | 'TASK'
  | 'NOTIFICATION'
  | 'CONDITIONAL';