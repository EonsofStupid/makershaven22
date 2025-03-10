
import React from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { UseFormReturn } from "react-hook-form";
import { Settings } from "@/lib/types/settings/core";
import { SecuritySettings } from "@/lib/types/settings/security";

interface SecuritySectionProps {
  form: UseFormReturn<Settings>;
}

export const SecuritySection = ({ form }: SecuritySectionProps) => {
  const securitySettings = form.watch("security_settings") as SecuritySettings;

  return (
    <AccordionItem value="security">
      <AccordionTrigger className="hover:bg-gray-700/30 px-4 py-2 rounded-lg transition-colors">
        <div className="flex items-center gap-2">
          <span>Security Settings</span>
          {securitySettings?.two_factor_auth && (
            <Badge variant="outline" className="ml-2 text-xs bg-emerald-900/30 text-emerald-500 border-emerald-800">
              2FA Enabled
            </Badge>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pt-2 pb-4 space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="security_settings.two_factor_auth"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700/50 p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Two-Factor Authentication</FormLabel>
                  <FormDescription>
                    Require users to verify identity with a second factor
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="security_settings.enable_ip_filtering"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700/50 p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">IP Filtering</FormLabel>
                  <FormDescription>
                    Restrict access based on IP whitelist/blacklist
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Separator className="my-4" />

          <h3 className="text-sm font-medium text-white mb-2">Login Restrictions</h3>

          <FormField
            control={form.control}
            name="security_settings.max_login_attempts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Login Attempts</FormLabel>
                <FormDescription>
                  Number of failed login attempts before temporary account lockout
                </FormDescription>
                <FormControl>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[field.value]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(value) => field.onChange(value[0])}
                      className="flex-1"
                    />
                    <span className="w-12 text-center">{field.value}</span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="security_settings.lockout_duration_minutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lockout Duration (minutes)</FormLabel>
                <FormDescription>
                  Duration of account lockout after exceeding max login attempts
                </FormDescription>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value || 30}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 30)}
                    min={5}
                    max={1440}
                    className="bg-gray-800/50 border-gray-700"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Separator className="my-4" />

          <h3 className="text-sm font-medium text-white mb-2">Rate Limiting</h3>

          <FormField
            control={form.control}
            name="security_settings.rate_limit_requests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate Limit Requests</FormLabel>
                <FormDescription>
                  Maximum number of requests allowed within the time window
                </FormDescription>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value || 100}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 100)}
                    min={10}
                    max={1000}
                    className="bg-gray-800/50 border-gray-700"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="security_settings.rate_limit_window_minutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate Limit Window (minutes)</FormLabel>
                <FormDescription>
                  Time window for rate limiting in minutes
                </FormDescription>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value || 5}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 5)}
                    min={1}
                    max={60}
                    className="bg-gray-800/50 border-gray-700"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="security_settings.session_timeout_minutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Session Timeout (minutes)</FormLabel>
                <FormDescription>
                  Duration of user session inactivity before requiring re-login
                </FormDescription>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value || 60}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 60)}
                    min={5}
                    max={1440}
                    className="bg-gray-800/50 border-gray-700"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
