import { Box, Paper, Typography } from "@mui/material";
import type { Game } from "../../types/game";

type Props = {
  games: Game[];
  allGames: Game[];
  wins: number;
};

export default function DashboardStats({ games, allGames, wins }: Props) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
        gap: 2,
        mb: 4,
      }}
    >
      <Paper sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
        <Typography variant="h4" color="primary" fontWeight="bold">
          {games.length}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Your Games
        </Typography>
      </Paper>
      <Paper sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
        <Typography variant="h4" color="secondary" fontWeight="bold">
          {allGames.filter((g) => g.status === "ongoing").length}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ongoing
        </Typography>
      </Paper>
      <Paper sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
        <Typography variant="h4" sx={{ color: "#4CAF50", fontWeight: "bold" }}>
          {wins}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Wins
        </Typography>
      </Paper>
      <Paper sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
        <Typography variant="h4" sx={{ color: "#FF6B6B", fontWeight: "bold" }}>
          {allGames.filter((g) => g.status === "ongoing" && g.type === "multi").length}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Active Multiplayer
        </Typography>
      </Paper>
    </Box>
  );
}
