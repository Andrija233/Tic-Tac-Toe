import { Box, Typography, Chip, Button, Paper } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import AddIcon from "@mui/icons-material/Add";
import type { Game } from "../../types/game";
import { MultiplayerGameCard } from "./MultiplayerGameCard";

type Props = {
  allGames: Game[];
  onJoinGame: (id: number) => void;
  onCreateGame: (type: "single" | "multi") => void;
};

export default function MultiplayerGames({ allGames, onJoinGame, onCreateGame }: Props) {
  const multiplayerGames = allGames.filter((g) => g.status === "ongoing" && g.type === "multi");

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Active Multiplayer Games
        </Typography>
        <Chip label={multiplayerGames.length} color="secondary" variant="outlined" />
      </Box>

      {multiplayerGames.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 2,
          }}
        >
          {multiplayerGames.map((game) => (
            <MultiplayerGameCard key={game.id} game={game} onJoinGame={onJoinGame} />
          ))}
        </Box>
      ) : (
        <Box textAlign="center" py={4}>
          <GroupIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No active multiplayer games available
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Create a new multiplayer game or check back later!
          </Typography>
          <Button
            variant="contained"
            onClick={() => onCreateGame("multi")}
            color="secondary"
            startIcon={<AddIcon />}
          >
            Create Multiplayer Game
          </Button>
        </Box>
      )}
    </Paper>
  );
}
