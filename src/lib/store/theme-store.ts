import { create } from 'zustand';
import type { ThemeSettings, ThemeState } from '@/integrations/supabase/types';

export const useThemeStore = create<ThemeState>((set) => ({
  settings: null,
  isLoading: true,
  error: null,
  mode: 'system',
  themeMode: 'system',
  systemTheme: 'light',
  effectiveTheme: 'light',
  cssVariables: {},

  setThemeMode: (mode) => set({ themeMode: mode }),
  setSystemTheme: (theme) => set({ systemTheme: theme }),
  setSettings: (settings) => set({ settings }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setMode: (mode) => set({ mode }),

  updateSettings: async (settings: ThemeSettings) => {
    try {
      set({ isLoading: true, error: null });
      // Update theme settings in the database
      const { error } = await fetch('/api/theme/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      }).then(res => res.json());

      if (error) throw error;
      set({ settings, isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },

  updateTheme: async (settings: ThemeSettings) => {
    try {
      set({ isLoading: true, error: null });
      // Update theme in the database and apply changes
      const { error } = await fetch('/api/theme', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      }).then(res => res.json());

      if (error) throw error;
      
      // Update CSS variables
      const cssVariables: Record<string, string> = {
        '--primary': settings.primary_color || '#000000',
        '--secondary': settings.secondary_color || '#666666',
        '--accent': settings.accent_color || '#3b82f6',
        '--text-primary': settings.text_primary_color || '#000000',
        '--text-secondary': settings.text_secondary_color || '#666666',
        '--text-link': settings.text_link_color || '#3b82f6',
        '--text-heading': settings.text_heading_color || '#000000',
        '--font-family-heading': settings.font_family_heading || 'system-ui',
        '--font-family-body': settings.font_family_body || 'system-ui',
        '--font-size-base': settings.font_size_base || '16px',
        '--line-height-base': settings.line_height_base || '1.5',
        '--letter-spacing': settings.letter_spacing || 'normal',
        '--border-radius': settings.border_radius || '0.5rem',
        '--spacing-unit': settings.spacing_unit || '1rem',
        '--transition-duration': settings.transition_duration || '0.3s',
        '--shadow-color': settings.shadow_color || 'rgba(0,0,0,0.1)',
        '--hover-scale': settings.hover_scale || '1.05',
        '--neon-cyan': settings.neon_cyan || '#41f0db',
        '--neon-pink': settings.neon_pink || '#ff0abe',
        '--neon-purple': settings.neon_purple || '#8000ff',
      };

      // Apply CSS variables to document root
      Object.entries(cssVariables).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });

      set({ 
        settings, 
        isLoading: false,
        cssVariables
      });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },
}));