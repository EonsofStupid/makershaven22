import { z } from 'zod';
import { ComponentType } from './enums';

export const elementSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(ComponentType),
  content: z.any(),
  props: z.record(z.string(), z.any())
});

export const elementPropsSchema = z.object({
  text: z.string().optional(),
  url: z.string().url().optional(),
  alt: z.string().optional()
}).and(z.record(z.string(), z.any()));

export type ElementSchema = z.infer<typeof elementSchema>;
export type ElementPropsSchema = z.infer<typeof elementPropsSchema>;