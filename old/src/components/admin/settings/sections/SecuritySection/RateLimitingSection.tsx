
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { JsonObject } from "@/lib/types/core/json";

export function RateLimitingSection() {
  const [requestsPerMinute, setRequestsPerMinute] = useState(100);
  const [windowMinutes, setWindowMinutes] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch current security settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("site_settings")
          .select("security_settings")
          .single();

        if (error) throw error;

        const settings = data.security_settings || {};
        setRequestsPerMinute(settings.rate_limit_requests || 100);
        setWindowMinutes(settings.rate_limit_window_minutes || 5);
      } catch (err) {
        console.error("Error fetching rate limiting settings:", err);
        toast.error("Failed to load rate limiting settings");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleUpdateSettings = async () => {
    try {
      // Get current settings first
      const { data, error: fetchError } = await supabase
        .from("site_settings")
        .select("security_settings")
        .single();

      if (fetchError) throw fetchError;
      
      // Preserve other security settings
      const currentSettings = data.security_settings || {};
      
      // Update specific rate limiting settings
      const { error } = await supabase
        .from("site_settings")
        .update({
          security_settings: {
            ...currentSettings,
            rate_limit_requests: requestsPerMinute,
            rate_limit_window_minutes: windowMinutes
          }
        })
        .eq("id", '1');

      if (error) throw error;

      toast.success("Rate limiting settings updated");
    } catch (err) {
      console.error("Error updating rate limiting settings:", err);
      toast.error("Failed to update rate limiting settings");
    }
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="requests-per-minute">Maximum Requests Per Minute</Label>
          <span>{requestsPerMinute}</span>
        </div>
        <Slider
          id="requests-per-minute"
          min={10}
          max={500}
          step={10}
          value={[requestsPerMinute]}
          onValueChange={(value) => setRequestsPerMinute(value[0])}
          onValueCommit={handleUpdateSettings}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="window-minutes">Rate Limit Window (minutes)</Label>
          <span>{windowMinutes}</span>
        </div>
        <Slider
          id="window-minutes"
          min={1}
          max={30}
          step={1}
          value={[windowMinutes]}
          onValueChange={(value) => setWindowMinutes(value[0])}
          onValueCommit={handleUpdateSettings}
        />
      </div>
    </div>
  );
}
