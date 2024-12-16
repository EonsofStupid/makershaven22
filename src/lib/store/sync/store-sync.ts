import { atom } from 'jotai';
import { useStore } from '../store';
import type { GlobalState } from '../types';
import type { AuthState } from '../types/auth';
import type { ThemeState } from '../types/theme';

// Core sync atom that connects to Zustand store
export const globalStoreAtom = atom<GlobalState>(useStore.getState());

// Auth store atom with Zustand sync
export const authStoreAtom = atom<AuthState>({
  user: useStore.getState().user,
  session: useStore.getState().session,
  isAuthLoading: useStore.getState().isAuthLoading,
  error: useStore.getState().authError,
  isTransitioning: useStore.getState().isTransitioning,
  hasAccess: useStore.getState().hasAccess
});

// Theme store atom with Zustand sync
export const themeStoreAtom = atom<ThemeState>({
  theme: useStore.getState().theme,
  settings: useStore.getState().settings,
  mode: useStore.getState().mode,
  isThemeLoading: useStore.getState().isThemeLoading,
  themeError: useStore.getState().themeError
});

// Subscribe to Zustand store changes
useStore.subscribe((state) => {
  // Update auth state
  authStoreAtom.onMount = (setAtom) => {
    setAtom({
      user: state.user,
      session: state.session,
      isAuthLoading: state.isAuthLoading,
      error: state.authError,
      isTransitioning: state.isTransitioning,
      hasAccess: state.hasAccess
    });
  };

  // Update theme state
  themeStoreAtom.onMount = (setAtom) => {
    setAtom({
      theme: state.theme,
      settings: state.settings,
      mode: state.mode,
      isThemeLoading: state.isThemeLoading,
      themeError: state.themeError
    });
  };
});