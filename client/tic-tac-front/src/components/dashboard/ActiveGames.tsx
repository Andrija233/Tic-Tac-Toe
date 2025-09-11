import { Box, Typography, Chip, Button, Paper } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import AddIcon from "@mui/icons-material/Add";
import type { Game } from "../../types/game";
import { ActiveGameCard } from "./ActiveGameCard";

type Props = {
  games: Game[];
  onCreateGame: (type: "single" | "multi") => void;
};

export default function ActiveGames({ games, onCreateGame }: Props) {
  const activeGames = games.filter((g) => g.status === "ongoing");

  return (
    <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Your Active Games
        </Typography>
        <Chip label={activeGames.length} color="success" variant="outlined" />
      </Box>

      {activeGames.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 2,
          }}
        >
          {activeGames.map((game) => (
            <ActiveGameCard key={game.id} game={game} />
          ))}
        </Box>
      ) : (
        <Box textAlign="center" py={4}>
          <CachedIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No active games
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            All your games are completed or create a new one!
          </Typography>
          <Button
            variant="contained"
            onClick={() => onCreateGame("single")}
            color="success"
            startIcon={<AddIcon />}
          >
            Create New Game
          </Button>
        </Box>
      )}
    </Paper>
  );
}
