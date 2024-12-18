import React from 'react';
import { Card } from "./card";
import { Button } from "./button";
import { Upload } from "lucide-react";

interface ImportWizardProps {
  onImport: (files: File[]) => void;
  acceptedTypes?: string[];
  type?: 'csv' | 'json' | 'other';
}

export const ImportWizard: React.FC<ImportWizardProps> = ({
  onImport,
  acceptedTypes = ['.csv', '.json'],
  type = 'csv'
}) => {
  const [file, setFile] = React.useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleImport = () => {
    if (file) {
      onImport([file]);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Import {type.toUpperCase()}</h3>
        </div>

        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <input
            type="file"
            accept={acceptedTypes.join(',')}
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload className="w-8 h-8 mb-2 text-gray-400" />
            <span className="text-sm text-gray-500">
              Click to select a file ({acceptedTypes.join(', ')})
            </span>
          </label>
        </div>

        {file && (
          <div className="flex justify-end">
            <Button onClick={handleImport}>
              Start Import
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ImportWizard;