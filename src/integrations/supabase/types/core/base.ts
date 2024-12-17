export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface BaseEntity {
  id: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserOwnedEntity extends BaseEntity {
  created_by: string;
  updated_by?: string;
}

export interface AuditableEntity extends BaseEntity {
  version?: number;
  last_sync?: string;
}