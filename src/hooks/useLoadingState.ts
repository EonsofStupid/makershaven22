// Refactored `useLoadingState` hook to use Zustand and align with `auth-store.ts`

import { useCallback } from 'react';
import { useLoadingStore } from '@/zustand/stores/loadingStore';

export const useLoadingState = () => {
  const { loadingState, setLoading, setError, resetLoading } = useLoadingStore();

  const startLoading = useCallback((message?: string) => {
    setLoading({
      isLoading: true,
      error: null,
      message,
    });
  }, [setLoading]);

  const stopLoading = useCallback(() => {
    resetLoading();
  }, [resetLoading]);

  const setErrorState = useCallback((error: Error) => {
    setError({
      isLoading: false,
      error: error.message,
    });
  }, [setError]);

  return {
    ...loadingState,
    startLoading,
    stopLoading,
    setError: setErrorState,
  };
};
