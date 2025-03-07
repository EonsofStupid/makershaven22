
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

export const SessionSecuritySection = () => {
  const { data: settings, isLoading, refetch } = useSettingsQuery();
  const [sessionTimeout, setSessionTimeout] = useState(60); // minutes
  const [maxConcurrentSessions, setMaxConcurrentSessions] = useState(5);
  const [enableRefreshTokenRotation, setEnableRefreshTokenRotation] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (settings && settings.security_settings) {
      // Convert security settings to expected format
      const securitySettings = typeof settings.security_settings === 'string' 
        ? JSON.parse(settings.security_settings as string) as SecuritySettings
        : settings.security_settings as SecuritySettings;
      
      setSessionTimeout(securitySettings.session_timeout_minutes || 60);
      // Set other values if they exist in the data
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
        session_timeout_minutes: sessionTimeout
        // Add other fields as they become relevant
      };

      const { error } = await supabase.from('site_settings')
        .update({ security_settings: securitySettings as unknown as Json })
        .eq('id', 1);

      if (error) throw error;
      
      toast.success('Session security settings updated');
      refetch();
    } catch (error) {
      console.error('Error saving session settings:', error);
      toast.error('Failed to update session security settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Session Security</h3>
        <p className="text-sm text-gray-400">Control user session behavior and security</p>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
          <Input 
            id="session-timeout"
            type="number"
            min={1}
            value={sessionTimeout}
            onChange={(e) => setSessionTimeout(parseInt(e.target.value) || 60)}
          />
          <p className="text-xs text-gray-400">Inactive sessions will expire after this duration</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="max-concurrent-sessions">Maximum Concurrent Sessions</Label>
          <Input 
            id="max-concurrent-sessions"
            type="number"
            min={1}
            value={maxConcurrentSessions}
            onChange={(e) => setMaxConcurrentSessions(parseInt(e.target.value) || 5)}
          />
          <p className="text-xs text-gray-400">Maximum number of active sessions per user</p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="refresh-token-rotation">Refresh Token Rotation</Label>
            <p className="text-xs text-gray-400">Issue new tokens on each refresh for enhanced security</p>
          </div>
          <Switch 
            id="refresh-token-rotation"
            checked={enableRefreshTokenRotation} 
            onCheckedChange={setEnableRefreshTokenRotation}
          />
        </div>

        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="mt-2"
        >
          {isSaving ? 'Saving...' : 'Save Session Settings'}
        </Button>
      </div>
    </div>
  );
};
