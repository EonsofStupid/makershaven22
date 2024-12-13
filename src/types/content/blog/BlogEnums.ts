import { Database } from "@/integrations/supabase/types";

export type PostCategory = Database["public"]["Enums"]["post_category"];
export type PostStatus = "draft" | "published" | "archived";