
import { ContentType, ContentStatus } from '@/lib/types/enums';
import { Json } from '@/lib/types/core/json';
import { baseContentSchema, pageContentSchema, componentContentSchema, getSchemaByType, contentTypeRelationships } from './contentTypeSchema';

export interface BaseContent {
  id: string;
  title: string;
  type: ContentType;
  status: ContentStatus;
  slug?: string;
  content?: any;
  metadata?: any;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by?: string;
  version?: number;
}

export interface PageContent extends BaseContent {
  type: 'page';
  content?: {
    body?: string;
    seo?: {
      title?: string;
      description?: string;
      keywords?: string[];
    };
  };
}

export interface ComponentContent extends BaseContent {
  type: 'component';
  content?: {
    template?: string;
    props?: Record<string, any>;
    styles?: Record<string, string>;
  };
}

export type AnyContent = PageContent | ComponentContent | BaseContent;

export interface ContentVersionMetadata {
  version: number;
  created_at: string;
  created_by: string;
  change_summary?: string;
}

export interface ContentTypeValidationOptions {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

export interface ContentTypeFieldDefinition {
  name: string;
  type: 'text' | 'rich_text' | 'image' | 'gallery' | 'number' | 'boolean' | 'date' | 'reference' | 'select' | 'tags';
  validation?: ContentTypeValidationOptions;
  options?: string[] | number[];
  default?: any;
  description?: string;
}

export interface ContentTypeSchema {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  fields: ContentTypeFieldDefinition[];
  relationships?: {
    name: string;
    type: 'one-to-one' | 'one-to-many' | 'many-to-many';
    target: ContentType;
    field?: string;
  }[];
}

// Export for convenience
export { getSchemaByType, contentTypeRelationships };
