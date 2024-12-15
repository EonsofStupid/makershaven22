import { create } from 'zustand';
import { useSyncedStore } from '@/lib/store/hooks/useSyncedStore';

interface NavigationState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  mousePosition: { x: number; y: number } | null;
  setMousePosition: (position: { x: number; y: number } | null) => void;
  isScrolled: boolean;
  setIsScrolled: (isScrolled: boolean) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  mousePosition: null,
  setMousePosition: (position) => set({ mousePosition: position }),
  isScrolled: false,
  setIsScrolled: (isScrolled) => set({ isScrolled }),
}));

export const useNavigationState = () => {
  const store = useSyncedStore();
  const navigationStore = useNavigationStore();

  return {
    ...navigationStore,
    isAuthenticated: !!store.state.session,
    user: store.state.user,
  };
};