import { atom } from 'jotai';

export interface LoadingState {
  isLoading: boolean;
  state: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
  error?: Error | null;
  progress?: number;
}

// Base loading atom
export const loadingAtom = atom<LoadingState>({
  isLoading: false,
  state: 'idle',
  error: null,
});

// Setter atom with proper typing
export const setLoadingAtom = atom(
  (get) => get(loadingAtom),
  (_get, set, update: LoadingState) => {
    set(loadingAtom, update);
  }
);