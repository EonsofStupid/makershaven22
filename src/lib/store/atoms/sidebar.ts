import { atom } from 'jotai';

export interface SidebarState {
  isOpen: boolean;
  activeItem: string | null;
}

export const sidebarAtom = atom<SidebarState>({
  isOpen: false,
  activeItem: null,
});

export const setSidebarAtom = atom(
  (get) => get(sidebarAtom),
  (_get, set, update: SidebarState) => {
    set(sidebarAtom, update);
  }
);