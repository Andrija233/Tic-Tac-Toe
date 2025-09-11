import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL?.replace("http", "ws") || "http://localhost:4000";

export const socket = io(SOCKET_URL, {
  autoConnect: true,
});
