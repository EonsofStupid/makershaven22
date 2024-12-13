import React from 'react';
import { useAtom } from 'jotai';
import { redisConfigAtom } from '@/lib/store/atoms/redis/redis-atoms';
import type { RedisConfig } from '@/lib/store/atoms/redis/redis-atoms';
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const RedisConnectionForm = () => {
  const [config, setConfig] = useAtom(redisConfigAtom);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="host">Redis Host</Label>
        <Input
          id="host"
          name="host"
          value={config.host || ''}
          onChange={handleInputChange}
          placeholder="localhost"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="port">Port</Label>
        <Input
          id="port"
          name="port"
          type="number"
          value={config.port || '6379'}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password (optional)</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={config.password || ''}
          onChange={handleInputChange}
        />
      </div>
    </CardContent>
  );
};