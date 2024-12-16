import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export interface SidebarState {
  isOpen: boolean;
  isExpanded: boolean;
  activeTab: string | null;
  shortcuts: string[];
}

// Base atoms
export const sidebarOpenAtom = atomWithStorage<boolean>('sidebar_open', false);
export const sidebarExpandedAtom = atomWithStorage<boolean>('sidebar_expanded', true);
export const sidebarActiveTabAtom = atomWithStorage<string | null>('sidebar_active_tab', null);
export const sidebarShortcutsAtom = atomWithStorage<string[]>('sidebar_shortcuts', []);

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