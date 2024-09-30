import express from "express";
import {
  matchPlayers,
  getLeaderboard,
} from "../controllers/gamifyController.js";

const router = express.Router();

// Route for matching players and awarding points
router.post("/match", matchPlayers);

// Route for fetching the leaderboard
router.get("/leaderboard", getLeaderboard);

export default router;
