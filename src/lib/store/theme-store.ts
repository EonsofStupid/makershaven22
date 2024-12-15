import { create } from 'zustand';
import type { Theme, ThemeMode, ThemeSettings } from '@/lib/types/theme';

interface ThemeStore {
  theme: Theme | null;
  mode: ThemeMode;
  settings: ThemeSettings | null;
  isLoading: boolean;
  error: Error | null;
  
  // Actions
  setTheme: (theme: Theme) => void;
  setMode: (mode: ThemeMode) => void;
  updateSettings: (settings: Partial<ThemeSettings>) => void;
  setError: (error: Error | null) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: null,
  mode: 'system',
  settings: null,
  isLoading: false,
  error: null,

  setTheme: (theme) => set({ theme, error: null }),
  setMode: (mode) => set({ mode }),
  updateSettings: (newSettings) => 
    set((state) => ({
      settings: state.settings ? { ...state.settings, ...newSettings } : null,
      error: null
    })),
  setError: (error) => set({ error })
}));