import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { AuthUser, UserRole } from '@/lib/auth/types/auth';

export const userAtom = atomWithStorage<AuthUser | null>('auth_user', null);

export const setUserAtom = atom(
  (get) => get(userAtom),
  (_get, set, user: AuthUser | null) => {
    set(userAtom, user);
  }
);

export const userRoleAtom = atom(
  (get) => get(userAtom)?.role || null
);

export const isAdminAtom = atom(
  (get) => {
    const role = get(userRoleAtom);
    return role === 'admin' || role === 'super_admin';
  }
);

export const hasRoleAtom = atom(
  (get) => (requiredRole: UserRole | UserRole[]) => {
    const userRole = get(userRoleAtom);
    if (!userRole) return false;
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    return roles.includes(userRole);
  }
);