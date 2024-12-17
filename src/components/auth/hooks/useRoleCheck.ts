import { useState, useEffect } from 'react';
import { useAuthStore } from '@/lib/store/auth-store';
import type { UserRole } from '@/lib/types/store-types';

export const useRoleCheck = (requiredRole: UserRole | UserRole[]) => {
  const { user } = useAuthStore();
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (!user || !user.role) {
      setHasAccess(false);
      return;
    }

    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    setHasAccess(roles.includes(user.role));
  }, [user, requiredRole]);

  return hasAccess;
};