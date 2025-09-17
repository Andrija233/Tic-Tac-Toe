import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import gameRoutes from "./routes/game";
import { initIO } from "./socket";
import { createServer } from "http";
import { typeDefs } from "./graphql/schemas/schema";
import { resolvers } from "./graphql/resolvers/root";
import { Context, graphqlMiddleware } from "./middleware/graphAuth";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/game", gameRoutes);

const httpServer = createServer(app);

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();

  app.use("/graphql", graphqlMiddleware(server));

  initIO(httpServer);

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}/graphql`)
  );
}

startServer();