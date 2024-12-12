import { Provider as JotaiProvider } from 'jotai';
import { DevTools } from 'jotai-devtools';
import { useAtomsDebugValue } from 'jotai/devtools';
import { debugModeAtom } from '../atoms/core';
import { useAtomValue } from 'jotai';

const AtomsDevTools = () => {
  useAtomsDebugValue();
  return null;
};

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const debugMode = useAtomValue(debugModeAtom);

  return (
    <JotaiProvider>
      {debugMode && (
        <>
          <DevTools />
          <AtomsDevTools />
        </>
      )}
      {children}
    </JotaiProvider>
  );
};