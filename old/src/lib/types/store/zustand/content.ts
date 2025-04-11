import type { 
  BaseContent, 
  ContentType, 
  ContentStatus 
} from '@/lib/types/core';

/**
 * Content query options interface
 */
export interface ContentQueryOptions {
  type?: ContentType;
  status?: ContentStatus;
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  search?: string;
}

/**
 * Content store state interface
 */
export interface ContentState {
  // Content state
  contents: Map<string, BaseContent>;
  currentContent: BaseContent | null;
  isLoading: boolean;
  error: Error | null;
  queryOptions: ContentQueryOptions;
  
  // Actions
  setContents: (contents: BaseContent[]) => void;
  setCurrentContent: (content: BaseContent | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  setQueryOptions: (options: Partial<ContentQueryOptions>) => void;
  
  // Async actions
  fetchContents: (options?: ContentQueryOptions) => Promise<void>;
  fetchContentById: (id: string) => Promise<void>;
  createContent: (content: Omit<BaseContent, 'id'>) => Promise<void>;
  updateContent: (id: string, content: Partial<BaseContent>) => Promise<void>;
  deleteContent: (id: string) => Promise<void>;
}

/**
 * Content store selectors
 */
export const contentSelectors = {
  getAllContents: (state: ContentState) => Array.from(state.contents.values()),
  getContentById: (state: ContentState, id: string) => state.contents.get(id),
  getCurrentContent: (state: ContentState) => state.currentContent,
  getContentsByType: (state: ContentState, type: ContentType) => 
    Array.from(state.contents.values()).filter(content => content.type === type),
  getContentsByStatus: (state: ContentState, status: ContentStatus) =>
    Array.from(state.contents.values()).filter(content => content.status === status),
  isLoading: (state: ContentState) => state.isLoading,
  hasError: (state: ContentState) => !!state.error,
  getQueryOptions: (state: ContentState) => state.queryOptions
}; 