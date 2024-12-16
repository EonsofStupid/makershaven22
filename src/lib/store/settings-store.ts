import { create } from 'zustand';
import type { Settings } from '@/components/admin/settings/types';
import { supabase } from '@/integrations/supabase/client';

interface SettingsState {
  settings: Settings | null;
  isLoading: boolean;
  error: Error | null;
  setSettings: (settings: Settings) => void;
  updateSettings: (updates: Partial<Settings>) => Promise<void>;
  resetSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: null,
  isLoading: false,
  error: null,
  setSettings: (settings) => set({ settings }),
  updateSettings: async (updates) => {
    set({ isLoading: true });
    try {
      const { error } = await supabase.rpc('update_site_settings', updates);
      if (error) throw error;
      set((state) => ({
        settings: state.settings ? { ...state.settings, ...updates } : null,
        error: null
      }));
    } catch (error) {
      set({ error: error as Error });
    } finally {
      set({ isLoading: false });
    }
  },
  resetSettings: async () => {
    set({ isLoading: true });
    try {
      const { error } = await supabase.rpc('reset_site_settings');
      if (error) throw error;
      const { data: settings } = await supabase
        .from('site_settings')
        .select('*')
        .single();
      set({ settings: settings as Settings, error: null });
    } catch (error) {
      set({ error: error as Error });
    } finally {
      set({ isLoading: false });
    }
  }
}));