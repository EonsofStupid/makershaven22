import type { Json } from '@/integrations/supabase/types/base';

export type SecurityEventSeverity = 'low' | 'medium' | 'high' | 'critical';
export type SecurityEventCategory = 'auth' | 'access' | 'data' | 'system';

export interface SecurityLog {
  id: string;
  user_id: string;
  event_type: string;
  severity: SecurityEventSeverity;
  details: Json;
  metadata: Json;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  profiles?: {
    username: string;
    display_name: string;
  };
}