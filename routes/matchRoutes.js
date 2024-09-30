import express from "express";
import { matchPlayers, matchGrounds } from "../controllers/matchController.js";

const router = express.Router();

// Route to match players
router.post("/players", matchPlayers);

// Route to match grounds
router.post("/grounds", matchGrounds);

export default router;
