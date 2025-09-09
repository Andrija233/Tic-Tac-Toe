import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { createGame, getHistory, joinGame, getAllGames } from "../api/game";
import { useNavigate } from "react-router-dom";
import type { Game } from "../types/game";
import { socket } from "../api/socket";
import { useToast } from "../context/ToastContext";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import ActiveGames from "../components/dashboard/ActiveGames";
import GameList from "../components/dashboard/GameList";
import MultiplayerGames from "../components/dashboard/MultiplayerGames";

export default function Dashboard() {
  const auth = useContext(AuthContext);
  const [games, setGames] = useState<Game[]>([]);
  const [allGames, setAllGames] = useState<Game[]>([]);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    if (!auth?.token) return;

    getHistory(auth.token)
      .then(setGames)
      .catch(() => showToast("Failed to load history", "ERROR"));

    getAllGames(auth.token)
      .then(setAllGames)
      .catch(() => showToast("Failed to load all games", "ERROR"));


  const handleAllGamesUpdated = (games: Game[]) => {
    setAllGames(games);
  };

  socket.on("allGamesUpdated", handleAllGamesUpdated);

    return () => {
      socket.off("allGamesUpdated", handleAllGamesUpdated);
    };
  }, [auth?.token, showToast]);

  const handleCreateGame = async (type: "single" | "multi") => {
    if (!auth?.token) return;
    try {
      const game = await createGame(auth.token, type);
      setGames([game, ...games]);
      navigate(`/game/${game.id}`);
    } catch {
      showToast("Failed to create game", "ERROR");
    }
  };

  const handleJoinGame = async (gameId: number) => {
    if (!auth?.token) return;
    try {
      const game = await joinGame(auth.token, gameId);
      setGames([game, ...games]);
      navigate(`/game/${game.id}`);
    } catch {
      showToast("Game is full", "ERROR");
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto" }}>
      <DashboardHeader onCreateGame={handleCreateGame} />
      <DashboardStats games={games} allGames={allGames} />
      <ActiveGames games={games} onCreateGame={handleCreateGame} />
      <GameList games={games} />
      <MultiplayerGames allGames={allGames} onJoinGame={handleJoinGame} onCreateGame={handleCreateGame} />
    </Box>
  );
}
