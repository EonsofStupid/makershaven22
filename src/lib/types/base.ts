export type BaseEntity = {
  id: string;
  created_at?: string;
  updated_at?: string;
};

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';
export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type ContentStatus = 'draft' | 'published' | 'archived';
export type ContentType = 'template' | 'page' | 'component' | 'workflow';

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];