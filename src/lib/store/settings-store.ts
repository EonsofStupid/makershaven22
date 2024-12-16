import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { Settings } from '@/components/admin/settings/types';
import { toast } from 'sonner';

interface SettingsState {
  settings: Settings | null;
  isLoading: boolean;
  error: Error | null;
  setSettings: (settings: Settings) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  fetchSettings: () => Promise<void>;
  updateSettings: (updates: Partial<Settings>) => Promise<void>;
  resetSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: null,
  isLoading: false,
  error: null,

  setSettings: (settings) => set({ settings }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  fetchSettings: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (error) throw error;
      set({ settings: data as Settings, error: null });
    } catch (error) {
      console.error('Error fetching settings:', error);
      set({ error: error as Error });
      toast.error('Failed to load settings');
    } finally {
      set({ isLoading: false });
    }
  },

  updateSettings: async (updates) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .update(updates)
        .select()
        .single();

      if (error) throw error;
      set({ settings: data as Settings });
      toast.success('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
    } finally {
      set({ isLoading: false });
    }
  },

  resetSettings: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.rpc('update_site_settings', {
        p_site_title: 'PopCulture',
        p_tagline: 'Your daily dose of pop culture',
        p_primary_color: '#41f0db',
        p_secondary_color: '#ff0abe',
        p_accent_color: '#8000ff',
        p_text_primary_color: '#ffffff',
        p_text_secondary_color: '#a1a1aa',
        p_text_link_color: '#41f0db',
        p_text_heading_color: '#ffffff',
        p_font_family_heading: 'Inter',
        p_font_family_body: 'Inter',
        p_font_size_base: '16px',
        p_font_weight_normal: '400',
        p_font_weight_bold: '700',
        p_line_height_base: '1.5',
        p_letter_spacing: 'normal'
      });

      if (error) throw error;
      set({ settings: data as Settings });
      toast.success('Settings reset successfully');
    } catch (error) {
      console.error('Error resetting settings:', error);
      toast.error('Failed to reset settings');
    } finally {
      set({ isLoading: false });
    }
  }
}));