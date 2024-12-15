import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GlobalState } from '../types/base';

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
      updateSettings: (settings) => set({ settings, error: null }),
      setMode: (mode) => set({ mode }),
      setError: (error) => set({ error }),
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