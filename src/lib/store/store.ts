import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GlobalState } from './types';
import type { Settings, ThemeMode } from '../types/settings';

export const useStore = create<GlobalState>()(
  persist(
    (set) => ({
      // Initial state
      isReady: false,
      isMaintenanceMode: false,
      error: null,
      theme: null,
      settings: null,
      mode: 'system',
      isThemeLoading: false,
      themeError: null,

      // Actions
      setState: (state: Partial<GlobalState>) => set(state),
      updateSettings: (settings: Settings) => set({ settings, error: null }),
      setMode: (mode: ThemeMode) => set({ mode }),
      setError: (error: Error | null) => set({ error }),
      reset: () => set({
        isReady: false,
        isMaintenanceMode: false,
        error: null,
        theme: null,
        settings: null,
        mode: 'system',
        isThemeLoading: false,
        themeError: null
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