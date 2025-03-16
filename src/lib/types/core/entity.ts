import { Json, JsonObject } from './json';

/**
 * Base entity interface for all database entities
 */
export interface BaseEntity {
  id: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
  metadata?: JsonObject;
}

/**
 * Base versioned entity interface for entities that support versioning
 */
export interface VersionedEntity extends BaseEntity {
  version: number;
  version_history?: JsonObject[];
}

/**
 * Base slugged entity interface for entities that have slugs
 */
export interface SluggedEntity extends BaseEntity {
  slug: string;
}

/**
 * Base status entity interface for entities that have a status
 */
export interface StatusEntity extends BaseEntity {
  status: string;
}

/**
 * Base content entity interface for content-type entities
 */
export interface ContentEntity extends BaseEntity {
  title: string;
  content?: Json;
  metadata?: JsonObject;
}

/**
 * Base settings entity interface for settings-type entities
 */
export interface SettingsEntity extends BaseEntity {
  key: string;
  value: Json;
  scope?: string;
  metadata?: JsonObject;
}

/**
 * Base audit entity interface for audit log entries
 */
export interface AuditEntity extends BaseEntity {
  action: string;
  entity_type: string;
  entity_id: string;
  changes?: JsonObject;
  metadata?: JsonObject;
}

/**
 * Type guard to check if an object is a BaseEntity
 */
export function isBaseEntity(value: unknown): value is BaseEntity {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof (value as BaseEntity).id === 'string'
  );
}

/**
 * Type guard to check if an object is a VersionedEntity
 */
export function isVersionedEntity(value: unknown): value is VersionedEntity {
  return (
    isBaseEntity(value) &&
    'version' in value &&
    typeof (value as VersionedEntity).version === 'number'
  );
}

/**
 * Type guard to check if an object is a SluggedEntity
 */
export function isSluggedEntity(value: unknown): value is SluggedEntity {
  return (
    isBaseEntity(value) &&
    'slug' in value &&
    typeof (value as SluggedEntity).slug === 'string'
  );
}

/**
 * Type guard to check if an object is a StatusEntity
 */
export function isStatusEntity(value: unknown): value is StatusEntity {
  return (
    isBaseEntity(value) &&
    'status' in value &&
    typeof (value as StatusEntity).status === 'string'
  );
}

/**
 * Type guard to check if an object is a ContentEntity
 */
export function isContentEntity(value: unknown): value is ContentEntity {
  return (
    isBaseEntity(value) &&
    'title' in value &&
    typeof (value as ContentEntity).title === 'string'
  );
}

/**
 * Type guard to check if an object is a SettingsEntity
 */
export function isSettingsEntity(value: unknown): value is SettingsEntity {
  return (
    isBaseEntity(value) &&
    'key' in value &&
    typeof (value as SettingsEntity).key === 'string' &&
    'value' in value
  );
}

/**
 * Type guard to check if an object is an AuditEntity
 */
export function isAuditEntity(value: unknown): value is AuditEntity {
  return (
    isBaseEntity(value) &&
    'action' in value &&
    typeof (value as AuditEntity).action === 'string' &&
    'entity_type' in value &&
    typeof (value as AuditEntity).entity_type === 'string' &&
    'entity_id' in value &&
    typeof (value as AuditEntity).entity_id === 'string'
  );
} 