import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const LoggedOutButtonSet = () => (
  <>
    <Button 
      color="inherit" 
      component={Link} 
      to="/login"
      sx={{ 
        fontWeight: 600,
        borderRadius: 2,
        "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" }
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
        "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" }
      }}
    >
      Register
    </Button>
  </>
);
