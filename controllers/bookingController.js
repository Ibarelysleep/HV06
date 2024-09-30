import Booking from "../models/bookingModel.js";
import Ground from "../models/groundModel.js";
import User from "../models/userModel.js";

// Create a new booking
export const createBooking = async (req, res) => {
  const { userId, groundId, bookingDate, duration } = req.body;

  try {
    const ground = await Ground.findById(groundId);
    if (!ground) {
      return res.status(404).json({ message: "Ground not found." });
    }

    const totalPrice = ground.pricePerHour * duration;

    const newBooking = new Booking({
      user: userId,
      ground: groundId,
      bookingDate,
      duration,
      totalPrice,
    });

    await newBooking.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Confirm a booking
export const confirmBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    // Update the status to confirmed
    booking.status = "confirmed";
    await booking.save();

    res
      .status(200)
      .json({ message: "Booking confirmed successfully", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Get all bookings for a user
export const getUserBookings = async (req, res) => {
  const { userId } = req.body;

  try {
    const bookings = await Booking.find({ user: userId }).populate("ground");
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    booking.status = "canceled";
    await booking.save();

    res.status(200).json({ message: "Booking canceled successfully", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};
