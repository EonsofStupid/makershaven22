import { atom } from 'jotai';
import { useStore } from '../store';
import type { GlobalState } from '../types';

// Core sync atom that connects to Zustand store
export const globalStoreAtom = atom<GlobalState>(
  (get) => useStore.getState(),
  (get, set, newState: Partial<GlobalState>) => {
    useStore.setState(newState);
  }
);

// Selective atoms for specific state slices
export const authStoreAtom = atom(
  (get) => ({
    user: useStore.getState().user,
    session: useStore.getState().session,
    isAuthLoading: useStore.getState().isAuthLoading,
    authError: useStore.getState().authError
  }),
  (get, set, slice: Partial<GlobalState>) => {
    useStore.setState(slice);
  }
);

export const themeStoreAtom = atom(
  (get) => ({
    theme: useStore.getState().theme,
    settings: useStore.getState().settings,
    mode: useStore.getState().mode,
    isThemeLoading: useStore.getState().isThemeLoading,
    themeError: useStore.getState().themeError
  }),
  (get, set, slice: Partial<GlobalState>) => {
    useStore.setState(slice);
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