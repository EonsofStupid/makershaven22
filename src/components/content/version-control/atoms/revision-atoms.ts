
import { atom } from 'jotai';
import type { ContentRevision } from '@/lib/types/content/index';

export const selectedRevisionAtom = atom<ContentRevision | null>(null);
export const compareRevisionAtom = atom<ContentRevision | null>(null);
export const diffModeAtom = atom<'split' | 'unified'>('split');
