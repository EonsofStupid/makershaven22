import { create } from 'zustand';

interface RateLimitState {
  status: 'allowed' | 'denied';
  message: string;
  setStatus: (status: 'allowed' | 'denied', message: string) => void;
}

export const useRateLimitStore = create<RateLimitState>((set) => ({
  status: 'allowed',
  message: '',
  setStatus: (status, message) => set({ status, message }),
}));