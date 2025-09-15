import { Game, Move, Position, updateGameMoves, getGamesByUser, createGame, getGameById, joinGame, getAllGames } from "../models/game";
import { aiMove, checkWinner, isValidMove } from "../helper/helperFunctions";


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