import { atom } from 'jotai';
import type { BaseContent } from '@/lib/types/content';

export const activeContentAtom = atom<BaseContent | null>(null);
export const contentHistoryAtom = atom<Record<string, BaseContent[]>>({});

export const contentLoadingAtom = atom<boolean>(false);
export const contentErrorAtom = atom<Error | null>(null);