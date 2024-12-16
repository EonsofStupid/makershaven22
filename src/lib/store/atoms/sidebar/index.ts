import { atom } from 'jotai';

// Sidebar state atoms
export const sidebarAtom = atom<boolean>(false);
export const sidebarOpenAtom = atom<boolean>(false);
export const sidebarExpandedAtom = atom<boolean>(true);
export const sidebarActiveTabAtom = atom<string>('dashboard');
export const sidebarShortcutsAtom = atom<string[]>([]);

// Action atoms
export const setSidebarOpenAtom = atom(
  null,
  (get, set, isOpen: boolean) => {
    set(sidebarOpenAtom, isOpen);
  }
);

export const setSidebarExpandedAtom = atom(
  null,
  (get, set, isExpanded: boolean) => {
    set(sidebarExpandedAtom, isExpanded);
  }
);

export const setSidebarActiveTabAtom = atom(
  null,
  (get, set, tab: string) => {
    set(sidebarActiveTabAtom, tab);
  }
);

export const toggleSidebarAtom = atom(
  null,
  (get, set) => {
    const isOpen = get(sidebarOpenAtom);
    set(sidebarOpenAtom, !isOpen);
  }
);