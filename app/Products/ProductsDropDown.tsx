import { Product } from "@/app/Products/columns";
import { useProductStore } from "@/app/useProductStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
//import { nanoid } from "nanoid";
import { useRouter } from "next/router";

interface ProductsDropDownProps {
  row: {
    original: Product;
  };
}

export default function ProductsDropDown({ row }: ProductsDropDownProps) {
  const { addProduct, deleteProduct } = useProductStore();
  const router = useRouter();

  const handleCopyProduct = async () => {
    const productToCopy: Product = {
      ...row.original,
      id: Date.now(), // Use Date.now() to generate a unique numeric id
      name: `${row.original.name} (copy)`,
      createdAt: new Date(),
    };

    const result = await addProduct(productToCopy);
    if (result.success) {
      router.reload();
    }
  };

  const handleDeleteProduct = async () => {
    const result = await deleteProduct(row.original.id);
    if (result.success) {
      router.reload();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM10 8a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM10 13a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleCopyProduct}>Copy</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeleteProduct}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
