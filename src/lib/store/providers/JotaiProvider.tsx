import { Provider } from 'jotai';
import { DevTools } from 'jotai-devtools';

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider>
      <DevTools />
      {children}
    </Provider>
  );
};