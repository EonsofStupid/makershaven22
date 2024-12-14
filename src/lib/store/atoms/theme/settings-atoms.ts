import { atom } from 'jotai';
import type { Settings, Theme, ThemeMode } from '@/lib/types/settings';

export interface ThemeSettings extends Settings {
  mode: ThemeMode;
}

// Base settings atom
export const settingsAtom = atom<ThemeSettings | null>(null);

// Writable settings atom
export const settingsWriteAtom = atom(
  (get) => get(settingsAtom),
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

// Computed validation atom
export const settingsValidAtom = atom(
  (get) => {
    const settings = get(settingsAtom);
    return settings !== null && Object.keys(settings).length > 0;
  }
);

export { Settings };