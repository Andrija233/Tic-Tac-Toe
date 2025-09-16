import { userResolvers } from "./userResolver";
import { gameResolvers } from "./gameResolver";

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...gameResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...gameResolvers.Mutation,
  },
};