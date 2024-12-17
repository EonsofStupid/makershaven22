import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useTwoFactorStore } from '@/zustand/stores/twoFactorStore';

export const useTwoFactorVerification = (email: string, password: string) => {
  const navigate = useNavigate();
  const {
    code,
    setCode,
    isLoading,
    setIsLoading,
    error,
    setError,
  } = useTwoFactorStore();

  const handleVerification = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: verifyError } = await supabase.rpc('verify_2fa_code', {
        p_code: code,
        p_email: email,
      });

      if (verifyError) throw verifyError;

      const result = data as { verified: boolean };

      if (result.verified) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        toast.success('Successfully verified!');
        navigate('/');
      } else {
        setError('Invalid verification code');
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError(err instanceof Error ? err.message : 'Verification failed');
      toast.error('Verification failed');
    } finally {
      setIsLoading(false);
    }
  }, [code, email, password, navigate, setError, setIsLoading]);

  const handleResendCode = useCallback(async () => {
    try {
      const { error } = await supabase.rpc('resend_2fa_code', {
        p_email: email,
      });

      if (error) throw error;

      toast.success('Verification code resent');
    } catch (err) {
      console.error('Error resending code:', err);
      toast.error('Failed to resend code');
    }
  }, [email]);

  return {
    code,
    setCode,
    isLoading,
    error,
    handleVerification,
    handleResendCode,
  };
};
