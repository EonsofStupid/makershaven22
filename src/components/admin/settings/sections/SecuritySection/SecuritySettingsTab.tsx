import React from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IPSecuritySection } from './IPSecuritySection';
import { RateLimitingSection } from './RateLimitingSection';
import { SessionSecuritySection } from './SessionSecuritySection';
import { SecurityLogsSection } from './SecurityLogsSection';
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

export const SecuritySettingsTab = () => {
  const { error } = useStore();

  if (error) {
    toast.error("Failed to load security settings", {
      description: error.message
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card className="p-6 bg-gray-800/50 border border-white/10">
        <Tabs defaultValue="ip-security" className="space-y-4">
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <TabsTrigger value="ip-security">IP Security</TabsTrigger>
            <TabsTrigger value="rate-limiting">Rate Limiting</TabsTrigger>
            <TabsTrigger value="session">Session Security</TabsTrigger>
            <TabsTrigger value="logs">Security Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="ip-security" className="space-y-4">
            <IPSecuritySection />
          </TabsContent>

          <TabsContent value="rate-limiting" className="space-y-4">
            <RateLimitingSection />
          </TabsContent>

          <TabsContent value="session" className="space-y-4">
            <SessionSecuritySection />
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <SecurityLogsSection />
          </TabsContent>
        </Tabs>
      </Card>
    </motion.div>
  );
};