import { atom } from 'jotai';

export interface LoadingState {
  isLoading: boolean;
  message?: string;
  progress?: number;
  details?: string;
}

export const loadingAtom = atom<LoadingState>({
  isLoading: false
});

export const setLoadingAtom = atom(
  (get) => get(loadingAtom),
  (_get, set, update: Partial<LoadingState> | ((prev: LoadingState) => LoadingState)) => {
    if (typeof update === 'function') {
      set(loadingAtom, (prev) => update(prev));
    } else {
      set(loadingAtom, (prev) => ({ ...prev, ...update }));
    }
  }
);