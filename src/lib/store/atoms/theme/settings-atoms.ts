import { atom } from 'jotai';
import type { Settings, ThemeSettings, ThemeMode } from '@/lib/types/settings';

export { Settings, ThemeSettings };

export const settingsAtom = atom<ThemeSettings | null>(null);

export const updateSettingsAtom = atom(
  null,
  (get, set, updates: Partial<ThemeSettings>) => {
    const current = get(settingsAtom);
    if (current) {
      set(settingsAtom, { ...current, ...updates });
    }
  }
);

export const settingsLoadingAtom = atom<boolean>(false);
export const settingsErrorAtom = atom<Error | null>(null);