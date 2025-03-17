
import { create } from 'zustand';

interface NavigationState {
  isScrolled: boolean;
  mousePosition: { x: number; y: number };
  setIsScrolled: (value: boolean) => void;
  setMousePosition: (position: { x: number; y: number }) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  isScrolled: false,
  mousePosition: { x: 50, y: 50 },
  setIsScrolled: (value) => set({ isScrolled: value }),
  setMousePosition: (position) => set({ mousePosition: position }),
}));
