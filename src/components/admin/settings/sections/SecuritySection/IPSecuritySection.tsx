
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { useSettings } from '@/hooks/useSettings';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const IPSecuritySection = () => {
  const { settings, isLoading, updateSettings } = useSettings();
  const [newIP, setNewIP] = React.useState('');

  if (isLoading || !settings) {
    return <div>Loading IP security settings...</div>;
  }

  const handleToggleIPFiltering = (enabled: boolean) => {
    updateSettings({
      ...settings,
      security_settings: {
        ...settings.security_settings,
        enable_ip_filtering: enabled
      }
    });
  };

  const handleAddToWhitelist = () => {
    if (!newIP) return;
    const whitelist = [...(settings.security_settings.ip_whitelist || [])];
    whitelist.push(newIP);
    
    updateSettings({
      ...settings,
      security_settings: {
        ...settings.security_settings,
        ip_whitelist: whitelist
      }
    });
    
    setNewIP('');
  };

  const handleRemoveFromWhitelist = (index: number) => {
    const whitelist = [...(settings.security_settings.ip_whitelist || [])];
    whitelist.splice(index, 1);
    
    updateSettings({
      ...settings,
      security_settings: {
        ...settings.security_settings,
        ip_whitelist: whitelist
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>IP Address Filtering</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch 
            checked={settings.security_settings.enable_ip_filtering}
            onCheckedChange={handleToggleIPFiltering}
            id="ip-filtering"
          />
          <Label htmlFor="ip-filtering">Enable IP address filtering</Label>
        </div>
        
        {settings.security_settings.enable_ip_filtering && (
          <div className="space-y-4 mt-4">
            <div className="flex gap-2">
              <Input 
                value={newIP}
                onChange={(e) => setNewIP(e.target.value)}
                placeholder="Enter IP address"
              />
              <Button 
                size="sm" 
                onClick={handleAddToWhitelist}
                disabled={!newIP}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Whitelisted IPs</h4>
              {(settings.security_settings.ip_whitelist?.length || 0) === 0 ? (
                <p className="text-sm text-gray-500">No IPs in whitelist</p>
              ) : (
                <div className="space-y-2">
                  {settings.security_settings.ip_whitelist?.map((ip, index) => (
                    <div key={ip} className="flex items-center justify-between bg-secondary/10 p-2 rounded">
                      <span>{ip}</span>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleRemoveFromWhitelist(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
