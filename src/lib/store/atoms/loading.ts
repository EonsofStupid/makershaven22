import { atom } from 'jotai';
import { createAtomPair } from '@/lib/types/atom-types';

export interface LoadingState {
  isLoading: boolean;
  message?: string;
  progress?: number;
  timeout?: number;
  error?: Error | null;
  state: 'idle' | 'loading' | 'success' | 'error';
}

const defaultState: LoadingState = {
  isLoading: false,
  state: 'idle',
  error: null
};

const [loadingBaseAtom, loadingWritableAtom] = createAtomPair<LoadingState>({
  default: defaultState,
  onSet: (newState) => {
    console.log('Loading state updated:', newState);
  }
});

export const loadingAtom = loadingBaseAtom;
export const setLoadingAtom = loadingWritableAtom;

// Derived atoms for specific states
export const isLoadingAtom = atom((get) => get(loadingAtom).isLoading);
export const loadingMessageAtom = atom((get) => get(loadingAtom).message);
export const loadingProgressAtom = atom((get) => get(loadingAtom).progress);
export const loadingErrorAtom = atom((get) => get(loadingAtom).error);
export const loadingStateAtom = atom((get) => get(loadingAtom).state);