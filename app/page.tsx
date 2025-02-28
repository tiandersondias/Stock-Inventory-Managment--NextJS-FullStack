"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Home from "./Home";
import LoginPage from "../components/LoginPage";
import { useAuth } from "./authContext";

interface PageProps {
  params: Promise<{ [key: string]: any }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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

const Page: React.FC<PageProps> = ({ params, searchParams }) => {
  const [resolvedParams, setResolvedParams] = useState<{
    [key: string]: any;
  } | null>(null);
  const [resolvedSearchParams, setResolvedSearchParams] = useState<{
    [key: string]: string | string[] | undefined;
  } | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
      setResolvedParams(await params);
      setResolvedSearchParams(await searchParams);
    };
    resolveParams();
  }, [params, searchParams]);

  const handleLogin = () => {
    console.log("User logged in");
  };

  if (!resolvedParams || !resolvedSearchParams) {
    return <div>Loading...</div>;
  }

  return <PageContent onLogin={handleLogin} />;
};

export default Page;
