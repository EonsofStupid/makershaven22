
import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { ThemeState } from '@/lib/types/theme/state';
import { Settings } from '@/lib/types/settings/core';
import { ThemeMode } from '@/lib/types/core/enums';

export const useThemeStore = create<ThemeState>((set, get) => ({
  settings: null,
  themeMode: 'dark',
  systemTheme: 'dark',
  effectiveTheme: 'dark',
  cssVariables: {},
  themeState: {},
  isLoading: false,
  error: null,

  setSettings: (settings) => set({ settings }),
  setThemeMode: (mode) => {
    set({ themeMode: mode });
    localStorage.setItem('theme-mode', mode);

    // Update effective theme
    const state = get();
    const effectiveTheme = mode === 'system' ? state.systemTheme : mode;
    set({ effectiveTheme });
  },
  setSystemTheme: (mode) => {
    set({ systemTheme: mode });
    
    // If user preference is 'system', update the effective theme
    const { themeMode } = get();
    if (themeMode === 'system') {
      set({ effectiveTheme: mode });
    }
  },
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  updateTheme: (settings) => {
    set({ settings });
    
    // Update CSS variables
    const cssVars: Record<string, string> = {
      '--primary': settings.primary_color,
      '--secondary': settings.secondary_color,
      '--accent': settings.accent_color,
      '--text-primary': settings.text_primary_color,
      '--text-secondary': settings.text_secondary_color,
      '--text-link': settings.text_link_color,
      '--text-heading': settings.text_heading_color,
      '--neon-cyan': settings.neon_cyan || '#41f0db',
      '--neon-pink': settings.neon_pink || '#ff0abe',
      '--neon-purple': settings.neon_purple || '#8000ff',
      '--border-radius': settings.border_radius,
      '--spacing-unit': settings.spacing_unit,
      '--transition-duration': settings.transition_duration,
      '--shadow-color': settings.shadow_color,
      '--hover-scale': settings.hover_scale,
      '--font-family-heading': settings.font_family_heading,
      '--font-family-body': settings.font_family_body,
      '--font-size-base': settings.font_size_base,
      '--font-weight-normal': settings.font_weight_normal,
      '--font-weight-bold': settings.font_weight_bold,
      '--line-height-base': settings.line_height_base,
      '--letter-spacing': settings.letter_spacing,
      '--box-shadow': settings.box_shadow,
      '--backdrop-blur': settings.backdrop_blur,
    };
    
    set({ cssVariables: cssVars });
    
    // Apply CSS variables to document root
    Object.entries(cssVars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }
}));
