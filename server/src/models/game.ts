import { pool } from "../db";

export const createGameTable = `
CREATE TABLE IF NOT EXISTS games (
  id SERIAL PRIMARY KEY,
  player_x INT REFERENCES users(id) ON DELETE SET NULL,
  player_o INT REFERENCES users(id) ON DELETE SET NULL,
  type VARCHAR(20) NOT NULL,             
  current_turn VARCHAR(1) DEFAULT 'X',   
  status VARCHAR(20) DEFAULT 'ongoing',  
  winner VARCHAR(10) NULL,              
  moves JSONB DEFAULT '[]',              
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);`;

export interface Move {
  row: number;
  col: number;
  player: "X" | "O";
  timestamp: string;
}

export interface Game {
  id: number;
  player_x: number | null;
  player_o: number | null;
  type: "single" | "multi";
  current_turn: "X" | "O";
  status: "ongoing" | "finished";
  winner: "X" | "O" | "draw" | "ai" | null;
  moves: Move[];
  created_at: Date;
  updated_at: Date;
}

export interface Position {
  row: number;
  col: number;
}

export async function createGame(
  type: "single" | "multi",
  playerX: number
): Promise<Game> {
  const result = await pool.query(
    `INSERT INTO games (type, player_x) VALUES ($1, $2) RETURNING *`,
    [type, playerX]
  );
  return result.rows[0];
}

export async function joinGame(
  gameId: number,
  playerO: number
): Promise<Game | null> {
  const result = await pool.query(
    `UPDATE games SET player_o = $1 WHERE id = $2 AND player_o IS NULL RETURNING *`,
    [playerO, gameId]
  );
  return result.rows[0] || null;
}

export async function getGameById(gameId: number): Promise<Game | null> {
  const result = await pool.query(`SELECT * FROM games WHERE id=$1`, [gameId]);
  return result.rows[0] || null;
}

export async function updateGameMoves(
  gameId: number,
  moves: Move[],
  currentTurn: "X" | "O",
  status: "ongoing" | "finished",
  winner: "X" | "O" | "draw" | "ai" | null
): Promise<Game> {
  const result = await pool.query(
    `UPDATE games 
     SET moves=$1, current_turn=$2, status=$3, winner=$4, updated_at=NOW()
     WHERE id=$5 RETURNING *`,
    [JSON.stringify(moves), currentTurn, status, winner, gameId]
  );
  return result.rows[0];
}

export async function getGamesByUser(userId: number): Promise<Game[]> {
  const result = await pool.query(
    `SELECT * FROM games WHERE player_x=$1 OR player_o=$1 ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
}