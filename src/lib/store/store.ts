import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Settings, ThemeMode } from '@/lib/types/base';

interface StoreState {
  // Theme state
  theme: Settings | null;
  settings: Settings | null;
  mode: ThemeMode;
  isThemeLoading: boolean;
  themeError: Error | null;

  // Core state
  isReady: boolean;
  isMaintenanceMode: boolean;
  error: Error | null;

  // Actions
  setState: (state: Partial<StoreState>) => void;
  updateSettings: (settings: Settings) => void;
  setMode: (mode: ThemeMode) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // Initial theme state
      theme: null,
      settings: null,
      mode: 'system',
      isThemeLoading: false,
      themeError: null,

      // Initial core state
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