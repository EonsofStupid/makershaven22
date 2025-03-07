
import { useEffect } from 'react';
import { useRevisionStore } from '@/lib/store/revision-store';
import { supabase } from '@/integrations/supabase/client';
import { ContentRevision } from '@/lib/types/content/types';

export const useRevisions = (contentId: string) => {
  const { 
    revisions, 
    selectedRevision, 
    compareRevision, 
    diffMode,
    selectedVersions,
    isLoading, 
    error,
    setRevisions, 
    setSelectedRevision, 
    setCompareRevision,
    setDiffMode,
    setSelectedVersions,
    setLoading, 
    setError 
  } = useRevisionStore();

  useEffect(() => {
    const fetchRevisions = async () => {
      if (!contentId) return;
      
      setLoading(true);
      try {
        const { data, error: fetchError } = await supabase
          .from('cms_content_revisions')
          .select('*')
          .eq('content_id', contentId)
          .order('version_number', { ascending: false });

        if (fetchError) throw fetchError;
        
        setRevisions(data as ContentRevision[]);
        
        // Select latest version by default
        if (data && data.length > 0) {
          setSelectedRevision(data[0] as ContentRevision);
          
          // If there are at least 2 revisions, set the second one as compare
          if (data.length > 1) {
            setCompareRevision(data[1] as ContentRevision);
            setSelectedVersions([data[0].version_number, data[1].version_number]);
          }
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchRevisions();
  }, [contentId]);

  const selectVersionForComparison = (version1: number, version2: number) => {
    const rev1 = revisions.find(r => r.version_number === version1) || null;
    const rev2 = revisions.find(r => r.version_number === version2) || null;
    
    setSelectedRevision(rev1);
    setCompareRevision(rev2);
    setSelectedVersions([version1, version2]);
  };

  return {
    revisions,
    selectedRevision,
    compareRevision,
    diffMode,
    selectedVersions,
    isLoading,
    error,
    setSelectedRevision,
    setCompareRevision,
    setDiffMode,
    selectVersionForComparison
  };
};
