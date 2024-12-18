import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SessionState {
  session: any | null;
  setSession: (session: any | null) => void;
  clearSession: () => void;
}

class SessionManagerClass {
  private static instance: SessionManagerClass;
  private initialized: boolean = false;

  private constructor() {}

  public static getInstance(): SessionManagerClass {
    if (!SessionManagerClass.instance) {
      SessionManagerClass.instance = new SessionManagerClass();
    }
    return SessionManagerClass.instance;
  }

  public startSession(): void {
    if (this.initialized) {
      console.log('Session already initialized');
      return;
    }
    this.initialized = true;
    console.log('Session started');
  }

  public destroy(): void {
    this.initialized = false;
    console.log('Session destroyed');
  }
}

export const sessionManager = SessionManagerClass.getInstance();

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