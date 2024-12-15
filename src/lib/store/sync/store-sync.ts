import { atom } from 'jotai';
import { useStore } from '../store';
import type { GlobalState } from '../types';
import type { AuthState } from '../types/auth';
import type { ThemeState } from '../types/store';

// Core sync atom that connects to Zustand store
export const globalStoreAtom = atom<GlobalState>(
  (get) => useStore.getState(),
  (get, set, newState: Partial<GlobalState>) => {
    useStore.setState(newState);
  }
);

// Auth store atom with Zustand sync
export const authStoreAtom = atom<AuthState>(
  (get) => ({
    user: useStore.getState().user,
    session: useStore.getState().session,
    isAuthLoading: useStore.getState().isAuthLoading,
    error: useStore.getState().authError,
    isTransitioning: useStore.getState().isTransitioning,
    hasAccess: useStore.getState().hasAccess
  }),
  (get, set, slice: Partial<AuthState>) => {
    useStore.setState({
      user: slice.user,
      session: slice.session,
      isAuthLoading: slice.isAuthLoading,
      authError: slice.error,
      isTransitioning: slice.isTransitioning,
      hasAccess: slice.hasAccess
    });
  }
);

// Theme store atom with Zustand sync
export const themeStoreAtom = atom<ThemeState>(
  (get) => ({
    theme: useStore.getState().theme,
    settings: useStore.getState().settings,
    mode: useStore.getState().mode,
    isThemeLoading: useStore.getState().isThemeLoading,
    themeError: useStore.getState().themeError
  }),
  (get, set, slice: Partial<ThemeState>) => {
    useStore.setState({
      theme: slice.theme,
      settings: slice.settings,
      mode: slice.mode,
      isThemeLoading: slice.isThemeLoading,
      themeError: slice.themeError
    });
  }
);

// Middleware for Zustand to sync with Jotai
export const createSyncMiddleware = (
  subscribeToStore: (callback: (state: GlobalState) => void) => () => void
) => 
  (set: any, get: any, api: any) =>
    ({
      ...api,
      setState: (updates: Partial<GlobalState>) => {
        set(updates);
        // Trigger Jotai atom updates
        const newState = get();
        globalStoreAtom.onMount = (setAtom) => {
          setAtom(newState);
          return subscribeToStore((state) => setAtom(state));
        };
      }
    });