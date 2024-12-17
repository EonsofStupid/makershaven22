import { Getter, Setter, WritableAtom } from 'jotai';
import type { AuthSession, AuthUser } from '@/lib/auth/types/auth';

export interface AtomValue<T> {
  data: T;
  metadata: {
    version: number;
    lastUpdated: Date;
  };
}

export type AuthAtomValue<T> = AtomValue<T>;

export type AuthAtomGetter<T> = (get: Getter) => T;
export type AuthAtomSetter<T> = (
  get: Getter,
  set: Setter,
  update: T | ((prev: T) => T)
) => void;

export type AuthWritableAtom<T> = WritableAtom<
  T,
  [T | ((prev: T) => T)],
  void
>;

export interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  isOffline: boolean;
  isTransitioning: boolean;
}

export type AuthAtomCreator = <T>(initialValue: T) => AuthWritableAtom<T>;