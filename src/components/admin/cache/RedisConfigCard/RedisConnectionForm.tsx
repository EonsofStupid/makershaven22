import React from 'react';
import { useAtom } from 'jotai';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RedisConfig } from '../types';
import { redisConfigAtom, updateRedisConfigAtom } from '@/lib/store/atoms/redis/redis-atoms';

export const RedisConnectionForm = () => {
  const [config] = useAtom(redisConfigAtom);
  const [, updateConfig] = useAtom(updateRedisConfigAtom);

  const handleToggle = (enabled: boolean) => {
    updateConfig({ enabled });
  };

  const handleInputChange = (field: keyof RedisConfig, value: string) => {
    updateConfig({ [field]: value });
  };

  return (
    <CardContent className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="redis-enabled">Enable Redis</Label>
        <Switch
          id="redis-enabled"
          checked={config.enabled}
          onCheckedChange={handleToggle}
        />
      </div>

      {config.enabled && (
        <>
          <div className="space-y-2">
            <Label htmlFor="redis-host">Host</Label>
            <Input
              id="redis-host"
              value={config.host}
              onChange={(e) => handleInputChange('host', e.target.value)}
              placeholder="localhost"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="redis-port">Port</Label>
            <Input
              id="redis-port"
              type="text"
              value={config.port}
              onChange={(e) => handleInputChange('port', e.target.value)}
              placeholder="6379"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="redis-password">Password</Label>
            <Input
              id="redis-password"
              type="password"
              value={config.password || ''}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Optional"
            />
          </div>
        </>
      )}
    </CardContent>
  );
};