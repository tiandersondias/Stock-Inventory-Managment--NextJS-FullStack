"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../authContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link"; // Import Link component
import { toast } from "react-toastify"; // Import toast

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Login successful!");
      router.push("/"); // Navigate to the main page after successful login
    } catch {
      toast.error("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="text-center">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
