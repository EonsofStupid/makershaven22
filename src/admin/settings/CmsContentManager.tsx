
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { supabase } from '../../integrations/supabase/client';
import { BaseContent } from '../../lib/types/content/types';

export const CmsContentManager = () => {
  const [contents, setContents] = useState<BaseContent[]>([]);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const { data, error } = await supabase
          .from("cms_content")
          .select("*");
        
        if (error) throw error;
        
        // Map the response to include author_id from created_by
        const contentsWithAuthor = (data || []).map(item => ({
          ...item,
          author_id: item.created_by
        })) as BaseContent[];
        
        setContents(contentsWithAuthor);
        toast.success("Content loaded successfully");
      } catch (err) {
        console.error("Error fetching contents:", err);
        toast("Error loading content", {
          description: "Failed to load content from database",
          style: { backgroundColor: "red" }
        });
      }
    };

    fetchContents();
  }, []);

  return (
    <div>
      {contents.map((content) => (
        <div key={content.id}>
          <h3>{content.title}</h3>
          <p>Status: {content.status}</p>
        </div>
      ))}
    </div>
  );
};
