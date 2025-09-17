import { useContext, useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthGraphContext";
import { getGame, makeMove } from "../api/graphql/game";
import { socket } from "../api/socket";
import type { Game } from "../types/game";
import { useToast } from "../context/ToastContext";
import GameHeader from "../components/game/GameHeader";
import GameBoard from "../components/game/GameBoard";
import GameStatus from "../components/game/GameStatus";
import GameLog from "../components/game/GameLog";
import GameActions from "../components/game/GameActions";

export default function GamePage() {
  const { id } = useParams<{ id: string }>();
  const auth = useContext(AuthContext);
  const [game, setGame] = useState<Game | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (!auth?.token || !id) return;

    const gameId = Number(id);
    const fetchGame = async () => {
    try {
      const gameData = await getGame(gameId);
      setGame(gameData);
    } catch {
      showToast("Failed to load game", "ERROR");
    }
  };

  fetchGame();

    
  socket.emit("joinGame", Number(id));

  socket.on("move", (updated: Game) => {
    setGame(updated);
  });

  return () => {
    socket.off("move");
  };
  }, [id, auth?.token, showToast]);

  const handleMove = async (row: number, col: number) => {
    if (!auth?.token || !game || game.status === "finished") return;

    const taken = game.moves.find((m) => m.row === row && m.col === col);
    if (taken) {
      showToast("This cell is already taken", "ERROR");
      return;
    }

    try {
      const updated = await makeMove(game.id, row, col);
      setGame(updated);
    } catch {
      showToast("Invalid move!", "ERROR");
    }
  };

  if (!game) {
    return <Typography>Loading game...</Typography>;
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 500, mx: "auto", minHeight: "100vh" }}>
      <GameHeader game={game} />
      <Paper elevation={4} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <GameBoard game={game} onMove={handleMove} />
        <GameStatus game={game} />
      </Paper>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <GameLog game={game} />
      </Paper>
      <GameActions />
    </Box>
  );
}
