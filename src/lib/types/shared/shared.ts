import { Json, JsonObject, JsonArray } from "../core/json";
import type { Settings } from "../settings/types";
import type { AuthState, AuthError, AuthSession } from "../auth/types";

export type { Settings };
export type { AuthState, AuthError, AuthSession };
export type { Json, JsonObject, JsonArray };

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