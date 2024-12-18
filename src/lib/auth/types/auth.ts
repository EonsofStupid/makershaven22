export type SecurityEventSeverity = 'info' | 'warning' | 'error' | 'critical';
export type SecurityEventCategory = 'auth' | 'access' | 'data' | 'system';

export interface SecurityEvent {
  id: string;
  type: string;
  severity: SecurityEventSeverity;
  category: SecurityEventCategory;
  timestamp: string;
  userId?: string;
  metadata?: Record<string, any>;
}

export interface SecurityLog {
  id: string;
  event_type: string;
  ip_address: string | null;
  user_id: string | null;
  created_at: string;
  metadata: Record<string, any>;
  user_agent: string | null;
  profiles?: {
    username: string | null;
    display_name: string | null;
  } | null;
}