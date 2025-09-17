import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { login, register } from "../api/graphql/user"
import type { AuthContextType, User } from "../types/auth";
import { handleGraphqlError } from "../utils/handleGraphError";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); 


  useEffect(() => {
  const savedToken = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  if (savedToken && savedUser) {
    setToken(savedToken);
    try {
      setUser(JSON.parse(savedUser));
    } catch (e) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      handleGraphqlError(e, "Failed to parse user data from local storage");
    }
  }
  setLoading(false);
}, []);

  const handleLogin = async (username: string, password: string) => {
  try {
    const res = await login(username, password);
    if (!res) {
      throw new Error("Login failed, no response data.");
    }
    setUser(res.user);
    setToken(res.token);
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));
  } catch (err) {
    handleGraphqlError(err, "Login failed");
  }
};

  const handleRegister = async (username: string, password: string) => {
    try {
      const res = await register(username, password);
      if(!res){
        throw new Error("Registration failed, no response data.");
      }
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
    } catch (err) {
      handleGraphqlError(err, "Registration failed");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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