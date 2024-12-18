import { create } from 'zustand';

export interface LoadingState {
  isLoading: boolean;
  error: Error | null;
  message?: string;
}

export const initialLoadingState: LoadingState = {
  isLoading: false,
  error: null
};

interface LoadingStore extends LoadingState {
  startLoading: (message?: string) => void;
  stopLoading: () => void;
  setError: (error: Error) => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  ...initialLoadingState,
  
  startLoading: (message) => set({ 
    isLoading: true, 
    error: null,
    message 
  }),
  
  stopLoading: () => set({ 
    isLoading: false,
    error: null,
    message: undefined
  }),
  
  setError: (error) => set({
    isLoading: false,
    error
  })
}));