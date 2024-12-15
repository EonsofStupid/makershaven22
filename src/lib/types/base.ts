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