import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeSettings } from '@/integrations/supabase/types';

export interface ThemeState {
  settings: ThemeSettings | null;
  isLoading: boolean;
  error: Error | null;
  themeMode: 'light' | 'dark' | 'system';
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
  systemTheme: 'light' | 'dark';
  setSystemTheme: (theme: 'light' | 'dark') => void;
  effectiveTheme: 'light' | 'dark';
  cssVariables: Record<string, string>;
  themeState: Record<string, any>;
  updateTheme: (settings: ThemeSettings) => Promise<void>;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      settings: null,
      isLoading: false,
      error: null,
      themeMode: 'system',
      systemTheme: 'dark',
      effectiveTheme: 'dark',
      cssVariables: {},
      themeState: {},
      setThemeMode: (mode) => set({ themeMode: mode }),
      setSystemTheme: (theme) => set({ systemTheme: theme }),
      updateTheme: async (settings) => {
        try {
          set({ isLoading: true });
          // Theme update logic here
          set({ settings, isLoading: false });
        } catch (error) {
          set({ error: error as Error, isLoading: false });
        }
      }
    }),
    { name: 'theme-store' }
  )
);