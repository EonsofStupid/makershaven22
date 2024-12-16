import { atom } from 'jotai';

export interface LoadingState {
  isLoading: boolean;
  message?: string;
  progress?: number;
  details?: string;
}

// Base loading atoms with proper WritableAtom type
export const loadingStateAtom = atom<LoadingState>({
  isLoading: false,
  message: undefined,
  progress: undefined,
  details: undefined
});

export const authLoadingAtom = atom<boolean>(false);
export const isTransitioningAtom = atom<boolean>(false);

// Derived loading atoms
export const isLoadingAtom = atom(
  (get) => get(loadingStateAtom).isLoading
);

export const loadingMessageAtom = atom(
  (get) => get(loadingStateAtom).message
);

// Setter atoms with proper types
export const setLoadingStateAtom = atom(
  (get) => get(loadingStateAtom),
  (_get, set, update: Partial<LoadingState>) => {
    set(loadingStateAtom, (prev) => ({ ...prev, ...update }));
  }
);

export const setIsTransitioningAtom = atom(
  (get) => get(isTransitioningAtom),
  (_get, set, isTransitioning: boolean) => {
    set(isTransitioningAtom, isTransitioning);
  }
);

export const setAuthLoadingAtom = atom(
  (get) => get(authLoadingAtom),
  (_get, set, isLoading: boolean) => {
    set(authLoadingAtom, isLoading);
  }
);