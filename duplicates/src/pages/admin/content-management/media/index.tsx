import React, { useState } from 'react';
import { uploadMedia } from "@/integrations/supabase/client";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const MediaUploadHandler = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    try {
      const path = `uploads/${Date.now()}-${file.name}`;
      const data = await uploadMedia(file, path);
      
      if (data) {
        const { error } = await supabase
          .from('media')
          .insert({
            name: file.name,
            url: data.path,
            size: file.size,
            type: file.type,
            user_id: (await supabase.auth.getUser()).data.user?.id
          });

        if (error) throw error;
        toast.success('File uploaded successfully');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload file');
    }
  };

  return (
    <div>
      <input 
        type="file" 
        onChange={(e) => setFile(e.target.files?.[0] || null)} 
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default MediaUploadHandler;