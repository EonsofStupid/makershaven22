import { z } from 'zod';

export const baseSchema = z.object({
  name: z.string(),
  manufacturer: z.string(),
  cost_usd: z.number().optional(),
  summary: z.string().optional(),
});

export const extendedSchema = baseSchema.extend({
  additionalDetails: z.string().optional(),
});

export const validateSchema = (schema, data) => {
  try {
    schema.parse(data);
    return { isValid: true, errors: null };
  } catch (error) {
    return { isValid: false, errors: error.errors };
  }
};