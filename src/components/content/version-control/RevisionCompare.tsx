import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAtom } from 'jotai';
import { RevisionSelector } from './components/RevisionSelector';
import { RevisionContent } from './components/RevisionContent';
import { RollbackConfirmation } from './components/RollbackConfirmation';
import { revisionsAtom, rollbackVersionAtom, showRollbackConfirmAtom } from './atoms/revision-atoms';
import type { ContentRevision } from '@/integrations/supabase/types/content';

interface RevisionCompareProps {
  contentId: string;
  currentVersion?: number;
}

export const RevisionCompare: React.FC<RevisionCompareProps> = ({
  contentId,
  currentVersion
}) => {
  const [, setRevisions] = useAtom(revisionsAtom);
  const [showRollbackConfirm, setShowRollbackConfirm] = useAtom(showRollbackConfirmAtom);
  const [rollbackVersion, setRollbackVersion] = useAtom(rollbackVersionAtom);

  const { isLoading } = useQuery({
    queryKey: ['content-revisions', contentId],
    queryFn: async () => {
      console.log('Fetching revisions for comparison:', contentId);
      
      try {
        const { data, error } = await supabase
          .from('cms_content_revisions')
          .select(`
            id,
            content_id,
            content,
            metadata,
            created_at,
            created_by,
            version_number,
            change_summary,
            rollback_metadata,
            profiles (
              display_name
            )
          `)
          .eq('content_id', contentId)
          .order('version_number', { ascending: false });

        if (error) throw error;
        setRevisions(data as ContentRevision[]);
        return data as ContentRevision[];
      } catch (error) {
        console.error('Failed to fetch revisions:', error);
        toast.error('Failed to load revisions');
        throw error;
      }
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: !!contentId,
  });

  const handleRollback = async (version: number) => {
    try {
      const { error } = await supabase.rpc('create_rollback_revision', {
        p_content_id: contentId,
        p_target_version_number: version,
        p_current_content: null, // Will be handled by the database function
        p_user_id: (await supabase.auth.getUser()).data.user?.id
      });

      if (error) throw error;
      
      toast.success('Successfully rolled back to version ' + version);
      setShowRollbackConfirm(false);
    } catch (error) {
      console.error('Rollback error:', error);
      toast.error('Failed to rollback version');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <RevisionSelector side="left" />
          <RevisionContent side="left" />
        </div>

        <div className="space-y-4">
          <RevisionSelector side="right" />
          <RevisionContent side="right" />
        </div>
      </div>

      <RollbackConfirmation
        isOpen={showRollbackConfirm}
        onClose={() => setShowRollbackConfirm(false)}
        onConfirm={() => rollbackVersion && handleRollback(rollbackVersion)}
        versionNumber={rollbackVersion || 0}
      />
    </div>
  );
};