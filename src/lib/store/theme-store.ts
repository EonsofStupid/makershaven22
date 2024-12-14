import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme, Settings } from '@/lib/types/settings';
import { DEFAULT_SETTINGS } from '@/components/admin/settings/hooks/useSettingsDefaults';

interface ThemeStore extends Theme {
  isLoading: boolean;
  error: Error | null;
  setMode: (mode: 'light' | 'dark' | 'system') => void;
  updateSettings: (settings: Partial<Settings>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  resetToDefaults: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,
      mode: 'system',
      isLoading: false,
      error: null,
      setMode: (mode) => set({ mode }),
      updateSettings: (newSettings) => 
        set((state) => ({ 
          settings: { ...state.settings, ...newSettings }
        })),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      resetToDefaults: () => set({ settings: DEFAULT_SETTINGS }),
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