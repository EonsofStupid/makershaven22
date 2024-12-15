import { Provider } from 'jotai';
import { DevTools } from 'jotai-devtools';
import { useStore } from '../store';
import { StoreSyncProvider } from './SyncProvider';

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize Zustand store
  useStore();

  return (
    <Provider>
      <DevTools />
      <StoreSyncProvider>
        {children}
      </StoreSyncProvider>
    </Provider>
  );
};