"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  registerUser: (
    user: Omit<User, "id"> & { password: string }
  ) => Promise<void>;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.removeItem("token"); // Remove token for the first run
    const token = localStorage.getItem("token");
    if (token) {
      // Optionally, you can verify the token here
      setIsLoggedIn(true);
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("isLoggedIn", "true");
    } else {
      localStorage.setItem("isAuth", "false");
      localStorage.setItem("isLoggedIn", "false");
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const { token, user } = await response.json();
      localStorage.setItem("token", token);
      setUser(user);
      setIsLoggedIn(true);
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("isLoggedIn", "true");
    } else {
      const error = await response.json();
      console.error("Failed to login:", error.error);
      localStorage.setItem("isAuth", "false");
      localStorage.setItem("isLoggedIn", "false");
    }
  };

  const logout = (): void => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
    localStorage.setItem("isAuth", "false");
    localStorage.setItem("isLoggedIn", "false");
  };

  const registerUser = async (
    user: Omit<User, "id"> & { password: string }
  ): Promise<void> => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const newUser = await response.json();
      setUser(newUser);
      setIsLoggedIn(false); // Ensure isLoggedIn is false after registration
      localStorage.setItem("isAuth", "false");
      localStorage.setItem("isLoggedIn", "false");
    } else {
      const error = await response.json();
      console.error("Failed to register:", error.error);
      localStorage.setItem("isAuth", "false");
      localStorage.setItem("isLoggedIn", "false");
      throw new Error(error.error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, registerUser, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
