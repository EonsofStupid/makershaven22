import React from 'react';
import { useAtom } from 'jotai';
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { redisStatusAtom } from '@/lib/store/atoms/redis/redis-atoms';

export const RedisStatusIndicator = () => {
  const [status] = useAtom(redisStatusAtom);

  return (
    <CardContent className="flex items-center justify-between border-t">
      <span className="text-sm text-muted-foreground">Status</span>
      <Badge variant={status.isConnected ? "success" : "destructive"}>
        {status.isConnected ? "Connected" : "Disconnected"}
      </Badge>
      {status.error && (
        <p className="text-sm text-destructive mt-2">{status.error}</p>
      )}
    </CardContent>
  );
};