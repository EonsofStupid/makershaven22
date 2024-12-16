import { create } from 'zustand';
import type { Settings, ThemeMode } from '@/lib/types/settings';

interface ThemeStore {
  theme: Settings | null;
  mode: ThemeMode;
  isLoading: boolean;
  error: Error | null;
  setTheme: (theme: Settings) => void;
  setMode: (mode: ThemeMode) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  setError: (error: Error | null) => void;
}

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