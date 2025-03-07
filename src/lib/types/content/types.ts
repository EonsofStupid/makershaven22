
import { Json, BaseEntity } from '../core/json';
import { ContentType, ContentStatus } from '../core/enums';

export interface BaseContent extends BaseEntity {
  title: string;
  type: ContentType;
  status: ContentStatus;
  content?: Json;
  metadata?: Json;
  created_by: string;
  updated_by?: string;
}

export interface ContentRevision {
  id: string;
  content_id: string;
  version: number;
  content: Json;
  metadata?: Json;
  created_by: string;
  created_at: string;
}
