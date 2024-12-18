import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/auth-store';
import { toast } from 'sonner';

export const useAuthSetup = () => {
  const { initialize, setLoading, setError } = useAuthStore();

  useEffect(() => {
    const setupAuth = async () => {
      try {
        console.log('Starting auth setup');
        setLoading(true);
        await initialize();
      } catch (error) {
        console.error('Auth setup error:', error);
        setError(error as any);
        toast.error('Failed to initialize authentication');
      }
    };

    setupAuth();
  }, [initialize, setLoading, setError]);

  return null;
};