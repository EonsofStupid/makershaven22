import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { AuthSession } from '@/lib/types/store-types';

class AuthManager {
  private static instance: AuthManager;
  private isActive: boolean = false;
  private sessionTimeout: NodeJS.Timeout | null = null;

  private constructor() {}

  public static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  public async startSession(): Promise<void> {
    if (this.isActive) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      this.isActive = true;
      this.setupSessionTimeout();
      console.log("Session started successfully");
    }
  }

  public async validateSession(session: AuthSession): Promise<boolean> {
    if (!session?.user?.id) return false;

    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('is_banned')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;
      if (profile?.is_banned) {
        await this.logSecurityEvent(session.user.id, 'banned_user_access_attempt', 'high');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Session validation error:', error);
      return false;
    }
  }

  private setupSessionTimeout(): void {
    if (this.sessionTimeout) {
      clearTimeout(this.sessionTimeout);
    }

    this.sessionTimeout = setTimeout(async () => {
      try {
        const { data: { session }, error } = await supabase.auth.refreshSession();
        if (error || !session) {
          await this.destroy();
          toast.error('Session expired. Please sign in again.');
        }
      } catch (error) {
        console.error('Session refresh error:', error);
        await this.destroy();
      }
    }, 30 * 60 * 1000); // 30 minutes
  }

  public async logSecurityEvent(
    userId: string,
    eventType: string,
    severity: 'low' | 'medium' | 'high',
    details: Record<string, any> = {}
  ): Promise<void> {
    try {
      await supabase.from('security_events').insert({
        user_id: userId,
        event_type: eventType,
        severity,
        details,
        ip_address: null // In a real app, you'd get this from the request
      });
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }

  public async destroy(): Promise<void> {
    if (this.sessionTimeout) {
      clearTimeout(this.sessionTimeout);
    }
    this.isActive = false;
    console.log("Session destroyed successfully");
  }

  public isInitialized(): boolean {
    return this.isActive;
  }
}

export const authManager = AuthManager.getInstance();