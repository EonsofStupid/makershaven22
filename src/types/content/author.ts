import type { BaseContent } from './types';

export interface ContentWithAuthor extends Omit<BaseContent, 'created_by'> {
  created_by: {
    display_name: string;
  };
}