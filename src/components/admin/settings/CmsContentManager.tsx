
// CmsContentManager Component with Realtime and Toast Support
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../../../integrations/supabase/client";
import { CmsContent } from "../../../types/shared";

toast.configure();

export function CmsContentManager() {
  const [contents, setContents] = useState<CmsContent[]>([]);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const { data, error } = await supabase.from<CmsContent>("cms_content").select("*");
        if (error) throw error;
        setContents(data || []);
        toast.success("Content loaded successfully.");
      } catch (err) {
        console.error("Error fetching contents:", err);
        toast.error("Error loading content.");
      }
    };

    const subscribeToUpdates = () => {
      const subscription = supabase
        .channel("cms-content-updates")
        .on("postgres_changes", { schema: "public", table: "cms_content" }, (payload) => {
          switch (payload.eventType) {
            case "INSERT":
              setContents((prev) => [...prev, payload.new as CmsContent]);
              toast.success("New content added.");
              break;
            case "UPDATE":
              setContents((prev) =>
                prev.map((content) =>
                  content.id === payload.new.id ? (payload.new as CmsContent) : content
                )
              );
              toast.info("Content updated.");
              break;
            case "DELETE":
              setContents((prev) => prev.filter((content) => content.id !== payload.old.id));
              toast.warn("Content deleted.");
              break;
          }
        })
        .subscribe();

      return () => supabase.removeChannel(subscription);
    };

    fetchContents();
    const unsubscribe = subscribeToUpdates();

    return () => unsubscribe();
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
}
