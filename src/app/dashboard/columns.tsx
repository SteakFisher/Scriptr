"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Script = {
  id: number;
  title: string;
  description: string;
  date: number;
  time: number;
};

export const columns: ColumnDef<Script>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Decsripiton",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
];
