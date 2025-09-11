import type { Game } from "../types/game";

export function calculateWins(games: Game[], userId?: number): number {
  if (!userId) return 0;
  const uid = Number(userId);

  return games.filter(g => 
    g.status === "finished" &&
    g.winner &&
    g.winner !== "draw" &&
    ((g.winner === "X" && g.player_x === uid) ||
     (g.winner === "O" && g.player_o === uid))
  ).length;
}

