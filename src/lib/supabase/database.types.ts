export interface Database {
  public: {
    Tables: {
      user_activity: {
        Row: {
          id: string;
          user_id: string;
          activity_type: string;
          details: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          activity_type: string;
          details: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          activity_type?: string;
          details?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_activity_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
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
        };
        Relationships: [
          {
            foreignKeyName: "import_sessions_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      security_audit_logs: {
      };
    };
  };
}
export type Tables = {
  admin_settings: {
    Row: AdminSetting;
    Insert: Omit<AdminSetting, 'id' | 'created_at' | 'updated_at'>;
    Update: Partial<AdminSetting>;
  };
  // ... other table definitions ...
};