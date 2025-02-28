"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Home from "./Home";
import LoginPage from "./login/page";
import { useAuth } from "./authContext";

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const PageContent: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const router = useRouter();
  const { isLoggedIn: authIsLoggedIn } = useAuth();

  useEffect(() => {
    if (authIsLoggedIn) {
      router.push("/");
    }
  }, [authIsLoggedIn, router]);

  if (authIsLoggedIn) {
    return <Home />;
  }

  return <LoginPage onLogin={onLogin} />;
};

const Page: React.FC<PageProps> = ({
  params: _params,
  searchParams: _searchParams,
}) => {
  const handleLogin = () => {
    console.log("User logged in");
  };

  return <PageContent onLogin={handleLogin} />;
};

export default Page;
