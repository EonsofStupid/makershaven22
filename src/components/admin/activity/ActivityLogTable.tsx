
import React from 'react';
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow } from 'date-fns';

export interface ActivityLogEntry {
  id: string;
  event_type: string;
  user_id?: string;
  created_at: string;
  metadata?: Record<string, any>;
  ip_address?: string;
  severity?: string;
  [key: string]: any;
}

export interface ActivityLogTableProps {
  data: ActivityLogEntry[];
  isLoading?: boolean;
}

export const ActivityLogTable: React.FC<ActivityLogTableProps> = ({
  data,
  isLoading = false
}) => {
  // Define columns for the table
  const columns: ColumnDef<ActivityLogEntry>[] = [
    {
      accessorKey: "event_type",
      header: "Event Type",
    },
    {
      accessorKey: "severity",
      header: "Severity",
      cell: ({ row }) => {
        const severity = row.getValue("severity") as string;
        let colorClass = "bg-gray-200 text-gray-800";
        
        if (severity === "high" || severity === "critical") {
          colorClass = "bg-red-100 text-red-800";
        } else if (severity === "medium") {
          colorClass = "bg-yellow-100 text-yellow-800";
        } else if (severity === "low") {
          colorClass = "bg-green-100 text-green-800";
        }
        
        return (
          <span className={`px-2 py-1 rounded text-xs font-medium ${colorClass}`}>
            {severity || "info"}
          </span>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Time",
      cell: ({ row }) => {
        const date = new Date(row.getValue("created_at"));
        return formatDistanceToNow(date, { addSuffix: true });
      },
    },
    {
      accessorKey: "user_id",
      header: "User",
      cell: ({ row }) => {
        const userId = row.getValue("user_id") as string;
        return userId ? userId.substring(0, 8) + "..." : "System";
      },
    },
    {
      accessorKey: "ip_address",
      header: "IP Address",
      cell: ({ row }) => {
        return row.getValue("ip_address") || "N/A";
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) {
    return (
      <Card className="p-4 space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Activity Log</h3>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No activity logs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
