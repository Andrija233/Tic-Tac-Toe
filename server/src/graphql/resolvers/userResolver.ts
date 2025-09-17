import * as authService from "../../service/authService";
import { RegisterArgs, LoginArgs, Context } from "../../types/graphTypes";

export const userResolvers = {
  Query: {
    me: (_: unknown, __: unknown, { user }: Context) => user || null,
  },
  Mutation: {
   register: async (_: unknown, args: RegisterArgs) => {
    const { username, password } = args;

    const result = await authService.registerUser(username, password);

    if (!result || !result.token || !result.user) {
      throw new Error("Registration failed, invalid return value");
    }

    return {
      token: result.token,
      user: result.user,
    };
  },
    login: async (_: unknown, args: LoginArgs) => {
      const { username, password } = args;

      const result = await authService.loginUser(username, password);
      if (!result) {
        throw new Error("Invalid username or password");
      }
      const { token, user } = result;

      return { token, user };
    },
  },
};
