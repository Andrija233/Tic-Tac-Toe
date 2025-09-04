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