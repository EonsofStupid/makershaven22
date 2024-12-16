import { atom } from 'jotai';
import { useStore } from '../store';
import type { GlobalState } from '../types';

export const globalStoreAtom = atom<GlobalState>(useStore.getState());

useStore.subscribe((state) => {
  globalStoreAtom.onMount = (setAtom) => {
    setAtom(state);
  };
});