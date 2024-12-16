import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export interface NavigationState {
  isOpen: boolean;
  activeTab: string;
  shortcuts: string[];
  expanded: boolean;
}

const initialState: NavigationState = {
  isOpen: false,
  activeTab: 'home',
  shortcuts: [],
  expanded: true
};

export const navigationAtom = atomWithStorage<NavigationState>('navigation-state', initialState);

export const sidebarAtom = atom(
  (get) => get(navigationAtom).isOpen,
  (get, set, isOpen: boolean) => {
    const current = get(navigationAtom);
    set(navigationAtom, { ...current, isOpen });
  }
);

export const sidebarExpandedAtom = atom(
  (get) => get(navigationAtom).expanded,
  (get, set, expanded: boolean) => {
    const current = get(navigationAtom);
    set(navigationAtom, { ...current, expanded });
  }
);

export const sidebarActiveTabAtom = atom(
  (get) => get(navigationAtom).activeTab,
  (get, set, activeTab: string) => {
    const current = get(navigationAtom);
    set(navigationAtom, { ...current, activeTab });
  }
);

export const sidebarShortcutsAtom = atom(
  (get) => get(navigationAtom).shortcuts,
  (get, set, shortcuts: string[]) => {
    const current = get(navigationAtom);
    set(navigationAtom, { ...current, shortcuts });
  }
);