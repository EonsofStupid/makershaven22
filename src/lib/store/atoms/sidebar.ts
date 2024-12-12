import { atom } from 'jotai';

export interface SidebarState {
  isOpen: boolean;
  isExpanded: boolean;
  activeTab: string | null;
  shortcuts: string[];
}

// Base atoms
export const sidebarOpenAtom = atom<boolean>(false);
export const sidebarExpandedAtom = atom<boolean>(true);
export const sidebarActiveTabAtom = atom<string | null>(null);
export const sidebarShortcutsAtom = atom<string[]>([]);

// Setter atoms
export const setSidebarAtom = atom(
  (get) => ({
    isOpen: get(sidebarOpenAtom),
    isExpanded: get(sidebarExpandedAtom),
    activeTab: get(sidebarActiveTabAtom),
    shortcuts: get(sidebarShortcutsAtom)
  }),
  (_get, set, update: Partial<SidebarState>) => {
    if (update.isOpen !== undefined) set(sidebarOpenAtom, update.isOpen);
    if (update.isExpanded !== undefined) set(sidebarExpandedAtom, update.isExpanded);
    if (update.activeTab !== undefined) set(sidebarActiveTabAtom, update.activeTab);
    if (update.shortcuts !== undefined) set(sidebarShortcutsAtom, update.shortcuts);
  }
);