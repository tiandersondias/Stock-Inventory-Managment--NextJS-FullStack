"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useProductStore } from "@/app/useProductStore";
import { useToast } from "@/hooks/use-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function AddSupplierDialog() {
  const [supplierName, setSupplierName] = useState("");
  const [editingSupplier, setEditingSupplier] = useState<string | null>(null);
  const [newSupplierName, setNewSupplierName] = useState("");
  const { suppliers, addSupplier, editSupplier, deleteSupplier } =
    useProductStore();
  const { toast } = useToast();

  const handleAddSupplier = () => {
    if (supplierName.trim() === "") {
      toast({
        title: "Error",
        description: "Supplier name cannot be empty",
      });
      return;
    }

    addSupplier(supplierName);
    setSupplierName("");
    toast({
      title: "Success",
      description: "Supplier added successfully!",
    });
  };

  const handleEditSupplier = (oldSupplier: string) => {
    if (newSupplierName.trim() === "") {
      toast({
        title: "Error",
        description: "Supplier name cannot be empty",
      });
      return;
    }

    editSupplier(oldSupplier, newSupplierName);
    setEditingSupplier(null);
    setNewSupplierName("");
    toast({
      title: "Success",
      description: "Supplier edited successfully!",
    });
  };

  const handleDeleteSupplier = (supplier: string) => {
    deleteSupplier(supplier);
    toast({
      title: "Success",
      description: "Supplier deleted successfully!",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-10 font-semibold">+Add Supplier</Button>
      </DialogTrigger>
      <DialogContent className="p-4 sm:p-7 sm:px-8 poppins max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[22px]">Add Supplier</DialogTitle>
          <DialogDescription>
            Enter the name of the new supplier
          </DialogDescription>
        </DialogHeader>
        <Input
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
          placeholder="New Supplier"
          className="mt-4"
        />
        <DialogFooter className="mt-9 mb-4 flex flex-col sm:flex-row items-center gap-4 ">
          <DialogClose asChild>
            <Button
              variant={"secondary"}
              className="h-11 w-full sm:w-auto px-11"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleAddSupplier}
            className="h-11 w-full sm:w-auto px-11"
          >
            Add Supplier
          </Button>
        </DialogFooter>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Suppliers</h3>
          <ul className="mt-2 space-y-2">
            {suppliers.map((supplier) => (
              <li key={supplier} className="flex items-center justify-between">
                {editingSupplier === supplier ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      value={newSupplierName}
                      onChange={(e) => setNewSupplierName(e.target.value)}
                      placeholder="Edit Supplier"
                      className="h-8"
                    />
                    <Button
                      onClick={() => handleEditSupplier(supplier)}
                      className="h-8"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => setEditingSupplier(null)}
                      className="h-8"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>{supplier}</span>
                    <Button
                      onClick={() => {
                        setEditingSupplier(supplier);
                        setNewSupplierName(supplier);
                      }}
                      className="h-8"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      onClick={() => handleDeleteSupplier(supplier)}
                      className="h-8"
                    >
                      <FaTrash />
                    </Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
