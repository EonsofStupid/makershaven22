
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SecuritySettings } from '@/lib/types/settings/security';

class SecurityManager {
  private securitySettings: SecuritySettings | null = null;
  private initialized: boolean = false;

  constructor() {
    this.loadSecuritySettings();
  }

  private async loadSecuritySettings(): Promise<void> {
    try {
      const { data, error } = await supabase
        .from('security_settings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      
      this.securitySettings = data?.settings as SecuritySettings;
      this.initialized = true;
      console.log('Security settings loaded:', this.securitySettings);
    } catch (error) {
      console.error('Failed to load security settings:', error);
      // Use reasonable defaults
      this.securitySettings = {
        enable_ip_filtering: false,
        two_factor_auth: false,
        max_login_attempts: 5,
        session_timeout_minutes: 60,
        lockout_duration_minutes: 30
      };
    }
  }

  public async logSecurityEvent(
    eventType: string, 
    severity: 'info' | 'low' | 'medium' | 'high' | 'critical', 
    details: any = {}
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('security_logs')
        .insert({
          event_type: eventType,
          severity: severity,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          details: details
        });

      if (error) throw error;
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }

  public async handleFailedLogin(userId: string): Promise<void> {
    if (!this.securitySettings) await this.loadSecuritySettings();
    
    try {
      if (!userId) return;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('failed_login_attempts, lockout_until')
        .eq('id', userId)
        .single();

      if (error) throw error;

      const attempts = (data?.failed_login_attempts || 0) + 1;
      const updates: any = { failed_login_attempts: attempts };

      const maxAttempts = this.securitySettings?.max_login_attempts || 5;
      if (attempts >= maxAttempts) {
        const lockoutMinutes = this.securitySettings?.lockout_duration_minutes || 30;
        updates.lockout_until = new Date(
          Date.now() + lockoutMinutes * 60000
        ).toISOString();
        
        this.logSecurityEvent(
          'account_locked',
          'high',
          { attempts, lockout_duration: lockoutMinutes }
        );

        toast.error('Account locked', {
          description: `Too many failed attempts. Please try again in ${lockoutMinutes} minutes.`
        });
      }

      await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);
    } catch (error) {
      console.error('Error handling failed login:', error);
    }
  }

  public initialize(): void {
    if (this.initialized) {
      console.log('Security manager already initialized');
      return;
    }

    this.loadSecuritySettings();
    console.log('Security manager initialized');
  }

  public getSettings(): SecuritySettings | null {
    return this.securitySettings;
  }

  public clearSecurityData(): void {
    this.securitySettings = null;
    this.initialized = false;
    console.log('Security data cleared');
  }
}

// Create and export a singleton instance
export const securityManager = new SecurityManager();
