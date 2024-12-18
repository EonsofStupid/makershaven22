import { BaseContent } from './types';

export interface ContentWithAuthor extends BaseContent {
  created_by: {
    display_name: string;
  };
}