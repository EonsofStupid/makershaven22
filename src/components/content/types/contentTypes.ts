import { z } from "zod";
import type { Json } from "@/integrations/supabase/types";

export type ContentType = 'page' | 'component' | 'template' | 'workflow';
export type ContentStatus = 'draft' | 'published' | 'archived';

export interface BaseContent {
  id: string;
  title: string;
  content: Json;
  type: ContentType;
  status: ContentStatus;
  created_by: { display_name: string };
  created_at: string;
  updated_at?: string;
  metadata?: Json;
  version?: number;
}

export interface PageContent extends BaseContent {
  type: 'page';
  content: {
    body: string;
    seo?: Record<string, any>;
  };
}

export interface ComponentContent extends BaseContent {
  type: 'component';
  content: {
    componentType: string;
    props: Record<string, any>;
    styles: Record<string, any>;
  };
}

export const pageContentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.object({
    body: z.string(),
    seo: z.record(z.any()).optional(),
  }),
  type: z.literal('page'),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  metadata: z.record(z.any()).optional(),
});

export const componentContentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.object({
    componentType: z.string(),
    props: z.record(z.any()),
    styles: z.record(z.any()),
  }),
  type: z.literal('component'),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  metadata: z.record(z.any()).optional(),
});

export const getSchemaByType = (type: ContentType) => {
  switch (type) {
    case 'page':
      return pageContentSchema;
    case 'component':
      return componentContentSchema;
    default:
      throw new Error(`No schema defined for content type: ${type}`);
  }
};