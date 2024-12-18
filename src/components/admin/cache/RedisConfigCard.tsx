import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Database } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RedisConnectionForm } from './RedisConfigCard/RedisConnectionForm';
import { RedisFeatureToggles } from './RedisConfigCard/RedisFeatureToggles';
import { RedisStatusIndicator } from './RedisConfigCard/RedisStatusIndicator';
import { useRedisConnection } from '@/hooks/useRedisConnection';
import { useRedisStore } from '@/lib/store/redis-store';

export const RedisConfigCard = () => {
  const [isSaving, setIsSaving] = useState(false);
  const { testConnection } = useRedisConnection();
  const { config } = useRedisStore();

  const handleSaveConfig = async () => {
    try {
      setIsSaving(true);
      const { error } = await supabase
        .from('admin_settings')
        .upsert([
          {
            setting_key: 'redis_config',
            setting_value: JSON.stringify(config),
            setting_type: 'json'
          }
        ]);

      if (error) throw error;
      toast.success('Redis configuration saved successfully');
    } catch (error) {
      console.error('Error saving Redis config:', error);
      toast.error('Failed to save Redis configuration');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          Redis Configuration
        </CardTitle>
      </CardHeader>

      <Tabs defaultValue="connection" className="space-y-4">
        <TabsList>
          <TabsTrigger value="connection">Connection</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>

        <TabsContent value="connection">
          <RedisConnectionForm />
          <div className="px-6 pb-4">
            <Button 
              variant="secondary" 
              onClick={testConnection}
              className="w-full"
            >
              Test Connection
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="features">
          <RedisFeatureToggles />
        </TabsContent>
      </Tabs>

      <RedisStatusIndicator />

      <div className="p-6 pt-2">
        <Button
          onClick={handleSaveConfig}
          disabled={isSaving}
          className="w-full"
        >
          {isSaving ? 'Saving...' : 'Save Configuration'}
        </Button>
      </div>
    </Card>
  );
};