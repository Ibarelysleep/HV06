import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js"; // Importing the authentication routes
import groundRoutes from "./routes/groundRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import gamifyRoutes from "./routes/gamifyRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // For parsing application/json

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Routes
app.use("/api/user", userRoutes); // Use the authentication routes
app.use("/api/grounds", groundRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/gamify/", gamifyRoutes);
