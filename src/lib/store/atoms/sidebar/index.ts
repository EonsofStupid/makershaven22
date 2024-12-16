import { atom } from 'jotai';

export interface SidebarState {
  isOpen: boolean;
  activeItem: string | null;
}

const initialState: SidebarState = {
  isOpen: true,
  activeItem: null
};

export const sidebarAtom = atom<SidebarState>(initialState);

export const toggleSidebarAtom = atom(
  null,
  (get, set) => {
    const current = get(sidebarAtom);
    set(sidebarAtom, { ...current, isOpen: !current.isOpen });
  }
);

export const setActiveItemAtom = atom(
  null,
  (get, set, item: string) => {
    const current = get(sidebarAtom);
    set(sidebarAtom, { ...current, activeItem: item });
  }
);