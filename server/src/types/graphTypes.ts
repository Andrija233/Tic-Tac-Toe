export type Context = {
  user: {
    id: number;
    username: string;
  };
};

export type RegisterArgs = {
  username: string;
  password: string;
};

export type LoginArgs = {
  username: string;
  password: string;
};

export type CreateGameArgs = { 
  type: "single" | "multi" 
};
export type JoinGameArgs = { 
  gameId: number 
};
export type MakeMoveArgs = { 
  gameId: number; row: number; col: number 
};