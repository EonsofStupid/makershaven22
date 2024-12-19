import React from 'react';
import { Content } from '@/lib/types/content';

interface PreviewDialogProps {
  content: Content;
  onClose: () => void;
}

const PreviewDialog: React.FC<PreviewDialogProps> = ({ content, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold">{content.title}</h2>
        <div className="mt-2">
          <p>{content.description}</p>
        </div>
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default PreviewDialog;
