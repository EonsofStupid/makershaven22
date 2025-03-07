
import React, { useState, useEffect } from 'react';
import { useSettingsQuery } from '@/hooks/useSettings';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SecuritySettings } from '@/lib/types/settings/core';
import { Json } from '@/lib/types/core/json';

export const RateLimitingSection = () => {
  const { data: settings, isLoading, refetch } = useSettingsQuery();
  const [enableRateLimiting, setEnableRateLimiting] = useState(false);
  const [requestsPerWindow, setRequestsPerWindow] = useState(100);
  const [windowMinutes, setWindowMinutes] = useState(15);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (settings && settings.security_settings) {
      // Convert security settings to expected format
      const securitySettings = typeof settings.security_settings === 'string' 
        ? JSON.parse(settings.security_settings as string) as SecuritySettings
        : settings.security_settings as SecuritySettings;
      
      setRequestsPerWindow(securitySettings.rate_limit_requests || 100);
      setWindowMinutes(securitySettings.rate_limit_window_minutes || 15);
      // If either of these exists, we consider rate limiting enabled
      setEnableRateLimiting(!!(securitySettings.rate_limit_requests || securitySettings.rate_limit_window_minutes));
    }
  }, [settings]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const securitySettings: SecuritySettings = {
        ...((settings?.security_settings as SecuritySettings) || {
          enable_ip_filtering: false,
          two_factor_auth: false,
          max_login_attempts: 5
        }),
        rate_limit_requests: enableRateLimiting ? requestsPerWindow : undefined,
        rate_limit_window_minutes: enableRateLimiting ? windowMinutes : undefined
      };

      const { error } = await supabase.from('site_settings')
        .update({ security_settings: securitySettings as unknown as Json })
        .eq('id', 1);

      if (error) throw error;
      
      toast.success('Rate limiting settings updated');
      refetch();
    } catch (error) {
      console.error('Error saving rate limiting settings:', error);
      toast.error('Failed to update rate limiting settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Rate Limiting</h3>
          <p className="text-sm text-gray-400">Control request frequency to prevent abuse</p>
        </div>
        <Switch 
          checked={enableRateLimiting} 
          onCheckedChange={setEnableRateLimiting}
        />
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="requests-per-window">Maximum Requests</Label>
          <Input 
            id="requests-per-window"
            type="number"
            min={1}
            value={requestsPerWindow}
            onChange={(e) => setRequestsPerWindow(parseInt(e.target.value) || 100)}
            disabled={!enableRateLimiting}
          />
          <p className="text-xs text-gray-400">Maximum number of requests allowed in the time window</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="window-minutes">Time Window (minutes)</Label>
          <Input 
            id="window-minutes"
            type="number"
            min={1}
            value={windowMinutes}
            onChange={(e) => setWindowMinutes(parseInt(e.target.value) || 15)}
            disabled={!enableRateLimiting}
          />
          <p className="text-xs text-gray-400">Time period in minutes for the rate limit window</p>
        </div>

        <Button 
          onClick={handleSave} 
          disabled={isSaving || !enableRateLimiting}
          className="mt-2"
        >
          {isSaving ? 'Saving...' : 'Save Rate Limit Settings'}
        </Button>
      </div>
    </div>
  );
};
