
import { z } from 'zod';
import { ContentType } from '@/lib/types/enums';

export const baseContentSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1, "Title is required"),
  type: z.enum(['template', 'page', 'build', 'guide', 'part', 'component', 'workflow', 'hero', 'feature']),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  slug: z.string().optional(),
  content: z.any().optional(),
  metadata: z.any().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  created_by: z.string().min(1, "Creator ID is required"),  // Making this required
  updated_by: z.string().optional(),
  version: z.number().optional()
});

export const pageContentSchema = baseContentSchema.extend({
  content: z.object({
    body: z.string().optional(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional()
    }).optional()
  }).optional()
});

export const componentContentSchema = baseContentSchema.extend({
  content: z.object({
    template: z.string().optional(),
    props: z.record(z.any()).optional(),
    styles: z.record(z.string()).optional()
  }).optional()
});

// Create specific schemas for content creation and updates
export const contentCreateSchema = baseContentSchema
  .omit({ id: true, created_at: true, updated_at: true, updated_by: true, version: true })
  .extend({
    title: z.string().min(1, "Title is required"),
    type: z.enum(['template', 'page', 'build', 'guide', 'part', 'component', 'workflow', 'hero', 'feature']),
    created_by: z.string().min(1, "Creator ID is required")
  });

export const contentUpdateSchema = baseContentSchema
  .omit({ created_at: true, created_by: true, version: true })
  .extend({
    id: z.string().uuid("Valid ID is required"),
    updated_by: z.string().min(1, "Updater ID is required"),
    title: z.string().min(1, "Title is required").optional(),
    type: z.enum(['template', 'page', 'build', 'guide', 'part', 'component', 'workflow', 'hero', 'feature']).optional()
  });

export const getSchemaByType = (type: ContentType) => {
  switch (type) {
    case 'page':
      return pageContentSchema;
    case 'component':
      return componentContentSchema;
    default:
      return baseContentSchema;
  }
};

// Define relationship mappings between content types
export const contentTypeRelationships: Record<ContentType, ContentType[]> = {
  page: ['template', 'component'],
  component: ['component'],
  template: ['page', 'component'],
  workflow: ['template', 'page', 'component'],
  build: ['component', 'part'],
  guide: ['component', 'build'],
  part: ['component'],
  hero: ['component'],
  feature: ['component']
};
