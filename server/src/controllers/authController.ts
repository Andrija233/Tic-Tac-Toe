import { Request, Response } from "express";
import { registerUser, loginUser } from "../service/authService";

interface DatabaseError extends Error {
  code?: string; 
}

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  try {
    await registerUser(username, password);
    res.json({ message: "✅ User registered" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      const dbErr = err as DatabaseError;

      if (dbErr.code === "23505") {
        return res.status(400).json({ error: "Username already exists" });
      }

      return res.status(500).json({ error: dbErr.message });
    }

    res.status(500).json({ error: "Unknown server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  try {
    const token = await loginUser(username, password);
    res.json({ token });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }

    res.status(500).json({ error: "Unknown error" });
  }
};