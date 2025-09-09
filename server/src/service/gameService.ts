import { Game, Move, Position, updateGameMoves, getGamesByUser, createGame, getGameById, joinGame, getAllGames } from "../models/game";

export function inBounds(row: number, col: number): boolean {
  return Number.isInteger(row) && Number.isInteger(col) && row >= 0 && row < 3 && col >= 0 && col < 3;
}

export function isCellFree(game: Game, row: number, col: number): boolean {
  return !game.moves.some(m => m.row === row && m.col === col);
}

export function isValidMove(game: Game, row: number, col: number): boolean {
  return inBounds(row, col) && isCellFree(game, row, col);
}

export function checkWinner(moves: Move[]): "X" | "O" | "draw" | null {
  const board = Array.from({ length: 3 }, () => Array(3).fill(null));
  moves.forEach(m => (board[m.row][m.col] = m.player));

  const lines = [
    
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

  for (const line of lines) {
    if (line.every(cell => cell === "X")) {
      return "X";
    }
    if (line.every(cell => cell === "O")) {
      return "O";
    }
  }

  if (moves.length === 9) return "draw";

  return null;
}

export async function makeMove(
  game: Game,
  row: number,
  col: number,
  player: "X" | "O"
): Promise<Game> {
  if (game.status === "finished") {
    throw new Error("Game already finished");
  }
  if (game.current_turn !== player) {
    throw new Error("Not your turn");
  }
  if (!isValidMove(game, row, col)) {
    throw new Error("Invalid move");
  }

  
  const newMove: Move = { row, col, player, timestamp: new Date().toISOString() };
  let newMoves = [...game.moves, newMove];

  
  let winner = checkWinner(newMoves);
  let status: "ongoing" | "finished" = winner ? "finished" : "ongoing";
  let nextTurn: "X" | "O" = player === "X" ? "O" : "X";

  
  if (game.type === "single" && !winner) {
    const fakeGame: Game = { ...game, moves: newMoves };

    const aiPos = aiMove(fakeGame);
    if (aiPos) {
      newMoves = [
        ...newMoves,
        { row: aiPos.row, col: aiPos.col, player: "O", timestamp: new Date().toISOString() }
      ];

      winner = checkWinner(newMoves);
      status = winner ? "finished" : "ongoing";
      nextTurn = "X"; 
    }
  }

  return updateGameMoves(game.id, newMoves, nextTurn, status, winner);
}

export function getGamesByUserService(userId: number) : Promise<Game[]> {
  return getGamesByUser(userId);
}

export function createGameService(type: "single" | "multi", playerX: number) : Promise<Game> {
  return createGame(type, playerX);
}

export function  getGameService(gameId: number) : Promise<Game | null> {
  return getGameById(gameId);
}

export function joinGameService(gameId: number, userId: number) : Promise<Game | null> {
  return joinGame(gameId, userId);
}

export function getAllGamesService() : Promise<Game[]> {
  return getAllGames();
}

export function getAvailableMoves(game: Game): Position[] {
  const allMoves = Array.from({ length: 3 }, (_, r) =>
    Array.from({ length: 3 }, (_, c) => ({ row: r, col: c }))
  ).flat();

  return allMoves.filter(
    pos => !game.moves.some(m => m.row === pos.row && m.col === pos.col)
  );
}

export function aiMove(game: Game): Position | null {
  const available = getAvailableMoves(game);
  if (available.length === 0) {
    return null;
  }
  return available[Math.floor(Math.random() * available.length)];
}

