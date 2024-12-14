export interface BaseContent {
  id?: string;
  title: string;
  type: ContentType;
  content?: any;
  metadata?: Record<string, any>;
  status?: 'draft' | 'published' | 'archived';
  version?: number;
}

export interface PageContent extends BaseContent {
  type: 'page';
  layout?: string;
}

export interface ComponentContent extends BaseContent {
  type: 'component';
}

export type ContentType = 'page' | 'component' | 'workflow';

export const CONTENT_TYPES: Record<ContentType, ContentType[]> = {
  page: ['page'],
  component: ['component'],
  workflow: ['workflow']
};