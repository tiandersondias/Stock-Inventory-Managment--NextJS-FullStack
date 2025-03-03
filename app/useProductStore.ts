import { create } from "zustand";
import { Product } from "./Products/columns";
import { products } from "./Products/productData";

//structure of the overall state
interface ProductState {
  allProducts: Product[];
  categories: string[];
  suppliers: string[];
  isLoading: boolean;
  openDialog: boolean;
  setOpenDialog: (openDialog: boolean) => void;
  openProductDialog: boolean;
  setOpenProductDialog: (openProductDialog: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  setAllProducts: (allProducts: Product[]) => void;
  loadProducts: () => Promise<void>;
  addProduct: (product: Product) => Promise<{ success: boolean }>;
  updateProduct: (updatedProduct: Product) => Promise<{ success: boolean }>;
  deleteProduct: (productId: number) => Promise<{ success: boolean }>;
  addCategory: (category: string) => void;
  editCategory: (oldCategory: string, newCategory: string) => void;
  deleteCategory: (category: string) => void;
  addSupplier: (supplier: string) => void;
  editSupplier: (oldSupplier: string, newSupplier: string) => void;
  deleteSupplier: (supplier: string) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  allProducts: [],
  categories: ["Test Category"],
  suppliers: ["Test Supplier"],
  isLoading: false,
  selectedProduct: null,
  openDialog: false,
  setOpenDialog: (openDialog) => {
    set({ openDialog: openDialog });
  },
  openProductDialog: false,
  setOpenProductDialog: (openProductDialog) => {
    set({ openProductDialog: openProductDialog });
  },
  setSelectedProduct: (product: Product | null) => {
    set({ selectedProduct: product });
  },
  setAllProducts: (allProducts) => {
    set({ allProducts: allProducts });
  },
  loadProducts: async () => {
    const fetchedProducts = await fetchProducts();
    set({ allProducts: fetchedProducts });
  },
  addProduct: async (product: Product) => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 789));
      set((state) => ({ allProducts: [...state.allProducts, product] }));
      return { success: true };
    } finally {
      set({ isLoading: false });
    }
  },
  updateProduct: async (updatedProduct: Product) => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set((state) => ({
        allProducts: state.allProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        ),
      }));
      return { success: true };
    } finally {
      set({ isLoading: false });
      set({ openProductDialog: false });
      set({ selectedProduct: null });
    }
  },
  deleteProduct: async (productId: number) => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1789));
      set((state) => ({
        allProducts: state.allProducts.filter(
          (product) => product.id !== productId
        ),
      }));
      return { success: true };
    } finally {
      set({ isLoading: false });
      set({ openDialog: false });
      set({ selectedProduct: null });
    }
  },
  addCategory: (category: string) => {
    set((state) => ({
      categories: [...state.categories, category].sort(),
    }));
  },
  editCategory: (oldCategory: string, newCategory: string) => {
    set((state) => ({
      categories: state.categories
        .map((category) => (category === oldCategory ? newCategory : category))
        .sort(),
    }));
  },
  deleteCategory: (category: string) => {
    set((state) => ({
      categories: state.categories.filter((cat) => cat !== category).sort(),
    }));
  },
  addSupplier: (supplier: string) => {
    set((state) => ({
      suppliers: [...state.suppliers, supplier].sort(),
    }));
  },
  editSupplier: (oldSupplier: string, newSupplier: string) => {
    set((state) => ({
      suppliers: state.suppliers
        .map((supplier) => (supplier === oldSupplier ? newSupplier : supplier))
        .sort(),
    }));
  },
  deleteSupplier: (supplier: string) => {
    set((state) => ({
      suppliers: state.suppliers.filter((sup) => sup !== supplier).sort(),
    }));
  },
}));

function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 1200);
  });
}
