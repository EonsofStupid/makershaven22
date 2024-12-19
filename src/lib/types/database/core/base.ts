import type { Json } from './json';
import type { UserRole, ContentStatus, ContentType, ThemeMode } from './enums';

export interface Database {
  public: {
    Tables: DatabaseTables;
    Views: Record<string, never>;
    Functions: DatabaseFunctions;
    Enums: DatabaseEnums;
  };
}

export interface DatabaseEnums {
  user_role: UserRole;
  content_status: ContentStatus;
  content_type: ContentType;
  theme_mode: ThemeMode;
}

export * from './functions';
export * from './tables';