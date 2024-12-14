import { useState, useCallback } from 'react';
import { AuthErrorCode } from '@/lib/auth/types/errors';

export const useAuthValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = useCallback((email: string) => {
    if (!email) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
      return false;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setErrors(prev => ({ ...prev, email: 'Invalid email address' }));
      return false;
    }
    setErrors(prev => ({ ...prev, email: '' }));
    return true;
  }, []);

  const validatePassword = useCallback((password: string) => {
    if (!password) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
      return false;
    }
    if (password.length < 6) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));
      return false;
    }
    setErrors(prev => ({ ...prev, password: '' }));
    return true;
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateEmail,
    validatePassword,
    clearErrors
  };
};