
import { BuildDifficulty, BuildStatus } from '../core/enums';
import { Json, JsonObject } from '../core/json';

export interface PrinterBuild {
  id: string;
  title: string;
  description?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  status: BuildStatus | string;
  difficulty_level: BuildDifficulty | string;
  parts_list: JsonObject[] | null;
  build_specs: JsonObject | null;
  media_links: JsonObject | null;
  likes_count: number;
  views_count: number;
  estimated_time?: string;
  approved_at?: string;
  approved_by?: string;
  rejection_reason?: string;
}

export interface PrinterBuildsQueryParams {
  limit?: number;
  offset?: number;
  status?: string;
  difficulty?: string;
  category?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ProjectDisplay {
  id: string;
  title: string;
  category: string;
  difficulty_level: string;
  estimated_time?: string;
  parts_count?: number;
  likes_count?: number;
  views_count?: number;
}
