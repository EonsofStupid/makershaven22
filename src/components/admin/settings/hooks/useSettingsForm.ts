import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsSchema } from "../types/schema";
import { useStore } from "@/lib/store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Settings } from "@/lib/types/settings";

export const useSettingsForm = () => {
  const queryClient = useQueryClient();
  const { settings: globalSettings, updateSettings } = useStore();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .single();

      if (error) throw error;
      return data as Settings;
    }
  });

  const form = useForm<Settings>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings || {}
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (values: Settings) => {
      const { data, error } = await supabase
        .rpc("update_site_settings", values);

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      updateSettings(data);
      toast.success("Settings updated successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to update settings:", error);
      toast.error("Failed to update settings", {
        description: error.message
      });
    }
  });

  const onSubmit = async (values: Settings) => {
    await updateSettingsMutation.mutateAsync(values);
  };

  return {
    form,
    settings,
    isLoading,
    onSubmit,
    isSubmitting: updateSettingsMutation.isPending
  };
};