import { Json } from '../core/json';

export interface CmsContent {
  id: string;
  title: string;
  content?: Json;
  metadata?: Json;
  slug?: string;
  status: 'draft' | 'published' | 'archived';
  type: 'page' | 'component' | 'template' | 'workflow';
  version?: number;
  created_by: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SiteSettings {
  id?: string;
  site_title: string;
  tagline?: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  text_primary_color: string;
  text_secondary_color: string;
  text_link_color: string;
  text_heading_color: string;
  neon_cyan: string;
  neon_pink: string;
  neon_purple: string;
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;
  border_radius?: string;
  spacing_unit?: string;
  transition_duration?: string;
  shadow_color?: string;
  hover_scale?: string;
  box_shadow?: string;
  backdrop_blur?: string;
  logo_url?: string;
  favicon_url?: string;
  theme_mode?: 'light' | 'dark' | 'system';
  security_settings?: SecuritySettings;
  updated_at?: string;
  updated_by?: string;
}

export interface SecuritySettings {
  enable_ip_filtering: boolean;
  ip_whitelist: string[];
  ip_blacklist: string[];
  max_login_attempts: number;
  two_factor_auth: boolean;
  password_requirements: {
    min_length: number;
    require_special: boolean;
    require_numbers: boolean;
    require_uppercase: boolean;
  };
}

export interface AuthError {
  type: string;
  code?: string;
  message: string;
  stack?: string;
}

export interface AuthErrorRecoveryState {
  error: AuthError | null;
  isRecovering: boolean;
  recoveryAttempts: number;
}

export interface RevisionState {
  revisions: any[];
  selectedRevision: any | null;
  compareRevision: any | null;
  diffMode: 'split' | 'unified';
  selectedVersions: {
    left: number;
    right: number;
  };
}

export interface VisualElement {
  id: string;
  type: string;
  props: Record<string, any>;
}

export interface ElementPreset {
  id: string;
  name: string;
  category: string;
  element: VisualElement;
}

export interface WorkflowStage {
  id: string;
  name: string;
  type: string;
  order: number;
  config: Record<string, any>;
  description?: string;
}

export interface WorkflowFormData {
  id?: string;
  name: string;
  description?: string;
  stages: WorkflowStage[];
  is_active?: boolean;
}