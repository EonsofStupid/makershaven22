import { create } from 'zustand';
import { useSyncedStore } from '@/lib/store/hooks/useSyncedStore';

interface NavigationState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  mousePosition: { x: number; y: number };
  setMousePosition: (position: { x: number; y: number }) => void;
  isScrolled: boolean;
  setIsScrolled: (isScrolled: boolean) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  mousePosition: { x: 50, y: 50 }, // Default center position
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