import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { SecurityEventSeverity, SecurityEventCategory } from '../types/security';

export const useSecurity = () => {
  const logSecurityEvent = useCallback(async (
    userId: string,
    eventType: string,
    severity: SecurityEventSeverity,
    category: SecurityEventCategory,
    metadata?: Record<string, any>
  ) => {
    try {
      await supabase.from('security_events').insert({
        user_id: userId,
        event_type: eventType,
        severity,
        category,
        metadata,
        created_at: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }, []);

  return { logSecurityEvent };
};