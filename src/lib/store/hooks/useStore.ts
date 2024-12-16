import { useStore as useZustandStore } from '../store';
import type { GlobalState } from '../../types/base';

export const useStore = () => {
  const store = useZustandStore();

  return {
    ...store,
    // Add any computed values or additional functionality here
    isAuthenticated: !!store.session && !!store.user,
    isAdmin: store.user?.role === 'admin' || store.user?.role === 'super_admin',
    isMaker: store.user?.role === 'maker' || store.user?.role === 'admin' || store.user?.role === 'super_admin'
  };
};

export type Store = ReturnType<typeof useStore>;
