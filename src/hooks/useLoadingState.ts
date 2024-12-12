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
  retryAttempts?: number;
  retryDelay?: number;
}

export const useLoadingState = (options: UseLoadingStateOptions = {}) => {
  const [loadingState] = useAtom(loadingAtom);
  const [, setLoading] = useAtom(setLoadingAtom);
  
  const DEFAULT_TIMEOUT = 120000; // 2 minutes
  const PROGRESS_INTERVAL = options.progressInterval || 1000;
  const MAX_RETRY_ATTEMPTS = options.retryAttempts || 3;
  const RETRY_DELAY = options.retryDelay || 2000;

  const startLoading = useCallback((message?: string) => {
    let timeoutId: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;
    let progress = 0;
    let retryCount = 0;

    const cleanup = () => {
      clearTimeout(timeoutId);
      clearInterval(progressInterval);
      setLoading({
        isLoading: false,
        state: 'idle',
        error: null,
        progress: 0
      });
    };

    const handleTimeout = async () => {
      clearInterval(progressInterval);
      
      if (retryCount < MAX_RETRY_ATTEMPTS) {
        retryCount++;
        console.log(`Retry attempt ${retryCount}/${MAX_RETRY_ATTEMPTS}`);
        
        setLoading({
          isLoading: true,
          state: 'loading',
          message: `Retrying... (Attempt ${retryCount}/${MAX_RETRY_ATTEMPTS})`,
          progress: 0
        });

        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        startLoading(message);
        return;
      }

      setLoading({
        isLoading: false,
        state: 'error',
        error: new Error('Operation timed out after multiple retries'),
        message: 'Operation timed out',
        progress: 100
      });

      options.onTimeout?.();
      toast.error('Operation timed out', {
        description: 'The request took too long to complete after multiple retries.'
      });
    };

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
      
      progressInterval = setInterval(() => {
        // Slower initial progress, faster towards the end
        const increment = progress < 70 ? 0.5 : 0.2;
        progress = Math.min(95, progress + increment);
        
        setLoading({
          ...newState,
          progress
        });
      }, PROGRESS_INTERVAL);

      timeoutId = setTimeout(handleTimeout, timeout);
    }

    return cleanup;
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
    console.error('Loading error:', error);
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

  const setProgress = useCallback((progress: number, message?: string) => {
    setLoading(prev => ({
      ...prev,
      progress,
      message: message || prev.message
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