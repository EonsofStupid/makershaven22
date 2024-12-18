import { SessionManager, sessionManager } from './SessionManager';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export class SecurityManager {
  private static instance: SecurityManager;
  private sessionManager: SessionManager;

  private constructor() {
    this.sessionManager = sessionManager;
  }

  public static getInstance(): SecurityManager {
    if (!SecurityManager.instance) {
      SecurityManager.instance = new SecurityManager();
    }
    return SecurityManager.instance;
  }

  public async validateSession(): Promise<boolean> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return !!session;
    } catch (error) {
      console.error('Session validation failed:', error);
      toast.error('Session validation failed');
      return false;
    }
  }

  public async enforceRateLimit(action: string, limit: number): Promise<boolean> {
    // Rate limiting implementation
    return true; // Placeholder
  }
}

export const securityManager = SecurityManager.getInstance();