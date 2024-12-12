import { atom } from 'jotai';
import type { AuthUser, UserRole } from '@/lib/auth/types/auth';

// Base user atom
export const userAtom = atom<AuthUser | null>(null);

// Setter atom for user
export const setUserAtom = atom<AuthUser | null, AuthUser | null>(
  (get) => get(userAtom),
  (_, set, update) => {
    set(userAtom, update);
  }
);

// User role atoms
export const userRoleAtom = atom((get) => {
  const user = get(userAtom);
  return user?.role || null;
});

export const isAdminAtom = atom((get) => {
  const role = get(userRoleAtom);
  return role === 'admin' || role === 'super_admin';
});

export const hasRoleAtom = atom<(requiredRole: UserRole | UserRole[]) => boolean>(
  (get) => (requiredRole: UserRole | UserRole[]) => {
    const userRole = get(userRoleAtom);
    if (!userRole) return false;
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    return roles.includes(userRole);
  }
);