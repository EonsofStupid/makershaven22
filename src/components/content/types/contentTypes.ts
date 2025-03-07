
import { ContentType, ContentStatus } from '@/lib/types/core/enums';
import { Json } from '@/lib/types/core/json';

export interface ContentItem {
  id: string;
  title: string;
  slug?: string;
  content?: Json;
  metadata?: Json;
  type: ContentType;
  status: ContentStatus;
  created_at?: string;
  updated_at?: string;
  created_by: string;
  updated_by?: string;
  version?: number;
}

export interface ComponentContent extends ContentItem {
  component_type: string;
  props?: Json;
  children?: Json;
  layout_position?: string;
}

export interface PageContent extends ContentItem {
  parent_id?: string;
  layout?: string;
  components?: string[];
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
}

export interface ContentFormData {
  title: string;
  slug?: string;
  content?: Json;
  metadata?: Json;
  status: ContentStatus;
  type: ContentType;
}

export interface ComponentFormData extends ContentFormData {
  component_type: string;
  props?: Json;
  children?: Json;
  layout_position?: string;
}

export interface PageFormData extends ContentFormData {
  parent_id?: string;
  layout?: string;
  components?: string[];
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
}
