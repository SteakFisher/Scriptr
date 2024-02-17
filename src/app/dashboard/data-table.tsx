"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel, TableState, Updater,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {columns} from "@/app/dashboard/columns";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>;
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    onStateChange(updater: Updater<TableState>): void {
    }, renderFallbackValue: undefined, state: undefined,
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return ()
}
