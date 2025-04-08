
// Append to the existing file
export type SecurityEventSeverity = 'low' | 'medium' | 'high';
export type SecurityEventCategory = 'auth' | 'data_access' | 'admin' | 'system';

export interface SecurityEvent {
  id: string;
  category: SecurityEventCategory;
  severity: SecurityEventSeverity;
  event_type: string;
  user_id?: string;
  ip_address?: string;
  user_agent?: string;
  details?: Record<string, any>;
  created_at: string;
}

export interface SecurityAuditLog {
  id: string;
  event_type: string;
  severity: SecurityEventSeverity;
  action: string;
  user_id?: string;
  resource_type?: string;
  resource_id?: string;
  previous_state?: Record<string, any>;
  new_state?: Record<string, any>;
  metadata?: Record<string, any>;
  created_at: string;
}
