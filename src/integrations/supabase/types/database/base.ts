export interface TableDefinition<T = any> {
  Row: T;
  Insert: Partial<T>;
  Update: Partial<T>;
  Relationships: any[];
}

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];