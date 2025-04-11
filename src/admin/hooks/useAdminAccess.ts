
import { useAuthState } from '@/auth/hooks/useAuthState';
import { useState, useEffect } from 'react';

/**
 * Hook to check admin access
 */
export function useAdminAccess() {
  const { isAdmin, isLoading } = useAuthState();
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setHasAccess(isAdmin);
    }
  }, [isAdmin, isLoading]);

  return {
    hasAccess,
    isLoading
  };
}
