import { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Box,Chip} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { SportsEsports as GameIcon,ExitToApp as LogoutIcon,Dashboard as DashboardIcon} from "@mui/icons-material";
import { useToast } from "../context/ToastContext";

export default function Navbar() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const hiddenRoutes = ["/login", "/register"];
  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  const handleLogout = () => {
    auth?.logout();
    showToast("Logout successful!", "SUCCESS");
    navigate("/login");
  };

  return (
    <AppBar 
      position="static" 
      elevation={2}
      sx={{ 
        background: "linear-gradient(45deg, #3a7bd5 0%, #00d2ff 100%)",
        borderRadius: 0
      }}
    >
      <Toolbar sx={{ 
        display: "flex", 
        justifyContent: "space-between",
        py: 1
      }}>
        
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <GameIcon sx={{ mr: 1, fontSize: 30 }} />
          <Typography
            variant="h6"
            component={Link}
            to={auth?.token ? "/dashboard" : "/"}
            sx={{ 
              textDecoration: "none", 
              color: "inherit",
              fontWeight: 700,
              background: "linear-gradient(45deg, #fff 30%, #e0f7fa 90%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Tic Tac Toe
          </Typography>
          
          {auth?.token && (
            <Chip 
              label="Online" 
              size="small" 
              color="success" 
              sx={{ ml: 2, color: "white", fontWeight: 500 }} 
            />
          )}
        </Box>

        
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {auth?.token ? (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/dashboard"
                startIcon={<DashboardIcon />}
                sx={{ 
                  fontWeight: 600,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)"
                  }
                }}
              >
                Dashboard
              </Button>
              <Button 
                color="inherit" 
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={{ 
                  fontWeight: 600,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)"
                  }
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/login"
                sx={{ 
                  fontWeight: 600,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)"
                  }
                }}
              >
                Login
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/register"
                sx={{ 
                  fontWeight: 600,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)"
                  }
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}