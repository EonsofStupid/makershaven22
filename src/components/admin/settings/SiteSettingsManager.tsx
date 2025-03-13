
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "../../../integrations/supabase/client";
import { FlattenedSettings } from "@/lib/types/settings/core";

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
        
        // Convert the raw data to our FlattenedSettings type with the proper security_settings
        const flattenedSettings: FlattenedSettings = {
          ...data,
          security_settings: data.security_settings || {
            enable_ip_filtering: false,
            two_factor_auth: false,
            max_login_attempts: 5
          }
        };
        
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
            const newData = payload.new as any;
            const flattenedSettings: FlattenedSettings = {
              ...newData,
              security_settings: newData.security_settings || {
                enable_ip_filtering: false,
                two_factor_auth: false,
                max_login_attempts: 5
              }
            };
            
            setSettings(flattenedSettings);
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
