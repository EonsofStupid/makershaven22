import React from 'react';
import { useAtom } from 'jotai';
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { redisConfigAtom, updateRedisConfigAtom } from '@/lib/store/atoms/redis/redis-atoms';

export const RedisFeatureToggles = () => {
  const [config] = useAtom(redisConfigAtom);
  const [, updateConfig] = useAtom(updateRedisConfigAtom);

  const handleFeatureToggle = (feature: keyof typeof config.features, enabled: boolean) => {
    updateConfig({
      features: {
        ...config.features,
        [feature]: enabled
      }
    });
  };

  if (!config.enabled) return null;

  return (
    <CardContent className="space-y-4 border-t">
      <h3 className="text-lg font-semibold mb-4">Features</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="session-management">Session Management</Label>
          <Switch
            id="session-management"
            checked={config.features.sessionManagement}
            onCheckedChange={(checked) => handleFeatureToggle('sessionManagement', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="caching">Caching</Label>
          <Switch
            id="caching"
            checked={config.features.caching}
            onCheckedChange={(checked) => handleFeatureToggle('caching', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="rate-limit">Rate Limiting</Label>
          <Switch
            id="rate-limit"
            checked={config.features.rateLimit}
            onCheckedChange={(checked) => handleFeatureToggle('rateLimit', checked)}
          />
        </div>
      </div>
    </CardContent>
  );
};