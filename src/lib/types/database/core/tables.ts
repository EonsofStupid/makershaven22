import type { UserRole, ContentStatus, ContentType, ThemeMode } from './enums';
import type { Json } from './json';

export interface DatabaseTables {
  profiles: {
    Row: {
      id: string;
      username: string | null;
      display_name: string | null;
      avatar_url: string | null;
      role: UserRole | null;
      bio: string | null;
      website: string | null;
      location: string | null;
      created_at: string;
      updated_at: string;
      last_seen: string | null;
    };
    Insert: Partial<DatabaseTables['profiles']['Row']>;
    Update: Partial<DatabaseTables['profiles']['Row']>;
  };
  
  workflow_templates: {
    Row: {
      id: string;
      name: string;
      description: string | null;
      steps: Json;
      is_active: boolean;
      created_by: string | null;
      created_at: string | null;
      updated_at: string | null;
    };
    Insert: Partial<DatabaseTables['workflow_templates']['Row']>;
    Update: Partial<DatabaseTables['workflow_templates']['Row']>;
  };
}