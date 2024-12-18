import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RedisConnectionForm } from '../../cache/RedisConfigCard/RedisConnectionForm';
import { RedisFeatureToggles } from '../../cache/RedisConfigCard/RedisFeatureToggles';
import { RedisStatusIndicator } from '../../cache/RedisConfigCard/RedisStatusIndicator';

export const RedisSettingsTab = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Redis Configuration</CardTitle>
        <CardDescription>
          Configure Redis connection settings and features
        </CardDescription>
      </CardHeader>
      <RedisConnectionForm />
      <RedisFeatureToggles />
      <RedisStatusIndicator />
    </Card>
  );
};