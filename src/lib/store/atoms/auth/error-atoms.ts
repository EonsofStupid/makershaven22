import { atom } from 'jotai';

// Base atoms
export const authErrorAtom = atom<Error | null>(null);

// Setter atoms
export const setAuthErrorAtom = atom(
  null,
  (_, set, error: Error | null) => {
    set(authErrorAtom, error);
  }
);

// Derived atoms
export const hasErrorAtom = atom(
  (get) => get(authErrorAtom) !== null
);