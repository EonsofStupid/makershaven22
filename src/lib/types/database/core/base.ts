import type { Json } from './json';
import type { DatabaseEnums } from './enums';

export interface Database {
  public: {
    Tables: DatabaseTables;
    Views: {
      [key: string]: {
        Row: Record<string, unknown>;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
    };
    Functions: DatabaseFunctions;
    Enums: DatabaseEnums;
  };
}

export interface BaseRow {
  id: string;
  created_at?: string;
  updated_at?: string;
}

export interface BaseTable<T extends BaseRow> {
  Row: T;
  Insert: Omit<T, 'id' | 'created_at' | 'updated_at'>;
  Update: Partial<Omit<T, 'id' | 'created_at' | 'updated_at'>>;
}