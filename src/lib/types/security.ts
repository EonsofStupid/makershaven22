export interface SecurityLog {
  id: string;
  user_id: string;
  event_type: string;
  severity: string;
  details: any;
  ip_address?: string;
  user_agent?: string;
  metadata: Record<string, any>;
  created_at: string;
  profiles?: {
    username: string;
    display_name: string;
  };
}