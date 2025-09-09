import type { Game, Move } from "../types/game";
import axiosInstance from "./axiosInstance";



export const createGame = async (token: string, type: string) : Promise<Game> => {
  const res = await axiosInstance.post(
    `/game/create`,
    { type },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data as Game;
};


export const joinGame = async (token: string, gameId: number) : Promise<Game> => {
  const res = await axiosInstance.post(
    `/game/join/${gameId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data as Game;
};


export const makeMove = async (token: string, gameId: number, move: Move) : Promise<Game> => {
  const res = await axiosInstance.post(
    `/game/move/${gameId}`,
    move,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data as Game;
};


export const getGame = async (token: string, gameId: number) : Promise<Game> => {
  const res = await axiosInstance.get(
    `/game/${gameId}`,
      {headers: { Authorization: `Bearer ${token}` },
  });
  return res.data as Game;
};


export const getHistory = async (token: string) : Promise<Game[]> => {
  const res = await axiosInstance.get(
    `/game/history/me`, 
    {headers: { Authorization: `Bearer ${token}` },
  });
  return res.data as Game[];
};

export const getAllGames = async (token: string) : Promise<Game[]> => {
  const res = await axiosInstance.get(
    `/game/history/all`, 
    {headers: { Authorization: `Bearer ${token}` },
  });
  return res.data as Game[];
};