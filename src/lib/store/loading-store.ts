
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

interface LoadingState {
  isLoading: boolean;
  status: LoadingStatus;
  message: string | null;
  error: Error | null;
  
  startLoading: (message?: string) => void;
  stopLoading: (status?: 'success' | 'error') => void;
  setError: (error: Error | null) => void;
  resetState: () => void;
}

export const useLoadingStore = create<LoadingState>()(
  devtools(
    (set) => ({
      isLoading: false,
      status: 'idle',
      message: null,
      error: null,
      
      startLoading: (message = 'Loading...') => 
        set({ isLoading: true, status: 'loading', message, error: null }),
      
      stopLoading: (status = 'success') => 
        set({ isLoading: false, status, message: null }),
      
      setError: (error) => 
        set({ error, isLoading: false, status: 'error' }),
        
      resetState: () =>
        set({ isLoading: false, status: 'idle', message: null, error: null })
    }),
    { name: 'LoadingStore' }
  )
);
