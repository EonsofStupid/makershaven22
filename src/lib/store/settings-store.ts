
import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { Settings } from '@/lib/types/settings/core';
import { SettingsState } from '@/lib/types/settings/state';
import { SettingsUpdate } from '@/lib/types/settings/core';

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: null,
  isLoading: false,
  error: null,

  setSettings: (settings) => set({ settings }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  updateSettings: async (settingsUpdate) => {
    const currentSettings = get().settings;
    if (!currentSettings) return;

    try {
      set({ isLoading: true });
      
      // Create update parameters
      const updateParams: Partial<SettingsUpdate> = {
        p_site_title: settingsUpdate.site_title || currentSettings.site_title,
        p_tagline: settingsUpdate.tagline || currentSettings.tagline || '',
        p_primary_color: settingsUpdate.primary_color || currentSettings.primary_color,
        p_secondary_color: settingsUpdate.secondary_color || currentSettings.secondary_color,
        p_accent_color: settingsUpdate.accent_color || currentSettings.accent_color,
        p_text_primary_color: settingsUpdate.text_primary_color || currentSettings.text_primary_color,
        p_text_secondary_color: settingsUpdate.text_secondary_color || currentSettings.text_secondary_color,
        p_text_link_color: settingsUpdate.text_link_color || currentSettings.text_link_color,
        p_text_heading_color: settingsUpdate.text_heading_color || currentSettings.text_heading_color,
        p_neon_cyan: settingsUpdate.neon_cyan || currentSettings.neon_cyan || '#41f0db',
        p_neon_pink: settingsUpdate.neon_pink || currentSettings.neon_pink || '#ff0abe',
        p_neon_purple: settingsUpdate.neon_purple || currentSettings.neon_purple || '#8000ff',
        p_border_radius: settingsUpdate.border_radius || currentSettings.border_radius,
        p_spacing_unit: settingsUpdate.spacing_unit || currentSettings.spacing_unit,
        p_transition_duration: settingsUpdate.transition_duration || currentSettings.transition_duration,
        p_shadow_color: settingsUpdate.shadow_color || currentSettings.shadow_color,
        p_hover_scale: settingsUpdate.hover_scale || currentSettings.hover_scale,
        p_font_family_heading: settingsUpdate.font_family_heading || currentSettings.font_family_heading,
        p_font_family_body: settingsUpdate.font_family_body || currentSettings.font_family_body,
        p_font_size_base: settingsUpdate.font_size_base || currentSettings.font_size_base,
        p_font_weight_normal: settingsUpdate.font_weight_normal || currentSettings.font_weight_normal,
        p_font_weight_bold: settingsUpdate.font_weight_bold || currentSettings.font_weight_bold,
        p_line_height_base: settingsUpdate.line_height_base || currentSettings.line_height_base,
        p_letter_spacing: settingsUpdate.letter_spacing || currentSettings.letter_spacing,
      };

      // Add logo and favicon if they exist
      if (settingsUpdate.logo_url) {
        updateParams.p_logo_url = settingsUpdate.logo_url;
      }

      if (settingsUpdate.favicon_url) {
        updateParams.p_favicon_url = settingsUpdate.favicon_url;
      }

      const { data, error } = await supabase.rpc('update_site_settings', updateParams);

      if (error) throw error;

      const updatedSettings = {
        ...currentSettings,
        ...settingsUpdate,
      };
      
      set({ settings: updatedSettings as Settings });
    } catch (error) {
      set({ error: error as Error });
    } finally {
      set({ isLoading: false });
    }
  },

  resetSettings: async () => {
    try {
      set({ isLoading: true });
      
      const { data, error } = await supabase.rpc('reset_site_settings');

      if (error) throw error;
      
      set({ settings: data as Settings });
    } catch (error) {
      set({ error: error as Error });
    } finally {
      set({ isLoading: false });
    }
  }
}));
