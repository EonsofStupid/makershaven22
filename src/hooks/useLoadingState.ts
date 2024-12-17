import { create } from 'zustand';

interface LoadingState {
  isLoading: boolean;
  error: Error | null;
  message?: string;
  startLoading: (message?: string) => void;
  stopLoading: () => void;
  setError: (error: Error) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  error: null,
  message: undefined,

  startLoading: (message) => set({ isLoading: true, error: null, message }),
  stopLoading: () => set({ isLoading: false, error: null }),
  setError: (error) => set({ isLoading: false, error }),
}));

// Updated Hook
export const useLoadingState = () => {
  const { isLoading, error, message, startLoading, stopLoading, setError } = useLoadingStore();
  return { isLoading, error, message, startLoading, stopLoading, setError };
};
