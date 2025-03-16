
import { ContentType } from "@/lib/types/core/enums";

/**
 * Type guard to check if content data is a page content type
 */
export function isContentPage(content: Record<string, unknown>): boolean {
  return content.type === 'page';
}

/**
 * Type guard to check if content data is a component content type
 */
export function isContentComponent(content: Record<string, unknown>): boolean {
  return content.type === 'component';
}

/**
 * Validate content type is valid
 */
export function isValidContentType(type: string): type is ContentType {
  return [
    'page', 
    'component', 
    'template', 
    'workflow', 
    'build', 
    'guide', 
    'part', 
    'hero', 
    'feature'
  ].includes(type as ContentType);
}

/**
 * Validate slug format
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

/**
 * Generate a slug from a title
 */
export function generateSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')  // Remove special characters
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/--+/g, '-')      // Replace multiple hyphens with single hyphen
    .trim();                   // Trim leading/trailing whitespace
}
