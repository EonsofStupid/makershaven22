
import { Json } from '../types/core/json';

export interface Database {
  public: {
    Tables: {
      // User activity table
      user_activity: {
        Row: {
          id: string;
          user_id: string;
          activity_type: string;
          details: string;
          created_at: string;
          updated_at: string;
          metadata?: Json;
          state_data?: Json;
          sync_status?: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          activity_type: string;
          details: string;
          created_at?: string;
          updated_at?: string;
          metadata?: Json;
          state_data?: Json;
          sync_status?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          activity_type?: string;
          details?: string;
          created_at?: string;
          updated_at?: string;
          metadata?: Json;
          state_data?: Json;
          sync_status?: string;
        };
      };

      // Import sessions table
      import_sessions: {
        Row: {
          id: string;
          user_id: string;
          status: string;
          file_name: string;
          file_size: number;
          file_type: string;
          metadata: Json;
          created_at: string;
          updated_at: string;
          row_count?: number;
          error_message?: string;
          completed_at?: string;
          type?: string;
          name?: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          status: string;
          file_name: string;
          file_size: number;
          file_type: string;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
          row_count?: number;
          error_message?: string;
          completed_at?: string;
          type?: string;
          name?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          status?: string;
          file_name?: string;
          file_size?: number;
          file_type?: string;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
          row_count?: number;
          error_message?: string;
          completed_at?: string;
          type?: string;
          name?: string;
        };
      };

      // Security audit logs table
      security_audit_logs: {
        Row: {
          id: string;
          event_type: string;
          user_id?: string;
          resource_type?: string;
          resource_id?: string;
          action: string;
          severity: string;
          previous_state?: Json;
          new_state?: Json;
          metadata?: Json;
          created_at: string;
          ip_address?: string;
          user_agent?: string;
        };
        Insert: {
          id?: string;
          event_type: string;
          user_id?: string;
          resource_type?: string;
          resource_id?: string;
          action: string;
          severity: string;
          previous_state?: Json;
          new_state?: Json;
          metadata?: Json;
          created_at?: string;
          ip_address?: string;
          user_agent?: string;
        };
        Update: {
          id?: string;
          event_type?: string;
          user_id?: string;
          resource_type?: string;
          resource_id?: string;
          action?: string;
          severity?: string;
          previous_state?: Json;
          new_state?: Json;
          metadata?: Json;
          created_at?: string;
          ip_address?: string;
          user_agent?: string;
        };
      };
    };
  };
}

export type AdminSetting = {
  id: string;
  setting_key: string;
  setting_value: string;
  setting_type: string;
  created_at?: string;
  updated_at?: string;
};

export type Tables = {
  admin_settings: {
    Row: AdminSetting;
    Insert: Omit<AdminSetting, 'id' | 'created_at' | 'updated_at'>;
    Update: Partial<AdminSetting>;
  };
  // ... other table definitions ...
};
