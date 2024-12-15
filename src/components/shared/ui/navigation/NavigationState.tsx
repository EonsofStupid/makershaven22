import { create } from 'zustand';
import { useSyncedStore } from '@/lib/store/hooks/useSyncedStore';

interface NavigationState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
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