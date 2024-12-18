import React from 'react';
import { useAuthStore } from '../auth-store';
import { useEffect } from 'react';

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const initialize = useAuthStore(state => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return <>{children}</>;
};