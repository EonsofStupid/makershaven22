// src/lib/store/protected-route-store.ts
import { create } from 'zustand';

interface ProtectedRouteState {
  isLoading: boolean;
  isVerifying: boolean;
  setIsLoading: (state: boolean) => void;
  setIsVerifying: (state: boolean) => void;
}

export const useProtectedRouteStore = create<ProtectedRouteState>((set) => ({
  isLoading: true,
  isVerifying: true,
  setIsLoading: (state) => set({ isLoading: state }),
  setIsVerifying: (state) => set({ isVerifying: state }),
}));

// Updated ProtectedRoute.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useToast } from '@/components/ui/use-toast';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useProtectedRouteStore } from '@/lib/store/protected-route-store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isLoading, isVerifying, setIsLoading, setIsVerifying } = useProtectedRouteStore();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Session verification timeout')), 5000)
        );
        const sessionPromise = supabase.auth.getSession();

        const result = await Promise.race([sessionPromise, timeoutPromise]);
        if (!result?.data?.session) {
          toast({ title: 'Session expired. Please log in again.' });
          navigate('/login');
        }
      } catch (error) {
        toast({ title: 'Error verifying session', description: error.message, variant: 'destructive' });
        navigate('/login');
      } finally {
        setIsLoading(false);
        setIsVerifying(false);
      }
    };
    checkSession();
  }, [supabase, navigate, toast, setIsLoading, setIsVerifying]);

  if (isLoading || isVerifying) return <LoadingSpinner />;

  return <>{children}</>;
};
