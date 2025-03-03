"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Home from "../Home";
import LoginPage from "../../components/LoginPage";
import { useAuth } from "../authContext";
//import Loading from "../../components/Loading";

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

const Page: React.FC = () => {
  const handleLogin = () => {
    console.log("User logged in");
  };

  return <PageContent onLogin={handleLogin} />;
};

export default Page;
