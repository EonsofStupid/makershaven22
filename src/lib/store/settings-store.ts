import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { ThemeSettings, ThemeState } from '@/integrations/supabase/types';

interface SettingsStore extends ThemeState {
  fetchSettings: () => Promise<void>;
  updateSettings: (settings: ThemeSettings) => Promise<void>;
  resetSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  settings: null,
  isLoading: true,
  error: null,
  mode: 'light',
  themeMode: 'light',
  systemTheme: 'light',
  effectiveTheme: 'light',
  cssVariables: {},
  
  fetchSettings: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (error) throw error;

      set({ settings: data, isLoading: false });
    } catch (error) {
      console.error('Error fetching settings:', error);
      set({ error, isLoading: false });
    }
  },

  updateSettings: async (settings) => {
    set({ isLoading: true });
    try {
      const { error } = await supabase
        .from('site_settings')
        .update(settings)
        .eq('id', settings.id);

      if (error) throw error;

      set({ settings, isLoading: false });
    } catch (error) {
      console.error('Error updating settings:', error);
      set({ error, isLoading: false });
    }
  },

  resetSettings: async () => {
    set({ isLoading: true });
    try {
      const { error } = await supabase
        .from('site_settings')
        .update({ /* default settings */ })
        .eq('id', 'default-id'); // Replace with actual default ID

      if (error) throw error;

      set({ settings: null, isLoading: false });
    } catch (error) {
      console.error('Error resetting settings:', error);
      set({ error, isLoading: false });
    }
  },

  setThemeMode: (mode) => set({ mode }),
  setSystemTheme: (theme) => set({ systemTheme: theme }),
  setSettings: (settings) => set({ settings }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setMode: (mode) => set({ mode }),
}));
