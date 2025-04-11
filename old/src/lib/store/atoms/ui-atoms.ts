
import { atom } from 'jotai';

// Theme mode atom
export const themeModeAtom = atom<'light' | 'dark' | 'system'>('system');

// UI preferences
export const sidebarOpenAtom = atom<boolean>(false);
export const mobileMenuOpenAtom = atom<boolean>(false);

// Feature flags UI indicators
export const featureFlagsVisibleAtom = atom<boolean>(false);

// Table view preferences
export const tableViewLimitAtom = atom<number>(5);
export const tableViewFilterAtom = atom<string | null>(null);
