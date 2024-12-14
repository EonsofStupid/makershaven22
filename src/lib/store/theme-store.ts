import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme, Settings, ThemeMode } from '@/lib/types/settings';
import { DEFAULT_SETTINGS } from '@/components/admin/settings/hooks/useSettingsDefaults';

interface ThemeStore {
  theme: Theme;
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
      theme: {
        settings: DEFAULT_SETTINGS,
        mode: 'system'
      },
      isLoading: false,
      error: null,
      setMode: (mode) => set((state) => ({ 
        theme: { ...state.theme, mode } 
      })),
      updateSettings: (newSettings) => set((state) => ({ 
        theme: { 
          ...state.theme, 
          settings: { ...state.theme.settings, ...newSettings }
        }
      })),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      resetToDefaults: () => set({ 
        theme: {
          settings: DEFAULT_SETTINGS,
          mode: 'system'
        }
      }),
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({ 
        theme: state.theme
      }),
    }
  )
);