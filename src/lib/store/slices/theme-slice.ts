import { StateCreator } from 'zustand';
import { GlobalState } from '../types';
import type { Settings, Theme, ThemeMode } from '@/lib/types/settings';

export interface ThemeSlice {
  theme: Theme | null;
  settings: Settings | null;
  mode: ThemeMode;
  isLoading: boolean;
  error: Error | null;
  updateSettings: (settings: Settings) => void;
  setMode: (mode: ThemeMode) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}

export const createThemeSlice: StateCreator<
  GlobalState,
  [],
  [],
  ThemeSlice
> = (set) => ({
  theme: null,
  settings: null,
  mode: 'system',
  isLoading: false,
  error: null,
  updateSettings: (settings) => set({ settings, error: null }),
  setMode: (mode) => set({ mode }),
  setError: (error) => set({ error }),
  reset: () => set({
    theme: null,
    settings: null,
    mode: 'system',
    isLoading: false,
    error: null
  })
});