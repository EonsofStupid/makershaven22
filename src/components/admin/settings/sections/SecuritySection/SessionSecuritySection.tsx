
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { prepareSecuritySettingsForDb } from "@/lib/types/security/types";

export function SessionSecuritySection() {
  const [sessionTimeout, setSessionTimeout] = useState(60);
  const [lockoutDuration, setLockoutDuration] = useState(30);
  const [maxLoginAttempts, setMaxLoginAttempts] = useState(5);
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
        setSessionTimeout(settings.session_timeout_minutes || 60);
        setLockoutDuration(settings.lockout_duration_minutes || 30);
        setMaxLoginAttempts(settings.max_login_attempts || 5);
      } catch (err) {
        console.error("Error fetching session security settings:", err);
        toast.error("Failed to load session security settings");
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
      
      // Update specific session security settings
      const { error } = await supabase
        .from("site_settings")
        .update({
          security_settings: {
            ...currentSettings,
            session_timeout_minutes: sessionTimeout,
            lockout_duration_minutes: lockoutDuration,
            max_login_attempts: maxLoginAttempts
          }
        })
        .eq("id", '1');

      if (error) throw error;

      toast.success("Session security settings updated");
    } catch (err) {
      console.error("Error updating session security settings:", err);
      toast.error("Failed to update session security settings");
    }
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
          <span>{sessionTimeout}</span>
        </div>
        <Slider
          id="session-timeout"
          min={5}
          max={240}
          step={5}
          value={[sessionTimeout]}
          onValueChange={(value) => setSessionTimeout(value[0])}
          onValueCommit={handleUpdateSettings}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="lockout-duration">Account Lockout Duration (minutes)</Label>
          <span>{lockoutDuration}</span>
        </div>
        <Slider
          id="lockout-duration"
          min={1}
          max={120}
          step={1}
          value={[lockoutDuration]}
          onValueChange={(value) => setLockoutDuration(value[0])}
          onValueCommit={handleUpdateSettings}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
          <span>{maxLoginAttempts}</span>
        </div>
        <Slider
          id="max-login-attempts"
          min={1}
          max={10}
          step={1}
          value={[maxLoginAttempts]}
          onValueChange={(value) => setMaxLoginAttempts(value[0])}
          onValueCommit={handleUpdateSettings}
        />
      </div>
    </div>
  );
}
