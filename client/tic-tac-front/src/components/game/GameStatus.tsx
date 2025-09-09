import { Box, Typography } from "@mui/material";
import type { Game } from "../../types/game";

type Props = {
  game: Game;
};

export default function GameStatus({ game }: Props) {
  if (game.status === "ongoing") {
    return (
      <Box
        sx={{
          mt: 2,
          p: 2,
          backgroundColor: "#e3f2fd",
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" color="primary.main" fontWeight="600">
          Current turn:{" "}
          <Box component="span" sx={{ color: "#f50057" }}>
            {game.current_turn}
          </Box>
        </Typography>
      </Box>
    );
  }

  if (game.status === "finished") {
    return (
      <Box
        sx={{
          mt: 2,
          p: 2,
          backgroundColor: "#e8f5e9",
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" color="success.main" fontWeight="700">
          {game.winner === "draw"
            ? "🤝 It's a Draw!"
            : `🏆 Winner: ${game.winner}`}
        </Typography>
      </Box>
    );
  }

  return null;
}
