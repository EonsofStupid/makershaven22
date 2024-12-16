import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { Settings, Theme, ThemeMode } from '@/lib/types/settings';

export const settingsAtom = atomWithStorage<Settings | null>('settings', null);

export const themeModeAtom = atomWithStorage<ThemeMode>('themeMode', 'system');

export const themeAtom = atom<Theme | null>(null);

export const settingsLoadingAtom = atom<boolean>(false);

export const settingsErrorAtom = atom<Error | null>(null);

export const updateSettingsAtom = atom(
  null,
  (get, set, updates: Partial<Settings>) => {
    const current = get(settingsAtom);
    if (current) {
      set(settingsAtom, { ...current, ...updates });
    }
  }
);