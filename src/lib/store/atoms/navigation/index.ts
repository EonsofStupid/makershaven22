import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { NavigationSettings } from '@/lib/types/navigation';

// Persistent storage atoms for navigation state
export const navigationSettingsAtom = atomWithStorage<NavigationSettings | null>('navigation-settings', null);

// Volatile state atoms
export const navigationLoadingAtom = atom<boolean>(false);
export const navigationErrorAtom = atom<Error | null>(null);

// Action atoms
export const setNavigationSettingsAtom = atom(
  null,
  (get, set, settings: NavigationSettings | null) => {
    set(navigationSettingsAtom, settings);
  }
);

export const updateNavigationSettingsAtom = atom(
  null,
  (get, set, updates: Partial<NavigationSettings>) => {
    const current = get(navigationSettingsAtom);
    if (current) {
      set(navigationSettingsAtom, { ...current, ...updates });
    }
  }
);