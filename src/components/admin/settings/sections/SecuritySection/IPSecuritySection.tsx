
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { prepareSecuritySettingsForDb } from "@/lib/types/security/types";
import { useForm } from "react-hook-form";

export function IPSecuritySection() {
  const [enabled, setEnabled] = useState(false);
  const [blacklist, setBlacklist] = useState<string[]>([]);
  const [newIP, setNewIP] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch current security settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("site_settings")
          .select("security_settings")
          .single();

        if (error) throw error;

        const settings = data.security_settings || {};
        setEnabled(!!settings.enable_ip_filtering);
        setBlacklist(Array.isArray(settings.ip_blacklist) ? settings.ip_blacklist : []);
      } catch (err) {
        console.error("Error fetching security settings:", err);
        toast.error("Failed to load IP filtering settings");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const toggleEnabled = async () => {
    try {
      const { error } = await supabase
        .from("site_settings")
        .update({
          security_settings: {
            enable_ip_filtering: !enabled,
            ip_blacklist: blacklist
          }
        })
        .eq("id", '1');

      if (error) throw error;

      setEnabled(!enabled);
      toast.success(`IP filtering ${!enabled ? "enabled" : "disabled"}`);
    } catch (err) {
      console.error("Error updating IP filtering:", err);
      toast.error("Failed to update IP filtering settings");
    }
  };

  const addIP = async () => {
    if (!newIP || blacklist.includes(newIP)) return;

    const updatedBlacklist = [...blacklist, newIP];
    
    try {
      const { error } = await supabase
        .from("site_settings")
        .update({
          security_settings: {
            enable_ip_filtering: enabled,
            ip_blacklist: updatedBlacklist
          }
        })
        .eq("id", '1');

      if (error) throw error;

      setBlacklist(updatedBlacklist);
      setNewIP("");
      toast.success(`IP address ${newIP} added to blacklist`);
    } catch (err) {
      console.error("Error adding IP to blacklist:", err);
      toast.error("Failed to add IP address to blacklist");
    }
  };

  const removeIP = async (ip: string) => {
    const updatedBlacklist = blacklist.filter(item => item !== ip);
    
    try {
      const { error } = await supabase
        .from("site_settings")
        .update({
          security_settings: {
            enable_ip_filtering: enabled,
            ip_blacklist: updatedBlacklist
          }
        })
        .eq("id", '1');

      if (error) throw error;

      setBlacklist(updatedBlacklist);
      toast.success(`IP address ${ip} removed from blacklist`);
    } catch (err) {
      console.error("Error removing IP from blacklist:", err);
      toast.error("Failed to remove IP address from blacklist");
    }
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="enable-ip-filtering">Enable IP Filtering</Label>
        <Switch id="enable-ip-filtering" checked={enabled} onCheckedChange={toggleEnabled} />
      </div>

      {enabled && (
        <>
          <div className="space-y-2">
            <Label htmlFor="ip-blacklist">IP Blacklist</Label>
            <div className="flex space-x-2">
              <Input
                id="ip-blacklist"
                placeholder="Enter IP address"
                value={newIP}
                onChange={(e) => setNewIP(e.target.value)}
              />
              <Button type="button" onClick={addIP}>Add</Button>
            </div>
          </div>

          <div className="space-y-2">
            {blacklist.length > 0 ? (
              <div className="space-y-2">
                {blacklist.map((ip) => (
                  <div key={ip} className="flex items-center justify-between bg-gray-800 p-2 rounded">
                    <span>{ip}</span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeIP(ip)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No IP addresses in blacklist</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
