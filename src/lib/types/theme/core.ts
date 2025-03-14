
import { ThemeMode, GlassEffectLevel, TransitionType } from '../core/enums';

export interface ThemePreferences {
  animations_enabled: boolean;
  real_time_updates: boolean;
  glass_effect_level: GlassEffectLevel;
  update_debounce_ms: number;
}

export interface ThemeColors {
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
}

export interface ThemeTypography {
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;
}

export interface ThemeEffects {
  border_radius: string;
  spacing_unit: string;
  transition_duration: string;
  shadow_color: string;
  hover_scale: string;
  box_shadow: string;
  backdrop_blur: string;
  transition_type: TransitionType;
}

export interface Theme extends ThemeColors, ThemeTypography, ThemeEffects {
  theme_mode: ThemeMode;
  theme_preferences: ThemePreferences;
}
