import { create } from 'zustand';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
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
  updateTheme: (settings: Partial<Settings>) => Promise<void>;
  reset: () => void;
}

const initialState = {
  settings: null,
  isLoading: true,
  error: null,
  mode: 'system' as const
};

export const useThemeStore = create<ThemeState>((set) => ({
  ...initialState,
  setSettings: (settings) => set({ settings }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setMode: (mode) => set({ mode }),
  updateTheme: async (settings) => {
    try {
      const { data, error } = await supabase.rpc('update_site_settings', settings);
      if (error) throw error;
      
      set((state) => ({
        settings: state.settings ? { ...state.settings, ...settings } : null
      }));
      
      toast.success("Theme updated successfully");
    } catch (error) {
      console.error("Error updating theme:", error);
      set({ error: error instanceof Error ? error : new Error('Failed to update theme') });
      toast.error("Failed to update theme");
    }
  },
  reset: () => set(initialState)
}));