
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "../../../integrations/supabase/client";
import { FlattenedSettings } from "@/lib/types/settings/types";
import { SecuritySettings } from "@/lib/types/security/types";
import { isJsonObject, safeBoolean, safeNumber, safeStringArray } from "@/lib/utils/type-utils";
import { ThemeMode } from "@/lib/types/core/enums";

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
        
        // Create a default security settings object
        const defaultSecuritySettings: SecuritySettings = {
          enable_ip_filtering: false,
          two_factor_auth: false,
          max_login_attempts: 5
        };
        
        // Safely handle the security_settings field from the database
        let securitySettings: SecuritySettings;
        
        // Safely process the security_settings object
        if (data.security_settings && isJsonObject(data.security_settings)) {
          const securityObj = data.security_settings as Record<string, any>;
          
          securitySettings = {
            enable_ip_filtering: safeBoolean(securityObj.enable_ip_filtering, defaultSecuritySettings.enable_ip_filtering),
            two_factor_auth: safeBoolean(securityObj.two_factor_auth, defaultSecuritySettings.two_factor_auth),
            max_login_attempts: safeNumber(securityObj.max_login_attempts, defaultSecuritySettings.max_login_attempts),
            
            // Safely handle optional properties
            ip_blacklist: Array.isArray(securityObj.ip_blacklist) ? safeStringArray(securityObj.ip_blacklist) : undefined,
            ip_whitelist: Array.isArray(securityObj.ip_whitelist) ? safeStringArray(securityObj.ip_whitelist) : undefined,
            rate_limit_requests: typeof securityObj.rate_limit_requests === 'number' ? securityObj.rate_limit_requests : undefined,
            session_timeout_minutes: typeof securityObj.session_timeout_minutes === 'number' ? securityObj.session_timeout_minutes : undefined,
            lockout_duration_minutes: typeof securityObj.lockout_duration_minutes === 'number' ? securityObj.lockout_duration_minutes : undefined,
            rate_limit_window_minutes: typeof securityObj.rate_limit_window_minutes === 'number' ? securityObj.rate_limit_window_minutes : undefined
          };
        } else {
          securitySettings = defaultSecuritySettings;
        }
        
        // Process the metadata field to ensure it's a proper record
        let metadata: Record<string, unknown> = {};
        if (data.metadata) {
          if (typeof data.metadata === 'object' && !Array.isArray(data.metadata)) {
            metadata = data.metadata as Record<string, unknown>;
          }
        }
        
        // Ensure theme_mode is a valid ThemeMode value
        const validThemeModes: ThemeMode[] = ['light', 'dark', 'system'];
        const themeMode: ThemeMode = 
          data.theme_mode && 
          typeof data.theme_mode === 'string' && 
          validThemeModes.includes(data.theme_mode as ThemeMode) 
            ? (data.theme_mode as ThemeMode) 
            : 'system';
        
        // Convert the raw data to our FlattenedSettings type with proper types
        const flattenedSettings: FlattenedSettings = {
          ...data,
          // Replace null values with empty strings or appropriate defaults
          site_title: data.site_title || "MakersImpulse",
          primary_color: data.primary_color || "#7FFFD4",
          secondary_color: data.secondary_color || "#FFB6C1",
          accent_color: data.accent_color || "#E6E6FA",
          text_primary_color: data.text_primary_color || "#FFFFFF",
          text_secondary_color: data.text_secondary_color || "#A1A1AA",
          text_link_color: data.text_link_color || "#3B82F6",
          text_heading_color: data.text_heading_color || "#FFFFFF",
          neon_cyan: data.neon_cyan || "#41f0db",
          neon_pink: data.neon_pink || "#ff0abe",
          neon_purple: data.neon_purple || "#8000ff",
          border_radius: data.border_radius || "0.5rem",
          spacing_unit: data.spacing_unit || "1rem",
          transition_duration: data.transition_duration || "0.3s",
          shadow_color: data.shadow_color || "#000000",
          hover_scale: data.hover_scale || "1.05",
          font_family_heading: data.font_family_heading || "Inter",
          font_family_body: data.font_family_body || "Inter",
          font_size_base: data.font_size_base || "16px",
          font_weight_normal: data.font_weight_normal || "400",
          font_weight_bold: data.font_weight_bold || "700",
          line_height_base: data.line_height_base || "1.5",
          letter_spacing: data.letter_spacing || "normal",
          box_shadow: data.box_shadow || "none",
          backdrop_blur: data.backdrop_blur || "0",
          transition_type: (data.transition_type as "fade" | "slide" | "scale") || "fade",
          theme_mode: themeMode, // Use validated theme_mode
          security_settings: securitySettings,
          metadata: metadata
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
            
            // Create default security settings object
            const defaultSecuritySettings: SecuritySettings = {
              enable_ip_filtering: false,
              two_factor_auth: false,
              max_login_attempts: 5
            };
            
            // Safely handle the security_settings field
            let securitySettings: SecuritySettings;
            
            // Safely process the security_settings object
            if (newData.security_settings && isJsonObject(newData.security_settings)) {
              const securityObj = newData.security_settings as Record<string, any>;
              
              securitySettings = {
                enable_ip_filtering: safeBoolean(securityObj.enable_ip_filtering, defaultSecuritySettings.enable_ip_filtering),
                two_factor_auth: safeBoolean(securityObj.two_factor_auth, defaultSecuritySettings.two_factor_auth),
                max_login_attempts: safeNumber(securityObj.max_login_attempts, defaultSecuritySettings.max_login_attempts),
                
                // Safely handle optional properties
                ip_blacklist: Array.isArray(securityObj.ip_blacklist) ? safeStringArray(securityObj.ip_blacklist) : undefined,
                ip_whitelist: Array.isArray(securityObj.ip_whitelist) ? safeStringArray(securityObj.ip_whitelist) : undefined,
                rate_limit_requests: typeof securityObj.rate_limit_requests === 'number' ? securityObj.rate_limit_requests : undefined,
                session_timeout_minutes: typeof securityObj.session_timeout_minutes === 'number' ? securityObj.session_timeout_minutes : undefined,
                lockout_duration_minutes: typeof securityObj.lockout_duration_minutes === 'number' ? securityObj.lockout_duration_minutes : undefined,
                rate_limit_window_minutes: typeof securityObj.rate_limit_window_minutes === 'number' ? securityObj.rate_limit_window_minutes : undefined
              };
            } else {
              securitySettings = defaultSecuritySettings;
            }
            
            // Process the metadata field
            let metadata: Record<string, unknown> = {};
            if (newData.metadata) {
              if (typeof newData.metadata === 'object' && !Array.isArray(newData.metadata)) {
                metadata = newData.metadata as Record<string, unknown>;
              }
            }
            
            // Ensure theme_mode is a valid ThemeMode value
            const validThemeModes: ThemeMode[] = ['light', 'dark', 'system'];
            const themeMode: ThemeMode = 
              newData.theme_mode && 
              typeof newData.theme_mode === 'string' && 
              validThemeModes.includes(newData.theme_mode as ThemeMode) 
                ? (newData.theme_mode as ThemeMode) 
                : 'system';
            
            // Convert the data with proper types
            const flattenedSettings: FlattenedSettings = {
              ...newData,
              // Replace null values with defaults
              site_title: newData.site_title || "MakersImpulse",
              primary_color: newData.primary_color || "#7FFFD4",
              secondary_color: newData.secondary_color || "#FFB6C1",
              accent_color: newData.accent_color || "#E6E6FA",
              text_primary_color: newData.text_primary_color || "#FFFFFF",
              text_secondary_color: newData.text_secondary_color || "#A1A1AA",
              text_link_color: newData.text_link_color || "#3B82F6",
              text_heading_color: newData.text_heading_color || "#FFFFFF",
              neon_cyan: newData.neon_cyan || "#41f0db",
              neon_pink: newData.neon_pink || "#ff0abe",
              neon_purple: newData.neon_purple || "#8000ff",
              border_radius: newData.border_radius || "0.5rem",
              spacing_unit: newData.spacing_unit || "1rem",
              transition_duration: newData.transition_duration || "0.3s",
              shadow_color: newData.shadow_color || "#000000",
              hover_scale: newData.hover_scale || "1.05",
              font_family_heading: newData.font_family_heading || "Inter",
              font_family_body: newData.font_family_body || "Inter",
              font_size_base: newData.font_size_base || "16px",
              font_weight_normal: newData.font_weight_normal || "400",
              font_weight_bold: newData.font_weight_bold || "700",
              line_height_base: newData.line_height_base || "1.5",
              letter_spacing: newData.letter_spacing || "normal",
              box_shadow: newData.box_shadow || "none",
              backdrop_blur: newData.backdrop_blur || "0",
              transition_type: (newData.transition_type as "fade" | "slide" | "scale") || "fade",
              theme_mode: themeMode, // Use validated theme_mode
              security_settings: securitySettings,
              metadata: metadata
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
