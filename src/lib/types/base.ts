import type { Json } from '@/integrations/supabase/types';

// Core Enums
export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';
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

// Auth Types
export interface AuthUser {
  id: string;
  email?: string;
  role?: UserRole;
  username?: string;
  displayName?: string;
  user_metadata?: {
    avatar_url?: string;
    [key: string]: any;
  };
}

export interface AuthSession {
  user: AuthUser;
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

export interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  error: Error | null;
  isTransitioning: boolean;
  hasAccess: boolean;
}

// Settings Types
export interface Settings {
  id: string;
  site_title: string;
  tagline?: string;
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  text_primary_color?: string;
  text_secondary_color?: string;
  text_link_color?: string;
  text_heading_color?: string;
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;
  border_radius?: string;
  spacing_unit?: string;
  shadow_color?: string;
  hover_scale?: string;
  transition_duration?: string;
  logo_url?: string;
  favicon_url?: string;
  neon_cyan?: string;
  neon_pink?: string;
  neon_purple?: string;
  transition_type?: TransitionType;
  box_shadow?: string;
  backdrop_blur?: string;
  security_settings?: {
    ip_whitelist: string[];
    ip_blacklist: string[];
    rate_limit_requests: number;
    rate_limit_window_minutes: number;
    max_login_attempts: number;
    lockout_duration_minutes: number;
    session_timeout_minutes: number;
  };
  updated_at?: string;
  updated_by?: string;
}

export interface Theme {
  settings: Settings | null;
  mode: ThemeMode;
}

// Global State Interface
export interface GlobalState {
  // Core state
  isReady: boolean;
  isMaintenanceMode: boolean;
  error: Error | null;
  
  // Theme state
  theme: Settings | null;
  settings: Settings | null;
  mode: ThemeMode;
  isThemeLoading: boolean;
  themeError: Error | null;

  // Actions
  setState: (state: Partial<GlobalState>) => void;
  updateSettings: (settings: Settings) => void;
  setMode: (mode: ThemeMode) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}

// Content Types
export interface BaseContent {
  id: string;
  title: string;
  type: ContentType;
  content?: Record<string, any>;
  metadata?: Record<string, any>;
  status?: ContentStatus;
  version?: number;
  created_by: string;
  updated_by?: string;
}

export interface ContentRevision {
  id: string;
  content_id: string;
  content: Record<string, any>;
  metadata?: Record<string, any>;
  created_by?: string;
  version_number?: number;
  change_summary?: string;
  rollback_metadata?: Record<string, any>;
  publish_status?: string;
}

export interface ContentRelationship {
  id: string;
  parent_id?: string;
  child_id?: string;
  relationship_type: string;
  order_index?: number;
}

// Error Types
export interface AuthErrorDetails {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface ValidationError {
  field: string;
  message: string;
}

// UI Types
export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export interface ErrorRecoveryProps {
  error: Error;
  resetErrorBoundary: () => void;
}

// Re-export common types
export type { Json };