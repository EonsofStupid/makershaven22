import { Json } from "./json";

export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';

export interface ThemeSettings {
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
  border_radius: string;
  spacing_unit: string;
  transition_duration: string;
  shadow_color: string;
  hover_scale: string;
  box_shadow?: string;
  backdrop_blur?: string;
  logo_url?: string;
  favicon_url?: string;
  theme_mode?: ThemeMode;
  transition_type?: TransitionType;
  security_settings?: Json;
  updated_at?: string;
  updated_by?: string;
}

export interface ThemeState {
  settings: ThemeSettings | null;
  isLoading: boolean;
  error: Error | null;
  mode: ThemeMode;
  themeMode: ThemeMode;
  systemTheme: ThemeMode;
  effectiveTheme: ThemeMode;
  cssVariables: Record<string, string>;
  setThemeMode: (mode: ThemeMode) => void;
  setSystemTheme: (theme: ThemeMode) => void;
  setSettings: (settings: ThemeSettings) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setMode: (mode: ThemeMode) => void;
  updateSettings: (settings: ThemeSettings) => Promise<void>;
  updateTheme: (settings: ThemeSettings) => Promise<void>;
}

export const parseThemeSettings = (data: Json): ThemeSettings => {
  const obj = assertJsonObject(data);
  return {
    site_title: String(obj.site_title || ''),
    primary_color: String(obj.primary_color || '#000000'),
    secondary_color: String(obj.secondary_color || '#000000'),
    accent_color: String(obj.accent_color || '#000000'),
    text_primary_color: String(obj.text_primary_color || '#000000'),
    text_secondary_color: String(obj.text_secondary_color || '#000000'),
    text_link_color: String(obj.text_link_color || '#000000'),
    text_heading_color: String(obj.text_heading_color || '#000000'),
    neon_cyan: String(obj.neon_cyan || '#41f0db'),
    neon_pink: String(obj.neon_pink || '#ff0abe'),
    neon_purple: String(obj.neon_purple || '#8000ff'),
    font_family_heading: String(obj.font_family_heading || 'Inter'),
    font_family_body: String(obj.font_family_body || 'Inter'),
    font_size_base: String(obj.font_size_base || '16px'),
    font_weight_normal: String(obj.font_weight_normal || '400'),
    font_weight_bold: String(obj.font_weight_bold || '700'),
    line_height_base: String(obj.line_height_base || '1.5'),
    letter_spacing: String(obj.letter_spacing || 'normal'),
    border_radius: String(obj.border_radius || '0.5rem'),
    spacing_unit: String(obj.spacing_unit || '1rem'),
    transition_duration: String(obj.transition_duration || '0.3s'),
    shadow_color: String(obj.shadow_color || 'rgba(0,0,0,0.1)'),
    hover_scale: String(obj.hover_scale || '1.05'),
    // Optional fields
    tagline: obj.tagline ? String(obj.tagline) : undefined,
    box_shadow: obj.box_shadow ? String(obj.box_shadow) : undefined,
    backdrop_blur: obj.backdrop_blur ? String(obj.backdrop_blur) : undefined,
    logo_url: obj.logo_url ? String(obj.logo_url) : undefined,
    favicon_url: obj.favicon_url ? String(obj.favicon_url) : undefined,
    theme_mode: obj.theme_mode as ThemeMode | undefined,
    transition_type: obj.transition_type as TransitionType | undefined,
    security_settings: obj.security_settings,
    updated_at: obj.updated_at ? String(obj.updated_at) : undefined,
    updated_by: obj.updated_by ? String(obj.updated_by) : undefined,
  };
};