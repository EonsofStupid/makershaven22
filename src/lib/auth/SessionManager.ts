import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SessionState {
  session: any | null;
  setSession: (session: any | null) => void;
  clearSession: () => void;
}

export class SessionManager {
  private static instance: SessionManager | null = null;
  private initialized: boolean = false;

  private constructor() {
    // Private constructor to enforce singleton
    this.initialize = this.initialize.bind(this);
    this.startSession = this.startSession.bind(this);
    this.destroy = this.destroy.bind(this);
    this.cleanup = this.cleanup.bind(this);
    this.clearSecurityData = this.clearSecurityData.bind(this);
  }

  public static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  public initialize(): void {
    if (this.initialized) {
      console.log('Session already initialized');
      return;
    }
    this.initialized = true;
    console.log('Session initialized');
  }

  public startSession(): void {
    if (!this.initialized) {
      this.initialize();
    }
    console.log('Session started');
  }

  public destroy(): void {
    if (this.initialized) {
      this.initialized = false;
      console.log('Session destroyed');
    }
  }

  public cleanup(): void {
    this.destroy();
  }

  public clearSecurityData(): void {
    this.initialized = false;
    console.log('Security data cleared');
  }

  public isInitialized(): boolean {
    return this.initialized;
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