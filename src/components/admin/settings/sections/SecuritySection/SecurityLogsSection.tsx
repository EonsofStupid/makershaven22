
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SecurityLog, SecurityLogEntry } from '../../types/security';
import { SecurityEventSeverity, SecurityEventCategory } from '@/lib/types/core/enums';

export const SecurityLogsSection = () => {
  const [selectedSeverity, setSelectedSeverity] = useState<SecurityEventSeverity | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<SecurityEventCategory | 'all'>('all');
  
  const { data: logs = [], isLoading, refetch } = useQuery({
    queryKey: ['security-logs', selectedSeverity, selectedCategory],
    queryFn: async () => {
      let query = supabase.from('security_logs').select('*').order('timestamp', { ascending: false }).limit(100);
      
      if (selectedSeverity !== 'all') {
        query = query.eq('severity', selectedSeverity);
      }
      
      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching security logs:', error);
        throw error;
      }
      
      return data as SecurityLog[];
    }
  });

  const getSeverityClass = (severity: SecurityEventSeverity) => {
    switch (severity) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-blue-500';
      case 'info': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Security Logs</h3>
        <p className="text-sm text-gray-400">View security-related events and activity</p>
      </div>
      
      <div className="flex space-x-4 mb-4">
        <div className="w-1/3">
          <Select
            value={selectedSeverity}
            onValueChange={(value) => setSelectedSeverity(value as SecurityEventSeverity | 'all')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-1/3">
          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as SecurityEventCategory | 'all')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="auth">Authentication</SelectItem>
              <SelectItem value="access">Access Control</SelectItem>
              <SelectItem value="data">Data Security</SelectItem>
              <SelectItem value="system">System Security</SelectItem>
              <SelectItem value="admin">Admin Actions</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={() => refetch()} variant="outline">
          Refresh
        </Button>
      </div>
      
      <div className="bg-black/20 border border-gray-700 rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800/50 text-left">
                <th className="p-3 text-xs font-medium text-gray-400">Timestamp</th>
                <th className="p-3 text-xs font-medium text-gray-400">Event</th>
                <th className="p-3 text-xs font-medium text-gray-400">Category</th>
                <th className="p-3 text-xs font-medium text-gray-400">Severity</th>
                <th className="p-3 text-xs font-medium text-gray-400">User</th>
                <th className="p-3 text-xs font-medium text-gray-400">IP Address</th>
                <th className="p-3 text-xs font-medium text-gray-400">Details</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="p-3 text-center text-gray-400">Loading logs...</td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-3 text-center text-gray-400">No security logs found</td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="border-t border-gray-700/50">
                    <td className="p-3 text-xs">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="p-3 text-xs">{log.event_type}</td>
                    <td className="p-3 text-xs">{log.event_category}</td>
                    <td className={`p-3 text-xs ${getSeverityClass(log.severity)}`}>{log.severity}</td>
                    <td className="p-3 text-xs">{log.user_id?.substring(0, 8) || 'N/A'}</td>
                    <td className="p-3 text-xs">{log.ip_address || 'N/A'}</td>
                    <td className="p-3 text-xs max-w-xs truncate">{log.details || 'No details'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
