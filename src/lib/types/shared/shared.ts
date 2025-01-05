export type { Settings } from '../settings/types';
export type { AuthState, AuthError, AuthSession } from '../auth/types';
export type { Json, JsonObject, JsonArray } from '../core/json';

export interface CmsContent {
  id: string;
  title: string;
  content: Json;
  metadata: Json;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  version: number;
  status: 'draft' | 'published' | 'archived';
  type: 'template' | 'page' | 'component' | 'workflow';
  slug: string;
}