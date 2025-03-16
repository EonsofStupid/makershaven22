
import type { Json } from "@/lib/types/core/json";
import { isJsonObject } from "@/lib/types/core/json";
import type { BaseContent } from "@/components/content/types/cms";

/**
 * Validates if content is a page type
 * @param content The content to validate
 * @returns boolean indicating if the content is a page
 */
export const isContentPage = (content: Json | Record<string, unknown>): boolean => {
  return isJsonObject(content) && 
         'type' in content && 
         content.type === 'page';
};

/**
 * Validates if content is a component type
 * @param content The content to validate
 * @returns boolean indicating if the content is a component
 */
export const isContentComponent = (content: Json | Record<string, unknown>): boolean => {
  return isJsonObject(content) && 
         'type' in content && 
         content.type === 'component';
};
