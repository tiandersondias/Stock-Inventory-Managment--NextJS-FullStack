"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddProductDialog from "./ProductDialog/AddProductDialog";
import AddCategoryDialog from "./ProductDialog/AddCategoryDialog";
import AddSupplierDialog from "./ProductDialog/AddSupplierDialog";
import { Product } from "@/app/types";

type AddDataProps = {
  allProducts: Product[];
};

export default function AddData({ allProducts }: AddDataProps) {
  const [openProductDialog, setOpenProductDialog] = React.useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = React.useState(false);
  const [openSupplierDialog, setOpenSupplierDialog] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Add New</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => setOpenProductDialog(true)}>
            Add Product
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setOpenCategoryDialog(true)}>
            Add Category
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setOpenSupplierDialog(true)}>
            Add Supplier
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddProductDialog
        allProducts={allProducts}
        open={openProductDialog}
        onOpenChange={setOpenProductDialog}
      />
      <AddCategoryDialog
        open={openCategoryDialog}
        onOpenChange={setOpenCategoryDialog}
      />
      <AddSupplierDialog
        open={openSupplierDialog}
        onOpenChange={setOpenSupplierDialog}
      />
    </>
  );
}
