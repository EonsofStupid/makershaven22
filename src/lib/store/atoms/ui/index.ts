import { atom } from 'jotai';

// Form states
export const formErrorsAtom = atom<Record<string, string>>({});
export const formDirtyAtom = atom<boolean>(false);
export const formSubmittingAtom = atom<boolean>(false);

// Modal states
export const activeModalAtom = atom<string | null>(null);
export const modalDataAtom = atom<any>(null);

// Loading states
export const pageLoadingAtom = atom<boolean>(false);
export const componentLoadingAtom = atom<Record<string, boolean>>({});

// View preferences
export const viewPreferencesAtom = atom({
  sortOrder: 'asc',
  sortBy: 'created_at',
  filterBy: {},
  pageSize: 10,
  currentPage: 1
});