import { Router } from "express";
import { auth } from "../middleware/auth";
import * as GameController from "../controllers/gameController";

const router = Router();

router.post("/create", auth, GameController.createGame);
router.post("/join/:id", auth, GameController.joinGame);
router.post("/move/:id", auth, GameController.makeMove);
router.get("/:id", auth, GameController.getGame);
router.get("/history/me", auth, GameController.getUserGames);

export default router;
