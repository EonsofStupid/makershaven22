import { create } from 'zustand';
import type { Settings, Theme, ThemeMode } from '@/lib/types/settings';

interface ThemeState {
  settings: Settings | null;
  mode: ThemeMode;
  isLoading: boolean;
  error: Error | null;
  updateSettings: (settings: Settings) => void;
  setMode: (mode: ThemeMode) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}

const DEFAULT_SETTINGS: Settings = {
  site_title: 'MakersImpulse',
  primary_color: '#7FFFD4',
  secondary_color: '#FFB6C1',
  accent_color: '#E6E6FA',
  text_primary_color: '#FFFFFF',
  text_secondary_color: '#A1A1AA',
  text_link_color: '#3B82F6',
  text_heading_color: '#FFFFFF',
  neon_cyan: '#41f0db',
  neon_pink: '#ff0abe',
  neon_purple: '#8000ff',
  font_family_heading: 'Inter',
  font_family_body: 'Inter',
  font_size_base: '16px',
  font_weight_normal: '400',
  font_weight_bold: '700',
  line_height_base: '1.5',
  letter_spacing: 'normal',
  border_radius: '0.5rem',
  spacing_unit: '1rem',
  transition_duration: '0.3s',
  shadow_color: '#000000',
  hover_scale: '1.05',
  transition_type: 'fade'
};

export const useThemeStore = create<ThemeState>((set) => ({
  settings: DEFAULT_SETTINGS,
  mode: 'system',
  isLoading: false,
  error: null,
  updateSettings: (settings) => set({ settings, error: null }),
  setMode: (mode) => set({ mode }),
  setError: (error) => set({ error }),
  reset: () => set({ 
    settings: DEFAULT_SETTINGS, 
    mode: 'system', 
    isLoading: false, 
    error: null 
  })
}));