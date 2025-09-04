export const createGameTable = `
CREATE TABLE IF NOT EXISTS games (
  id SERIAL PRIMARY KEY,
  player_x INT REFERENCES users(id) ON DELETE SET NULL,
  player_o INT REFERENCES users(id) ON DELETE SET NULL,
  type VARCHAR(20) NOT NULL,             -- single | multi
  current_turn VARCHAR(1) DEFAULT 'X',   -- X ili O
  status VARCHAR(20) DEFAULT 'ongoing',  -- ongoing | finished
  winner VARCHAR(10) NULL,               -- X | O | draw | ai
  moves JSONB DEFAULT '[]',              -- istorija poteza
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);`;