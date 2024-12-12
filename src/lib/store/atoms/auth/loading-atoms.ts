import { atom } from 'jotai';

export interface LoadingState {
  isLoading: boolean;
  message?: string;
  progress?: number;
  details?: string;
}

// Base loading atoms
export const loadingStateAtom = atom<LoadingState>({
  isLoading: false,
  message: undefined,
  progress: undefined,
  details: undefined
});

export const isTransitioningAtom = atom<boolean>(false);

// Derived loading atoms
export const isLoadingAtom = atom(
  (get) => get(loadingStateAtom).isLoading
);

export const loadingMessageAtom = atom(
  (get) => get(loadingStateAtom).message
);

// Setter atoms
export const setLoadingStateAtom = atom(
  null,
  (get, set, update: Partial<LoadingState>) => {
    const current = get(loadingStateAtom);
    set(loadingStateAtom, { ...current, ...update });
  }
);

export const setIsTransitioningAtom = atom(
  null,
  (_, set, update: boolean) => {
    set(isTransitioningAtom, update);
  }
);