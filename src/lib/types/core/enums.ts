export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin' | 'moderator';
export type ContentStatus = 'draft' | 'published' | 'archived';
export type ContentType = 'template' | 'page' | 'build' | 'guide' | 'part' | 'component' | 'workflow' | 'hero' | 'feature';
export type ThemeMode = 'light' | 'dark' | 'system';
export type SettingType = 'theme' | 'system' | 'user' | 'security' | 'performance';
export type WorkflowStageType = 'APPROVAL' | 'REVIEW' | 'TASK' | 'NOTIFICATION' | 'CONDITIONAL';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';