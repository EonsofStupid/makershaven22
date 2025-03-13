
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "../../../integrations/supabase/client";
import { Settings, SecuritySettings } from "@/lib/types/settings/core";
import { Json, parseJsonToObject } from "@/lib/types/core/json";

export function SiteSettingsManager() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("*")
          .single();

        if (error) throw error;
        
        // Transform the data to ensure it matches the Settings type
        const transformedData: Settings = {
          ...data,
          // Ensure security_settings is properly parsed
          security_settings: parseJsonToObject<SecuritySettings>(data.security_settings, {
            enable_ip_filtering: false,
            two_factor_auth: false,
            max_login_attempts: 5,
            ip_whitelist: [],
            ip_blacklist: []
          })
        };
        
        setSettings(transformedData);
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
            // Transform the update data to ensure it matches the Settings type
            const transformedData: Settings = {
              ...newData,
              security_settings: parseJsonToObject<SecuritySettings>(newData.security_settings, {
                enable_ip_filtering: false,
                two_factor_auth: false,
                max_login_attempts: 5,
                ip_whitelist: [],
                ip_blacklist: []
              })
            };
            
            setSettings(transformedData);
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
