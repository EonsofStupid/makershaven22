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
  progressInterval?: number;
}

export const useLoadingState = (options: UseLoadingStateOptions = {}) => {
  const [loadingState] = useAtom(loadingAtom);
  const [, setLoading] = useAtom(setLoadingAtom);
  
  // Increased default timeout to 2 minutes for auth operations
  const DEFAULT_TIMEOUT = 120000; // 2 minutes
  const PROGRESS_INTERVAL = options.progressInterval || 1000; // 1 second default

  const startLoading = useCallback((message?: string) => {
    let timeoutId: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;
    let progress = 0;

    const newState: LoadingState = {
      isLoading: true,
      state: 'loading',
      message,
      error: null,
      progress: 0
    };
    
    setLoading(newState);

    if (options.timeout || DEFAULT_TIMEOUT) {
      const timeout = options.timeout || DEFAULT_TIMEOUT;
      
      // Set up progress updates
      progressInterval = setInterval(() => {
        progress = Math.min(95, progress + (100 * PROGRESS_INTERVAL) / timeout);
        setLoading(prev => ({
          ...prev,
          progress
        }));
      }, PROGRESS_INTERVAL);

      timeoutId = setTimeout(() => {
        clearInterval(progressInterval);
        setLoading({
          isLoading: false,
          state: 'error',
          error: new Error('Operation timed out'),
          message: 'Operation timed out',
          progress: 100
        });
        options.onTimeout?.();
        toast.error('Operation timed out', {
          description: 'The request took too long to complete. Please try again.'
        });
      }, timeout);

      // Return cleanup function
      return () => {
        clearTimeout(timeoutId);
        clearInterval(progressInterval);
      };
    }
  }, [setLoading, options]);

  const stopLoading = useCallback((state: LoadingState['state'] = 'idle') => {
    setLoading({
      isLoading: false,
      state,
      error: null,
      progress: 100
    });
  }, [setLoading]);

  const setError = useCallback((error: Error) => {
    setLoading({
      isLoading: false,
      state: 'error',
      error,
      message: error.message,
      progress: 100
    });
    toast.error('Error', {
      description: error.message
    });
  }, [setLoading]);

  const setProgress = useCallback((progress: number) => {
    setLoading(prev => ({
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