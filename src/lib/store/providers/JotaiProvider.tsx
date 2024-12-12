import { Provider as JotaiProvider } from 'jotai';
import { useAtomValue } from 'jotai';
import { debugModeAtom } from '../atoms/core';

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const debugMode = useAtomValue(debugModeAtom);

  return (
    <JotaiProvider>
      {children}
    </JotaiProvider>
  );
};