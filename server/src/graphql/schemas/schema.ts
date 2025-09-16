import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type AuthUser {
    token: String!
    user: User!
  }

  type Move {
    row: Int!
    col: Int!
    player: String!
    timestamp: String!
  }

  type Game {
    id: ID!
    player_x: Int
    player_o: Int
    type: String!
    current_turn: String!
    status: String!
    winner: String
    moves: [Move!]!
    created_at: String!
    updated_at: String!
  }

  type Query {
    me: User
    game(id: ID!): Game
    myGames: [Game!]!
    allGames: [Game!]!
  }

  type Mutation {
    register(username: String!, password: String!): AuthUser!
    login(username: String!, password: String!): AuthUser!
    createGame(type: String!): Game!
    joinGame(gameId: ID!): Game!
    makeMove(gameId: ID!, row: Int!, col: Int!): Game!
  }
`;