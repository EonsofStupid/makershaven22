import type { Json } from './base';
import type { UserRole, ContentStatus, ContentType, ThemeMode } from './enums';

// Core database interface
export interface Database {
  public: {
    Tables: DatabaseTables;
    Views: Record<string, never>;
    Functions: DatabaseFunctions;
    Enums: DatabaseEnums;
  };
}

export interface DatabaseEnums {
  user_role: UserRole;
  content_status: ContentStatus;
  content_type: ContentType;
  theme_mode: ThemeMode;
}

export interface DatabaseFunctions {
  check_rate_limit: {
    Args: { 
      p_user_id: string;
      p_action_type: string;
      p_max_count: number;
      p_time_window: string;
    };
    Returns: boolean;
  };
  ban_user: {
    Args: {
      user_id: string;
      reason: string;
      admin_id: string;
    };
    Returns: void;
  };
  verify_2fa_code: {
    Args: {
      p_code: string;
      p_email: string;
    };
    Returns: Json;
  };
  resend_2fa_code: {
    Args: {
      p_email: string;
    };
    Returns: void;
  };
  update_site_settings: {
    Args: {
      p_site_title: string;
      p_tagline: string;
      p_primary_color: string;
      p_secondary_color: string;
      p_accent_color: string;
      p_text_primary_color: string;
      p_text_secondary_color: string;
      p_text_link_color: string;
      p_text_heading_color: string;
      p_neon_cyan: string;
      p_neon_pink: string;
      p_neon_purple: string;
      p_border_radius: string;
      p_spacing_unit: string;
      p_transition_duration: string;
      p_shadow_color: string;
      p_hover_scale: string;
      p_font_family_heading: string;
      p_font_family_body: string;
      p_font_size_base: string;
      p_font_weight_normal: string;
      p_font_weight_bold: string;
      p_line_height_base: string;
      p_letter_spacing: string;
    };
    Returns: Json;
  };
  create_rollback_revision: {
    Args: {
      p_content_id: string;
      p_target_version_number: number;
      p_current_content: Json;
      p_user_id: string;
    };
    Returns: void;
  };
}

export interface DatabaseTables {
  profiles: {
    Row: {
      id: string;
      username: string | null;
      display_name: string | null;
      avatar_url: string | null;
      role: UserRole | null;
      bio: string | null;
      website: string | null;
      location: string | null;
      created_at: string;
      updated_at: string;
      last_seen: string | null;
      is_banned: boolean | null;
      ban_reason: string | null;
      banned_at: string | null;
      banned_by: string | null;
      two_factor_enabled: boolean | null;
      two_factor_secret: string | null;
      onboarding_completed: boolean | null;
      gamification_enabled: boolean | null;
      visual_editor_enabled: boolean | null;
      last_login_at: string | null;
    };
    Insert: Partial<DatabaseTables['profiles']['Row']>;
    Update: Partial<DatabaseTables['profiles']['Row']>;
  };
  site_settings: {
    Row: {
      id: string;
      site_title: string;
      tagline: string | null;
      primary_color: string;
      secondary_color: string;
      accent_color: string;
      text_primary_color: string;
      text_secondary_color: string;
      text_link_color: string;
      text_heading_color: string;
      theme_mode: ThemeMode | null;
      font_family_heading: string;
      font_family_body: string;
      font_size_base: string;
      font_weight_normal: string;
      font_weight_bold: string;
      line_height_base: string;
      letter_spacing: string;
      border_radius: string | null;
      spacing_unit: string | null;
      transition_duration: string | null;
      shadow_color: string | null;
      hover_scale: string | null;
      updated_at: string | null;
      updated_by: string | null;
    };
    Insert: Partial<DatabaseTables['site_settings']['Row']>;
    Update: Partial<DatabaseTables['site_settings']['Row']>;
  };
  workflow_templates: {
    Row: {
      id: string;
      name: string;
      description: string | null;
      steps: Json;
      is_active: boolean;
      created_by: string | null;
      created_at: string | null;
      updated_at: string | null;
    };
    Insert: Partial<DatabaseTables['workflow_templates']['Row']>;
    Update: Partial<DatabaseTables['workflow_templates']['Row']>;
  };
  cms_content_revisions: {
    Row: {
      id: string;
      content_id: string;
      content: Json;
      metadata: Json | null;
      version_number: number;
      created_by: string;
      created_at: string;
      change_summary: string | null;
      rollback_metadata: Json | null;
    };
    Insert: Partial<DatabaseTables['cms_content_revisions']['Row']>;
    Update: Partial<DatabaseTables['cms_content_revisions']['Row']>;
  };
}