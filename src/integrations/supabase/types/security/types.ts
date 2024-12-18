import { Json } from '../base/json';

export interface SecurityLog {
  id: string;
  event_type: string;
  severity: string;
  user_id?: string;
  ip_address?: string;
  user_agent?: string;
  metadata?: Json;
  created_at: string;
  profiles?: {
    username: string;
    display_name: string;
  };
}