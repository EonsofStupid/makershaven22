import { atom } from 'jotai';
import { useStore } from '../store';
import type { GlobalState } from '../types';
import type { AuthState } from '../auth/types';
import type { ThemeState } from '../theme/state';

// Global store atom
export const globalStoreAtom = atom<GlobalState>(useStore.getState());

// Auth store atom
export const authStoreAtom = atom<AuthState>({
  user: null,
  session: null,
  isLoading: false,
  error: null,
  isTransitioning: false,
  hasAccess: false
});

// Theme store atom
export const themeStoreAtom = atom<ThemeState>({
  theme: null,
  settings: null,
  mode: 'system',
  isThemeLoading: false,
  themeError: null
});

// Subscribe to Zustand store changes
useStore.subscribe((state) => {
  const setGlobalStore = globalStoreAtom.onMount;
  if (setGlobalStore) {
    setGlobalStore(state);
  }
});