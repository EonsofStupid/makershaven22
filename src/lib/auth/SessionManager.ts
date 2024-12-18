import { supabase } from "@/integrations/supabase/client";
import { ISessionManager } from "./types/manager-types";

class SessionManager implements ISessionManager {
  private static instance: SessionManager;
  private isActive: boolean = false;

  private constructor() {
    // Private constructor for singleton
  }

  public static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  public async startSession(): Promise<void> {
    if (this.isActive) {
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      this.isActive = true;
      console.log("Session started successfully");
    }
  }

  public destroy(): void {
    if (this.isActive) {
      this.isActive = false;
      console.log("Session destroyed successfully");
    }
  }

  public isInitialized(): boolean {
    return this.isActive;
  }
}

export const sessionManager = SessionManager.getInstance();