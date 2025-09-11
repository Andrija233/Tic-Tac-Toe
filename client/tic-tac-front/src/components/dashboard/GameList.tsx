import { Box, Typography, Chip, Button, Paper } from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import AddIcon from "@mui/icons-material/Add";
import type { Game } from "../../types/game";
import { FinishedGameCard } from "./FinishedGameCard";

type Props = {
  games: Game[];
};

export default function GameList({ games }: Props) {
  const finishedGames = games.filter((g) => g.status === "finished");

  return (
    <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Your Games
        </Typography>
        <Chip label={finishedGames.length} color="primary" variant="outlined" />
      </Box>

      {finishedGames.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 2,
          }}
        >
          {finishedGames.map((game) => (
            <FinishedGameCard key={game.id} game={game} />
          ))}
        </Box>
      ) : (
        <Box textAlign="center" py={4}>
          <SportsEsportsIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="textSecondary" gutterBottom>
            You don't have any games yet
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Create your first game to get started!
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />}>
            Create Game
          </Button>
        </Box>
      )}
    </Paper>
  );
}
