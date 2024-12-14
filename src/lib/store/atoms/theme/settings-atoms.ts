import { atom } from 'jotai';
import type { Settings, ThemeMode } from '@/lib/types/settings';

export interface ThemeSettings extends Settings {
  mode: ThemeMode;
}

// Base settings atom
export const settingsAtom = atom<ThemeSettings | null>(null);

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

// Writable settings atom with validation
export const settingsWriteAtom = atom(
  (get) => get(settingsAtom),
  (get, set, updates: Partial<ThemeSettings>) => {
    const current = get(settingsAtom);
    if (current) {
      const newSettings = { ...current, ...updates };
      // Validate required fields before updating
      if (!newSettings.site_title || !newSettings.primary_color) {
        set(settingsErrorAtom, new Error('Required settings fields are missing'));
        return;
      }
      set(settingsAtom, newSettings);
      set(settingsErrorAtom, null);
    }
  }
);

export { Settings };