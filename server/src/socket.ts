import { Server } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server;

export function initIO(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("joinGame", (gameId: number) => {
      socket.join(`game-${gameId}`);
      console.log(`Client ${socket.id} joined game-${gameId}`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
}

export function getIO(): Server {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
}

