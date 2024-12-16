import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { Settings } from '@/components/admin/settings/types';

interface ThemeState {
  settings: Settings | null;
  isLoading: boolean;
  error: Error | null;
  mode: 'light' | 'dark' | 'system';
  setSettings: (settings: Settings) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setMode: (mode: 'light' | 'dark' | 'system') => void;
  updateTheme: (settings: Settings) => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set) => ({
  settings: null,
  isLoading: true,
  error: null,
  mode: 'system',
  setSettings: (settings) => set({ settings }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setMode: (mode) => set({ mode }),
  updateTheme: async (settings) => {
    try {
      const { data, error } = await supabase.rpc('update_site_settings', {
        p_site_title: settings.site_title,
        p_tagline: settings.tagline || '',
        p_primary_color: settings.primary_color,
        p_secondary_color: settings.secondary_color,
        p_accent_color: settings.accent_color,
        p_text_primary_color: settings.text_primary_color,
        p_text_secondary_color: settings.text_secondary_color,
        p_text_link_color: settings.text_link_color,
        p_text_heading_color: settings.text_heading_color,
        p_font_family_heading: settings.font_family_heading,
        p_font_family_body: settings.font_family_body,
        p_font_size_base: settings.font_size_base,
        p_font_weight_normal: settings.font_weight_normal,
        p_font_weight_bold: settings.font_weight_bold,
        p_line_height_base: settings.line_height_base,
        p_letter_spacing: settings.letter_spacing,
        p_neon_cyan: settings.neon_cyan,
        p_neon_pink: settings.neon_pink,
        p_neon_purple: settings.neon_purple
      });

      if (error) throw error;
      set({ settings });
    } catch (error) {
      console.error('Error updating theme:', error);
      set({ error: error instanceof Error ? error : new Error('Failed to update theme') });
    }
  }
}));