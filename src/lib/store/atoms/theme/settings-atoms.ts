import { atom } from 'jotai';
import { useThemeStore } from '../../theme-store';
import type { Settings } from '@/lib/types/settings';

// Read-only atom that syncs with Zustand theme store
export const settingsAtom = atom<Settings>(
  (get) => useThemeStore.getState().settings
);

// Write-only atom for updating settings
export const updateSettingsAtom = atom(
  null,
  (get, set, updates: Partial<Settings>) => {
    useThemeStore.getState().updateSettings(updates);
  }
);

// Loading state atom
export const settingsLoadingAtom = atom<boolean>(
  (get) => useThemeStore.getState().isLoading
);

// Error state atom
export const settingsErrorAtom = atom<Error | null>(
  (get) => useThemeStore.getState().error
);