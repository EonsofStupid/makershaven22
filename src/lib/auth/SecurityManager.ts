import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ISecurityManager, ISessionManager } from './types/manager-types';

export class SecurityManager implements ISecurityManager {
  private static instance: SecurityManager;
  private sessionManager: ISessionManager;

  private constructor(sessionManager: ISessionManager) {
    this.sessionManager = sessionManager;
  }

  public static initialize(sessionManager: ISessionManager): SecurityManager {
    if (!SecurityManager.instance) {
      SecurityManager.instance = new SecurityManager(sessionManager);
    }
    return SecurityManager.instance;
  }

  public static getInstance(): SecurityManager {
    if (!SecurityManager.instance) {
      throw new Error('SecurityManager must be initialized with a SessionManager first');
    }
    return SecurityManager.instance;
  }

  public initialize(): void {
    console.log('Initializing security manager');
  }

  public clearSecurityData(): void {
    console.log('Clearing security data');
  }

  public cleanup(): void {
    console.log('Cleaning up security manager');
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
}

// Initialize the security manager with the session manager
import { sessionManager } from './SessionManager';
export const securityManager = SecurityManager.initialize(sessionManager);