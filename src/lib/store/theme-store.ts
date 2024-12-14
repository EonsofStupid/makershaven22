import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Settings, Theme, ThemeMode, ThemeState } from '@/lib/types/settings';

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      settings: null,
      mode: 'system',
      isLoading: false,
      error: null,
      setMode: (mode: ThemeMode) => set({ mode }),
      updateSettings: (newSettings: Partial<Settings>) => 
        set((state) => ({
          settings: state.settings ? { ...state.settings, ...newSettings } : null,
          error: null
        })),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (error: Error | null) => set({ error }),
      resetToDefaults: () => set({ 
        settings: null,
        mode: 'system',
        isLoading: false,
        error: null
      }),
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({ 
        settings: state.settings,
        mode: state.mode
      }),
    }
  )
);