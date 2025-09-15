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
    const {token, user} = await registerUser(username, password);
    res.json({ token, user });
  } catch (err: unknown) {
    if (!(err instanceof Error)) {
      return res.status(500).json({ error: "Unknown server error" });
    }

    if (err.message === "Username already exists") {
      return res.status(400).json({ error: err.message });
    }

    return res.status(500).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  try {
    const { token, user} = await loginUser(username, password);
    res.json({ token, user });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }

    res.status(500).json({ error: "Unknown error" });
  }
};