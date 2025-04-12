
import React from 'react';
import { Card } from '../../../shared/ui/card';
import { toast } from 'sonner';

// TODO: Import ImportWizard once it's migrated
const ImportWizard = ({ type, onImport }: { type: string, onImport: (data: any) => Promise<void> }) => {
  return <div>Import Wizard</div>;
};

export const UnifiedDataImport = () => {
  const handleImport = async (data: any) => {
    try {
      console.log('Importing data:', data);
      toast.success('Import successful');
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Import failed');
    }
  };

  return (
    <Card className="p-6 bg-black/40 border-white/10">
      <ImportWizard 
        type="csv" 
        onImport={handleImport}
      />
    </Card>
  );
};
