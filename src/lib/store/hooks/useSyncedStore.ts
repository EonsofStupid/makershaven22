import { useAtomValue, useSetAtom } from 'jotai';
import { useStore } from '../store';
import { globalStoreAtom, authStoreAtom, themeStoreAtom } from '../sync/store-sync';
import type { GlobalState } from '../types';

export const useSyncedStore = () => {
  const globalState = useAtomValue(globalStoreAtom);
  const setGlobalState = useSetAtom(globalStoreAtom);
  const zustandStore = useStore();

  const syncState = (updates: Partial<GlobalState>) => {
    setGlobalState(updates);
    zustandStore.setState(updates);
  };

  return {
    state: globalState,
    setState: syncState,
    // Provide direct access to both stores if needed
    jotaiStore: globalState,
    zustandStore
  };
};

export const useSyncedAuth = () => {
  const authState = useAtomValue(authStoreAtom);
  const setAuthState = useSetAtom(authStoreAtom);
  
  return {
    ...authState,
    setAuthState
  };
};

export const useSyncedTheme = () => {
  const themeState = useAtomValue(themeStoreAtom);
  const setThemeState = useSetAtom(themeStoreAtom);
  
  return {
    ...themeState,
    setThemeState
  };
};