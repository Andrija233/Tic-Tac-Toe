import { useState } from "react";
import { TextField, Button, Box, Typography, Paper, InputAdornment, IconButton, Divider} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff, Home as HomeIcon, Person, Lock } from "@mui/icons-material";

interface Props {
  onSubmit: (username: string, password: string) => void;
  title: string;
}

export default function AuthForm({ onSubmit, title }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSubmit = () => {
    onSubmit(username, password);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const isLogin = title.toLowerCase() === "login";

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      py: 4,
      px: 2
    }}>
      <Paper elevation={10} sx={{
        p: 4,
        borderRadius: 3,
        width: "100%",
        maxWidth: 400,
        mx: "auto",
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)"
      }}>
        
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h4" fontWeight="700" gutterBottom sx={{
            background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {isLogin 
              ? "Sign in to continue your gaming journey" 
              : "Create your account to get started"
            }
          </Typography>
        </Box>

        
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            margin="normal"
            required
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            }}
          />
          
          
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              borderRadius: 2,
              background: "linear-gradient(45deg, #4CAF50 0%, #2E7D32 100%)",
              fontSize: "1.1rem",
              fontWeight: "600",
              "&:hover": {
                background: "linear-gradient(45deg, #43A047 0%, #1B5E20 100%)",
              }
            }}
          >
            {title}
          </Button>
          
          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              or
            </Typography>
          </Divider>
          
          
          <Button
            fullWidth
            variant="outlined"
            onClick={handleHomeClick}
            startIcon={<HomeIcon />}
            sx={{
              py: 1.5,
              borderRadius: 2,
              borderWidth: 2,
              fontSize: "1rem",
              fontWeight: "600",
              color: "#667eea",
              borderColor: "#667eea",
              "&:hover": {
                borderWidth: 2,
                backgroundColor: "rgba(102, 126, 234, 0.1)",
                borderColor: "#667eea"
              }
            }}
          >
            Back to Home
          </Button>
        </Box>
        
        
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            {isLogin 
              ? "Don't have an account? " 
              : "Already have an account? "
            }
            <Button 
              color="primary" 
              size="small" 
              onClick={() => navigate(isLogin ? "/register" : "/login")}
              sx={{ fontWeight: "600" }}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}