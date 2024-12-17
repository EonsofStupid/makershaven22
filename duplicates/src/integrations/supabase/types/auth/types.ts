import type { UserRole } from '../enums';

export interface Profile {
  id: string;
  username?: string | null;
  display_name?: string | null;
  avatar_url?: string | null;
  role?: UserRole;
  bio?: string | null;
  website?: string | null;
  location?: string | null;
  created_at?: string;
  updated_at?: string;
  last_seen?: string | null;
}

export interface ProfilesTable {
  Row: Profile;
  Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
  Update: Partial<Omit<Profile, 'id'>>;
}