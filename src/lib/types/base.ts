// Base type definitions that match our database schema
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type DatabaseId = string;

export type Timestamp = string;

export type Status = 'active' | 'inactive' | 'archived' | 'draft' | 'published';

export interface BaseEntity {
  id: DatabaseId;
  created_at?: Timestamp;
  updated_at?: Timestamp;
}

export interface UserOwned {
  created_by?: DatabaseId;
  updated_by?: DatabaseId;
}