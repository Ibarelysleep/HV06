// import express from "express";

// import {
//   createGround,
//   deleteGround,
//   getGrounds,
//   updateGround,
// } from "../controllers/groundController.js";

// const router = express.Router();

// // CRUD routes for grounds
// router.post("/", createGround); // Create a new ground
// router.get("/", getGrounds); // Get all grounds owned by the user

// export default router;

import express from "express";
import {
  createGround,
  updateGround,
  deleteGround,
  getGroundsByOwner,
  getGrounds,
} from "../controllers/groundController.js";

const router = express.Router();

// Route to create a ground
router.post("/create", createGround);

// get all grounds
router.get("/", getGrounds);

// Route to update a ground
router.put("/update", updateGround);

// Route to delete a ground
router.delete("/delete", deleteGround);

// Route to get grounds by owner
router.get("/:ownerId", getGroundsByOwner);

export default router;
