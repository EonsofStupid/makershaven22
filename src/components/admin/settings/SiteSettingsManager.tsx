
// SiteSettingsManager Component with Realtime and Toast Support
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../../../integrations/supabase/client";
import { SiteSettings } from "../../../types/shared";

toast.configure();

export function SiteSettingsManager() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase.from<SiteSettings>("site_settings").select("*").single();
        if (error) throw error;
        setSettings(data);
        toast.success("Site settings loaded successfully.");
      } catch (err) {
        console.error("Error fetching site settings:", err);
        toast.error("Error loading site settings.");
      }
    };

    const subscribeToUpdates = () => {
      const subscription = supabase
        .channel("site-settings-updates")
        .on("postgres_changes", { schema: "public", table: "site_settings" }, (payload) => {
          if (payload.eventType === "UPDATE") {
            setSettings(payload.new as SiteSettings);
            toast.info("Site settings updated.");
          }
        })
        .subscribe();

      return () => supabase.removeChannel(subscription);
    };

    fetchSettings();
    const unsubscribe = subscribeToUpdates();

    return () => unsubscribe();
  }, []);

  if (!settings) return <p>Loading...</p>;
  return (
    <div>
      <h1>{settings.site_title}</h1>
      <pre>{JSON.stringify(settings, null, 2)}</pre>
    </div>
  );
}
