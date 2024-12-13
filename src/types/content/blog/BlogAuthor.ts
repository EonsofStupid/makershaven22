import { Profile } from "@/integrations/supabase/types/tables";

export interface BlogAuthor extends Pick<Profile, 'id' | 'display_name' | 'username' | 'avatar_url'> {
  role?: string;
}