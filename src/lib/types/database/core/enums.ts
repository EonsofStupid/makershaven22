export type UserRole = 'admin' | 'user' | 'guest';
export type ContentStatus = 'draft' | 'published' | 'archived';
export type ContentType = 'post' | 'page' | 'component';
export type WorkflowStageType = 'approval' | 'review' | 'task' | 'notification' | 'conditional';
export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';

export interface DatabaseEnums {
  user_role: UserRole;
  content_status: ContentStatus;
  content_type: ContentType;
  workflow_stage_type: WorkflowStageType;
  theme_mode: ThemeMode;
  transition_type: TransitionType;
}