import { Json } from './json';

// Base interfaces that other types will extend
export interface BaseEntity {
  id: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserOwnedEntity extends BaseEntity {
  created_by: string;
  updated_by?: string;
}

export interface MetadataEntity extends BaseEntity {
  metadata?: Json;
}