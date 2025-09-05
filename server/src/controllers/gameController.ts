import { Request, Response } from "express";
import * as GameService from "../service/gameService";
import { getIO } from "../socket";

export async function createGame(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { type } = req.body;

    const game = await GameService.createGameService(type, req.user.id);
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: "Error creating game" });
  }
}

export async function joinGame(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const gameId = parseInt(req.params.id, 10);
    const game = await GameService.joinGameService(gameId, req.user.id);

    if (!game) {
      return res.status(400).json({ error: "Game full or not found" });
    }

    getIO().to(`game-${gameId}`).emit("joined", game);

    res.json(game);
  } catch (err) {
    res.status(500).json({ error: "Error joining game" });
  }
}

export async function makeMove(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const gameId = parseInt(req.params.id, 10);
    const { row, col } = req.body;

    const game = await GameService.getGameService(gameId);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    const player = game.player_x === req.user.id ? "X" : "O";
    const updated = await GameService.makeMove(game, row, col, player);

    getIO().to(`game-${gameId}`).emit("move", updated);

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error fetching game" });
  }
}

export async function getGame(req: Request, res: Response) {
  try {
    const gameId = parseInt(req.params.id, 10);
    const game = await GameService.getGameService(gameId);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.json(game);
  } catch {
    res.status(500).json({ error: "Error fetching game" });
  }
}

export async function getUserGames(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const games = await GameService.getGamesByUserService(req.user.id);
    res.json(games);
  } catch {
    res.status(500).json({ error: "Error fetching history" });
  }
}
