import React from 'react';
import { ImportWizard } from '@/components/ui/ImportWizard';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { handleDataImport } from '@/services/import-service';

const UnifiedDataImport = () => {
  const handleImport = async (data) => {
    try {
      await handleDataImport(data);
      toast.success('Import successful!');
    } catch (error) {
      console.error('Error importing data:', error);
      toast.error('Import failed. Please try again.');
    }
  };

  return (
    <Card>
      <h3>Data Import</h3>
      <ImportWizard onImport={handleImport} />
    </Card>
  );
};

export default UnifiedDataImport;