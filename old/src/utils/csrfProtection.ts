import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CSRFState {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useCSRFStore = create<CSRFState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
    }),
    { name: 'csrf-store' }
  )
);