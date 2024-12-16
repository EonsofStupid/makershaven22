// Base types
export * from './base/json';

// Enums
export * from './enums';

// Table types
export * from './tables/auth';
export * from './tables/content';
export * from './tables/settings';
export * from './tables/workflow';

// Re-export Database type
export type Database = {
  public: {
    Tables: {
      profiles: ProfilesTable;
      blog_posts: BlogPostsTable;
      cms_content: CMSContentTable;
      site_settings: SiteSettingsTable;
      workflow_templates: WorkflowTemplatesTable;
      // ... other tables can be added here
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: UserRole;
      content_status: ContentStatus;
      content_type: ContentType;
      post_category: PostCategory;
      theme_mode: ThemeMode;
    };
  };
};
