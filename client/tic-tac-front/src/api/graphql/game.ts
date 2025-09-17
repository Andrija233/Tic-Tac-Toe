import { gql } from "@apollo/client";
import client from "./client";
import type { Game } from "../../types/game";
import type {
  CreateGameResponse,
  JoinGameResponse,
  MakeMoveResponse,
  MyGamesResponse,
  GetAllGamesResponse,
  GetGameResponse
} from "../../types/graph";
import { handleGraphqlError } from "../../utils/handleGraphError";

export const GAME_DETAILS = gql`
  fragment GameDetails on Game {
    id
    type
    status
    player_x
    player_o
    current_turn
    winner
    moves {
      row
      col
      player
    }
  }
`;

export const CREATE_GAME = gql`
  mutation CreateGame($type: String!) {
    createGame(type: $type) {
      ...GameDetails
    }
  }
  ${GAME_DETAILS}
`;

export const JOIN_GAME = gql`
  mutation JoinGame($gameId: ID!) {
    joinGame(gameId: $gameId) {
      ...GameDetails
    }
  }
  ${GAME_DETAILS}
`;

export const MAKE_MOVE = gql`
  mutation MakeMove($gameId: ID!, $row: Int!, $col: Int!) {
    makeMove(gameId: $gameId, row: $row, col: $col) {
      ...GameDetails
    }
  }
  ${GAME_DETAILS}
`;

export const MY_GAMES = gql`
  query {
    myGames {
      ...GameDetails
    }
  }
  ${GAME_DETAILS}
`;

export const ALL_GAMES = gql`
  query {
    allGames {
      ...GameDetails
    }
  }
  ${GAME_DETAILS}
`;

export const GET_GAME = gql`
  query GetGame($id: ID!) {
    game(id: $id) {
      ...GameDetails
    }
  }
  ${GAME_DETAILS}
`;


export const createGame = async(type: "single" | "multi"): Promise<Game> => {
  try {
    const res = await client.mutate<CreateGameResponse>({
      mutation: CREATE_GAME,
      variables: { type },
    });
    if (!res.data?.createGame) {
      throw new Error("Game data is missing in the response");
    }
    return res.data.createGame;
  } catch (err) {
    handleGraphqlError(err, "Failed to create game");
  }
}

export const joinGame = async(gameId: number): Promise<Game> => {
  try {
    const res = await client.mutate<JoinGameResponse>({
      mutation: JOIN_GAME,
      variables: { gameId },
    });
    if (!res.data?.joinGame) {
      throw new Error("Game data is missing in the response");
    }
    return res.data.joinGame;
  } catch (err) {
    handleGraphqlError(err, "Failed to join game");
  }
}

export const makeMove = async( gameId: number, row: number, col: number): Promise<Game> => {
  try {
    const res = await client.mutate<MakeMoveResponse>({
      mutation: MAKE_MOVE,
      variables: { gameId, row, col },
    });
    if (!res.data?.makeMove) {
      throw new Error("Game data is missing in the response");
    }
    return res.data.makeMove;
  } catch (err) {
    handleGraphqlError(err, "Failed to make move");
  }
}

export const getMyGames = async(): Promise<Game[]> => {
  try {
    const res = await client.query<MyGamesResponse>({
      query: MY_GAMES,
      fetchPolicy: "network-only", 
    });
    if (!res.data?.myGames) {
      throw new Error("No games returned");
    }
    return res.data.myGames;
  } catch (err) {
    handleGraphqlError(err, "Failed to get my games");
  }
}

export const getAllGames = async(): Promise<Game[]> => {
  try {
    const res = await client.query<GetAllGamesResponse>({
      query: ALL_GAMES,
      fetchPolicy: "network-only",
    });
    if (!res.data?.allGames) {
      throw new Error("No games returned");
    }
    return res.data.allGames;
  } catch (err) {
    handleGraphqlError(err, "Failed to get all games");
  }
}

export const getGame = async(id: number): Promise<Game> => {
  try {
    const res = await client.query<GetGameResponse>({
      query: GET_GAME,
      variables: { id },
      fetchPolicy: "network-only",
    });
    if (!res.data?.game) {
      throw new Error("Game not found");
    }
    return res.data.game;
  } catch (err) {
    handleGraphqlError(err, "Failed to get game");
  }
}