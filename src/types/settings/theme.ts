import { ThemeMode } from "@/integrations/supabase/types/enums";
import { BaseSettings, ThemeColors, Typography, VisualEffects, Assets } from "./base";

export type TransitionType = 'fade' | 'slide' | 'scale';
export type MenuAnimationType = 'fade' | 'slide-down' | 'scale' | 'blur';

export interface ThemeSettings extends BaseSettings, ThemeColors, Typography, VisualEffects, Assets {
  theme_mode?: ThemeMode;
  transition_type?: TransitionType;
  menu_animation_type?: MenuAnimationType;
}

export interface ThemeState {
  settings: ThemeSettings | null;
  isLoading: boolean;
  error: Error | null;
}