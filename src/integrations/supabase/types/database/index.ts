import { AuthTableDefinitions } from './auth';
import { ContentTableDefinitions } from './content';
import { SettingsTableDefinitions } from './settings';
import { Json } from './base';

export interface Database {
  public: {
    Tables: AuthTableDefinitions & ContentTableDefinitions & SettingsTableDefinitions;
    Views: Record<string, never>;
    Functions: {
      check_rate_limit: {
        Args: { 
          p_user_id: string;
          p_action_type: string;
          p_max_count: number;
          p_time_window: string;
        };
        Returns: boolean;
      };
      ban_user: {
        Args: {
          user_id: string;
          reason: string;
          admin_id: string;
        };
        Returns: void;
      };
      verify_2fa_code: {
        Args: {
          p_code: string;
          p_email: string;
        };
        Returns: Json;
      };
      resend_2fa_code: {
        Args: {
          p_email: string;
        };
        Returns: void;
      };
    };
    Enums: {
      user_role: UserRole;
      content_status: ContentStatus;
      content_type: ContentType;
    };
  };
}

export type { Json };
export * from './auth';
export * from './content';
export * from './settings';
export * from './base';
