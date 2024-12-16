import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const authErrorAtom = atomWithStorage<Error | null>('auth_error', null);

export const setAuthErrorAtom = atom(
  (get) => get(authErrorAtom),
  (_get, set, error: Error | null) => {
    set(authErrorAtom, error);
  }
);

export const hasErrorAtom = atom(
  (get) => get(authErrorAtom) !== null
);