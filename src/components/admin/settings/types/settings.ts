import { z } from "zod";

export const settingsSchema = z.object({
  site_title: z.string().min(1, "Site title is required"),
  tagline: z.string().optional(),
  primary_color: z.string(),
  secondary_color: z.string(),
  accent_color: z.string(),
  text_primary_color: z.string(),
  text_secondary_color: z.string(),
  text_link_color: z.string(),
  text_heading_color: z.string(),
  neon_cyan: z.string().optional(),
  neon_pink: z.string().optional(),
  neon_purple: z.string().optional(),
  font_family_heading: z.string(),
  font_family_body: z.string(),
  font_size_base: z.string(),
  font_weight_normal: z.string(),
  font_weight_bold: z.string(),
  line_height_base: z.string(),
  letter_spacing: z.string(),
  border_radius: z.string(),
  spacing_unit: z.string(),
  transition_duration: z.string(),
  shadow_color: z.string(),
  hover_scale: z.string(),
  box_shadow: z.string().optional(),
  backdrop_blur: z.string().optional(),
  logo_url: z.string().optional(),
  favicon_url: z.string().optional(),
  transition_type: z.enum(["fade", "slide", "scale", "blur"]).optional(),
  theme_mode: z.enum(["light", "dark", "system"]).optional(),
  menu_animation_type: z.enum(["fade", "slide-down", "scale", "blur"]).optional(),
});

export type SettingsSchema = z.infer<typeof settingsSchema>;

export interface Settings extends SettingsSchema {
  updated_at?: string;
  updated_by?: string;
}

export interface SettingsFormData extends Settings {
  menu_animation_type?: "fade" | "slide-down" | "scale" | "blur";
}

export interface UseSettingsFormReturn {
  settings: Settings | null;
  isLoading: boolean;
  isSaving: boolean;
  isResetting: boolean;
  logoFile: File | null;
  faviconFile: File | null;
  form: any;
  handleLogoUpload: (file: File) => Promise<void>;
  handleFaviconUpload: (file: File) => Promise<void>;
  handleSettingsUpdate: (settings: Settings) => Promise<void>;
  handleResetToDefault: () => Promise<void>;
}