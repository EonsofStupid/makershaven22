import { Provider } from 'jotai';
import { DevTools } from 'jotai-devtools';
import { useGlobalStore } from '../global-store';

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize Zustand store
  useGlobalStore();

  return (
    <Provider>
      <DevTools />
      {children}
    </Provider>
  );
};