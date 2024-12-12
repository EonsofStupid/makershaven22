import { Getter, Setter, WritableAtom } from 'jotai';
import type { AuthSession, AuthUser } from '@/lib/auth/types/auth';

// Base atom value wrapper to include metadata
export interface AtomValue<T> {
  value: T;
  version: number;
  lastUpdated: Date;
}

// Generic type for auth-related atom values
export type AuthAtomValue<T> = AtomValue<T>;

// Type-safe atom getter and setter functions
export type AuthAtomGetter<T> = (get: Getter) => AuthAtomValue<T>;
export type AuthAtomSetter<T> = (
  get: Getter,
  set: Setter,
  update: T | ((prev: T) => T)
) => void;

// Writable atom type for auth state
export type AuthWritableAtom<Value> = WritableAtom<
  AuthAtomValue<Value>,
  [Value | ((prev: Value) => Value)],
  void
>;

// Auth state specific types
export interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  isOffline: boolean;
  isTransitioning: boolean;
}

// Utility type for creating auth atoms
export type AuthAtomCreator = <T>(initialValue: T) => AuthWritableAtom<T>;