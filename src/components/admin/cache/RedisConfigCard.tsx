import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase/client';
import { RedisConfig } from '@/lib/types/admin';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function RedisConfigCard() {
  const [config, setConfig] = useState<RedisConfig>({
    host: 'localhost',
    port: 6379,
    enabled: false,
    password: ''
  });

  useEffect(() => {
    loadRedisConfig();
  }, []);

  const loadRedisConfig = async () => {
    const { data, error } = await supabase
      .from('admin_settings')
      .select('*')
      .eq('setting_type', 'redis');

    if (error) {
      console.error('Error loading Redis config:', error);
      return;
    }

    if (data && data.length > 0) {
      const redisConfig = data.reduce((acc, setting) => ({
        ...acc,
        [setting.setting_key]: setting.setting_value
      }), {} as Record<string, string>);

      setConfig({
        host: redisConfig.host || 'localhost',
        port: parseInt(redisConfig.port || '6379'),
        password: redisConfig.password || '',
        enabled: redisConfig.enabled === 'true'
      });
    }
  };

  const saveConfig = async () => {
    const settings = [
      { setting_key: 'host', setting_value: config.host, setting_type: 'redis' },
      { setting_key: 'port', setting_value: config.port.toString(), setting_type: 'redis' },
      { setting_key: 'password', setting_value: config.password || '', setting_type: 'redis' },
      { setting_key: 'enabled', setting_value: config.enabled.toString(), setting_type: 'redis' }
    ];

    const { error } = await supabase
      .from('admin_settings')
      .upsert(settings, { 
        onConflict: 'setting_key,setting_type',
        ignoreDuplicates: false 
      });

    if (error) {
      console.error('Error saving Redis config:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Redis Configuration</CardTitle>
        <CardDescription>Configure Redis caching settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            checked={config.enabled}
            onCheckedChange={(checked) => setConfig(prev => ({ ...prev, enabled: checked }))}
          />
          <span>Enable Redis Caching</span>
        </div>
        <Input
          placeholder="Host"
          value={config.host}
          onChange={(e) => setConfig(prev => ({ ...prev, host: e.target.value }))}
        />
        <Input
          type="number"
          placeholder="Port"
          value={config.port}
          onChange={(e) => setConfig(prev => ({ ...prev, port: parseInt(e.target.value) }))}
        />
        <Input
          type="password"
          placeholder="Password (optional)"
          value={config.password}
          onChange={(e) => setConfig(prev => ({ ...prev, password: e.target.value }))}
        />
        <Button onClick={saveConfig}>Save Configuration</Button>
      </CardContent>
    </Card>
  );
}