export interface LoadingState {
  isLoading: boolean;
  error: Error | null;
  message?: string;
}

export const initialLoadingState: LoadingState = {
  isLoading: false,
  error: null,
  message: undefined
};