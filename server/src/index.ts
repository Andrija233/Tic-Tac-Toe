import express from "express";
import cors from "cors";
import { pool } from "./db";
import authRoutes from "./routes/auth";
import { createUserTable } from "./models/user";
import { createGameTable } from "./models/game";
import gameRoutes from "./routes/game";
import { initIO } from "./socket";
import http, { Server as HttpServer } from "http";
import dotenv from "dotenv";

dotenv.config();



const app = express();
const server: HttpServer = http.createServer(app);

const io = initIO(server);
app.use(cors());
app.use(express.json());

(async () => {
  try {
    await pool.query(createUserTable);
    await pool.query(createGameTable);
    console.log("✅ Tables are ready");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
  }
})();


app.use("/auth", authRoutes);
app.use("/game", gameRoutes);


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});