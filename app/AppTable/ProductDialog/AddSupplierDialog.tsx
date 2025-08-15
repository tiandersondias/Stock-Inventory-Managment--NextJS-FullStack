"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useProductStore } from "@/app/useProductStore";
import { useToast } from "@/hooks/use-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "@/app/authContext";
import axiosInstance from "@/utils/axiosInstance";

interface AddSupplierDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddSupplierDialog({
  open,
  onOpenChange,
}: AddSupplierDialogProps) {
  const [supplierName, setSupplierName] = useState("");
  const [editingSupplier, setEditingSupplier] = useState<string | null>(null);
  const [newSupplierName, setNewSupplierName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Button loading state
  const {
    suppliers,
    addSupplier,
    editSupplier,
    deleteSupplier,
    loadSuppliers,
  } = useProductStore();
  const { toast } = useToast();
  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      loadSuppliers();
    }
  }, [isLoggedIn, loadSuppliers]);

  const handleAddSupplier = async () => {
    if (supplierName.trim() === "") {
      toast({
        title: "Error",
        description: "Supplier name cannot be empty",
      });
      return;
    }

    setIsSubmitting(true); // Start loading
    try {
      const response = await axiosInstance.post("/suppliers", {
        name: supplierName,
        userId: user?.id,
      });

      if (response.status !== 201) {
        throw new Error("Failed to add supplier");
      }

      const newSupplier = response.data;
      addSupplier(newSupplier);
      setSupplierName("");
      toast({
        title: "Success",
        description: "Supplier added successfully!",
      });
    } catch (error) {
      console.error("Error adding supplier:", error);
      toast({
        title: "Error",
        description: "Failed to add supplier.",
      });
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  const handleEditSupplier = async (supplierId: string) => {
    if (newSupplierName.trim() === "") {
      toast({
        title: "Error",
        description: "Supplier name cannot be empty",
      });
      return;
    }

    setIsSubmitting(true); // Start loading
    try {
      const response = await axiosInstance.put("/suppliers", {
        id: supplierId,
        name: newSupplierName,
      });

      if (response.status !== 200) {
        throw new Error("Failed to edit supplier");
      }

      const updatedSupplier = response.data;
      editSupplier(supplierId, updatedSupplier.name);
      setEditingSupplier(null);
      setNewSupplierName("");
      toast({
        title: "Success",
        description: "Supplier edited successfully!",
      });
    } catch (error) {
      console.error("Error editing supplier:", error);
      toast({
        title: "Error",
        description: "Failed to edit supplier.",
      });
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  const handleDeleteSupplier = async (supplierId: string) => {
    setIsSubmitting(true); // Start loading
    try {
      const response = await axiosInstance.delete("/suppliers", {
        data: { id: supplierId },
      });

      if (response.status !== 204) {
        throw new Error("Failed to delete supplier");
      }

      deleteSupplier(supplierId);
      toast({
        title: "Success",
        description: "Supplier deleted successfully!",
      });
    } catch (error) {
      console.error("Error deleting supplier:", error);
      toast({
        title: "Error",
        description: "Failed to delete supplier.",
      });
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
        <DialogFooter className="mt-9 mb-4 flex flex-col sm:flex-row items-center gap-4">
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
            isLoading={isSubmitting} // Button loading effect
          >
            {isSubmitting ? "Loading..." : "Add Supplier"}
          </Button>
        </DialogFooter>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Suppliers</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {suppliers.map((supplier) => (
              <div
                key={supplier.id}
                className="p-4 border rounded-lg shadow-sm flex flex-col justify-between"
              >
                {editingSupplier === supplier.id ? (
                  <div className="flex flex-col space-y-2">
                    <Input
                      value={newSupplierName}
                      onChange={(e) => setNewSupplierName(e.target.value)}
                      placeholder="Edit Supplier"
                      className="h-8"
                    />
                    <div className="flex justify-between gap-2">
                      <Button
                        onClick={() => handleEditSupplier(supplier.id)}
                        className="h-8 w-full"
                        isLoading={isSubmitting}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => setEditingSupplier(null)}
                        className="h-8 w-full"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <span className="font-medium">{supplier.name}</span>
                    <div className="flex justify-between gap-2">
                      <Button
                        onClick={() => {
                          setEditingSupplier(supplier.id);
                          setNewSupplierName(supplier.name);
                        }}
                        className="h-8 w-full"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        onClick={() => handleDeleteSupplier(supplier.id)}
                        className="h-8 w-full"
                        isLoading={isSubmitting}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
