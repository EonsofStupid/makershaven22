import type { UserRole, ContentStatus, ContentType, PostCategory, ThemeMode } from './enums';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: ProfilesTable;
      blog_posts: BlogPostsTable;
      cms_content: CMSContentTable;
      forum_threads: ForumThreadsTable;
      forum_replies: ForumRepliesTable;
      media: MediaTable;
      site_settings: SiteSettingsTable;
      maker_projects: MakerProjectsTable;
      import_sessions: ImportSessionsTable;
      security_events: SecurityEventsTable;
      user_activity: UserActivityTable;
      recovery_codes: RecoveryCodesTable;
      trusted_devices: TrustedDevicesTable;
      active_2fa_sessions: Active2FASessionsTable;
      cms_workflows: CMSWorkflowsTable;
      cms_content_revisions: CMSContentRevisionsTable;
      cms_content_relationships: CMSContentRelationshipsTable;
      cms_content_tags: CMSContentTagsTable;
      cms_tags: CMSTagsTable;
      cms_categories: CMSCategoriesTable;
      cms_components: CMSComponentsTable;
      revision_history: RevisionHistoryTable;
      security_audit_logs: SecurityAuditLogsTable;
    };
    Views: Record<string, never>;
    Functions: {
      check_rate_limit: {
        Args: { 
          p_user_id: string;
          p_action_type: string;
          p_max_count: number;
          p_time_window: string;
        };
        Returns: boolean;
      };
      ban_user: {
        Args: {
          user_id: string;
          reason: string;
          admin_id: string;
        };
        Returns: void;
      };
      verify_2fa_code: {
        Args: {
          p_code: string;
          p_email: string;
        };
        Returns: Json;
      };
      resend_2fa_code: {
        Args: {
          p_email: string;
        };
        Returns: void;
      };
    };
    Enums: {
      user_role: UserRole;
      content_status: ContentStatus;
      content_type: ContentType;
      post_category: PostCategory;
      theme_mode: ThemeMode;
    };
  };
}

// Table Definitions
interface BaseTable<T> {
  Row: T;
  Insert: Partial<T>;
  Update: Partial<T>;
}

export interface ProfilesTable extends BaseTable<{
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  role: UserRole | null;
  bio: string | null;
  website: string | null;
  location: string | null;
  created_at: string;
  updated_at: string;
  last_seen: string | null;
  is_banned: boolean | null;
  ban_reason: string | null;
  banned_at: string | null;
  banned_by: string | null;
  two_factor_enabled: boolean | null;
  two_factor_secret: string | null;
  onboarding_completed: boolean | null;
  gamification_enabled: boolean | null;
  visual_editor_enabled: boolean | null;
  last_login_at: string | null;
}> {}

export interface BlogPostsTable extends BaseTable<{
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  slug: string;
  author_id: string | null;
  category: PostCategory | null;
  tags: string[] | null;
  featured_image: string | null;
  images: string[] | null;
  status: string | null;
  published_at: string | null;
  updated_at: string | null;
  views_count: number | null;
  rich_content: Json | null;
}> {}

export interface CMSContentTable extends BaseTable<{
  id: string;
  title: string;
  type: ContentType;
  content: Json | null;
  metadata: Json | null;
  slug: string | null;
  status: ContentStatus | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string | null;
  updated_at: string | null;
  version: number | null;
}> {}

export interface ForumThreadsTable extends BaseTable<{
  id: string;
  title: string;
  content: string;
  author_id: string | null;
  created_at: string | null;
  updated_at: string | null;
}> {}

export interface ForumRepliesTable extends BaseTable<{
  id: string;
  thread_id: string | null;
  content: string;
  author_id: string | null;
  created_at: string | null;
  updated_at: string | null;
}> {}

export interface MediaTable extends BaseTable<{
  id: string;
  name: string;
  url: string;
  type: string | null;
  size: number | null;
  user_id: string | null;
  blog_post_id: string | null;
  created_at: string;
  updated_at: string;
}> {}

