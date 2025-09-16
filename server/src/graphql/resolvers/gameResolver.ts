import * as GameService from "../../service/gameService";
import { getIO } from "../../socket";
import type { Context, CreateGameArgs, JoinGameArgs, MakeMoveArgs } from "../../types/graphTypes";

export const gameResolvers = {
  Query: {
    game: (_: unknown, { id }: { id: number }) => GameService.getGameService(id),
    myGames: (_: unknown, __: unknown, { user }: Context) => GameService.getGamesByUserService(user.id),
    allGames: () => GameService.getAllGamesService(),
  },
  Mutation: {
    createGame: async (_: unknown, { type }: CreateGameArgs, { user }: Context) => {
      const game = await GameService.createGameService(type, user.id);
      if(!game) {
        throw new Error("Failed to create game");
      }
      
      const games = await GameService.getAllGamesService();
      getIO().emit("allGamesUpdated", games);

      return game;
    },

    joinGame: async (_: unknown, { gameId }: JoinGameArgs, { user }: Context) => {
      const getGame = await GameService.getGameService(gameId);
      if (getGame?.player_x === user.id || getGame?.player_o === user.id) {
        throw new Error("You are already in the game");
      }

      const game = await GameService.joinGameService(gameId, user.id);
      if (!game) {
        throw new Error("Game full or not found");
      }

      getIO().to(`game-${gameId}`).emit("joined", game);

      const games = await GameService.getAllGamesService();
      getIO().emit("allGamesUpdated", games);

      return game;
    },

    makeMove: async (_: unknown, { gameId, row, col }: MakeMoveArgs, { user }: Context) => {
      
      const game = await GameService.getGameService(gameId);
      if (!game) {
        throw new Error("Game not found");
      }
      
      const player = game?.player_x === user.id ? "X" : "O";
      const updated = await GameService.makeMove(game, row, col, player);
      
      getIO().to(`game-${gameId}`).emit("move", updated);
      
      if (["X","O","draw"].includes(updated.winner || "")) {
        const games = await GameService.getAllGamesService();
        getIO().emit("allGamesUpdated", games);
      }
      
      return updated;
    },
  },
};
