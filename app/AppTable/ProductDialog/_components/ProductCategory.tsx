"use client";

import { Product } from "@/app/Products/columns";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useProductStore } from "@/app/useProductStore";

export function ProductCategory({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<Product["category"]>>;
}) {
  const { categories } = useProductStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setSelectedCategory(categories[0]);
  }, [setSelectedCategory, categories]);

  if (!isClient) return null;

  return (
    <div className="flex flex-col gap-2 poppins">
      <Label className="text-slate-600">{`Product's Category`}</Label>
      <Select
        value={selectedCategory}
        onValueChange={(value: string) =>
          setSelectedCategory(value as Product["category"])
        }
      >
        <SelectTrigger className="h-[45px] shadow-none">
          <SelectValue placeholder="Select a Category" />
        </SelectTrigger>
        <SelectContent className="poppins">
          {categories.sort().map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
