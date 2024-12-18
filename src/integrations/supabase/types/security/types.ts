import { Json } from '../core/json';

export interface SecurityLog {
  id: string;
  user_id: string;
  event_type: string;
  severity: string;
  details: Json;
  metadata: Json;
  ip_address: string;
  user_agent: string;
  created_at: string;
  profiles?: {
    username: string;
    display_name: string;
  };
}