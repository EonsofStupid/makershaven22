import { z } from "zod";
import { settingsSchema } from "./schema";

export type Settings = z.infer<typeof settingsSchema> & {
  logo_url?: string;
  favicon_url?: string;
  updated_at?: string;
  updated_by?: string;
  theme_mode?: 'light' | 'dark' | 'system';
};

export type SettingsFormData = Settings;

export interface UseSettingsFormReturn {
  settings: Settings | null;
  isLoading: boolean;
  isSaving: boolean;
  isResetting: boolean;
  logoFile: File | null;
  faviconFile: File | null;
  form: any; // We'll properly type this with react-hook-form types
  handleLogoUpload: (file: File) => Promise<void>;
  handleFaviconUpload: (file: File) => Promise<void>;
  handleSettingsUpdate: (settings: Settings) => Promise<void>;
  handleResetToDefault: () => Promise<void>;
}

export interface SettingsUpdateParams {
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
}

export interface SettingsResponse {
  data: Settings;
  error: null | Error;
}