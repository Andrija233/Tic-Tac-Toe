import { useContext } from "react";
import AuthForm from "../components/AuthForm";
import { AuthContext } from "../context/AuthGraphContext";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const auth = useContext(AuthContext);
  const { showToast } = useToast();
  const navigate = useNavigate();
  if (!auth) {
    return null
  }


  const handleLogin = async (username: string, password: string) => {
    try {
      await auth.login(username, password);
      showToast("Login successful!", "SUCCESS");
      navigate("/dashboard");
    } catch (err) {
      showToast("Invalid credentials", "ERROR");
    }
  };

  return (
    <AuthForm
      title="Login"
      onSubmit={handleLogin}
    />
  );
}
