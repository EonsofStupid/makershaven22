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
    const newState: LoadingState = {
      isLoading: true,
      state: 'loading',
      message,
      error: null
    };
    setLoading(newState);

    if (options.timeout) {
      setTimeout(() => {
        setLoading({
          isLoading: false,
          state: 'error',
          error: new Error('Operation timed out'),
          message: 'Operation timed out'
        });
        options.onTimeout?.();
        toast.error('Operation timed out', {
          description: 'The request took too long to complete'
        });
      }, options.timeout);
    }
  }, [setLoading, options]);

  const stopLoading = useCallback((state: LoadingState['state'] = 'idle') => {
    const newState: LoadingState = {
      isLoading: false,
      state,
      error: null
    };
    setLoading(newState);
  }, [setLoading]);

  const setError = useCallback((error: Error) => {
    const newState: LoadingState = {
      isLoading: false,
      state: 'error',
      error,
      message: error.message
    };
    setLoading(newState);
    toast.error('Error', {
      description: error.message
    });
  }, [setLoading]);

  const setProgress = useCallback((progress: number) => {
    setLoading({
      ...loadingState,
      progress
    });
  }, [setLoading, loadingState]);

  return {
    ...loadingState,
    startLoading,
    stopLoading,
    setError,
    setProgress
  };
};