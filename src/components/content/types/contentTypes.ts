export type ContentType = 'page' | 'component' | 'template';

export interface ContentBase {
  id: string;
  title: string;
  type: ContentType;
  content: any;
  metadata?: Record<string, any>;
}

export interface ComponentContent extends ContentBase {
  type: 'component';
}

export interface PageContent extends ContentBase {
  type: 'page';
  layout?: string;
}

export interface TemplateContent extends ContentBase {
  type: 'template';
  variables?: string[];
}