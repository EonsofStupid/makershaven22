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

// Unified auth types
export interface AuthUser {
  id: string;
  email?: string;
  role?: UserRole;
  metadata?: Record<string, any>;
}

export interface AuthSession {
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
  user?: AuthUser;
}

// Core settings types
export interface ThemeSettings {
  mode: ThemeMode;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  neonCyan: string;
  neonPink: string;
  neonPurple: string;
}

export interface SecuritySettings {
  ipWhitelist: string[];
  ipBlacklist: string[];
  maxLoginAttempts: number;
  rateLimitRequests: number;
  sessionTimeoutMinutes: number;
  lockoutDurationMinutes: number;
  rateLimitWindowMinutes: number;
}

export interface Settings extends ThemeSettings {
  siteTitle: string;
  tagline?: string;
  logoUrl?: string;
  faviconUrl?: string;
  securitySettings?: SecuritySettings;
  transitionType?: TransitionType;
  boxShadow?: string;
  backdropBlur?: string;
}