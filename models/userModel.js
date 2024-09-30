import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true, // Trims whitespace
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Always store email in lowercase
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Basic email validation
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    description: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["player", "groundOwner"],
      default: "player",
    },
    sportsPreferences: [
      {
        type: String,
      },
    ], // This will only be used for players
    points: {
      type: Number,
      default: 0,
    }, // Gamification points for players

    // Fields for ground owners
    groundsOwned: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ground",
      },
    ], // Ground IDs owned by the groundOwner

    location: {
      type: String,
      trim: true,
    }, // Common field for location
  },
  {
    timestamps: true, // Automatically handles createdAt and updatedAt
  }
);

// Create and export the User model
const User = mongoose.model("User", userSchema);
export default User;
