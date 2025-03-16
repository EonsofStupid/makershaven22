import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeState } from '../types/store-types';
import { Settings } from '../types/settings/types';
import { supabase } from '@/integrations/supabase/client';

const initialState: ThemeState = {
  settings: null,
  isLoading: false,
  error: null,
  setSettings: () => {},
  setLoading: () => {},
  setError: () => {},
  updateSettings: async () => {}
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setSettings: (settings: Settings) => set({ settings }),
      setLoading: (isLoading: boolean) => set({ isLoading }),
      setError: (error: Error | null) => set({ error }),
      
      updateSettings: async (settings: Settings) => {
        set({ isLoading: true });
        try {
          const { data, error } = await supabase.rpc('update_site_settings', settings);
          if (error) throw error;
          set({ settings: data, error: null });
        } catch (error) {
          set({ error: error as Error });
        } finally {
          set({ isLoading: false });
        }
      }
    }),
    {
      name: 'theme-store',
      partialize: (state) => ({ settings: state.settings })
    }
  )
);