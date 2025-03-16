
import { ContentType } from '@/lib/types/core/enums';
import { ContentCreate, ContentUpdate } from '@/lib/types/content/types';
import { isJsonObject, JsonObject } from '@/lib/types/core/json';
import { z } from 'zod';

// Create schemas for validation
const baseContentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(['template', 'page', 'build', 'guide', 'part', 'component', 'workflow', 'hero', 'feature']),
  status: z.enum(['draft', 'published', 'archived']).default('draft').optional(),
  slug: z.string().optional(),
  content: z.any().optional(),
  metadata: z.any().optional(),
});

const createContentSchema = baseContentSchema.extend({
  created_by: z.string().min(1, "Creator ID is required")
});

const updateContentSchema = baseContentSchema.partial().extend({
  id: z.string().min(1, "ID is required"),
  updated_by: z.string().min(1, "Updater ID is required")
});

/**
 * Validate content for creation operation
 * @param data Content data to validate
 * @returns Validation result with success status, optional errors, and sanitized data
 */
export const validateContentCreate = (data: ContentCreate) => {
  try {
    const validatedData = createContentSchema.parse(data);
    return { 
      success: true,
      data: validatedData
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors
      };
    }
    return {
      success: false,
      errors: [{ message: 'Unknown validation error during content creation' }]
    };
  }
};

/**
 * Validate content for update operation
 * @param data Content data to validate
 * @returns Validation result with success status, optional errors, and sanitized data
 */
export const validateContentUpdate = (data: ContentUpdate) => {
  try {
    const validatedData = updateContentSchema.parse(data);
    return { 
      success: true,
      data: validatedData
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors
      };
    }
    return {
      success: false,
      errors: [{ message: 'Unknown validation error during content update' }]
    };
  }
};

/**
 * Type guard to check if an object has the minimum required fields for ContentCreate
 * @param obj The object to check
 * @returns boolean indicating if the object has the required fields for ContentCreate
 */
function hasCreateContentRequiredFields(obj: JsonObject): boolean {
  return (
    'type' in obj && 
    typeof obj.type === 'string' && 
    'title' in obj && 
    typeof obj.title === 'string' &&
    'created_by' in obj && 
    typeof obj.created_by === 'string'
  );
}

/**
 * Type guard to check if an object conforms to ContentUpdate
 * @param obj The object to check
 * @returns boolean indicating if the object is a valid ContentUpdate
 */
function isContentUpdate(obj: JsonObject): boolean {
  return (
    'id' in obj && 
    typeof obj.id === 'string' && 
    'updated_by' in obj && 
    typeof obj.updated_by === 'string'
  );
}

/**
 * General validation function that chooses the appropriate validator based on operation type
 * @param type ContentType to validate against
 * @param data Content data to validate
 * @returns Validation result with success status, optional errors, and sanitized data
 */
export const validateContent = (type: ContentType, data: any) => {
  // Ensure data is an object before validation
  if (!isJsonObject(data)) {
    return {
      success: false,
      errors: [{ message: 'Content data must be an object' }]
    };
  }

  // Check if data matches the structure of a ContentUpdate
  if (isContentUpdate(data)) {
    const updateData = {
      id: data.id as string,
      updated_by: data.updated_by as string,
      ...data
    } as ContentUpdate;
    
    return validateContentUpdate(updateData);
  }
  
  // Check if data has the required fields for content creation
  if (hasCreateContentRequiredFields(data)) {
    // It's a create operation, ensure the type is set
    const createData = {
      ...data,
      type
    } as ContentCreate;
    
    return validateContentCreate(createData);
  }
  
  // Neither update nor create conditions are met
  return {
    success: false,
    errors: [{ message: 'Invalid content data: missing required fields' }]
  };
};

// Define relationship mappings between content types (simplified)
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

/**
 * Check if a content type can be related to another
 * @param sourceType Source content type
 * @param targetType Target content type
 * @returns Boolean indicating if relationship is allowed
 */
export const canRelateContentTypes = (sourceType: ContentType, targetType: ContentType): boolean => {
  const allowedRelationships = contentTypeRelationships[sourceType] || [];
  return allowedRelationships.includes(targetType);
};
