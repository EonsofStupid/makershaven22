import { atom } from 'jotai';
import type { BaseContent } from '@/components/content/types/contentTypes';

export const activeContentAtom = atom<BaseContent | null>(null);

export const contentHistoryAtom = atom<Record<string, BaseContent[]>>({});

export const updateContentAtom = atom(
  null,
  (get, set, content: BaseContent) => {
    set(activeContentAtom, content);
  }
);