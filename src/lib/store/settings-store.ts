import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { Settings, SettingsUpdateParams } from '@/integrations/supabase/types';

interface SettingsState {
  settings: Settings | null;
  isLoading: boolean;
  error: Error | null;
  fetchSettings: () => Promise<void>;
  updateSettings: (settings: SettingsUpdateParams) => Promise<void>;
  resetSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: null,
  isLoading: true,
  error: null,
  
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
      set({ error: error as Error, isLoading: false });
    }
  },

  updateSettings: async (settings) => {
    set({ isLoading: true });
    try {
      const { error } = await supabase.rpc('update_site_settings', settings);

      if (error) throw error;
      set({ settings: settings as unknown as Settings, isLoading: false });
    } catch (error) {
      console.error('Error updating settings:', error);
      set({ error: error as Error, isLoading: false });
    }
  },

  resetSettings: async () => {
    set({ isLoading: true });
    try {
      const { error } = await supabase.rpc('reset_site_settings');

      if (error) throw error;
      set({ settings: null, isLoading: false });
    } catch (error) {
      console.error('Error resetting settings:', error);
      set({ error: error as Error, isLoading: false });
    }
  }
}));