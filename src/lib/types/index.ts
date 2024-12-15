// Basic types from Supabase schema
export type Json = any;

// Auth types
export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';

export interface AuthUser {
  id: string;
  email?: string;
  role?: UserRole;
}

export interface AuthSession {
  user: AuthUser;
  access_token: string;
}

// Settings types
export type ThemeMode = 'light' | 'dark' | 'system';

export interface Settings {
  site_title: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  theme_mode?: ThemeMode;
}

// Content types
export interface BaseContent {
  id: string;
  title: string;
  content?: Json;
  created_at?: string;
  updated_at?: string;
}