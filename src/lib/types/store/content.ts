import { BaseEntity, ContentStatus, ContentType } from '../base';
import { Json } from '@/integrations/supabase/types';

export interface BaseContent extends BaseEntity {
  title: string;
  type: ContentType;
  content?: Json;
  metadata?: Json;
  slug?: string;
  status?: ContentStatus;
  version?: number;
  created_by?: string;
  updated_by?: string;
}