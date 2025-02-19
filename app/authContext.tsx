"use client";

import React, { createContext, useContext, useState } from "react";

// interface AuthContextType {
//   isLoggedIn: boolean;
//   login: () => void;
//   logout: () => void;
// }

interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  registerUser: () => void; // Add this line
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const setIsLoggedIn = useState(false)[1];

  const login = async (email: string): Promise<void> => {
    // Add your login logic here
    console.log(`Logging in with email: ${email}`);
    setIsLoggedIn(true);
  };

  const logout = (): void => {
    // Add your logout logic here
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ user: null, login, logout, registerUser: () => {} }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
