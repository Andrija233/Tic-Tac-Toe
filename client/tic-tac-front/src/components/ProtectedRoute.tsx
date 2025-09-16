import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthGraphContext";
import type { ReactElement } from "react";

export default function ProtectedRoute({ children }: { children: ReactElement }) {
  const auth = useContext(AuthContext);
  return auth?.token ? children : <Navigate to="/login" />;
}
