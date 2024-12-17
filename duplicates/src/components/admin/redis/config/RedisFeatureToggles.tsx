import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Settings } from 'lucide-react';
import { useRedisStore } from '@/lib/store/redis-store';

export const RedisFeatureToggles = () => {
  const { config, toggleFeature } = useRedisStore();
  const features = config.features || {
    sessionManagement: false,
    caching: false,
    realTimeUpdates: false
  };

  return (
    <Card className="bg-black/20 backdrop-blur-xl border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Settings className="h-5 w-5 text-neon-cyan" />
          Feature Enablement
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-white/80">Session Management</label>
          <Switch 
            checked={features.sessionManagement}
            onCheckedChange={() => toggleFeature('sessionManagement')}
            className="data-[state=checked]:bg-neon-cyan" 
          />
        </div>
        
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-white/80">Caching</label>
          <Switch 
            checked={features.caching}
            onCheckedChange={() => toggleFeature('caching')}
            className="data-[state=checked]:bg-neon-cyan" 
          />
        </div>
        
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-white/80">Real-Time Updates</label>
          <Switch 
            checked={features.realTimeUpdates}
            onCheckedChange={() => toggleFeature('realTimeUpdates')}
            className="data-[state=checked]:bg-neon-cyan" 
          />
        </div>
      </CardContent>
    </Card>
  );
};