import React from 'react';
import { useRevisionStore } from '@/lib/store/revision-store';
import { VersionSelector } from './VersionSelector';

interface RevisionSelectorProps {
  side: 'left' | 'right';
}

export const RevisionSelector: React.FC<RevisionSelectorProps> = ({ side }) => {
  const { selectedVersions, setSelectedVersions, revisions } = useRevisionStore();

  const handleVersionChange = (increment: boolean) => {
    const currentVersion = selectedVersions[side];
    const newValue = increment ? currentVersion + 1 : currentVersion - 1;
    
    if (newValue >= 1 && newValue <= revisions.length) {
      setSelectedVersions({
        ...selectedVersions,
        [side]: newValue
      });
    }
  };

  return (
    <VersionSelector
      versionNumber={selectedVersions[side]}
      maxVersion={revisions.length}
      onVersionChange={handleVersionChange}
    />
  );
};