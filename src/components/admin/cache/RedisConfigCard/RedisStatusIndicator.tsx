import React from 'react';
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRedisStore } from '@/lib/store/redis-store';

export const RedisStatusIndicator = () => {
  const status = useRedisStore((state) => state.status);

  return (
    <CardContent className="flex items-center justify-between border-t">
      <span className="text-sm text-muted-foreground">Status</span>
      <Badge variant={status.isConnected ? "default" : "destructive"}>
        {status.isConnected ? "Connected" : "Disconnected"}
      </Badge>
      {status.error && (
        <p className="text-sm text-destructive mt-2">{status.error}</p>
      )}
    </CardContent>
  );
};