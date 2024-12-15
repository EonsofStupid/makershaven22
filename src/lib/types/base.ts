export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type DatabaseId = string;
export type Timestamp = string;

export interface BaseEntity {
  id: DatabaseId;
  created_at?: Timestamp;
  updated_at?: Timestamp;
}

export interface UserOwned {
  created_by?: DatabaseId;
  updated_by?: DatabaseId;
}

// Documentation for future AI responses:
// 1. All entity types MUST extend BaseEntity
// 2. If an entity can be owned by a user, it MUST also extend UserOwned
// 3. Never create duplicate type definitions - import from this base