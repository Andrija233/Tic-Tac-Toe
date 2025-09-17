import type { Game } from "./game";
import type { AuthResponse } from "../api/auth";

export type ResponseRegister = {
  register: AuthResponse;
};

export type ResponseLogin = {
  login: AuthResponse;
}

export type CreateGameResponse = { 
  createGame: Game 
};
export type JoinGameResponse = { 
  joinGame: Game 
};
export type MakeMoveResponse = { 
  makeMove: Game 
};
export type MyGamesResponse = { 
  myGames: Game[] 
};

export type GetAllGamesResponse = { 
  allGames: Game[] 
};

export type GetGameResponse = { 
  game: Game 
};