import type { 
  ThemeMode, 
  TransitionType, 
  GlassEffectLevel 
} from '@/lib/types/core/enums';
import type { JsonObject } from '@/lib/types/core/json';

/**
 * Theme settings interface
 */
export interface ThemeSettings {
  mode: ThemeMode;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  borderRadius: string;
  transitionDuration: string;
  transitionType: TransitionType;
  glassEffect: GlassEffectLevel;
  customCss?: string;
  metadata?: JsonObject;
}

/**
 * Theme store state interface
 */
export interface ThemeState {
  // Theme state
  settings: ThemeSettings;
  isLoading: boolean;
  error: Error | null;
  isDirty: boolean;
  
  // Actions
  setSettings: (settings: Partial<ThemeSettings>) => void;
  resetSettings: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  saveSettings: () => Promise<void>;
  loadSettings: () => Promise<void>;
}

/**
 * Theme store selectors
 */
export const themeSelectors = {
  getSettings: (state: ThemeState) => state.settings,
  getThemeMode: (state: ThemeState) => state.settings.mode,
  isLoading: (state: ThemeState) => state.isLoading,
  hasError: (state: ThemeState) => !!state.error,
  isDirty: (state: ThemeState) => state.isDirty
}; 