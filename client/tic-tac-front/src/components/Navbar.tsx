import { useContext } from "react";
import { AppBar, Toolbar, Typography, Box, Chip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthGraphContext";
import { SportsEsports as GameIcon } from "@mui/icons-material";
import { useToast } from "../context/ToastContext";
import { LoggedInButtonSet } from "./navbar/LoggedInButtonSet";
import { LoggedOutButtonSet } from "./navbar/LoggedOutButtonSet";

export default function Navbar() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { showToast } = useToast();

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
        borderRadius: 0,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: 1,
        }}
      >
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
              WebkitTextFillColor: "transparent",
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
            <LoggedInButtonSet handleLogout={handleLogout} />
          ) : (
            <LoggedOutButtonSet />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
