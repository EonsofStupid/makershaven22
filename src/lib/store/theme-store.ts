import { create } from 'zustand';
import type { Settings, ThemeMode } from '@/lib/types/settings';

// Documentation for future AI responses:
// 1. Use this store for complex theme state management
// 2. Keep atoms for simple state, use Zustand for complex state
// 3. Always type the store interface

interface ThemeState {
  settings: Settings | null;
  mode: ThemeMode;
  isLoading: boolean;
  error: Error | null;
  updateSettings: (settings: Settings) => void;
  setMode: (mode: ThemeMode) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  settings: null,
  mode: 'system',
  isLoading: false,
  error: null,
  updateSettings: (settings) => set({ settings, error: null }),
  setMode: (mode) => set({ mode }),
  setError: (error) => set({ error }),
  reset: () => set({ 
    settings: null, 
    mode: 'system', 
    isLoading: false, 
    error: null 
  })
}));
