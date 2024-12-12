import { atom } from 'jotai';

export const sidebarOpenAtom = atom(true);
export const sidebarExpandedAtom = atom(true);
export const sidebarActiveTabAtom = atom('dashboard');
export const sidebarShortcutsAtom = atom<string[]>([]);