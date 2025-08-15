"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { Table } from "@tanstack/react-table";

interface PaginationControlsProps<TData> {
  table: Table<TData>;
}

export function PaginationControls<TData>({
  table,
}: PaginationControlsProps<TData>) {
  return (
    <div className="flex justify-center items-center space-x-4 mt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
        className="hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <BiFirstPage />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className="hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <GrFormPrevious />
      </Button>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <GrFormNext />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
        className="hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <BiLastPage />
      </Button>
    </div>
  );
}
