import type { Json } from '../base';

export interface SecurityTableDefinitions {
  security_logs: {
    Row: {
      id: string;
      user_id: string | null;
      event_type: string;
      severity: string;
      details: Json | null;
      ip_address: string | null;
      user_agent: string | null;
      created_at: string | null;
    };
    Insert: Partial<SecurityTableDefinitions["security_logs"]["Row"]>;
    Update: Partial<SecurityTableDefinitions["security_logs"]["Row"]>;
  };
  security_events: {
    Row: {
      id: string;
      user_id: string | null;
      event_type: string;
      severity: string;
      details: Json | null;
      ip_address: string | null;
      created_at: string | null;
    };
    Insert: Partial<SecurityTableDefinitions["security_events"]["Row"]>;
    Update: Partial<SecurityTableDefinitions["security_events"]["Row"]>;
  };
}