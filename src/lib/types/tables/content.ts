import type { Json } from '../base/json';
import type { ContentStatus, ContentType, PostCategory } from '../enums';

export interface BlogPostsTable {
  Row: {
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
  };
  Insert: Partial<BlogPostsTable['Row']>;
  Update: Partial<BlogPostsTable['Row']>;
}

export interface CMSContentTable {
  Row: {
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
  };
  Insert: Partial<CMSContentTable['Row']>;
  Update: Partial<CMSContentTable['Row']>;
}