import type { Database } from './database';

// Helper type to extract table types
export type TableType<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Row'];

// Export commonly used table types
export type Profile = TableType<'profiles'>;
export type BlogPost = TableType<'blog_posts'>;
export type CMSContent = TableType<'cms_content'>;
export type ForumThread = TableType<'forum_threads'>;
export type ForumReply = TableType<'forum_replies'>;
export type Media = TableType<'media'>;
export type SiteSettings = TableType<'site_settings'>;