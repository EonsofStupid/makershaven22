import { atom } from 'jotai';
import type { ContentRevision } from '@/integrations/supabase/types/content';

export interface SelectedVersions {
  left: number;
  right: number;
}

export const selectedVersionsAtom = atom<SelectedVersions>({
  left: 1,
  right: 1
});

export const revisionsAtom = atom<ContentRevision[]>([]);

export const rollbackVersionAtom = atom<number | null>(null);
export const showRollbackConfirmAtom = atom<boolean>(false);

// Derived atoms
export const selectedRevisionsAtom = atom((get) => {
  const revisions = get(revisionsAtom);
  const selected = get(selectedVersionsAtom);
  
  return {
    left: revisions.find(r => r.version_number === selected.left),
    right: revisions.find(r => r.version_number === selected.right)
  };
});