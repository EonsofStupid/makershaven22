import { atom } from 'jotai';

export type LoadingState = {
  isLoading: boolean;
  message?: string;
  progress?: number;
  timeout?: number;
  error?: Error | null;
  state: 'idle' | 'loading' | 'success' | 'error';
};

const defaultState: LoadingState = {
  isLoading: false,
  state: 'idle',
  error: null
};

export const loadingAtom = atom<LoadingState>(defaultState);
export const setLoadingAtom = atom(
  null,
  (_, set, update: Partial<LoadingState>) => {
    set(loadingAtom, (prev) => ({
      ...prev,
      ...update
    }));
  }
);

// Derived atoms for specific states
export const isLoadingAtom = atom((get) => get(loadingAtom).isLoading);
export const loadingMessageAtom = atom((get) => get(loadingAtom).message);
export const loadingProgressAtom = atom((get) => get(loadingAtom).progress);
export const loadingErrorAtom = atom((get) => get(loadingAtom).error);
export const loadingStateAtom = atom((get) => get(loadingAtom).state);