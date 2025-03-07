
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

export const IPSecuritySection = () => {
  const { data: settings, isLoading, refetch } = useSettingsQuery();
  const [ipWhitelist, setIpWhitelist] = useState<string>('');
  const [ipBlacklist, setIpBlacklist] = useState<string>('');
  const [enableIpFiltering, setEnableIpFiltering] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (settings && settings.security_settings) {
      // Convert security settings to expected format
      const securitySettings = typeof settings.security_settings === 'string' 
        ? JSON.parse(settings.security_settings as string) as SecuritySettings
        : settings.security_settings as SecuritySettings;
      
      setEnableIpFiltering(securitySettings.enable_ip_filtering || false);
      setIpWhitelist((securitySettings.ip_whitelist || []).join(', '));
      setIpBlacklist((securitySettings.ip_blacklist || []).join(', '));
    }
  }, [settings]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const securitySettings: SecuritySettings = {
        ...((settings?.security_settings as SecuritySettings) || {
          two_factor_auth: false,
          max_login_attempts: 5
        }),
        enable_ip_filtering: enableIpFiltering,
        ip_whitelist: ipWhitelist.split(',').map(ip => ip.trim()).filter(Boolean),
        ip_blacklist: ipBlacklist.split(',').map(ip => ip.trim()).filter(Boolean)
      };

      const { error } = await supabase.from('site_settings')
        .update({ security_settings: securitySettings as unknown as Json })
        .eq('id', 1);

      if (error) throw error;
      
      toast.success('IP security settings updated');
      refetch();
    } catch (error) {
      console.error('Error saving IP settings:', error);
      toast.error('Failed to update IP security settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">IP Address Filtering</h3>
          <p className="text-sm text-gray-400">Control access based on IP addresses</p>
        </div>
        <Switch 
          checked={enableIpFiltering} 
          onCheckedChange={setEnableIpFiltering}
        />
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="ip-whitelist">Allowed IP Addresses (comma separated)</Label>
          <Input 
            id="ip-whitelist"
            placeholder="e.g. 192.168.1.1, 10.0.0.1"
            value={ipWhitelist}
            onChange={(e) => setIpWhitelist(e.target.value)}
            disabled={!enableIpFiltering}
          />
          <p className="text-xs text-gray-400">IPs that are allowed access regardless of other settings</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ip-blacklist">Blocked IP Addresses (comma separated)</Label>
          <Input 
            id="ip-blacklist"
            placeholder="e.g. 192.168.1.2, 10.0.0.2"
            value={ipBlacklist}
            onChange={(e) => setIpBlacklist(e.target.value)}
            disabled={!enableIpFiltering}
          />
          <p className="text-xs text-gray-400">IPs that are always blocked from accessing the site</p>
        </div>

        <Button 
          onClick={handleSave} 
          disabled={isSaving || !enableIpFiltering}
          className="mt-2"
        >
          {isSaving ? 'Saving...' : 'Save IP Settings'}
        </Button>
      </div>
    </div>
  );
};
