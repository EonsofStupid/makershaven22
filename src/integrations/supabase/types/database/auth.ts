import type { Json } from './base';

export interface AuthTableDefinitions {
  users: {
    Row: {
      id: string;
      email: string | null;
      role: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      email?: string | null;
      role?: string | null;
    };
    Update: {
      email?: string | null;
      role?: string | null;
    };
  };
}