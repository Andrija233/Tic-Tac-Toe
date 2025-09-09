import { Box, Chip, Typography, Paper } from "@mui/material";
import type { Game } from "../../types/game";

type Props = {
  game: Game;
};

export default function GameHeader({ game }: Props) {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3, textAlign: "center" }}>
      <Typography
        variant="h4"
        fontWeight="700"
        gutterBottom
        sx={{
          background: "linear-gradient(45deg, #3a7bd5 0%, #00d2ff 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Tic Tac Toe
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap", mb: 2 }}>
        <Chip label={`Game ID: ${game.id}`} variant="outlined" color="primary" size="small" />
        <Chip
          label={`Type: ${game.type}`}
          variant="outlined"
          color={game.type === "single" ? "primary" : "secondary"}
          size="small"
        />
        <Chip
          label={`Status: ${game.status}`}
          color={game.status === "ongoing" ? "success" : "default"}
          size="small"
        />
      </Box>
    </Paper>
  );
}
