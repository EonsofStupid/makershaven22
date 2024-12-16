import React from 'react';
import { useRevisionStore, getSelectedRevisions } from '../atoms/revision-atoms';
import { RevisionMetadata } from './RevisionMetadata';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RevisionContentProps {
  side: 'left' | 'right';
}

export const RevisionContent: React.FC<RevisionContentProps> = ({ side }) => {
  const selectedRevisions = useRevisionStore(getSelectedRevisions);
  const revision = selectedRevisions[side];

  if (!revision) return null;

  return (
    <Card className="relative">
      <ScrollArea className="h-[400px]">
        <div className="p-4">
          <RevisionMetadata
            revision={revision}
            showRollbackButton
            onRollbackClick={() => {
              // Rollback logic will be handled in the parent
            }}
          />
          <pre className="mt-4 p-4 bg-background/50 rounded-lg overflow-x-auto text-sm">
            {JSON.stringify(revision.content, null, 2)}
          </pre>
        </div>
      </ScrollArea>
    </Card>
  );
};