import { supabase } from '@/integrations/supabase/client';
import type { SecurityEventSeverity, SecurityEventCategory } from './types/auth';

export class SecurityLogger {
  private static instance: SecurityLogger;

  private constructor() {}

  public static getInstance(): SecurityLogger {
    if (!SecurityLogger.instance) {
      SecurityLogger.instance = new SecurityLogger();
    }
    return SecurityLogger.instance;
  }

  public async logSecurityEvent(
    userId: string,
    eventType: string,
    severity: SecurityEventSeverity,
    category: SecurityEventCategory,
    metadata: Record<string, any> = {}
  ): Promise<string | null> {
    try {
      const { data, error } = await supabase.rpc('log_security_event', {
        p_user_id: userId,
        p_event_type: eventType,
        p_severity: severity,
        p_category: category,
        p_metadata: metadata
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to log security event:', error);
      return null;
    }
  }

  public async getSecurityLogs(userId: string) {
    try {
      const { data, error } = await supabase
        .from('auth_security_logs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to fetch security logs:', error);
      return [];
    }
  }
}

export const securityLogger = SecurityLogger.getInstance();