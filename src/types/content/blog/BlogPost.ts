import type { BlogAuthor } from "./BlogAuthor";
import type { BlogPostMeta } from "./BlogMeta";
import type { PostCategory, PostStatus } from "./BlogEnums";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string | null;
  rich_content?: any;
  author_id?: string | null;
  author?: BlogAuthor;
  category?: PostCategory | null;
  status?: PostStatus | null;
  published_at?: string | null;
  updated_at?: string | null;
  featured_image?: string | null;
  images?: string[] | null;
  tags?: string[] | null;
  views_count?: number | null;
  metadata?: BlogPostMeta;
}

export type BlogPostWithAuthor = BlogPost & {
  profiles?: {
    display_name: string | null;
    username: string | null;
  } | null;
};