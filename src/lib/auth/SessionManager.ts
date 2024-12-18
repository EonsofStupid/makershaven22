import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SessionState {
  session: any | null;
  setSession: (session: any | null) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      session: null,
      setSession: (session) => set({ session }),
      clearSession: () => set({ session: null }),
    }),
    { name: 'session-store' }
  )
);