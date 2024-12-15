import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Settings, ThemeMode, GlobalState } from '@/lib/types/base';

export const useStore = create<GlobalState>()(
  persist(
    (set) => ({
      // Theme state
      theme: null,
      settings: null,
      mode: 'system',
      isThemeLoading: false,
      themeError: null,

      // Core state
      isReady: false,
      isMaintenanceMode: false,
      error: null,

      // Actions
      setState: (state) => set(state),
      updateSettings: (settings) => set({ settings, error: null }),
      setMode: (mode) => set({ mode }),
      setError: (error) => set({ error }),
      reset: () => set({
        theme: null,
        settings: null,
        mode: 'system',
        isThemeLoading: false,
        themeError: null,
        isReady: false,
        isMaintenanceMode: false,
        error: null
      })
    }),
    {
      name: 'global-store',
      partialize: (state) => ({
        theme: state.theme,
        settings: state.settings,
        mode: state.mode
      })
    }
  )
);