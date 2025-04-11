export interface ContentRevision {
  id: string;
  content: any;
  created_at: string;
  created_by: string;
  profiles?: {
    display_name: string;
    avatar_url?: string;
  };
} 