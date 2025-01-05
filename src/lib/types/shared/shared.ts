import type { Settings } from '../settings/types';
import type { AuthState, AuthError, AuthSession } from '../auth/types';
import type { Json, JsonObject, JsonArray } from '../core/json';

export type {
  Settings,
  AuthState,
  AuthError,
  AuthSession,
  Json,
  JsonObject,
  JsonArray
};

export interface CmsContent {
  id: string;
  title: string;
  content: Json;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}