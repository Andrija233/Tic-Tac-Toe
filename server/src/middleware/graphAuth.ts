import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { RequestHandler, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

type UserPayload = { 
  id: number;
  username: string
} | JwtPayload;
export type Context = { 
  user?: UserPayload 
};

function verifyToken(req: Request): UserPayload | undefined {
  const authHeader = req.headers?.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : undefined;
  
  if (!token) {
    return undefined;
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
}

export function graphqlMiddleware(server: ApolloServer<Context>): RequestHandler {
  return expressMiddleware(server, {
    context: async ({ req }): Promise<Context> => {
      const user = verifyToken(req);
      return { user };
    },
  }) as RequestHandler;
}