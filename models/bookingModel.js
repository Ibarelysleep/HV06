import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who booked
    ground: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ground",
      required: true,
    }, // Ground being booked
    bookingDate: { type: Date, required: true }, // Date and time for the booking
    duration: { type: Number, required: true }, // Duration in hours
    totalPrice: { type: Number, required: true }, // Total price for the booking
    status: {
      type: String,
      enum: ["confirmed", "canceled"],
    },
  },
  {
    timestamps: true, // Automatically handles createdAt and updatedAt
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
