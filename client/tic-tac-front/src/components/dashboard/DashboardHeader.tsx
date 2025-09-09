import { Box, Button, Typography } from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import GroupIcon from "@mui/icons-material/Group";

type Props = {
  onCreateGame: (type: "single" | "multi") => void;
};

export default function DashboardHeader({ onCreateGame }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", sm: "center" },
        mb: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          color: "#ffffff",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          background:
            "linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(78, 205, 196, 0.9) 100%)",
          mb: { xs: 2, sm: 0 },
          p: 3,
          borderRadius: 3,
          textAlign: "center",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
            background:
              "linear-gradient(135deg, rgba(102, 126, 234, 1) 0%, rgba(78, 205, 196, 1) 100%)",
          },
        }}
      >
        Game Dashboard
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          onClick={() => onCreateGame("single")}
          startIcon={<SportsEsportsIcon />}
          sx={{
            borderRadius: 2,
            background: "linear-gradient(45deg, #2196F3 0%, #21CBF3 100%)",
            boxShadow: "0 4px 8px rgba(33, 150, 243, 0.4)",
          }}
        >
          Singleplayer
        </Button>
        <Button
          variant="contained"
          onClick={() => onCreateGame("multi")}
          startIcon={<GroupIcon />}
          sx={{
            borderRadius: 2,
            background: "linear-gradient(45deg, #FF6B6B 0%, #FF8E53 100%)",
            boxShadow: "0 4px 8px rgba(255, 107, 107, 0.4)",
          }}
        >
          Multiplayer
        </Button>
      </Box>
    </Box>
  );
}
