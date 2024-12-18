import { supabase } from '@/integrations/supabase/client';

export const logSecurityEvent = async (event: string, details: any) => {
  try {
    const { error } = await supabase
      .from('security_events')
      .insert({
        event_type: event,
        severity: 'info',
        details
      });

    if (error) throw error;
  } catch (error) {
    console.error('Failed to log security event:', error);
  }
};