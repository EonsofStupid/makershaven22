import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Settings } from '../types/settings';

interface ThemeState {
  settings: Settings | null;
  mode: 'light' | 'dark' | 'system';
  setMode: (mode: 'light' | 'dark' | 'system') => void;
  updateSettings: (settings: Partial<Settings>) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      settings: null,
      mode: 'system',
      setMode: (mode) => set({ mode }),
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: state.settings ? { ...state.settings, ...newSettings } : null,
        })),
    }),
    {
      name: 'theme-store',
    }
  )
);