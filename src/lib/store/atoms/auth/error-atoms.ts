import { atom } from 'jotai';

// Base error atom with proper WritableAtom type
export const authErrorAtom = atom<Error | null>(null);

// Setter atom for errors with proper types
export const setAuthErrorAtom = atom(
  (get) => get(authErrorAtom),
  (_get, set, error: Error | null) => {
    set(authErrorAtom, error);
  }
);

// Derived error state
export const hasErrorAtom = atom(
  (get) => get(authErrorAtom) !== null
);