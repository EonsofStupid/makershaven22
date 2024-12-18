import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SessionState {
  session: any | null;
  setSession: (session: any | null) => void;
  clearSession: () => void;
}

export class SessionManager {
  private static instance: SessionManager;
  private initialized: boolean = false;

  private constructor() {}

  public static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
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

export const sessionManager = SessionManager.getInstance();

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