import { atom } from 'jotai';

// Base error atom
export const authErrorAtom = atom<Error | null>(null);

// Setter atom for errors
export const setAuthErrorAtom = atom(
  null,
  (_get, set, error: Error | null) => {
    set(authErrorAtom, error);
  }
);

// Derived error state
export const hasErrorAtom = atom(
  (get) => get(authErrorAtom) !== null
);