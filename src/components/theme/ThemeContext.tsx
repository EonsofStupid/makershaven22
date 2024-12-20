import { convertToUpdateParams } from "@/lib/types/settings/settingsUtils";

const updateTheme = async (newTheme: Settings) => {
  console.log('Updating theme with new settings:', newTheme.site_title);

  try {
    if (!session?.user) {
      console.log('No active session, applying theme without persistence');
      applyThemeToDocument(newTheme);
      setTheme(newTheme);
      return;
    }

    const updateParams = convertToUpdateParams(newTheme);

    const { error } = await supabase.rpc('update_site_settings', updateParams);

    if (error) throw error;

    setTheme(newTheme);
    applyThemeToDocument(newTheme);
    toast.success("Theme updated successfully", {
      description: "Your changes have been saved and applied",
    });
  } catch (error) {
    console.error("Error updating theme:", error);
    toast.error("Failed to update theme", {
      description: "Please try again or contact support if the issue persists",
    });
  }
};
