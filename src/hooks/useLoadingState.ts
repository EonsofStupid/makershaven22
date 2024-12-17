import { useState, useCallback } from 'react';
import { LoadingState, initialLoadingState } from '@/lib/store/atoms/loading';

export const useLoadingState = (initialState?: Partial<LoadingState>) => {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    ...initialLoadingState,
    ...initialState
  });

  const startLoading = useCallback((message?: string) => {
    setLoadingState({
      isLoading: true,
      error: null,
      message
    });
  }, []);

  const stopLoading = useCallback(() => {
    setLoadingState({
      isLoading: false,
      error: null
    });
  }, []);

  const setError = useCallback((error: Error) => {
    setLoadingState({
      isLoading: false,
      error
    });
  }, []);

  return {
    ...loadingState,
    startLoading,
    stopLoading,
    setError
  };
};