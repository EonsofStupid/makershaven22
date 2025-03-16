
import { atom } from 'jotai';
import type { ContentRevision } from '@/lib/types/content/index';

// Atom for the currently selected revision
export const selectedRevisionAtom = atom<ContentRevision | null>(null);

// Atom for the revision to compare against
export const compareRevisionAtom = atom<ContentRevision | null>(null);

// Atom for the diff mode (split or unified)
export const diffModeAtom = atom<'split' | 'unified'>('split');

// Atom for selected version numbers
export const selectedVersionsAtom = atom<{ left: number; right: number }>({
  left: 1,
  right: 1
});

// Derived atom for whether a comparison is active
export const isComparisonActiveAtom = atom(
  (get) => get(selectedRevisionAtom) !== null && get(compareRevisionAtom) !== null
);

// Derived atom that calculates the diff between the two selected revisions
export const revisionDiffAtom = atom(
  (get) => {
    const selectedRevision = get(selectedRevisionAtom);
    const compareRevision = get(compareRevisionAtom);
    
    if (!selectedRevision || !compareRevision) {
      return null;
    }
    
    // Return the diff (implementation depends on your diff library)
    return {
      selected: selectedRevision,
      compare: compareRevision
    };
  }
);
