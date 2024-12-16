import type { AuthTableDefinitions } from './auth';
import type { ContentTableDefinitions } from './content';
import type { ThemeTableDefinition } from './theme';
import type { Json } from '../base';

export interface Database {
  public: {
    Tables: AuthTableDefinitions & ContentTableDefinitions & ThemeTableDefinition;
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
      user_role: 'subscriber' | 'maker' | 'admin' | 'super_admin';
      content_status: 'draft' | 'published' | 'archived';
      content_type: 'page' | 'component' | 'template' | 'workflow';
    };
  };
}

export type { Json };
export * from './auth';
export * from './content';
export * from './theme';
