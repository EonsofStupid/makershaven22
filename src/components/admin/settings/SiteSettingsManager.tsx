
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "../../../integrations/supabase/client";
import { FlattenedSettings } from "@/lib/types/settings/core";
import { unflattenSettings } from "@/lib/types/settings";

export function SiteSettingsManager() {
  const [settings, setSettings] = useState<FlattenedSettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("*")
          .single();

        if (error) throw error;
        
        // Convert to the proper type
        const flattenedSettings = data as FlattenedSettings;
        setSettings(flattenedSettings);
        toast.success("Site settings loaded successfully");
      } catch (err) {
        console.error("Error fetching site settings:", err);
        toast.error("Error loading site settings");
      }
    };

    const subscribeToUpdates = () => {
      const subscription = supabase
        .channel("site-settings-updates")
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "site_settings" },
          (payload) => {
            setSettings(payload.new as FlattenedSettings);
            toast.info("Site settings updated");
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    };

    fetchSettings();
    const unsubscribe = subscribeToUpdates();

    return () => {
      unsubscribe();
    };
  }, []);

  if (!settings) return <p>Loading...</p>;

  return (
    <div>
      <h1>{settings.site_title}</h1>
      <pre>{JSON.stringify(settings, null, 2)}</pre>
    </div>
  );
}
