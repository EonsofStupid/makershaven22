import { useAtomValue, useSetAtom } from 'jotai';
import { useStore } from '../store';
import { globalStoreAtom } from '../sync/store-sync';
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
    jotaiStore: globalState,
    zustandStore
  };
};