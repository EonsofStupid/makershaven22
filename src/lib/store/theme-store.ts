import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme, Settings, ThemeMode } from '@/lib/types/settings';

interface ThemeStore {
  settings: Settings | null;
  mode: ThemeMode;
  isLoading: boolean;
  error: Error | null;
  setMode: (mode: ThemeMode) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  resetToDefaults: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      settings: null,
      mode: 'system',
      isLoading: false,
      error: null,
      setMode: (mode) => set({ mode }),
      updateSettings: (newSettings) => set((state) => ({ 
        settings: state.settings ? { ...state.settings, ...newSettings } : newSettings 
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