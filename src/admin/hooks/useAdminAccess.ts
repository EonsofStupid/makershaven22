
import { useAuthState } from '../../auth/hooks/useAuthState';
import { useState, useEffect } from 'react';

/**
 * Hook to check admin access
 */
export function useAdminAccess() {
  const { isAdmin, isLoading } = useAuthState();
  const [hasAccess, setHasAccess] = useState(false);
  const [hasAdminAccess, setHasAdminAccess] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setHasAccess(isAdmin);
      setHasAdminAccess(isAdmin);
    }
  }, [isAdmin, isLoading]);

  return {
    hasAccess,
    hasAdminAccess,
    isLoading
  };
}
