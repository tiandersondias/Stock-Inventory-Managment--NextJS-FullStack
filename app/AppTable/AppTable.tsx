"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductTable } from "../Products/ProductTable";
import { columns } from "../Products/columns";
import { useProductStore } from "../useProductStore";
import { useAuth } from "../authContext";
import { useRouter } from "next/navigation";
import FiltersAndActions from "../FiltersAndActions";
import { PaginationType } from "../Products/PaginationSelection";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { Product } from "@/app/types";
import { PaginationControls } from "../Products/PaginationControls";

export default function AppTable() {
  const { allProducts, loadProducts, isLoading } = useProductStore();
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();

  // State for column filters, search term, and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState<PaginationType>({
    pageIndex: 0,
    pageSize: 8,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  // State for selected filters
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);

  // Load products if the user is logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      loadProducts();
    }
  }, [isLoggedIn, loadProducts, router]);

  const filteredData = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      const categoryMatch =
        selectedCategory.length === 0 ||
        selectedCategory.includes(product.categoryId ?? "");

      const supplierMatch =
        selectedSuppliers.length === 0 ||
        selectedSuppliers.includes(product.supplierId ?? "");

      const statusMatch =
        selectedStatuses.length === 0 ||
        selectedStatuses.includes(product.status ?? "");

      const searchTermMatch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());

      return categoryMatch && supplierMatch && statusMatch && searchTermMatch;
    });
    return filtered;
  }, [allProducts, selectedCategory, selectedSuppliers, selectedStatuses, searchTerm]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      pagination,
      sorting,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <Card className="flex flex-col shadow-none poppins border-none">
      {/* Centered Header */}
      <CardHeader className="flex flex-col justify-center items-center space-y-2 sm:space-y-0 sm:flex-row sm:justify-between sm:space-x-4">
        <div className="flex flex-col items-center sm:items-start">
          <CardTitle className="font-bold text-[23px]">Products</CardTitle>
          <p className="text-sm text-slate-600">
            {filteredData.length} products
          </p>
        </div>
      </CardHeader>

      <CardContent>
        {/* Filters and Actions */}
        <FiltersAndActions
          setSearchTerm={setSearchTerm} // Update search term
          pagination={pagination}
          setPagination={setPagination}
          allProducts={allProducts}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedStatuses={selectedStatuses}
          setSelectedStatuses={setSelectedStatuses}
          selectedSuppliers={selectedSuppliers}
          setSelectedSuppliers={setSelectedSuppliers}
        />

        {/* Product Table */}
        <ProductTable
          columns={columns}
          isLoading={isLoading}
          table={table}
        />

        {/* Pagination Controls */}
        <PaginationControls table={table} />
      </CardContent>
    </Card>
  );
}
