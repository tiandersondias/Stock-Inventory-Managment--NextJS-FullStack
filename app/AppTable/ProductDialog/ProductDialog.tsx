"use client";

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
import { Separator } from "@/components/ui/separator";

import ProductName from "./_components/ProductName";
import Price from "./_components/Price";
import { ProductCategory } from "./_components/ProductCategory";
import Quantity from "./_components/Quantity";
import SKU from "./_components/SKU";
import Supplier from "./_components/Supplier";
import { z } from "zod";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Product } from "@/app/Products/columns";
import { useProductStore } from "@/app/useProductStore";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation"; // Import useRouter

// Import the missing icons
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { LuGitPullRequestDraft } from "react-icons/lu";

// Define the icons variable
const icons = [
  { icon: <FaCheck />, isSelected: true },
  { icon: <IoClose />, isSelected: false },
  { icon: <LuGitPullRequestDraft />, isSelected: false },
];

const ProductSchema = z.object({
  productName: z
    .string()
    .min(1, "Product Name is required")
    .max(100, "Product Name must be 100 characters or less"),
  sku: z
    .string()
    .min(1, "SKU is required")
    .regex(/^[a-zA-Z0-9-_]+$/, "SKU must be alphanumeric"),
  quantity: z
    .number()
    .int("Quantity must be an integer")
    .nonnegative("Quantity cannot be negative"),
  price: z
    .union([z.string(), z.number()])
    .refine((val) => val !== "", {
      message: "Price is required",
    })
    .transform((val) => {
      // If it's an empty string, this will fail validation
      if (val === "") return undefined;
      // Convert to number and fix to 2 decimal places
      const num = Number(val);
      return Number(num.toFixed(2));
    })
    .pipe(
      z
        .number({
          required_error: "Price is required",
          invalid_type_error: "Price must be a number",
        })
        .nonnegative("Price cannot be negative")
    ),
});

// Define TypeScript type for the form data
type ProductFormData = z.infer<typeof ProductSchema>;

export default function ProductDialog() {
  const methods = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      productName: "",
      sku: "",
      quantity: 0,
      price: 0.0,
    },
  });

  const { reset } = methods;

  const [selectedCategory, setSelectedCategory] =
    useState<Product["category"]>("Test Category");
  const [selectedSupplier, setSelectedSupplier] =
    useState<Product["supplier"]>("Test Supplier");
  const [selectedIcon, setSelectedIcon] = useState<ReactNode>(
    icons.find((icon) => icon.isSelected === true)?.icon
  );

  const {
    addProduct,
    isLoading,
    openProductDialog,
    setOpenProductDialog,
    setSelectedProduct,
    selectedProduct,
    updateProduct,
  } = useProductStore();
  const { toast } = useToast();
  const dialogCloseRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    if (selectedProduct) {
      // Update form with selectedProduct details when dialog opens
      reset({
        productName: selectedProduct.name,
        sku: selectedProduct.sku,
        quantity: selectedProduct.quantityInStock,
        price: selectedProduct.price,
      });
      setSelectedCategory(selectedProduct.category);
      setSelectedSupplier(selectedProduct.supplier);
      setSelectedIcon(selectedProduct.icon);
    } else {
      // Reset form values if no selectedProduct
      reset({
        productName: "",
        sku: "",
        quantity: 0,
        price: 0.0,
      });

      setSelectedCategory("Test Category");
      setSelectedSupplier("Test Supplier");
    }
  }, [selectedProduct, openProductDialog, reset]);

  const onSubmit = async (data: ProductFormData) => {
    console.log("onSubmit called with data:", data); // Debugging log
    let status: Product["status"] = "Available";
    if (data.quantity === 0) {
      status = "Stock Out";
    } else if (data.quantity < 20) {
      status = "Stock Low";
    }

    if (!selectedProduct) {
      const newProduct: Product = {
        id: Date.now(), // Use Date.now() to generate a numeric ID
        supplier: selectedSupplier, // Use selectedSupplier from state
        name: data.productName,
        price: data.price,
        quantityInStock: data.quantity,
        sku: data.sku,
        status,
        category: selectedCategory,
        icon: selectedIcon,
        createdAt: new Date(),
      };

      console.log("Adding new product:", newProduct); // Debugging log
      const result = await addProduct(newProduct);

      if (result) {
        toast({
          title: "Success",
          description: "Product added successfully!",
        });
        dialogCloseRef.current?.click();
        router.refresh(); // Use router.refresh() instead of router.reload()
      }
    } else {
      const productToUpdate: Product = {
        id: selectedProduct.id,
        createdAt: selectedProduct.createdAt,
        supplier: selectedSupplier, // Use selectedSupplier from state
        name: data.productName,
        price: data.price,
        quantityInStock: data.quantity,
        sku: data.sku,
        status,
        category: selectedCategory,
        icon: selectedIcon,
      };

      console.log("Updating product:", productToUpdate); // Debugging log
      const result = await updateProduct(productToUpdate);
      if (result.success) {
        toast({
          title: "Success",
          description: "Product updated successfully!",
        });
        router.refresh(); // Use router.refresh() instead of router.reload()
      } else {
        toast({
          title: "Error",
          description: "Something went wrong while updating the product.",
        });
      }
    }
  };

  function handleReset() {
    reset();
    setSelectedProduct(null);
  }

  function onSelectedIcon(icon: ReactNode) {
    console.log(icon);

    // Ensuring that the state update happens outside of render flow
    setTimeout(() => {
      setSelectedIcon(icon);
    }, 0);
  }

  return (
    <Dialog open={openProductDialog} onOpenChange={setOpenProductDialog}>
      <DialogTrigger asChild>
        <Button className="h-10 font-semibold">+Add Product</Button>
      </DialogTrigger>
      <DialogContent className="p-4 sm:p-7 sm:px-8 poppins max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[22px] ">
            {selectedProduct ? "Edit Product" : "Add Product"}
          </DialogTitle>
          <DialogDescription>
            Fill in the form to add a new product
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 mt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-7">
                <ProductName onSelectedIcon={onSelectedIcon} />
                <SKU />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 items-start mt-4">
                <Supplier
                  selectedSupplier={selectedSupplier}
                  setSelectedSupplier={setSelectedSupplier}
                />
                <ProductCategory
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </div>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-7">
                <Quantity />
                <Price />
              </div>
            </div>
            <DialogFooter className="mt-9 mb-4 flex flex-col sm:flex-row items-center gap-4 ">
              <DialogClose
                ref={dialogCloseRef}
                onClick={() => {
                  handleReset();
                }}
                asChild
              >
                <Button
                  variant={"secondary"}
                  className="h-11 w-full sm:w-auto px-11"
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button className="h-11 w-full sm:w-auto px-11" type="submit">
                {isLoading
                  ? "loading..."
                  : `${selectedProduct ? "Edit Product" : "Add Product"}`}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
