/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  Table as TanstackTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Skeleton from "@/components/Skeleton"; // Skeleton component for loading state
import { Product } from "@/app/types";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  isLoading: boolean;
  table: TanstackTable<TData>;
}

export const ProductTable = React.memo(function ProductTable<
  TData extends Product,
  TValue
>({
  columns,
  isLoading,
  table,
}: DataTableProps<TData, TValue>) {
  return (
    <div className="poppins">
      {/* Show Skeleton while loading */}
      {isLoading ? (
        <Skeleton rows={5} columns={columns.length} />
      ) : (
        <>
          <div className="rounded-md border shadow-sm">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableCell key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableCell>
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
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
});
