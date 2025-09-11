import { pool } from "../db";

interface User {
  id: number;
  username: string;
  password: string;
  created_at: string; 
}

export const createUserTable = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);`;


export const createUser = async (username: string, hashedPassword: string) : Promise<User | undefined> => {
  const result = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *", [username, hashedPassword]);
  return result.rows[0];
};

export const findUserByUsername = async (username: string): Promise<User | undefined> => {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  return result.rows[0];
};