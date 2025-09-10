import { Box, Typography } from "@mui/material";
import type { Game } from "../../types/game";
import NoMoves from "./NoMoves";
import MoveList from "./MoveList";

type Props = { game: Game };

export default function GameLog({ game }: Props) {
  return (
    <Box>
      <Typography variant="h6" fontWeight="600" gutterBottom>
        📋 Game Log
      </Typography>

      {game.moves.length === 0 ? <NoMoves /> : <MoveList moves={game.moves} />}
    </Box>
  );
}
