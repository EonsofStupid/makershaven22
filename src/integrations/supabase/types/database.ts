import type { AuthTables } from './database/auth-tables';
import type { ContentTables } from './database/content-tables';
import type { SettingsTables } from './database/settings-tables';
import type { WorkflowTables } from './database/workflow-tables';
import type { Json } from './database/base';

export type { Json };

export interface Database {
  public: {
    Tables: AuthTables & ContentTables & SettingsTables & WorkflowTables;
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
      update_site_settings: {
        Args: Record<string, string>;
        Returns: SettingsTables['site_settings']['Row'][];
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

// Re-export commonly used types
export type Tables = Database['public']['Tables'];
export type TablesInsert<T extends keyof Tables> = Tables[T]['Insert'];
export type TablesRow<T extends keyof Tables> = Tables[T]['Row'];
export type TablesUpdate<T extends keyof Tables> = Tables[T]['Update'];
