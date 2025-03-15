
export type ContentType = 
  | 'template' 
  | 'page' 
  | 'build' 
  | 'guide' 
  | 'part' 
  | 'component'
  | 'workflow'
  | 'hero'
  | 'feature';

export type ContentStatus = 'draft' | 'published' | 'archived';

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
