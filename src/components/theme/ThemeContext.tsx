
import React, { createContext, useContext, useEffect, useState } from "react";
import { FlattenedSettings, DEFAULT_SETTINGS } from "@/lib/types/settings/core";
import { useThemeSetup } from "./hooks/useThemeSetup";
import { useThemeSubscription } from "./hooks/useThemeSubscription";
import { applyThemeToDocument } from "./utils/themeUtils";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from '@/lib/store/auth-store';
import { LoadingState } from "@/components/common/LoadingState";
import { toast } from "@/lib/toast";

interface ThemeContextType {
  theme: FlattenedSettings;
  isLoading: boolean;
  updateTheme: (newTheme: FlattenedSettings) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<FlattenedSettings>({ ...DEFAULT_SETTINGS });
  const [isLoading, setIsLoading] = useState(true);
  const { session } = useAuthStore();
  
  // Apply default theme immediately
  useEffect(() => {
    applyThemeToDocument(DEFAULT_SETTINGS);
  }, []);

  // Try to fetch the theme from the database
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from("site_settings")
          .select("*")
          .limit(1)
          .maybeSingle();

        if (error) {
          console.warn("Error fetching theme:", error.message);
          toast.error("Could not load theme settings", {
            description: "Using default theme instead"
          });
          // Continue with default theme
          return;
        }

        if (data) {
          const updatedTheme = {
            ...DEFAULT_SETTINGS,
            ...data,
            security_settings: data.security_settings || {}
          };
          
          setTheme(updatedTheme);
          applyThemeToDocument(updatedTheme);
          console.log("Theme loaded from database:", updatedTheme.site_title);
        }
      } catch (error) {
        console.error("Theme loading error:", error);
        toast.error("Theme loading error", {
          description: "An unexpected error occurred when loading theme"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTheme();
  }, []);
  
  // Subscribe to theme changes
  useThemeSubscription(setTheme);

  const updateTheme = async (newTheme: FlattenedSettings) => {
    try {
      const loadingToastId = toast.loading("Updating theme...");
      setIsLoading(true);
      
      if (!session?.user) {
        console.log('No active session, applying theme without persistence');
        applyThemeToDocument(newTheme);
        setTheme(newTheme);
        setIsLoading(false);
        toast.success.fromLoading(loadingToastId, "Theme updated locally", {
          description: "Changes won't be saved until you sign in"
        });
        return;
      }

      const { error } = await supabase.rpc('update_site_settings', {
        p_site_title: newTheme.site_title,
        p_tagline: newTheme.tagline || "",
        p_primary_color: newTheme.primary_color,
        p_secondary_color: newTheme.secondary_color,
        p_accent_color: newTheme.accent_color,
        p_text_primary_color: newTheme.text_primary_color,
        p_text_secondary_color: newTheme.text_secondary_color,
        p_text_link_color: newTheme.text_link_color,
        p_text_heading_color: newTheme.text_heading_color,
        p_neon_cyan: newTheme.neon_cyan,
        p_neon_pink: newTheme.neon_pink,
        p_neon_purple: newTheme.neon_purple,
        p_border_radius: newTheme.border_radius,
        p_spacing_unit: newTheme.spacing_unit,
        p_transition_duration: newTheme.transition_duration,
        p_shadow_color: newTheme.shadow_color,
        p_hover_scale: newTheme.hover_scale,
        p_font_family_heading: newTheme.font_family_heading,
        p_font_family_body: newTheme.font_family_body,
        p_font_size_base: newTheme.font_size_base,
        p_font_weight_normal: newTheme.font_weight_normal,
        p_font_weight_bold: newTheme.font_weight_bold,
        p_line_height_base: newTheme.line_height_base,
        p_letter_spacing: newTheme.letter_spacing,
        p_security_settings: newTheme.security_settings || {}
      });

      if (error) {
        throw error;
      }
      
      setTheme(newTheme);
      applyThemeToDocument(newTheme);
      toast.success.fromLoading(loadingToastId, "Theme updated successfully", {
        description: "Your changes have been saved and applied"
      });
    } catch (error) {
      console.error("Error updating theme:", error);
      toast.error("Failed to update theme", {
        description: "Please try again or contact support if the issue persists"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue = {
    theme,
    isLoading,
    updateTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
