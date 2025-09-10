import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";

interface Props {
  handleLogout: () => void;
}

export const LoggedInButtonSet = ({ handleLogout }: Props) => (
  <>
    <Button 
      color="inherit" 
      component={Link} 
      to="/dashboard"
      startIcon={<DashboardIcon />}
      sx={{ 
        fontWeight: 600,
        borderRadius: 2,
        "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" }
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
        "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" }
      }}
    >
      Logout
    </Button>
  </>
);
