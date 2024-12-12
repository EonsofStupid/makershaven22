import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase, withRetry } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Database, Filter, Search, SortAsc } from "lucide-react";

export const TableView = () => {
  const { data: tables, isLoading } = useQuery({
    queryKey: ['database-tables'],
    queryFn: async () => {
      const result = await withRetry(() => 
        supabase
          .from('maker_projects')
          .select('*')
          .limit(5)
      );
      return result.data;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-lg border border-white/10 bg-black/40 p-6 backdrop-blur-xl"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-[#41f0db]" />
          <h3 className="text-lg font-semibold text-white">Database Preview</h3>
        </div>
        <div className="flex gap-2">
          <Search className="h-4 w-4 text-white/60" />
          <Filter className="h-4 w-4 text-white/60" />
          <SortAsc className="h-4 w-4 text-white/60" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tables?.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-mono text-xs text-white/60">
                  {row.id.slice(0, 8)}...
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.status || 'draft'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};