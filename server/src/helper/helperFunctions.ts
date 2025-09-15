import { Game, Move, Position } from "../models/game";

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

export function aiMove(game: Game): Position | null {
  const aiPlayer: "O" = "O";
  const human: "X" = "X";
  
  const availableMoves = getAvailableMoves(game);
  if (availableMoves.length === 0) {
    return null;
  }

  const randomChance = Math.random();
  if (randomChance < 0.3) {
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  const { move } = minimax([...game.moves], game.current_turn, 0, -Infinity, +Infinity, aiPlayer, human);
  return move || availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

function evaluateWinner(winner: "X" | "O" | "draw" | null, depth: number, aiPlayer: "O", human: "X"): number {
  if (winner === aiPlayer) return 10 - depth;
  if (winner === human) return depth - 10;
  return 0;
}

export function getAvailableMoves(game: Game): Position[] {
  const allMoves = Array.from({ length: 3 }, (_, r) =>
    Array.from({ length: 3 }, (_, c) => ({ row: r, col: c }))
  ).flat();

  return allMoves.filter(
    pos => !game.moves.some(m => m.row === pos.row && m.col === pos.col)
  );
}

export function minimax(
  moves: Move[],
  currentPlayer: "X" | "O",
  depth: number,
  alpha: number,
  beta: number,
  aiPlayer: "O",
  human: "X"
): { score: number; move?: Position } {
  const winner = checkWinner(moves);
  if (winner !== null) {
    return { score: evaluateWinner(winner, depth, aiPlayer, human) };
  }
  if (moves.length === 9) {
    return { score: 0 };
  }

  const isAiTurn = currentPlayer === aiPlayer;
  let bestScore = isAiTurn ? -Infinity : +Infinity;
  let bestMove: Position | undefined;

  const taken = new Set(moves.map(m => `${m.row},${m.col}`));

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (taken.has(`${r},${c}`)) {
        continue;
      }

      const newMove: Move = { row: r, col: c, player: currentPlayer, timestamp: new Date().toISOString() };
      moves.push(newMove);

      const result = minimax(moves, currentPlayer === "X" ? "O" : "X", depth + 1, alpha, beta, aiPlayer, human);

      moves.pop();

      if (isAiTurn) {
        if (result.score > bestScore) {
          bestScore = result.score;
          bestMove = { row: r, col: c };
        }
        alpha = Math.max(alpha, bestScore);
      } else {
        if (result.score < bestScore) {
          bestScore = result.score;
          bestMove = { row: r, col: c };
        }
        beta = Math.min(beta, bestScore);
      }

      if (beta <= alpha) {
        break;
      }
    }
    if (beta <= alpha) {
      break;
    }
  }

  return { score: bestScore, move: bestMove };
}