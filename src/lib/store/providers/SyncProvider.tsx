import React, { useEffect } from 'react';
import { Provider, useAtom } from 'jotai';
import { useStore } from '../store';
import { globalStoreAtom, authStoreAtom, themeStoreAtom } from '../sync/store-sync';

export const StoreSyncProvider = ({ children }: { children: React.ReactNode }) => {
  const [, setGlobalStore] = useAtom(globalStoreAtom);
  const [, setAuthStore] = useAtom(authStoreAtom);
  const [, setThemeStore] = useAtom(themeStoreAtom);

  useEffect(() => {
    // Subscribe to Zustand store changes
    const unsubscribe = useStore.subscribe((state) => {
      console.log('Zustand store updated:', state);
      setGlobalStore(state);
      
      // Update individual slices
      setAuthStore({
        user: state.user,
        session: state.session,
        isAuthLoading: state.isAuthLoading,
        authError: state.authError
      });
      
      setThemeStore({
        theme: state.theme,
        settings: state.settings,
        mode: state.mode,
        isThemeLoading: state.isThemeLoading,
        themeError: state.themeError
      });
    });

    return () => unsubscribe();
  }, [setGlobalStore, setAuthStore, setThemeStore]);

  return <>{children}</>;
};