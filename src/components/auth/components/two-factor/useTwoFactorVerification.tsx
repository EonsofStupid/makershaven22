import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useTwoFactorVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const verifyCode = async (code: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.rpc('verify_2fa_code', {
        p_code: code,
        p_email: ''  // Email will be handled by the session
      });

      if (error) throw error;

      return data;
    } catch (err) {
      const error = err as Error;
      setError(error);
      toast.error('Verification failed', {
        description: error.message
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    verifyCode,
    isLoading,
    error
  };
};