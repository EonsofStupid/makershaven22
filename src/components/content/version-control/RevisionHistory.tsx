import React from "react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useRevisionStore } from "@/lib/store/revision-store";
import type { ContentRevision } from "./types/revision";

interface RevisionHistoryProps {
  contentId: string;
  onRestore?: (revision: ContentRevision) => void;
  onPreview?: (revision: ContentRevision) => void;
}

export const RevisionHistory: React.FC<RevisionHistoryProps> = ({
  contentId,
  onRestore,
  onPreview,
}) => {
  const { revisions, setRevisions } = useRevisionStore();

  const { data: fetchedRevisions, isLoading } = useQuery({
    queryKey: ["content-revisions", contentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cms_content_revisions")
        .select(`
          id,
          content,
          created_at,
          created_by,
          profiles (
            display_name,
            avatar_url
          )
        `)
        .eq("content_id", contentId)
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Failed to load revision history");
        throw error;
      }

      setRevisions(data);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <Card className="glass border-white/10 p-6 bg-black/40 backdrop-blur-xl">
      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {revisions.map((revision, index) => (
            <motion.div
              key={revision.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm text-white/60">
                    {format(new Date(revision.created_at), "PPpp")}
                  </p>
                  <p className="text-sm text-white/80">
                    By: {revision.profiles?.display_name || "Unknown"}
                  </p>
                </div>
                <div className="flex gap-2">
                  {onPreview && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onPreview(revision)}
                      className="text-white/60 hover:text-white hover:bg-white/5"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                  )}
                  {onRestore && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRestore(revision)}
                      className="text-white/60 hover:text-white hover:bg-white/5"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Restore
                    </Button>
                  )}
                </div>
              </div>
              <div className="mt-2 text-sm">
                <pre className="bg-black/20 p-2 rounded overflow-x-auto">
                  {JSON.stringify(revision.content, null, 2)}
                </pre>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};