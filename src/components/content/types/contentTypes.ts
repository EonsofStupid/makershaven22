import { z } from "zod";
import type { Json } from "@/integrations/supabase/types";

export type ContentType = "component" | "page" | "template";

export interface ComponentContent {
  type: "component";
  id?: string;
  title?: string;
  content?: any;
  metadata?: Record<string, any>;
}

export interface PageContent {
  type: "page";
  layout?: string;
  id?: string;
  title?: string;
  content?: any;
  metadata?: Record<string, any>;
}

export const componentContentSchema = z.object({
  type: z.literal("component"),
  id: z.string().optional(),
  title: z.string().optional(),
  content: z.any().optional(),
  metadata: z.record(z.any()).optional()
});

export const pageContentSchema = z.object({
  type: z.literal("page"),
  layout: z.string().optional(),
  id: z.string().optional(),
  title: z.string().optional(),
  content: z.any().optional(),
  metadata: z.record(z.any()).optional()
});

export const getSchemaByType = (type: ContentType) => {
  switch (type) {
    case "component":
      return componentContentSchema;
    case "page":
      return pageContentSchema;
    default:
      throw new Error(`Unknown content type: ${type}`);
  }
};