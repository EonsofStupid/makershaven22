import { atom } from 'jotai';

export interface ViewPreferences {
  sortOrder: 'asc' | 'desc';
  sortBy: string;
  filterBy: Record<string, any>;
  pageSize: number;
  currentPage: number;
}

export const viewPreferencesAtom = atom<ViewPreferences>({
  sortOrder: 'asc',
  sortBy: 'created_at',
  filterBy: {},
  pageSize: 10,
  currentPage: 1
});

export const useViewState = () => {
  const [preferences, setPreferences] = atom(viewPreferencesAtom);

  return {
    preferences,
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
        currentPage: 1
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
        currentPage: 1
      }));
    }
  };
};