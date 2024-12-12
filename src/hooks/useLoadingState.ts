import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { toast } from 'sonner';
import { 
  loadingAtom, 
  setLoadingAtom, 
  LoadingState 
} from '@/lib/store/atoms/loading';

interface UseLoadingStateOptions {
  timeout?: number;
  onTimeout?: () => void;
}

export const useLoadingState = (options: UseLoadingStateOptions = {}) => {
  const [loadingState] = useAtom(loadingAtom);
  const [, setLoading] = useAtom(setLoadingAtom);

  const startLoading = useCallback((message?: string) => {
    setLoading({
      isLoading: true,
      state: 'loading',
      message,
      error: null
    });

    if (options.timeout) {
      setTimeout(() => {
        setLoading((prev: LoadingState) => {
          if (prev.isLoading) {
            options.onTimeout?.();
            toast.error('Operation timed out', {
              description: 'The request took too long to complete'
            });
            return {
              ...prev,
              isLoading: false,
              state: 'error',
              error: new Error('Operation timed out')
            };
          }
          return prev;
        });
      }, options.timeout);
    }
  }, [setLoading, options]);

  const stopLoading = useCallback((state: LoadingState['state'] = 'idle') => {
    setLoading({
      isLoading: false,
      state,
      error: null
    });
  }, [setLoading]);

  const setError = useCallback((error: Error) => {
    setLoading({
      isLoading: false,
      state: 'error',
      error
    });
    toast.error('Error', {
      description: error.message
    });
  }, [setLoading]);

  const setProgress = useCallback((progress: number) => {
    setLoading((prev: LoadingState) => ({
      ...prev,
      progress
    }));
  }, [setLoading]);

  return {
    ...loadingState,
    startLoading,
    stopLoading,
    setError,
    setProgress
  };
};