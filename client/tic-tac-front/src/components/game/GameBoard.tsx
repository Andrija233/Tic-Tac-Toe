import { Grid, Paper } from "@mui/material";
import type { Game } from "../../types/game";

type Props = {
  game: Game;
  onMove: (row: number, col: number) => void;
};

export default function GameBoard({ game, onMove }: Props) {
  return (
    <Grid container spacing={1} sx={{ width: 320, margin: "0 auto" }}>
      {Array.from({ length: 3 }, (_, row) =>
        Array.from({ length: 3 }, (_, col) => {
          const move = game.moves.find((m) => m.row === row && m.col === col);

          return (
            <Grid item xs={4} key={`${row}-${col}`}>
              <Paper
                elevation={move ? 2 : 4}
                sx={{
                  width: 90,
                  height: 90,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 40,
                  fontWeight: "bold",
                  cursor: game.status === "finished" || move ? "default" : "pointer",
                  backgroundColor: "#fff",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: !move && game.status === "ongoing" ? "#f5f5f5" : "inherit",
                    transform: !move && game.status === "ongoing" ? "scale(1.05)" : "none",
                  },
                  color: move && move.player === "X" ? "#3f51b5" : "#f50057",
                }}
                onClick={() => !move && game.status === "ongoing" && onMove(row, col)}
              >
                {move ? move.player : ""}
              </Paper>
            </Grid>
          );
        })
      )}
    </Grid>
  );
}
