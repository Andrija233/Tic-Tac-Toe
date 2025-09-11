import { useContext } from "react";
import AuthForm from "../components/AuthForm";
import { AuthContext } from "../context/AuthContext";
import {useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const auth = useContext(AuthContext);
  const { showToast } = useToast();
  const navigate = useNavigate();
  if (!auth) return null;

  const handleRegister = async (username: string, password: string) => {
    try {
      await auth.register(username, password);
      showToast("Registration successful!", "SUCCESS");
      navigate("/dashboard");
    } catch (err) {
      showToast("Username already exists", "ERROR");
    }
  }

  return (
    <AuthForm
      title="Register"
      onSubmit={handleRegister}
    />
  );
}
