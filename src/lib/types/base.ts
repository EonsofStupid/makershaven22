import type { Json } from '@/integrations/supabase/types';

export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';

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
  updated_at?: string;
  updated_by?: string;
}

export interface Theme {
  settings: Settings | null;
  mode: ThemeMode;
}

export interface GlobalState {
  isReady: boolean;
  isMaintenanceMode: boolean;
  error: Error | null;
  theme: Settings | null;
  settings: Settings | null;
  mode: ThemeMode;
  isThemeLoading: boolean;
  themeError: Error | null;
  setState: (state: Partial<GlobalState>) => void;
  updateSettings: (settings: Settings) => void;
  setMode: (mode: ThemeMode) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}

export interface ImportConfig {
  type: string;
  schema: Record<string, any>;
  validator: (data: any) => boolean;
}

export interface ImportValidationResult {
  isValid: boolean;
  errors?: string[];
}

export interface ImportWizardProps {
  type?: string;
  acceptedTypes?: string[];
  onImport: (files: File[]) => void;
}