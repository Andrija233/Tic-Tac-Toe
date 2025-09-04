import express from "express";
import cors from "cors";
import { pool } from "./db";
import authRoutes from "./routes/auth";
//import gameRoutes from "./routes/game";
import { createUserTable } from "./models/user";
import { createGameTable } from "./models/game";
//import { auth } from "./middleware/auth";

const app = express();
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

// Rute
app.use("/auth", authRoutes);
//app.use("/game", auth, gameRoutes);

app.listen(4000, () => console.log("🚀 Server running on port 4000"));