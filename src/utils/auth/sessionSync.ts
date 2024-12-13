import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const initializeSessionSync = () => {
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === 'supabase.auth.token') {
      window.location.reload();
    }
  };

  window.addEventListener('storage', handleStorageChange);
  return () => window.removeEventListener('storage', handleStorageChange);
};

export const syncSessionState = async (
  session: Session | null,
  setSession: (session: Session | null) => void,
  onError?: (error: Error) => void
) => {
  try {
    if (session) {
      const { data: { session: currentSession }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      if (currentSession) {
        setSession(currentSession);
        console.log('Session synced successfully');
      } else {
        setSession(null);
        console.log('No active session found during sync');
      }
    } else {
      setSession(null);
      console.log('Session cleared during sync');
    }
  } catch (error) {
    console.error('Error syncing session:', error);
    onError?.(error instanceof Error ? error : new Error('Failed to sync session'));
    toast.error('Failed to sync session state');
  }
};