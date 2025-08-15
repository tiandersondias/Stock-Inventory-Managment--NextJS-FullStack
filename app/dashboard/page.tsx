"use client";

import React,
{
  useEffect
}
from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  useProductStore
} from "../useProductStore";
import {
  useAuth
} from "../authContext";
import {
  useRouter
} from "next/navigation";

export default function Dashboard() {
  const {
    allProducts,
    loadProducts,
    isLoading
  } = useProductStore();
  const {
    isLoggedIn,
    user
  } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      loadProducts();
    }
  }, [isLoggedIn, loadProducts, router]);

  const totalProducts = allProducts.length;
  const totalValue = allProducts.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const productsByCategory = allProducts.reduce((acc, product) => {
    const category = product.category || "Unknown";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record < string, number > );

  if (!isLoggedIn || !user) {
    return null;
  }

  return ( <
    div className = "poppins w-full min-h-screen bg-gray-50 dark:bg-[#121212]" >
    <
    Card className = "flex flex-col shadow-none space-y-4 lg:space-y-6 lg:mx-8 lg:my-6 lg:rounded-lg lg:border lg:shadow-md" >
    <
    CardHeader className = "flex flex-col justify-center items-center space-y-2 sm:space-y-0 sm:flex-row sm:justify-between sm:space-x-4" >
    <
    div className = "flex flex-col items-center sm:items-start" >
    <
    CardTitle className = "font-bold text-[23px]" > Dashboard < /CardTitle> <
    p className = "text-sm text-slate-600" >
    Inventory Metrics <
    /p> <
    /div> <
    /CardHeader>

    <
    CardContent >
    <
    div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" >
    <
    Card >
    <
    CardHeader >
    <
    CardTitle > Total Products < /CardTitle> <
    /CardHeader> <
    CardContent >
    <
    p className = "text-2xl font-bold" > {
      totalProducts
    } < /p> <
    /CardContent> <
    /Card> <
    Card >
    <
    CardHeader >
    <
    CardTitle > Total Inventory Value < /CardTitle> <
    /CardHeader> <
    CardContent >
    <
    p className = "text-2xl font-bold" > $ {
      totalValue.toFixed(2)
    } < /p> <
    /CardContent> <
    /Card> <
    Card >
    <
    CardHeader >
    <
    CardTitle > Products by Category < /CardTitle> <
    /CardHeader> <
    CardContent > {
      Object.entries(productsByCategory).map(
        ([category, count]) => ( <
          p key = {
            category
          }
          className = "text-sm" >
          <
          span className = "font-semibold" > {
            category
          }: < /span> {count} <
          /p>
        )
      )
    } <
    /CardContent> <
    /Card> <
    /div> <
    /CardContent> <
    /Card> <
    /div>
  );
}
