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

export default function AddCategoryDialog() {
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const { categories, addCategory, editCategory, deleteCategory } =
    useProductStore();
  const { toast } = useToast();

  const handleAddCategory = () => {
    if (categoryName.trim() === "") {
      toast({
        title: "Error",
        description: "Category name cannot be empty",
      });
      return;
    }

    addCategory(categoryName);
    setCategoryName("");
    toast({
      title: "Success",
      description: "Category added successfully!",
    });
  };

  const handleEditCategory = (oldCategory: string) => {
    if (newCategoryName.trim() === "") {
      toast({
        title: "Error",
        description: "Category name cannot be empty",
      });
      return;
    }

    editCategory(oldCategory, newCategoryName);
    setEditingCategory(null);
    setNewCategoryName("");
    toast({
      title: "Success",
      description: "Category edited successfully!",
    });
  };

  const handleDeleteCategory = (category: string) => {
    deleteCategory(category);
    toast({
      title: "Success",
      description: "Category deleted successfully!",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-10 font-semibold">+Add Category</Button>
      </DialogTrigger>
      <DialogContent className="p-4 sm:p-7 sm:px-8 poppins max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[22px]">Add Category</DialogTitle>
          <DialogDescription>
            Enter the name of the new category
          </DialogDescription>
        </DialogHeader>
        <Input
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="New Category"
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
            onClick={handleAddCategory}
            className="h-11 w-full sm:w-auto px-11"
          >
            Add Category
          </Button>
        </DialogFooter>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Categories</h3>
          <ul className="mt-2 space-y-2">
            {categories.map((category) => (
              <li key={category} className="flex items-center justify-between">
                {editingCategory === category ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Edit Category"
                      className="h-8"
                    />
                    <Button
                      onClick={() => handleEditCategory(category)}
                      className="h-8"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => setEditingCategory(null)}
                      className="h-8"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>{category}</span>
                    <Button
                      onClick={() => {
                        setEditingCategory(category);
                        setNewCategoryName(category);
                      }}
                      className="h-8"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      onClick={() => handleDeleteCategory(category)}
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
