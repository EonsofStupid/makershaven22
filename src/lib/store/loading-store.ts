
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface LoadingState {
  isLoading: boolean;
  message: string | null;
  error: Error | null;
  startLoading: (message?: string) => void;
  stopLoading: () => void;
  setError: (error: Error | null) => void;
}

export const useLoadingStore = create<LoadingState>()(
  devtools(
    (set) => ({
      isLoading: false,
      message: null,
      error: null,
      
      startLoading: (message = 'Loading...') => 
        set({ isLoading: true, message, error: null }),
      
      stopLoading: () => 
        set({ isLoading: false, message: null }),
      
      setError: (error) => 
        set({ error, isLoading: false })
    }),
    { name: 'LoadingStore' }
  )
);
