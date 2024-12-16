import { UserRole } from '@/lib/types/auth';

export interface UserProfile {
  id: string;
  username?: string | null;
  display_name?: string | null;
  avatar_url?: string | null;
  role?: UserRole;
  bio?: string | null;
  website?: string | null;
  location?: string | null;
  created_at: string;
  updated_at: string;
  last_seen?: string | null;
  is_banned?: boolean;
  ban_reason?: string | null;
  banned_at?: string | null;
  banned_by?: string | null;
}

export interface UserMetrics {
  totalUsers: number;
  newUsers: number;
  activeUsers: number;
}

export interface UserActivity {
  id: string;
  user_id: string;
  activity_type: string;
  details?: string;
  metadata?: Record<string, any>;
  created_at: string;
}