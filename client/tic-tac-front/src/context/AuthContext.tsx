import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import * as AuthAPI from "../api/auth";
import type { AuthContextType, User } from "../types/auth";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  const handleLogin = async (username: string, password: string) => {
    const res = await AuthAPI.login(username, password);
    setUser(res.user);
    setToken(res.token);
    localStorage.setItem("token", res.token);
  };

  const handleRegister = async (username: string, password: string) => {
    const res = await AuthAPI.register(username, password);
    setUser(res.user);
    setToken(res.token);
    localStorage.setItem("token", res.token);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  const value: AuthContextType = {
    user,
    token,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
