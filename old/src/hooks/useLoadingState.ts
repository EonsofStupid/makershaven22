import { useLoadingStore } from '@/lib/store/loading-store';

export const useLoadingState = () => {
  const { 
    isLoading,
    error,
    message,
    startLoading,
    stopLoading,
    setError
  } = useLoadingStore();

  return {
    isLoading,
    error,
    message,
    startLoading,
    stopLoading,
    setError
  };
};