export interface SiteSettingsTable extends BaseTable<{
  id: string;
  site_title: string;
  tagline: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  accent_color: string | null;
  text_primary_color: string | null;
  text_secondary_color: string | null;
  text_link_color: string | null;
  text_heading_color: string | null;
  theme_mode: ThemeMode | null;
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;
  border_radius: string | null;
  spacing_unit: string | null;
  transition_duration: string | null;
  shadow_color: string | null;
  hover_scale: string | null;
  updated_at: string | null;
  updated_by: string | null;
}> {}

export interface MakerProjectsTable extends BaseTable<{
  id: string;
  title: string;
  description: string | null;
  category: string;
  difficulty_level: string | null;
  estimated_time: string | null;
  parts_count: number | null;
  status: string | null;
  views_count: number | null;
  likes_count: number | null;
  created_at: string | null;
  updated_at: string | null;
}> {}

export interface ImportSessionsTable extends BaseTable<{
  id: string;
  user_id: string | null;
  file_name: string | null;
  file_size: number | null;
  row_count: number | null;
  status: string;
  error_message: string | null;
  created_at: string | null;
  completed_at: string | null;
}> {}

export interface SecurityEventsTable extends BaseTable<{
  id: string;
  user_id: string | null;
  event_type: string;
  severity: string;
  details: Json | null;
  ip_address: string | null;
  created_at: string | null;
}> {}

export interface UserActivityTable extends BaseTable<{
  id: string;
  user_id: string;
  activity_type: string;
  details: string | null;
  metadata: Json | null;
  created_at: string | null;
}> {}

export interface RecoveryCodesTable extends BaseTable<{
  id: string;
  user_id: string | null;
  code: string;
  used: boolean | null;
  used_at: string | null;
  expires_at: string;
  attempts: number | null;
  created_at: string | null;
}> {}

export interface TrustedDevicesTable extends BaseTable<{
  id: string;
  user_id: string | null;
  device_hash: string;
  device_name: string;
  last_used: string | null;
  expires_at: string;
  created_at: string | null;
}> {}

export interface Active2FASessionsTable extends BaseTable<{
  id: string;
  user_id: string | null;
  device_name: string;
  ip_address: string | null;
  user_agent: string | null;
  is_active: boolean | null;
  last_activity: string | null;
  created_at: string | null;
}> {}

export interface CMSWorkflowsTable extends BaseTable<{
  id: string;
  name: string;
  description: string | null;
  steps: Json;
  triggers: Json | null;
  created_by: string | null;
  updated_at: string | null;
}> {}

export interface CMSContentRevisionsTable extends BaseTable<{
  id: string;
  content_id: string | null;
  content: Json;
  metadata: Json | null;
  created_by: string | null;
  created_at: string | null;
}> {}

export interface CMSContentRelationshipsTable extends BaseTable<{
  id: string;
  parent_id: string | null;
  child_id: string | null;
  relationship_type: string;
  order_index: number | null;
}> {}

export interface CMSContentTagsTable extends BaseTable<{
  content_id: string;
  tag_id: string;
}> {}

export interface CMSTagsTable extends BaseTable<{
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string | null;
}> {}

export interface CMSCategoriesTable extends BaseTable<{
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parent_id: string | null;
  metadata: Json | null;
  created_at: string | null;
  updated_at: string | null;
}> {}

export interface CMSComponentsTable extends BaseTable<{
  id: string;
  name: string;
  component_type: string;
  description: string | null;
  props_schema: Json | null;
  default_props: Json | null;
  created_by: string | null;
  updated_at: string | null;
}> {}

export interface RevisionHistoryTable extends BaseTable<{
  id: string;
  entity_id: string;
  entity_type: string;
  revision_type: string;
  changes: Json;
  created_by: string | null;
  created_at: string | null;
}> {}

export interface SecurityAuditLogsTable extends BaseTable<{
  id: string;
  user_id: string | null;
  action_type: string;
  ip_address: string | null;
  user_agent: string | null;
  metadata: Json | null;
  created_at: string | null;
}> {}