import { Box, Typography } from "@mui/material";
import type { Game } from "../../types/game";

type Props = {
  game: Game;
};

export default function GameLog({ game }: Props) {
  return (
    <Box>
      <Typography variant="h6" fontWeight="600" gutterBottom>
        📋 Game Log
      </Typography>

      {game.moves.length === 0 ? (
        <Box textAlign="center" py={2}>
          <Typography color="text.secondary">No moves yet. Make the first move!</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            maxHeight: 200,
            overflowY: "auto",
            border: "1px solid #eee",
            borderRadius: 2,
            p: 2,
          }}
        >
          {game.moves.map((m, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                py: 1,
                borderBottom: i < game.moves.length - 1 ? "1px solid #f5f5f5" : "none",
              }}
            >
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: m.player === "X" ? "#3f51b5" : "#f50057",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 12,
                  fontWeight: "bold",
                  mr: 1.5,
                }}
              >
                {i + 1}
              </Box>
              <Typography variant="body2">
                <strong style={{ color: m.player === "X" ? "#3f51b5" : "#f50057" }}>
                  Player {m.player}
                </strong>{" "}
                placed at ({m.row}, {m.col})
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
