import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem("isAuthenticated") === "true";
    } catch {
      return false;
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    try {
      localStorage.setItem("isAuthenticated", isAuthenticated ? "true" : "false");
    } catch {}
  }, [isAuthenticated]);

  const login = async (username: string, password: string) => {
    // Simulate authentication check
    const valid = username === "admin" && password === "password";
    setAuthenticated(valid);
    return valid;
  };

  const logout = () => {
    setAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
