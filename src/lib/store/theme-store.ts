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
      setMode: (mode) => set({ mode }),
      updateSettings: (newSettings) => set((state) => ({
        settings: state.settings ? { ...state.settings, ...newSettings } : null
      })),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
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