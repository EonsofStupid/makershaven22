import { Json } from './json';

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

export type { Json, JsonObject, JsonArray } from './json';