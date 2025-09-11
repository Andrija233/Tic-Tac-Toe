import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function GameActions() {
  return (
    <Box sx={{ 
      display: "flex",
      justifyContent: "center",
      gap: 2,
      mt: 3
    }}>
      <Button variant="outlined" sx={{ width: "100%", maxWidth: 500, backgroundColor: "#4CAF50", color: "white" }}  component={Link} to="/dashboard">
        🏠 Back to Dashboard
      </Button>
    </Box>
  );
}
