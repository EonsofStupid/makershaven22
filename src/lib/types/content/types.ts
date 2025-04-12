
export interface BaseContent {
  id: string;
  title: string;
  status: 'draft' | 'published' | 'archived';
  author_id?: string;
  created_by?: string; 
  created_at?: string;
  updated_at?: string;
  published_at?: string;
  content?: string;
  slug?: string;
  type?: string;
  metadata?: Record<string, any>;
}

export interface BlogPost extends BaseContent {
  excerpt?: string;
  featured_image?: string;
  images?: string[];
  views_count?: number;
  category?: string;
  tags?: string[];
}

export interface Page extends BaseContent {
  path: string;
  template?: string;
  is_home?: boolean;
}

export interface ComponentContent extends BaseContent {
  component_type: string;
  props?: Record<string, any>;
}
