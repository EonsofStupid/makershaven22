
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

interface SecurityLog {
  id: string;
  event_type: string;
  severity: string;
  created_at: string;
  ip_address?: string;
  user_agent?: string;
  details?: Record<string, any>;
}

export function SecurityLogsSection() {
  const [logs, setLogs] = useState<SecurityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("security_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;

      setLogs(data || []);
    } catch (err) {
      console.error("Error fetching security logs:", err);
      toast.error("Failed to load security logs");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-4 py-4">
      <div className="flex justify-between items-center">
        <h3 className="text-md font-medium">Recent Security Events</h3>
        <Button variant="outline" size="sm" onClick={fetchLogs}>
          Refresh
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : logs.length > 0 ? (
        <div className="space-y-3">
          {logs.map((log) => (
            <Card key={log.id} className="p-3 bg-gray-800/40">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{log.event_type}</p>
                  <p className="text-sm text-gray-400">{formatDate(log.created_at)}</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs ${
                  log.severity === 'high' ? 'bg-red-800/50 text-red-200' : 
                  log.severity === 'medium' ? 'bg-yellow-800/50 text-yellow-200' : 
                  'bg-blue-800/50 text-blue-200'
                }`}>
                  {log.severity}
                </div>
              </div>
              {log.ip_address && (
                <p className="text-xs mt-2">IP: {log.ip_address}</p>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-6">No security logs found</p>
      )}
    </div>
  );
}
