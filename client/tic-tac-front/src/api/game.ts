import type { Game, Move } from "../types/game";
import axiosInstance from "./axiosInstance";



export const createGame = async (token: string, type: string) : Promise<Game> => {
  try {
    const res = await axiosInstance.post<Game>(
      `/game/create`,
      { type },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data as Game;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("Failed to create game");
    }
  }
};


export const joinGame = async (token: string, gameId: number) : Promise<Game> => {
  try {
    const res = await axiosInstance.post<Game>(
      `/game/join/${gameId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data as Game;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("Failed to join game");
    }
  }
};


export const makeMove = async (token: string, gameId: number, move: Move) : Promise<Game> => {
  try {
    const res = await axiosInstance.post<Game>(
      `/game/move/${gameId}`,
      move,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data as Game;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("Failed to make move");
    }
  }
};


export const getGame = async (token: string, gameId: number) : Promise<Game> => {
  try {
    const res = await axiosInstance.get<Game>(
      `/game/${gameId}`,
      {headers: { Authorization: `Bearer ${token}` },
    });
    return res.data as Game;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("Failed to get game");
    }
  }
};


export const getHistory = async (token: string) : Promise<Game[]> => {
  try {
    const res = await axiosInstance.get<Game[]>(
      `/game/history/me`, 
      {headers: { Authorization: `Bearer ${token}` },
    });
    return res.data as Game[];
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("Failed to get history");
    }
  }
};

export const getAllGames = async (token: string) : Promise<Game[]> => {
  try {
    const res = await axiosInstance.get<Game[]>(
      `/game/history/all`, 
      {headers: { Authorization: `Bearer ${token}` },
    });
    return res.data as Game[];
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("Failed to get history");
    }
  }
};