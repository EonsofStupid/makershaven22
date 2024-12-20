import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { UseFormReturn } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type SettingsFormData } from "@/lib/types/settings/types";

interface SecuritySectionProps {
  form: UseFormReturn<SettingsFormData>;
}

export function SecuritySection({ form }: SecuritySectionProps) {
  return (
    <AccordionItem value="security">
      <AccordionTrigger>Security Settings</AccordionTrigger>
      <AccordionContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="enable_ip_filtering">Enable IP Filtering</Label>
            <Switch 
              id="enable_ip_filtering"
              checked={form.watch("security_settings.enable_ip_filtering")}
              onCheckedChange={(checked) => form.setValue("security_settings.enable_ip_filtering", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="two_factor_auth">Two Factor Authentication</Label>
            <Switch 
              id="two_factor_auth"
              checked={form.watch("security_settings.two_factor_auth")}
              onCheckedChange={(checked) => form.setValue("security_settings.two_factor_auth", checked)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max_login_attempts">Max Login Attempts</Label>
            <Input
              id="max_login_attempts"
              type="number"
              {...form.register("security_settings.max_login_attempts")}
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
} 