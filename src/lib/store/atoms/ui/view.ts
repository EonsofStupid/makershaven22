import { atom } from 'jotai';
import { viewPreferencesAtom } from './index';

export interface ViewPreferences {
  sortOrder: 'asc' | 'desc';
  sortBy: string;
  filterBy: Record<string, any>;
  pageSize: number;
  currentPage: number;
}

export const useViewState = () => {
  const [preferences, setPreferences] = atom(viewPreferencesAtom);

  return {
    preferences,
    setPreferences,
    updateSort: (sortBy: string, sortOrder: 'asc' | 'desc') => {
      setPreferences(prev => ({
        ...prev,
        sortBy,
        sortOrder
      }));
    },
    updateFilter: (filterBy: Record<string, any>) => {
      setPreferences(prev => ({
        ...prev,
        filterBy,
        currentPage: 1 // Reset to first page when filter changes
      }));
    },
    updatePage: (page: number) => {
      setPreferences(prev => ({
        ...prev,
        currentPage: page
      }));
    },
    updatePageSize: (size: number) => {
      setPreferences(prev => ({
        ...prev,
        pageSize: size,
        currentPage: 1 // Reset to first page when page size changes
      }));
    }
  };
};