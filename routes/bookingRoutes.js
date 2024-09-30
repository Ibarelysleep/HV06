import express from "express";
import {
  createBooking,
  getUserBookings,
  cancelBooking,
  confirmBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

// Routes for booking management
router.post("/", createBooking); // Create a booking
router.get("/", getUserBookings); // Get all bookings for the user
router.delete("/:bookingId", cancelBooking); // Cancel a booking
router.put("/:bookingId/confirm", confirmBooking); // Confirm a booking

export default router;
