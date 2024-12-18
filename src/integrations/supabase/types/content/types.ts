import { Json } from '../core/json';
import { ContentStatus, ContentType } from '../core/enums';

export interface BaseContent {
  id: string;
  title: string;
  type: ContentType;
  status: ContentStatus;
  content?: Json;
  metadata?: Json;
  created_by: string;
  updated_by?: string;
  created_at: string;
  updated_at?: string;
  version?: number;
  slug?: string;
}

export { ContentStatus, ContentType };