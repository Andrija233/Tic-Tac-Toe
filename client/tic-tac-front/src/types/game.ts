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