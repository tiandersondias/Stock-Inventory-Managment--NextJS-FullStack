"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Home from "./Home";
import LoginPage from "./login/page";
import { useAuth } from "./authContext";

const PageContent: React.FC = () => {
  const router = useRouter();
  const { isLoggedIn: authIsLoggedIn } = useAuth();

  useEffect(() => {
    if (authIsLoggedIn) {
      router.push("/");
    }
  }, [authIsLoggedIn, router]);

  const handleLogin = () => {
    router.push("/");
  };

  if (authIsLoggedIn) {
    return <Home />;
  }

  return <LoginPage onLogin={handleLogin} />;
};

const Page: React.FC = () => {
  return <PageContent />;
};

export default Page;
