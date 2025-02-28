"use client";

import React, { useEffect, useState } from "react";
import AppHeader from "./AppHeader/AppHeader";
import { Card } from "@/components/ui/card";
import AppTable from "./AppTable/AppTable";
import { useTheme } from "next-themes";
import { DeleteDialog } from "./DeleteDialog";
import { Button } from "@/components/ui/button"; // Import Button component
import { useAuth } from "./authContext"; // Import useAuth hook

export default function Home() {
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);
  const bgColor = theme === "dark" ? "bg-black" : "bg-gray-50";
  const { logout, user } = useAuth(); // Get logout function and user from auth context

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className={`poppins p-5 ${bgColor} border w-full min-h-screen`}>
      <Card className="flex flex-col shadow-none p-4 sm:p-5 space-y-4">
        <DeleteDialog />
        <div className="absolute top-4 right-4 flex items-center space-x-4">
          <span>{user?.email}</span>
          <Button onClick={logout} className="h-11 px-11">
            Logout
          </Button>
        </div>
        <AppHeader />
        <AppTable />
      </Card>
    </div>
  );
}
