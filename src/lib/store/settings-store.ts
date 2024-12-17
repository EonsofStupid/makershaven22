import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { Settings } from '@/components/admin/settings/types';
import type { ThemeState } from '@/lib/types/store-types';
import { toast } from 'sonner';

export const useSettingsStore = create<ThemeState>((set) => ({
  settings: null,
  isLoading: true,
  error: null,
  mode: 'system',

  setSettings: (settings) => set({ settings }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setMode: (mode) => set({ mode }),

  updateSettings: async (settings) => {
    set({ isLoading: true });
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
        p_border_radius: settings.border_radius || '0.5rem',
        p_spacing_unit: settings.spacing_unit || '1rem',
        p_transition_duration: settings.transition_duration || '0.3s',
        p_shadow_color: settings.shadow_color || 'rgba(0,0,0,0.1)',
        p_hover_scale: settings.hover_scale || '1.05',
        p_neon_cyan: settings.neon_cyan || '#41f0db',
        p_neon_pink: settings.neon_pink || '#ff0abe',
        p_neon_purple: settings.neon_purple || '#8000ff'
      });

      if (error) throw error;
      set({ settings: data as Settings });
      toast.success('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
      set({ error: error instanceof Error ? error : new Error('Failed to update settings') });
      toast.error('Failed to update settings');
    } finally {
      set({ isLoading: false });
    }
  }
}));