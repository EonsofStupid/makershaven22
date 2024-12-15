export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';
export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale';
export type ContentStatus = 'draft' | 'published' | 'archived';
export type ContentType = 'page' | 'component' | 'template' | 'workflow';

export interface BaseEntity {
  id: string;
  created_at?: string;
  updated_at?: string;
}