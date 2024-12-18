import React from 'react';
import { handleMediaUpload } from '@/utils/media';

const MediaManagement = () => {
  const handleFileUpload = async (file) => {
    try {
      const url = await handleMediaUpload(file);
      console.log('Uploaded URL:', url);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h1>Media Management</h1>
      <input type="file" onChange={(e) => handleFileUpload(e.target.files[0])} />
    </div>
  );
};

export default MediaManagement;