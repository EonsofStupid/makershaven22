import { z } from "zod";
import { flattenedSettingsSchema } from "@/lib/types/settings/schema";

// Re-export the Zod schema from the lib directory
export const settingsSchema = flattenedSettingsSchema;
