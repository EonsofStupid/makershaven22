import React from 'react';
import { useAtom } from 'jotai';
import { selectedVersionsAtom, revisionsAtom } from '../atoms/revision-atoms';
import { VersionSelector } from './VersionSelector';

interface RevisionSelectorProps {
  side: 'left' | 'right';
}

export const RevisionSelector: React.FC<RevisionSelectorProps> = ({ side }) => {
  const [selectedVersions, setSelectedVersions] = useState(selectedVersionsAtom);
  const [revisions] = useState(revisionsAtom);

  const handleVersionChange = (increment: boolean) => {
    const currentVersion = selectedVersions[side];
    const newValue = increment ? currentVersion + 1 : currentVersion - 1;
    
    if (newValue >= 1 && newValue <= revisions.length) {
      setSelectedVersions(prev => ({
        ...prev,
        [side]: newValue
      }));
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