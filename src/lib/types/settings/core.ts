import type { JsonObject } from '../core/json';
import type { ThemeMode, GlassEffectLevel, TransitionType } from '../core/enums';

/**
 * Core settings interface
 */
export interface Settings {
  siteSettings: SiteSettings;
  securitySettings: SecuritySettings;
  userSettings: UserSettings;
}

/**
 * Site-wide settings interface
 */
export interface SiteSettings {
  site_title: string;
  tagline: string;
  description: string;
  keywords: string[];
  favicon_url: string;
  logo_url: string;
  primary_domain: string;
  support_email: string;
  contact_email: string;
  social_links: JsonObject;
  analytics_id?: string;
  custom_scripts?: string[];
  maintenance_mode: boolean;
  maintenance_message?: string;
}

/**
 * Theme settings interface
 */
export interface ThemeSettings {
  mode: ThemeMode;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  background_color: string;
  text_color: string;
  link_color: string;
  font_family: string;
  font_size: string;
  line_height: string;
  border_radius: string;
  spacing_unit: string;
  transition_duration: string;
  transition_type: TransitionType;
  glass_effect: GlassEffectLevel;
  custom_css?: string;
  metadata?: JsonObject;
}

/**
 * Security settings interface
 */
export interface SecuritySettings {
  enable_2fa: boolean;
  require_email_verification: boolean;
  password_min_length: number;
  password_require_uppercase: boolean;
  password_require_numbers: boolean;
  password_require_symbols: boolean;
  session_timeout: number;
  max_login_attempts: number;
  lockout_duration: number;
  allowed_domains: string[];
  blocked_ips: string[];
}

/**
 * User preferences settings interface
 */
export interface UserSettings {
  preferred_theme: 'light' | 'dark' | 'system';
  notifications_enabled: boolean;
  email_notifications: boolean;
  gamification_enabled: boolean;
  visual_editor_enabled: boolean;
}

/**
 * Default settings
 */
export const DEFAULT_SETTINGS: {
  site: SiteSettings;
  theme: ThemeSettings;
  security: SecuritySettings;
} = {
  site: {
    site_title: "Makers Haven",
    tagline: "Create, Share, Build",
    description: "A community for makers and DIY enthusiasts",
    keywords: ["makers", "diy", "community", "projects"],
    favicon_url: "/favicon.ico",
    logo_url: "/logo.svg",
    primary_domain: "makershaven.com",
    support_email: "support@makershaven.com",
    contact_email: "contact@makershaven.com",
    social_links: {},
    maintenance_mode: false
  },
  theme: {
    mode: "system",
    primary_color: "#0070f3",
    secondary_color: "#00b4d8",
    accent_color: "#ff0080",
    background_color: "#ffffff",
    text_color: "#000000",
    link_color: "#0070f3",
    font_family: "Inter, system-ui, sans-serif",
    font_size: "16px",
    line_height: "1.5",
    border_radius: "8px",
    spacing_unit: "1rem",
    transition_duration: "0.2s",
    transition_type: "fade",
    glass_effect: "medium"
  },
  security: {
    enable_2fa: false,
    require_email_verification: true,
    password_min_length: 8,
    password_require_uppercase: true,
    password_require_numbers: true,
    password_require_symbols: true,
    session_timeout: 3600,
    max_login_attempts: 5,
    lockout_duration: 900,
    allowed_domains: ["*"],
    blocked_ips: []
  }
};

/**
 * Flattened settings interface for database storage
 */
export interface FlattenedSettings {
  // Site settings
  site_title: string;
  tagline: string;
  description: string;
  keywords: string[];
  favicon_url: string;
  logo_url: string;
  primary_domain: string;
  support_email: string;
  contact_email: string;
  social_links: JsonObject;
  analytics_id?: string;
  custom_scripts?: string[];
  maintenance_mode: boolean;
  maintenance_message?: string;

  // Theme settings
  theme_mode: ThemeMode;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  background_color: string;
  text_color: string;
  link_color: string;
  font_family: string;
  font_size: string;
  line_height: string;
  border_radius: string;
  spacing_unit: string;
  transition_duration: string;
  transition_type: TransitionType;
  glass_effect: GlassEffectLevel;
  custom_css?: string;
  theme_metadata?: JsonObject;

  // Security settings
  enable_2fa: boolean;
  require_email_verification: boolean;
  password_min_length: number;
  password_require_uppercase: boolean;
  password_require_numbers: boolean;
  password_require_symbols: boolean;
  session_timeout: number;
  max_login_attempts: number;
  lockout_duration: number;
  allowed_domains: string[];
  blocked_ips: string[];
}
