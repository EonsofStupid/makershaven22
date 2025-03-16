
import { JsonObject } from '../core/json';
import { BuildDifficulty, BuildStatus } from '../core/enums';

/**
 * Printer build interface matching the database schema
 */
export interface PrinterBuild {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  build_specs?: JsonObject;
  difficulty_level: BuildDifficulty;
  estimated_time?: string;
  parts_list?: JsonObject;
  media_links?: JsonObject;
  status: BuildStatus;
  likes_count: number;
  views_count: number;
  approved_by?: string;
  approved_at?: string;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Project data for display on the landing page
 */
export interface ProjectDisplay {
  id: string;
  title: string;
  category: string;
  difficulty_level: string;
  estimated_time?: string;
  parts_count?: number;
  likes_count: number;
  views_count: number;
}

/**
 * Query parameters for fetching printer builds
 */
export interface PrinterBuildsQueryParams {
  limit?: number;
  status?: BuildStatus;
  difficulty?: BuildDifficulty;
  category?: string;
  search?: string;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}
