import React from 'react';
import { Content } from '@/lib/types/content';
import { AdminNav } from "@/components/admin/dashboard/AdminNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ContentForm } from "@/components/admin/content/ContentForm";
import { useNavigate, useParams } from "react-router-dom";

const ContentEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewContent = id === "new";

  const { data: content, isLoading } = useQuery({
    queryKey: ["content", id],
    queryFn: async () => {
      if (isNewContent) return null;

      const { data, error } = await supabase
        .from("cms_content")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Content;
    },
    enabled: !isNewContent,
  });

  const { mutate: saveContent, isPending } = useMutation({
    mutationFn: async (formData: Partial<Content>) => {
      if (isNewContent) {
        const { data, error } = await supabase
          .from("cms_content")
          .insert([formData])
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("cms_content")
          .update(formData)
          .eq("id", id)
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      toast.success(`Content ${isNewContent ? "created" : "updated"} successfully`);
      navigate("/admin/content-management");
    },
    onError: (error) => {
      console.error("Error saving content:", error);
      toast.error("Failed to save content");
    },
  });

  const handleSave = (formData: Partial<Content>) => {
    if (!formData.title?.trim()) {
      toast.error("Content title is required");
      return;
    }
    saveContent(formData);
  };

  if (!isNewContent && isLoading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] pt-20 p-8">
        <AdminNav />
        <div className="container mx-auto">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-20 p-8">
      <AdminNav />
      <div className="container mx-auto">
        <Card className="glass border-white/10 p-6 bg-black/40 backdrop-blur-xl shadow-[0_0_15px_rgba(65,240,219,0.2)] animate-fade-in">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="text-white/60 hover:text-white"
                onClick={() => navigate("/admin/content-management")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-3xl font-bold text-white">
                {isNewContent ? "Create New Content" : "Edit Content"}
              </h1>
            </div>
            <Button
              onClick={() => handleSave(content as Content)}
              className="bg-neon-cyan/20 text-white border border-neon-cyan/50 hover:bg-neon-cyan/30"
              disabled={isPending}
            >
              {isPending ? (
                <LoadingSpinner />
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Content
                </>
              )}
            </Button>
          </div>

          <ContentForm 
            content={content}
            onSave={handleSave}
            isNew={isNewContent}
          />
        </Card>
      </div>
    </div>
  );
};

export default ContentEditor;