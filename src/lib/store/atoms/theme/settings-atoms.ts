import { atom } from 'jotai';
import type { Settings } from '@/components/admin/settings/types';

export interface ThemeSettings extends Settings {
  mode: 'light' | 'dark' | 'system';
}

// Read-only atom that syncs with Zustand theme store
export const settingsAtom = atom<ThemeSettings | null>(null);

// Write-only atom for updating settings
export const updateSettingsAtom = atom(
  null,
  (get, set, updates: Partial<ThemeSettings>) => {
    const current = get(settingsAtom);
    if (current) {
      set(settingsAtom, { ...current, ...updates });
    }
  }
);

// Loading state atom
export const settingsLoadingAtom = atom<boolean>(false);

// Error state atom
export const settingsErrorAtom = atom<Error | null>(null);