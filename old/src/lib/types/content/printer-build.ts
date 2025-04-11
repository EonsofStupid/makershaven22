
import type { JsonObject } from '../core/json';

/**
 * Build difficulty levels
 */
export type BuildDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

/**
 * Build status values
 */
export type BuildStatus = 'draft' | 'pending_review' | 'approved' | 'rejected' | 'archived';

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
 * Project data for landing page display
 */
export interface ProjectSummary {
  id: string;
  title: string;
  category: string;
  difficulty_level: string;
  estimated_time?: string;
  parts_count?: number;
  likes_count?: number;
  views_count?: number;
}
