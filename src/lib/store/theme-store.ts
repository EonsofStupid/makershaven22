import { create } from 'zustand';
import type { Settings, ThemeMode } from '@/lib/types/settings';
import type { ThemeStore } from '@/lib/types/theme';

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: null,
  mode: 'system',
  isLoading: false,
  error: null,

  setTheme: (theme) => set({ theme, error: null }),
  setMode: (mode) => set({ mode }),
  updateSettings: (newSettings) => 
    set((state) => ({
      theme: state.theme ? { ...state.theme, ...newSettings } : null,
      error: null
    })),
  setError: (error) => set({ error })
}));