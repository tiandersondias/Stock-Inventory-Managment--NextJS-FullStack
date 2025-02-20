"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Home from "./Home";
import LoginPage from "./login";

const Page: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    // Simulate login logic
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    // Navigate to the homepage
    router.push("/");
  };

  if (isLoggedIn) {
    return <Home />;
  }

  return <LoginPage onLogin={handleLogin} />;
};

export default Page;
