
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Database, Filter, Search, SortAsc } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TableRowSkeleton } from "@/components/shared/ui/loading/LoadingStates";
import { toast } from "sonner";
import { usePrinterBuildsStore, formatBuildsForDisplay } from "@/lib/store/printer-builds-store";
import { tableViewLimitAtom } from "@/lib/store/atoms/ui-atoms";
import { useAtom } from "jotai";

export const TableView = () => {
  const { 
    isLoading, 
    error, 
    builds,
    fetchBuilds
  } = usePrinterBuildsStore();
  
  const [limit] = useAtom(tableViewLimitAtom);

  useEffect(() => {
    fetchBuilds({ limit });
  }, [fetchBuilds, limit]);

  const formattedProjects = formatBuildsForDisplay(builds);

  if (error) {
    toast.error('Failed to load projects', {
      description: 'Please try again later'
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl bg-white/5 backdrop-blur-xl p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Database className="w-6 h-6 text-[#41f0db]" />
          <h2 className="text-2xl font-bold text-white">Latest Projects</h2>
        </div>
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-white/50 hover:text-[#ff0abe] transition-colors cursor-pointer" />
          <Search className="w-5 h-5 text-white/50 hover:text-[#ff0abe] transition-colors cursor-pointer" />
          <SortAsc className="w-5 h-5 text-white/50 hover:text-[#ff0abe] transition-colors cursor-pointer" />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-white/10">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-white/5">
              <TableHead className="text-[#41f0db]">Title</TableHead>
              <TableHead className="text-[#41f0db]">Category</TableHead>
              <TableHead className="text-[#41f0db]">Difficulty</TableHead>
              <TableHead className="text-[#41f0db] hidden md:table-cell">Time</TableHead>
              <TableHead className="text-[#41f0db] hidden md:table-cell">Parts</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <>
                {Array(5).fill(null).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={5} className="p-0">
                      <TableRowSkeleton columns={5} />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              formattedProjects.map((project) => (
                <TableRow 
                  key={project.id}
                  className="border-white/10 hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <TableCell className="font-medium text-white">{project.title}</TableCell>
                  <TableCell className="text-white/80">{project.category}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      project.difficulty_level === 'beginner' ? 'bg-green-500/20 text-green-300' :
                      project.difficulty_level === 'intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                      project.difficulty_level === 'advanced' ? 'bg-orange-500/20 text-orange-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {project.difficulty_level.charAt(0).toUpperCase() + project.difficulty_level.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-white/80">{project.estimated_time || 'N/A'}</TableCell>
                  <TableCell className="hidden md:table-cell text-white/80">{project.parts_count || 0}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};
